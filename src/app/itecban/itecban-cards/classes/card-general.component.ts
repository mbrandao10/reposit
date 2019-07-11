import { InputValidatorOptions, SearchConfig, SEARCH_CONFIG_TYPE, LiteralFormats } from 'onesait-core';
import { CardsElement } from './card-elements';
import { AccountElement } from 'onesait-api';
import { AbstractControl, FormGroup } from '@angular/forms';

export class CardGeneralComponent {
  formConfig: SearchConfig;
  addresses = [];
  identificationTypes: [];
  cards: CardsElement[];
  debitProducts: any;
  accounts: AccountElement[];
  cardContractForm: FormGroup;
  loading: boolean;

  inputValidatorOptions = <InputValidatorOptions> {
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

  constructor() {}

  // Formulario de beneficiario de una tarjeta ya existente
  createBeneficiaryView() {
    this.formConfig = new SearchConfig();
    let elements = [
       [
         'ITECBAN-CARDS.ADDRESS',
         'ITECBAN-CARDS.TYPE'
       ],
       this.addresses
    ];
    this.formConfig.formatsControl = [
      [
        {
          // Seleccion del contrato - Crédito
          type: SEARCH_CONFIG_TYPE.SELECT,
            label: 'ITECBAN-CARDS.SELECT-TYPE',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'productId',
            opts: this.inputValidatorOptions,
            elements: this.cards,
            selectText: 'id',
            selectValue: 'code',
            fmt: LiteralFormats.CARD
        },
        {
          // Nombre de Tarjeta - Credito
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CREDITCARDS.NAME',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'cardName',
            opts: this.inputValidatorOptions,
        }
      ],
      [
        {
          // Cuenta asociada a la Tarjeta - Credito
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CARDS.A-ACCOUNT',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'accountId',
            opts: this.inputValidatorOptions,
        },
        {
          // Limite de Debito
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CARDS.LIMIT.DEBIT',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'limit',
            opts: this.inputValidatorOptions,
        }
      ],
      [
        {
          // Forma de Pago
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CARDS.WAYPAY',
            class: 'mt-10 col-xs-12 col-sm-3',
            formControlName: 'waypay',
            opts: this.inputValidatorOptions,
        },
        {
          // Pago Mensual
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CARDS.MONTHLYAMOUNT',
            class: 'mt-10 col-xs-12 col-sm-3',
            formControlName: 'monthly',
            opts: this.inputValidatorOptions,
            hide: true
        },
        {
          // Limite de Credito
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: 'ITECBAN-CARDS.LIMIT.CREDIT',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'creditLimit',
            opts: this.inputValidatorOptions,
        }
      ],
      [
        {
          // Tipo de Documento
          type: SEARCH_CONFIG_TYPE.SELECT,
            label: 'ITECBAN-CARDS.DOCUMENTTYPE',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'identificationType',
            opts: this.inputValidatorOptions,
            elements: this.identificationTypes,
            selectText: 'name',
            selectValue: 'id',
            fmt: LiteralFormats.LITERAL
        },
        {
          // Cif del Beneficiario
          type: SEARCH_CONFIG_TYPE.TEXT,
            label: '',
            class: 'mt-10 col-xs-12 col-sm-6',
            formControlName: 'userId',
            opts: this.inputValidatorOptions,
        }
      ],
      [
        {
          // Direccion del Beneficiario
          type: SEARCH_CONFIG_TYPE.TABLE,
            label: '',
            class: 'mt-10 col-xs-12',
            formControlName: 'addressId',
            opts: this.inputValidatorOptions,
            elements: elements
        }
      ]
    ];
  }

  // Formulario para una nueva tarjeta
  createRequestView() {
    this.formConfig = new SearchConfig();
    let elements = [
      [
        'ITECBAN-CARDS.ADDRESS',
        'ITECBAN-CARDS.TYPE'
      ],
      this.addresses
   ];
    this.formConfig.formatsControl = [
      [{
        // Seleccion del contrato - Crédito
        type: SEARCH_CONFIG_TYPE.SELECT,
          label: 'ITECBAN-CARDS.SELECT-TYPE',
          class: 'mt-10 col-xs-12 col-sm-6',
          formControlName: 'productId',
          opts: this.inputValidatorOptions,
          elements: this.debitProducts,
          selectText: 'name',
          selectValue: 'id',
          fmt: LiteralFormats.LITERAL
      }],
      [{
        // Selector de Cuenta - Debito
        type: SEARCH_CONFIG_TYPE.SELECT,
          label: 'ITECBAN-CARDS.A-ACCOUNT',
          class: 'mt-10 col-xs-12 col-sm-6',
          formControlName: 'accountId',
          opts: this.inputValidatorOptions,
          elements: this.accounts,
          selectText: 'id',
          selectValue: 'id',
          fmt: LiteralFormats.IBAN
      },
      {
        // Limite de Debito - Debito
        type: SEARCH_CONFIG_TYPE.TEXT,
          label: 'ITECBAN-CARDS.LIMIT.DEBIT',
          class: 'mt-10 col-xs-12 col-sm-6',
          formControlName: 'limit',
          opts: this.inputValidatorOptions,
      }],
      [{
        // Direccion del Beneficiario
        type: SEARCH_CONFIG_TYPE.TABLE,
          label: '',
          class: 'mt-10 col-xs-12',
          formControlName: 'addressId',
          opts: this.inputValidatorOptions,
          elements: elements
      }]
    ];
  }

  // Validaciones

  // Validador de contrato de debito
  productIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control.value);
    if (control.value === undefined && control.value === null) {
      return { 'otherCharacters': true };
    }
    return null;
  }

  // Validador de cuenta de debito
  acountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control);
    if (control.value === undefined && control.value === null) {
      return { 'otherCharacters': true };
    }
    return null;
  }

  // Validacion de limite
  amountMinValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value !== null) {
      let value = control.value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      value = parseFloat(value.replace(', ', ''));
      if (value < 1) {
        return { 'min': true };
      }
    }
    return null;
  }

  amountNanValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value !== null) {
      let value = control.value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      value = parseFloat(value.replace(', ', ''));
      if (isNaN(value)) {
        return { 'nan': true };
      }
    }
    return null;
  }

  // Validador de dni
  dniValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value !== null && control.value !== '') {
      let id = control.value;
      // let size = id.length;
      let ctrl: any = control;
      let identificationType = ctrl._parent.controls.identificationType.value;
      switch (identificationType.id) {
        case '00':
          let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
          if (expresion_regular_dni.test(id) === true) {
            let numero: any = id.substr(0, id.length - 1);
            let letr = id.substr(id.length - 1, 1);
            numero = numero % 23;
            let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero + 1);
            if (letra !== letr.toUpperCase()) {
              return { 'errordni': true };
            }
          } else {
            return { 'errordni': true };
          }
          break;
        case '01':
          let expresion_regular_cif = /^[a-zA-Z]\d{7}[a-zA-Z0-9]$/;
          let array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'Q', 'S'];
          if (expresion_regular_cif.test (id) === true) {
            // let letra = id.substr(0, 1);
            let lControl = id.substr(id.length - 1, 1);
            let par: number = 0;
            let non: number = 0;
            let sum: number = 0;
            for (let index = 1; index < id.length - 1; index++) {
              let num: number = id[index];
              if (index % 2 === 0) {
                par += (num * 1);
              } else  {
                let aux = (num * 2);
                if (aux > 9) {
                  aux = 1 + (aux - 10);
                }
                non += aux;
              }
            }
            sum = par + non;
            let ctrlNUm = (10 - (sum % 10));
            if (isNaN(lControl)) {
              let l = array[ctrlNUm - 1];
              if (lControl !== l) {
                return { 'errorcif': true };
              }
            } else {
              if ((lControl * 1) !== (ctrlNUm * 1)) {
                return { 'errorcif': true };
              }
            }
          } else {
            return { 'errorcif': true };
          }
          break;
        case '06':
          let expresion_regular_nie = /^[XYZ]\d{7,8}[A-Z]$/;
          let nie = id.toUpperCase();
          let nie_prefix = nie.charAt(0);
          switch (nie_prefix) {
            case 'X': nie_prefix = 0; break;
            case 'Y': nie_prefix = 1; break;
            case 'Z': nie_prefix = 2; break;
          }
          if (expresion_regular_nie.test(nie) === true) {
            let numero = nie.substr(0, nie.length - 1);
            numero = numero.replace('X', 0);
            numero = numero.replace('Y', 1);
            numero = numero.replace('Z', 2);
            let x = nie.substr(nie.length - 1, 1);
            numero = numero % 23;
            let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero + 1);
            if (letra !== x) {
              return { 'errornie': true };
            }
          } else {
            return { 'errornie': true };
          }
          break;
        case '07':
          let expresion_regular_passport = /^[a-z]{3}[0-9]{6}[a-z]?$/i;
          let passport = id.toUpperCase();
          if (expresion_regular_passport.test(passport) === true) {
          } else {
            return { 'errorpassport': true };
          }
          break;
        // default:
        //   return { 'nan': true };
        //   break;
      }
    }
    return null;
  }

}
