import { Amount } from '../common/amount.interface';

interface AccountId {
  id: string;
}

interface LegalInfo {
  name: string;
  legalDocument: {
    id: string;
    type: {
      id: string;
      name: string;
    };
  };
  bic?: string;
  suffix?: string;
}

export interface SepaFile {
  fileType: string;
  file: File;
}

export module SepaFileTypeId {
  export const AEB19 = 'AEB19.14';
  export const AEB34 = 'AEB34.14';
}

export interface SepaFileType {
  id: string;
  name: string;
  href?: string;
}

export interface SepaRemittanceStatusType {
  id: string;
  name: string;
}

export interface SepaRemittanceFileTypeQuery {
  type: string;
  remittanceId: string;
}

export interface SepaRemittanceInput {
  fileTypeId: string;
  documentId: string;
}

export interface SepaFileDetail {
  fileType: SepaFileType;
  fileName: string;
  numOfOrders: number;
  totalAmount: Amount;
  date: string;
  accountReference: AccountId;
  documentId: string;
  orderer:{
    description: string;
    legalDocument:{
      id: string;
      type: {
        id: string;
        name: string;
      };
    }
  }
}

export interface SepaRemittancesQueryParams {
  type: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

export interface SepaRemittance {
  id: string;
  totalAmount: Amount;
  creationDate: string;
  chargeDate: string;
  numOfOrders: number;
  fileType: SepaFileType;
  status: SepaRemittanceStatusType;
}

export interface SepaRemittanceDetail {
  id: string;
  totalAmount: Amount;
  creationDate: string;
  chargeDate: string;
  numOfOrders: number;
  fileType: SepaFileType;
  status: SepaRemittanceStatusType;
  fromAccount: AccountId;
  holder: LegalInfo;
  
}

export interface SepaRemittanceDetailOrders {
  id: string;
  amount: Amount;
  status: SepaRemittanceStatusType;
  // c19
  debtor?: LegalInfo;
  expirationDate?: string;
  // c34
  toAccount?: AccountId;
  beneficiary?: string;
}

export interface SepaRemittanceReturned {
  remittanceId: string;
  amount: Amount;
  creationDate: string;
  numOfItems: number;
  documentId: string;
}

export interface SepaRemittanceReturnedQueryParams {
  senderId: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SepaSender {
  id: string,
  description: string
}

