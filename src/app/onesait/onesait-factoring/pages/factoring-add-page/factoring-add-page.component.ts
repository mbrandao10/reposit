import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService, FactoringService, SignatureTokenService, HeaderService, UtilsService, SignatureEntity, RouterHelperService } from 'onesait-core';
import { FactoringContracts, FactoringNewContract, GenericListResponse, CustomerProductType, ProductExt } from 'onesait-api';

@Component({
  selector: 'osb-factoring-add-page',
  templateUrl: './factoring-add-page.component.html'
})
export class FactoringAddPageComponent implements OnInit {

  loading: boolean;
  contracts: FactoringContracts[];
  step = 'FIRST';
  accountInfo: any;
  productSelected: any;
  products: ProductExt[];
  newFactoringForm: FormGroup;
  signatureEntity: SignatureEntity;
  finishDate: Date;

  info: string;

  constructor(
    private customersService: CustomersService,
    private factoringService: FactoringService,
    private signatureTokenService: SignatureTokenService,
    private headerService: HeaderService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.headerService.setTitle('HEADER.TITLE.FACTORING', 'HEADER.TITLE.FACTORING-ADD');

    let user = this.utilsService.getUser();

    this.accountInfo = {
      userId: user.userLegalId,
      username: user.userName + ' ' + user.userFirstSurname + ' ' + user.userSecondSurname,
      attorney: user.userNumber
    };

    this.customersService.getProducts(CustomerProductType.FACTORING).subscribe( (result: GenericListResponse<ProductExt>) => {
      this.products = result.data;
    });

    this.createFormControl();
  }

  createFormControl(): void {
    this.newFactoringForm = new FormGroup({
      product: new FormControl('', Validators.required),
      radioForm: new FormControl('', Validators.required)
    });
  }

  confirm() {
    let factoringNewContract: FactoringNewContract = new FactoringNewContract();
    factoringNewContract.productId = this.newFactoringForm.get('product').value.code;
    factoringNewContract.factoringType = this.newFactoringForm.get('radioForm').value;

    this.loading = true;
    this.factoringService.postContracts(factoringNewContract, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.finishDate = new Date();
      this.step = 'RESUME';
    }, (e) => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.step = 'TOKEN';
      }
    });
  }

  getProductInfo() {
    // meter servicio para recuperar información de producto, segun combo, y asignarselo a this.info. Cambiarlo en el html tambien
  }

  accept() {
    let link = RouterHelperService.getPathFromId('global-position-page');
    this.router.navigate([link]);
  }

  cancel() {
    let link = RouterHelperService.getPathFromId('factoring-page');
    this.router.navigate([link]);
  }

  back() {
    switch (this.step) {
      case 'TOKEN':
      this.signatureEntity = null;
        this.step = 'FIRST';
        break;
      default:
        break;
    }
  }

}
