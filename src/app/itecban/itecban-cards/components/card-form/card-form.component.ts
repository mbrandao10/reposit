import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { AccountService, UtilsService, CustomersService, AppConfigService, InputValidatorOptions,  } from 'onesait-core';
import { CardsService } from 'itecban-common';
import { CustomerProductType } from 'onesait-api';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'underscore';
import { ContractNewCard, ContractNewBeneficiary, DebitNewCard, CreditNewBeneficiary, CardElement } from '../../classes/card-elements';
import { CardGeneralComponent } from '../../classes/card-general.component';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent extends CardGeneralComponent implements OnInit, OnDestroy {

  @Input() step: string;
  @Output() cancelEvent = new EventEmitter();
  @Output() acceptEvent = new EventEmitter();

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'ITECBAN-CARDS.ERROR.MIN',
      MAX: 'ITECBAN-CARDS.ERROR.MAX',
      OTHERCHARACTERS: 'ITECBAN-CARDS.ERROR.SELECT',
      NAN: 'ITECBAN-CARDS.ERROR.NAN',
      ERRORDNI: 'ITECBAN-CARDS.ERROR.DNI',
      ERRORNCIF: 'ITECBAN-CARDS.ERROR.CIF',
      ERRORNIE: 'ITECBAN-CARDS.ERROR.NIE',
      ERRORPASSPORT: 'ITECBAN-CARDS.ERROR.PASSPORT'
    }
  };

  errorIdType: string;
  contractDebit: DebitNewCard;
  contractCredit: CreditNewBeneficiary;

  forkJoinServiceSubscription: Subscription;
  numPer: string;
  observableData: any = [];
  creditProducts: any;
  view;
  customer;
  cardsValues;
  allServiceFull: boolean;
  accountFormatView: string;
  contract: any;
  username: string;
  fullComplete = true;
  bor = '1px solid #ccc';
  cardResponse: CardElement;
  cardsByType: _.Dictionary<any>;

  constructor(
    protected accountService: AccountService,
    protected utilsService: UtilsService,
    protected cardsSevice: CardsService,
    protected appConfigService: AppConfigService,
    protected customersService: CustomersService,
  ) {
    super();
    this.loading = true;
    this.cardsValues = appConfigService.getConfig().cardsValues;
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
    this.identificationTypes = appConfigService.getConfig().identificationTypes;
    this.contract = new ContractNewCard().contractDebit;
    this.view = 'credit';
  }

  ngOnInit() {
    this.loadServices();
  }

  // Carga los servicios para el formulario
  loadServices() {
    this.numPer = JSON.parse(this.utilsService.getItemSessionStorage('user'));
    this.observableData.push(this.accountService.getAccounts());
    this.observableData.push(this.cardsSevice.getDebitCards());
    this.observableData.push(this.customersService.getPersonalData());
    this.observableData.push(this.customersService.getAddressPersonalData());
    this.observableData.push(this.customersService.getProducts(CustomerProductType.DEBIT_CARDS));
    this.forkJoinServiceSubscription = forkJoin(this.observableData).subscribe((result: any) => {
      this.accounts = result[0].data;
      this.cardsByType = _.groupBy(result[1].data, function (elem: any) { return elem.productData.type.id; });
      this.cards = this.cardsByType['C'];
      this.creditProducts = this.cardsValues.credit;
      this.debitProducts = result[4].data;
      this.customer = result[2].data;
      let name = '';
      result[3].data.forEach(dir => {
        if (dir.streetType && dir.streetType.name !== undefined) {
          name = dir.streetType.name;
        }
        if (dir.streetName !== undefined) {
          name = name + ' ' + dir.streetName;
        }
        if (dir.streetNumber !== undefined) {
          name = name + ' ' + dir.streetNumber;
        }
        if (dir.floor !== undefined) {
          name = name + ' ' + dir.floor;
        }
        if (dir.door !== undefined) {
          name = name + ' ' + dir.door;
        }
        if (dir.city !== undefined) {
          name = name + ' , ' + dir.city;
        }
        if (dir.country !== undefined) {
          name = name + ' - ' + dir.country;
        }
        let type = dir.type.id;
        let id = dir.addressId;
        this.addresses.push({ id, name, type });
      });
      this.allServiceFull = true;
      this.loadForm();
      this.loading = false;
    }, () => {
      this.loadEmpty();
      this.loading = false;
    });
  }

  // Si fallan los servicios cargamos el formulario vacio
  loadEmpty() {
    if (this.view === 'debit') {
    this.contract = new ContractNewCard().contractDebit;
      this.createDebitFormControl();
    } else {
      this.contract = new ContractNewBeneficiary().contractCredit;
      this.createCreditFormControl();
    }
  }

  // Carga del formulario
  loadForm() {
    this.username = this.customer.bussinesName;
    this.cardContractForm = undefined;
    if (this.view === 'debit') {
      this.contract = new ContractNewCard().contractDebit;
      this.contract.productId = this.debitProducts[0].id;
      this.contract.accountId = this.accounts[0].formats[0].value;
      this.contract.limitAmount.amount = '';
      this.contract.limitAmount.currency = this.accounts[0].currency.code;
      this.createDebitFormControl();
      this.createRequestView();
    } else {
      this.contract = new ContractNewBeneficiary().contractCredit;
      this.contract.cardNumber = this.creditProducts[0].id;
      this.contract.accountId = this.accounts[0].formats[0].value;
      this.contract.maxAmount.amount = '';
      this.contract.maxAmount.currency = this.accounts[0].currency.code;
      this.contract.beneficiary.personData = this.username;
      this.contract.beneficiary.legalDocument.type = this.customer.legalDocument.type;
      this.createCreditFormControl();
      this.createBeneficiaryView();
    }
  }

  // Credito
  createCreditFormControl() {
    this.cardContractForm = new FormGroup({
      productId: new FormControl(null,  [/*this.contractTypeValidator,*/ Validators.required]),
      accountId: new FormControl({value: '', disabled: true}, [/*this.acountValidator,*/ Validators.required]),
      cardName: new FormControl({value: '', disabled: true},  [Validators.required]),
      limit: new FormControl(null,  [this.amountMinValidator, this.amountNanValidator, Validators.required]),
      waypay: new FormControl({value: '', disabled: true},  [Validators.required]),
      monthly: new FormControl(null, [Validators.required]),
      creditLimit: new FormControl(null,  [this.amountMinValidator, this.amountNanValidator, Validators.required]),
      // fullName: new FormControl({value: this.username, disabled: false}, [this.fullNameValidator, Validators.required]),
      identificationType: new FormControl(null, [this.idValidator, Validators.required]),
      userId: new FormControl({ value: this.contract.beneficiary.legalDocument.id, disabled: false }, [this.dniValidator, Validators.required]),
      addressId: new FormControl(null , [Validators.required])
    });
  }

  // Debito
  createDebitFormControl() {
    this.cardContractForm = new FormGroup({
      productId: new FormControl(null, [/*this.contractTypeValidator,*/ Validators.required]),
      accountId: new FormControl(null, [/*this.acountValidator,*/ Validators.required]),
      limit: new FormControl(null, [this.amountMinValidator, this.amountNanValidator, Validators.required]),
      addressId: new FormControl(null , [Validators.required])
      // cardName: new FormControl(null,  [Validators.required]),
      // fullName: new FormControl({value: this.username, disabled: false}, [this.fullNameValidator, Validators.required]),
      // identificationType: new FormControl(null,  [this.idValidator, Validators.required]),
      // userId: new FormControl({value: this.contract.beneficiary.legalDocument.id, disabled: false}, [this.dniValidator, Validators.required]),
    });
  }

  // Cambio de vista
  changeProductId(view: string) {
    this.cardResponse = undefined;
    // this.loading = true;
    this.cardContractForm = undefined;
    if (view === 'credit') {
      this.view = view;
      this.cards = this.cardsByType['C'];
    } else if (view === 'debit') {
      this.view = view;
      this.cards = this.cardsByType['D'];
    }
    if (this.allServiceFull) {
      this.loadForm();
    } else {
      this.loadEmpty();
    }
  }

  // Comprueba el tipo de contrato para rellenar
  refill() {
    if (this.view === 'debit') {
      this.debitContractFill();
    } else {
      this.creditContractFill();
    }
  }

  // Rellena un Objeto de tipo debito
  debitContractFill() {
    this.contract = new ContractNewCard().contractDebit;
    this.contract.productId = '1'; // this.cardContractForm.value.productId;
    this.contract.accountId = this.cardContractForm.value.accountId.IBAN;
    let imp: any = this.cardContractForm.get('limit').value;

    imp = imp.replace(/\./g, '');
    imp = imp.replace(/,/g, '.');
    let numb: number = +imp;
    this.contract.limitAmount = {
      amount: numb,
      currency: '978'
    };
    // this.debitCredit.limitAmount ={ amount: numb, currency:{ id:"EUR", code:"978"}};

    /*this.debitCredit.limitAmount.currency = { id: this.cardContractForm.value.accountId.currency.id,
                                              code: this.cardContractForm.value.accountId.currency.code} */
    // this.debitCredit.cardSending = ;
    // this.debitCredit.legalDocument.id = this.contract.beneficiary.legalDocument.id;
    // this.debitCredit.legalDocument.type = this.customer.legalDocument.type;
    // this.debitCredit.email = ;
    // this.debitCredit.message = ;
    this.contract.addressId = '1';
  }

  // Rellena un Objeto de tipo credito
  creditContractFill() {
    // this.contract = this.creditCardContract;
    let imp: any = this.cardContractForm.value.limit;
    imp = imp.replace(/\./g, '');
    imp = imp.replace(/,/g, '.');
    let numb: number = +imp;

    let impCredit: any = this.cardContractForm.value.creditLimit;
    impCredit = impCredit.replace(/\./g, '');
    impCredit = impCredit.replace(/,/g, '.');
    let numbCredit: number = +impCredit;
    // this.contract.productId='000002';
    this.contract = new ContractNewBeneficiary().contractCredit;
    this.contract.cardNumber = this.cardContractForm.value.productId.id; // this.cardContractForm.value.contractType.productData.description;
    this.contract.accountId = this.cardContractForm.get('accountId').value; // this.cardContractForm.value.accountId.id;
    this.contract.maxAmount.amount = numbCredit;
    this.contract.maxAmount.currency = this.accounts[0].currency.code;
    this.contract.debitLimitAmount.amount =  numb;
    this.contract.debitLimitAmount.currency = this.accounts[0].currency.code;
    this.contract.beneficiary.personData = ''; // this.cardContractForm.value.fullName;
    this.contract.beneficiary.legalDocument.id = this.cardContractForm.value.userId;
    this.contract.beneficiary.legalDocument.type = this.customer.legalDocument.type;
    this.contract.wayPay = this.cardContractForm.get('waypay').value;
    let idSettlement = this.cardResponse.settlement.settlementGroup.id;
    switch (idSettlement) {
      case '04':
        break;

      case '02':
          this.contract.monthlyAmount = this.cardResponse.settlement.settlementGroup;
          break;
      case '03':
        this.contract.percentage = this.cardResponse.settlement.settlementGroup.name;
        break;
      default:
        this.contract.percentage = '0.0';
        break;
    }
    // this.contract.address.name = '';
    this.contract.addressId = '1';
  }

  idValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control);
    if (control.value === undefined && control.value === null) {
      return { 'otherCharacters': true };
    }
    return null;
  }

  changeId() {
    this.cardContractForm.get('userId').setValue('');
  }

  // Rellena direccion
  addressIdValidator(event: any) {
    let eventTargetId = event.target.id;
    switch (eventTargetId) {
      case '1':
        this.contract.addressId = this.addresses[0].id;
        break;
      case '2':
        this.contract.addressId = this.addresses[1].id;
        break;
      default:
        this.contract.addressId = this.addresses[0].id;
        break;
    }
    this.fullComplete = false;
    this.cardContractForm.get('addressId').setValue(this.contract.addressId);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  goStep() {
    let conditions;
    let contractConditions;
    this.refill();
    let productDataId;
    if (this.cardResponse && this.cardResponse.productData && this.cardResponse.productData.type && this.cardResponse.productData.type.id) {
      productDataId = this.cardResponse.productData.type.id;    }
    if (productDataId === 'C') {
      // Contratos de credito
      let contType = this.cardContractForm.value.productId.productData.description;
      let l = contType.length;
      contType = contType.substring(0, l - 14);
      switch (contType) {
        case 'CLASSIC':
          conditions = '3';
          break;
        case 'ORO':
          conditions = '2';
          break;
        default:
          conditions = '2';
          break;
      }
      let addresId: any = this.contract.addressId;
      contractConditions = {
        contract: this.contract,
        address: this.addresses[addresId - 1],
        conditions: conditions,
        view: this.view
      };
    } else {
      let idContract = this.contract.productId;
      // Contratos de debito
      switch (idContract) {
        case '00001': // Débito VISA ELECTRON
          conditions = '1';
          break;
        case '00002': // Crédito
          conditions = '2';
          break;
        case '00003': // Crédito
          conditions = '3';
          break;
        case '00004': // Crédito
          conditions = '4';
          break;
        default:
          conditions = '1';
          break;
      }
      let addresId: any = this.contract.addressId;
      contractConditions = {
        contract: this.contract,
        address: this.addresses[addresId - 1],
        conditions: conditions,
        view: this.view
      };
    }
    this.acceptEvent.emit(contractConditions);
  }

  ngOnDestroy(): void {
    if (this.forkJoinServiceSubscription) {
      this.forkJoinServiceSubscription.unsubscribe();
    }
  }

  prueba(event: any) {
    let idFrorm =  event.target.id;
    switch (idFrorm) {
      case 'productId':
        let aux = event.target.innerText.substring(1, 3);
        // let aux = event.target[0].text.substring(1, 3);
        // let aux = this.cardContractForm.get('productId').value;
        // aux = aux.id.substring(1, 3);
        aux = aux * 1;
        if (!isNaN(aux)) {
          let control = this.cardContractForm.value;
          this.contractTypeValidator(control);
        }
        break;
      case 'limit':
        this.applyFormatInput();
        break;
      case 'creditLimit':
        this.applyFormatInput();
        break;
      case '1':
        this.addressIdValidator(event);
        break;
      case '2':
        this.addressIdValidator(event);
        break;
      default:
        break;
    }
  }


  // Formateador de limite
  applyFormatInput() {
    if (!this.cardContractForm.get('limit').invalid && !isNaN(this.cardContractForm.get('limit').value)) {
      let n = this.cardContractForm.get('limit').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = n.replace(/-/g, '');
      n = + n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.cardContractForm.get('limit').setValue(n);
    }
    if (this.view === 'credit') {
      if (!this.cardContractForm.get('creditLimit').invalid && !isNaN(this.cardContractForm.get('creditLimit').value)) {
        let n = this.cardContractForm.get('creditLimit').value;
        n = n.replace(/\./g, '');
        n = n.replace(/,/g, '.');
        n = n.replace(/-/g, '');
        n = + n;
        n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.cardContractForm.get('creditLimit').setValue(n);
      }
    }
  }

  // Validador de contrato de credito
  contractTypeValidator(control: any) {
    if (control !== undefined && control !== null) {
      let card = control.productId;
      this.loading = true;
      this.cardsSevice.getDebitCard(card.id).subscribe(res => {
        this.cardResponse = res.data;
        if (this.cardResponse.settlement.settlementGroup.id !== '04') {
          this.formConfig.formatsControl[2][1].hide = false;
        } else {
          this.cardContractForm.get('monthly').setValue('monthly');
        }
        let carName = card.productData.description;
        // this.creditCardName = cardName;
        this.cardContractForm.get('cardName').setValue(carName);
        this.cardContractForm.get('accountId').setValue(this.cardResponse.account.formats[0].value);

        if (res.data.paymentType) {
          let paymentType = res.data.paymentType.name;
          this.cardContractForm.get('waypay').setValue(paymentType);
        } else {
          if (this.cardResponse.settlement && this.cardResponse.settlement.settlementGroup && this.cardResponse.settlement.settlementGroup.id) {
            let paymentType = this.cardResponse.settlement.settlementGroup;
            if (paymentType.id === '04') {
              this.cardContractForm.get('waypay').setValue(paymentType.name);
            }
            if (paymentType.id === '02') {
              this.cardContractForm.get('monthly').setValue(paymentType.name);
            }
            if (paymentType.id === '03') {
              this.cardContractForm.get('monthly').setValue(paymentType.name);
            }
        }
        }
        this.loading = false;
      });
    }
  }

}
