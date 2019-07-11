import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomersService } from 'onesait-core';

import * as _ from 'underscore';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address, Cities, Customer, GenericIdNameElement } from 'onesait-api';
import { TransferService } from 'onesait-core';

@Component({
  selector: 'osb-profile-personal-data',
  templateUrl: './profile-personal-data.component.html'
})
export class ProfilePersonalDataComponent implements OnInit {

  @Output() eventPersonalDataComponent = new EventEmitter();

  loading = false;
  postalAddressForm: FormGroup;
  streetTypes: GenericIdNameElement;
  provinces: GenericIdNameElement;
  cities: Cities;
  countries: GenericIdNameElement;

  typeCorrespondencia = 'CORRESPONDENCIA';
  typeFiscal = 'FISCAL';


  showEditPostalAddress: boolean;

  personalData: Customer;
  addressPersonalPostal: Address;
  newAddressPersonalPostal: Address;
  addressPersonalFiscal: Address;

  proccessOk = false;
  step = 'personal-data';



  constructor(
    protected custormersService: CustomersService,
    protected transferService: TransferService
  ) { }


  ngOnInit() {
    this.createFormControl();
    this.loadPersonalData();
  }

  createFormControl(): void {
    this.postalAddressForm = new FormGroup({
      addressId: new FormControl(null),
      streetType: new FormControl(null, Validators.required),
      streetName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      streetNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9A-Za-z]{1,6}$')]),
      aditionalInfo: new FormControl(null, Validators.maxLength(30)),
      postcode: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{1,5}$')]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      province: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      type: new FormControl(this.typeCorrespondencia),
      isPrincipal: new FormControl(true, Validators.required)
    });
  }

  loadPersonalData() {
    this.loading = true;
    let arrayPersonalData: any = [];
    arrayPersonalData.push(this.custormersService.getPersonalData());
    arrayPersonalData.push(this.custormersService.getAddressPersonalData());

    forkJoin(arrayPersonalData).subscribe((result: any) => {
      this.personalData = result[0]['data'];
      if (result[1]['data']) {
        this.addressPersonalPostal = this.searchAddressByType(result[1]['data'], this.typeCorrespondencia);
        this.addressPersonalFiscal = this.searchAddressByType(result[1]['data'], this.typeFiscal);
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  loadDataCatalogs() {
    this.loading = true;
    let dataCatalogs: any = [];

    dataCatalogs.push(this.custormersService.getStreetTypes());
    dataCatalogs.push(this.custormersService.getCountries());
    //dataCatalogs.push(this.custormersService.getProvinces());
    //dataCatalogs.push(this.custormersService.getCities());
    //   addressDataObservable.push(this.curstormersService.getProvinces(this.userId));
    //   addressDataObservable.push(this.curstormersService.getCities(this.userId));

    forkJoin(dataCatalogs).subscribe((result: any) => {
      this.streetTypes = result[0]['data'];
      this.countries = result[1]['data'];
      //  this.cities = result[2]['data'];
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }


  editAddress() {
    this.createFormControl();
    this.loadDataCatalogs();
    this.showEditPostalAddress = true;
    this.postalAddressForm.patchValue({ addressId: this.addressPersonalPostal.addressId });
    this.postalAddressForm.patchValue({ streetType: this.addressPersonalPostal.streetType.id });
    this.postalAddressForm.patchValue({ streetName: this.addressPersonalPostal.streetName });
    this.postalAddressForm.patchValue({ streetNumber: this.addressPersonalPostal.streetNumber });
    // this.postalAddressForm.patchValue({ floor: this.addressPersonalPostal.floor });
    // this.postalAddressForm.patchValue({ door: this.addressPersonalPostal.door });
    this.postalAddressForm.patchValue({ aditionalInfo: this.addressPersonalPostal.aditionalInfo });
    this.postalAddressForm.patchValue({ postcode: this.addressPersonalPostal.postcode });
    this.postalAddressForm.patchValue({ city: this.addressPersonalPostal.city });
    this.postalAddressForm.patchValue({ province: this.addressPersonalPostal.province });
    this.postalAddressForm.patchValue({ country: this.addressPersonalPostal.country });
  }

  cancel() {
    this.showEditPostalAddress = false;
  }

  modifyAddress() {
    this.loading = true;
    this.newAddressPersonalPostal = this.postalAddressForm.value;
    this.custormersService.putAddressPersonalData(this.newAddressPersonalPostal).subscribe(results => {
      console.log(results);
      this.loading = false;
      this.personalData = null;
      this.addressPersonalPostal = null;
      this.addressPersonalFiscal = null;
      this.showEditPostalAddress = false;
      this.postalAddressForm.reset();

      this.loadPersonalData();
      this.step = 'success';
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
  }


  // Search address by type
  // Solo hay una direccion fiscal, en cuanto la encontremos, la devolvemos
  // En el caso de las direcciones postales, buscamos la favorita para devolverla,
  //    si no existe una favorita se devuelve la última encontrada en la lista
  searchAddressByType(listAddress: any, typeAddress: any) {
    let listAddressDefault: any;
    for (let i = 0; i < listAddress.length; i++) {
      if (listAddress[i].type.id === typeAddress) {
        if (typeAddress === this.typeFiscal) {
          return listAddress[i];
        }
        if ((typeAddress === this.typeCorrespondencia) && (listAddress[i].isPrincipal === true)) {
          return listAddress[i];
        } else {
          listAddressDefault = listAddress[i];
        }
      }
    }
    return listAddressDefault;
  }

  close() {
    this.step = 'personal-data';
  }

}
