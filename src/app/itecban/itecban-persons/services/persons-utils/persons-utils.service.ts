import { Injectable } from '@angular/core';
import { CustomersService } from 'onesait-core';
import { Customer, Address } from 'onesait-api';

@Injectable()
export class PersonsUtilsService {

    constructor(private curstormersService: CustomersService) { }

    putPersonalData(personalData: any, token: any) {
        let personalDataSave: Customer = {
            id: personalData.id,
            legalDocument: {
                id: personalData.legalDocument.id,
                type: personalData.legalDocument.type,
            },
            name: personalData.name,
            surname: personalData.surname,
            secondSurname: personalData.secondSurname,
            bussinesName: personalData.bussinesName,
            birthDateOrCreationDate: personalData.birthDateOrCreationDate,
            sex: personalData.sex.id,
            maritalStatus: personalData.maritalStatus.id,
            contactInfo: {
                mobileNumber: personalData.contactInfo.mobileNumber,
                mobileNumberPrefix: personalData.contactInfo.mobileNumberPrefix.id,
                email: personalData.contactInfo.email
            },
            fiscalObligations: personalData.fiscalObligations,
            fiscalRelationType: personalData.fiscalRelationType.id,
            economicRegime: (personalData.economicRegime) ? personalData.economicRegime.id : null,
            indicators: personalData.indicators
        };
        return this.curstormersService.putPersonalData(personalDataSave, token);
    }

    putAffidavit(personalData: any, token: any) {
        let affidavitDataSave: Customer = {
            id: personalData.id,
            indicators: personalData.indicators
        };
        return this.curstormersService.putPersonalData(affidavitDataSave, token);
    }

    putAddressPersonalData(addressPersonal: any, type: any, isPrincipal?: boolean) {
        let addressPersonalSave: Address;
        if (isPrincipal) {
            addressPersonalSave = {
                addressId : type,
                isPrincipal: isPrincipal
            };
        } else {
            addressPersonalSave = {
                addressId : type,
                streetName : addressPersonal.streetName,
                streetNumber : addressPersonal.streetNumber,
                floor : addressPersonal.floor,
                postcode : addressPersonal.postcode,
                aditionalInfo : addressPersonal.aditionalInfo,
                province : addressPersonal.province.id,
                city : addressPersonal.city.name,
                district : addressPersonal.district,
                type : type,
            };
        }
        return this.curstormersService.putAddressPersonalData( addressPersonalSave);

    }
}
