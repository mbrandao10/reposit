import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService, RouterHelperService, HeaderService, SignatureEntity, SignatureTokenService, InputValidatorOptions } from 'onesait-core';
import { GenericListResponse, AccountElement, GenericIdNameElement } from 'onesait-api';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';

enum VIEWS {
  FIRST,
  TOKEN,
  RESUME
}

@Component({
  selector: 'osb-account-contract-check-page',
  templateUrl: './account-contract-check-page.component.html'
})
export class AccountContractCheckPageComponent implements OnInit {


  VIEWS = VIEWS;

  loading: boolean;
  newCheckForm: FormGroup;
  types: GenericIdNameElement[];
  typeSelected: GenericIdNameElement;
  accounts: AccountElement[];
  accountSelected: AccountElement;
  accountId: string;
  view: VIEWS;
  signatureEntity: SignatureEntity;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'El número de talonarios no puede ser inferior a 1',
      MAX: 'Excede el número máximo de talonarios que se pueden solicitar'
    }
  };

  constructor(
    private accountService: AccountService,
    private headerService: HeaderService,
    private signatureTokenService: SignatureTokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.view = VIEWS.FIRST;
  }

  ngOnInit(): void {
    this.headerService.setTitle('HEADER.TITLE.ACCOUNTS', 'HEADER.TITLE.CHECKBOOK');
    this.createFormControl();
    this.accountId = this.activatedRoute.snapshot.params.id;
    this.accountService.getCheckbookTypes().subscribe( (result: GenericListResponse<GenericIdNameElement> ) => {
      this.types = result.data;
      this.newCheckForm.controls.type.setValue(this.types[0].id);
    });
    this.loading = true;
    this.accountService.getAccounts().subscribe((result: GenericListResponse<AccountElement>) => {
      this.loading = false;
      this.accounts = result.data;
      let account = _.findWhere(this.accounts, {id: this.accountId});
      this.newCheckForm.controls.accountId.setValue(account.id);
    }, () => {
      this.loading =  false;
    });
  }

  createFormControl(): void {
    this.newCheckForm = new FormGroup({
      accountId: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(99)])
    });
  }

  cancel() {
    let link = [RouterHelperService.getPathFromId('account-detail-page', {id: this.accountId})];
    this.router.navigate(link);
  }

  back() {
    this.view = VIEWS.FIRST;
    this.accountSelected = null;
    this.typeSelected = null;
  }

  tokenCompleted() {
    this.contract();
  }

  contract() {
    this.loading = true;
    this.accountService.postContractCheckbook(this.newCheckForm.value, this.signatureEntity).subscribe( () => {
      this.accountSelected = this.accounts.find(account => account.id === this.newCheckForm.controls.accountId.value);
      this.typeSelected = this.types.find(type => type.id === this.newCheckForm.controls.type.value);
      this.view = VIEWS.RESUME;
      this.loading = false;
    }, e => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.view = VIEWS.TOKEN;
      }
    });

  }

}
