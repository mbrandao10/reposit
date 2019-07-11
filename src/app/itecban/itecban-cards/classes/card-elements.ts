import { Amount } from 'onesait-api';
import { Currency } from 'itecban-common';

export interface CardsElement {
    id: string;
    operationalStatus: boolean;
    cancellable: boolean;
    outstandingBalance: Amount;
    postedBalance: Amount;
    productData: {
       description: string;
       type: {
          id: string;
          name: string
       }
    };
}

export interface CardElement {
   id: string;
   alias: string;
   productData: {
      id?: string;
      description: string;
      type?: {
         id: string;
         name: string
      };
      subtype?: {
         id?: string;
         name?: string
      }
   };
   postedBalance: Amount;
   dailyCashLimit: Amount;
   dailyPurchaseLimit: {
      amount?: number;
      currency: Currency;
   };
   operationalStatus: boolean;
   status: {
      id: string;
      name: string
   };
   cancellable: boolean;
   creditLimit: Amount;
   settlement: {
       settlementAmount?: any;
       settlementPercentage?: string;
       settlementGroup: {
          id: string;
          name: string
       }
   };
   paymentType: {
      id: string;
      name: string
   };
   openingDate: string;
   holder: string;
   account: {
       id: string;
       formats: [
          {
             format: {
                id: string;
                name: string
             };
             value: string
          },
          {
             format?: {
                id: string;
                name: string
             };
             value?: string
          }
       ]
    };
    outstandingBalance: {
         type?: {
            id: string
         };
         amount: Amount;
   };


   currency?: {
      id: string;
      code: string
   };
   currentMonthCashOutstandingBalance?: {
      amount: number;
      currency: {
         id: string;
         code: string
      }
   };
   currentMonthPurchaseOutstandingBalance?: {
      amount: number;
      currency: {
         id: string;
         code: string
      }
   };
   expiryDate?: string;
   contractNumber?: string;
   officeNumber?: string;
}

export interface Balances {
    userHolder: boolean;
    availableBalance: [
       {
          amount: number;
          currency: {
             id: string;
             code: string;
          }
       }
    ];
    currentBalance: [
       {
          amount: number;
          currency: {
             id: string;
             code: string;
          }
       }
    ];
}

export interface Movement {
	reason: string;
	amount: {
		amount: number;
		currency: {
		   id: string;
		   code: string;
		}
	};
	date: string;
	valueDate: string;
	hasDocument: boolean;
	hasDetail: boolean;
	shop: string;
	type: string;
	address: string;
}

export interface  DebitNewCard {
   productId: string;
   subProductId: string;
   accountId: string;
   limitAmount: {
     amount: number,
     currency: string;
   };
   cardSending: string;
   addressId: string;
 }

export interface CreditNewBeneficiary {
   productId: string;
   cardNumber: string;
   accountId: string;
   maxAmount: {
     amount: number;
     currency: string;
   };
   debitLimitAmount: {
     amount: number;
     currency: string;
   };
   beneficiary: {
     personData: string;
     legalDocument: {
       id: string;
       type: string;
     }
   };
   cardSending: string;
   addressId: string;
   wayPay: string;
}


export class ContractNewCard {
   contractDebit: DebitNewCard = {
      productId: '',
      subProductId: '',
      accountId: '',
      limitAmount: {
      amount: 0,
      currency: '',
      },
      cardSending: 'HOME',
      addressId: '',
   };
}

export class ContractNewBeneficiary {
   contractCredit: CreditNewBeneficiary = {
      productId: '',
      cardNumber: '',
      accountId: '',
      maxAmount: {
        amount: 0,
        currency: '',
      },
      debitLimitAmount: {
        amount: 0,
        currency: '',
      },
      beneficiary: {
        personData: '',
        legalDocument: {
          id: '',
          type: '',
        }
      },
      cardSending: 'HOME',
      addressId: '',
      wayPay: '',
  };
}

