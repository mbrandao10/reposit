import { PagesConfiguration } from 'onesait-core';

export const PageConfig: PagesConfiguration = new PagesConfiguration();

PageConfig['confirming-contract-page'] = {
  tabs: [
    {
      name: 'ONESAIT-CONFIRMING.ISSUE-ORDERS.VIEW',
      view: 'issue-orders'
    },
    {
      name: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.VIEW',
      view: 'orders-remittances'
    },
    {
      name: 'ONESAIT-CONFIRMING.CONDITIONS.VIEW',
      view: 'conditions'
    },
    // {
    //   name: 'ONESAIT-CONFIRMING.REQUEST-ADVANCE.VIEW',
    //   view: 'request-advance'
    // }
  ]
};
PageConfig['confirming-provider-page'] = {
  tabs: [
    {
      name: 'ONESAIT-CONFIRMING.REQUEST-ADVANCE.VIEW',
      view: 'request-advance'
    }
  ]
};

PageConfig['express-bill-contract-page'] = {
  tabs: [
    {
      name: 'ONESAIT-NB-EXPRESS.ISSUE-ORDERS.VIEW',
      view: 'issue-orders'
    },
    {
      name: 'ONESAIT-NB-EXPRESS.ORDERS-REMITTANCES.VIEW',
      view: 'orders-remittances'
    },
    {
      name: 'ONESAIT-NB-EXPRESS.CONDITIONS.VIEW',
      view: 'conditions'
    },
    {
      name: 'ONESAIT-NB-EXPRESS.REQUEST-ADVANCE.VIEW',
      view: 'request-advance'
    }
  ]
};

PageConfig['account-page'] = {
  tabs: [
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.MOVEMENT',
      view: 'movements'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SETTLEMENTS',
      view: 'settlements'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.RETENTIONS',
      view: 'retentions'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.LOCKS',
      view: 'locks'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.CHECKS',
      view: 'checks'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.CASHPOOLING',
      view: 'cashpooling'
    },
    {
      name: 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.CONDITIONS',
      view: 'conditions'
    }
  ]
};

PageConfig['credit-page'] = {
  tabs: [
    {
      name: 'ITECBAN-CREDITS.CREDIT-PAGE.TABS.MOVEMENTS',
      view: 'movements'
    },
    {
      name: 'ITECBAN-CREDITS.CREDIT-PAGE.TABS.RETENTIONS',
      view: 'retentions'
    },
    {
      name: 'ITECBAN-CREDITS.CREDIT-PAGE.TABS.LOCKS',
      view: 'locks'
    },
    {
      name: 'ITECBAN-CREDITS.CREDIT-PAGE.TABS.CONDITIONS',
      view: 'conditions'
    }
  ]
};

PageConfig['directdebit-page'] = {
  tabs: [
    {
      name: 'ITECBAN-DIRECTDEBITS.DIRECTDEBIT-PAGE.TABS.RECIBOS',
      view: 'payments'
    }
    // ,
    // {
    //   name: 'ITECBAN-DIRECTDEBITS.DIRECTDEBIT-PAGE.TABS.TERMS',
    //   view: 'conditions'
    // }    
  ]
};

PageConfig['directdebits-page'] = {
  tabs: [
    {
      name: 'ITECBAN-DIRECTDEBITS.DIRECTDEBIT-PAGE.TABS.CONTRACTS',
      view: 'contracts'
    },
    {
      name: 'ITECBAN-DIRECTDEBITS.DIRECTDEBIT-PAGE.TABS.RETURN',
      view: 'returns'
    }
  ]
};

PageConfig['deposit-page'] = {
  tabs: [
    {
      name: 'ITECBAN-DEPOSITS.DEPOSITS.DETAILS',
      view: 'detail'
    },
  ]
},

  PageConfig['loan-page'] = {
    tabs: [
      {
        name: 'ITECBAN-LOANS.LOAN-PAGE.TABS.AMORTIZATION-TABLE',
        view: 'amortizationsTable'
      },
      // {
      //   name: 'ITECBAN-LOANS.LOAN-PAGE.TABS.FEES-PAID',
      //   view: 'feesPaid'
      // },
      {
        name: 'ITECBAN-LOANS.LOAN-PAGE.TABS.MOVEMENTS',
        view: 'movements'
      },
      {
        name: 'ITECBAN-LOANS.LOAN-PAGE.TABS.CONDITIONS',
        view: 'conditions'
      },
    ]
  };

PageConfig['fund-page'] = {
  tabs: [
    {
      name: 'ITECBAN-FUNDS.DETAIL.CONDITIONS',
      view: 'conditions'
    }
  ]
};

PageConfig['equity-page'] = {
  tabs: [
    {
      name: 'ITECBAN-EQUITIES.DETAIL.CONDITIONS',
      view: 'conditions'
    }
  ]
};

PageConfig['my-space-page'] = {
  tabs: [
    {
      name: 'ITECBAN-PERSONS.MY.SPACE.SIGNATURES',
      view: 'pending-signatures'
    },
    {
      name: 'ITECBAN-PERSONS.MY.SPACE.DOCUMENTS',
      view: 'documentbox'
    }
  ]
};

PageConfig['transfers-page'] = {
  tabs: [
    {
      name: 'ONESAIT-TRANSFERS.EMIT.TEXT',
      view: 'emit'
    },
    {
      name: 'ONESAIT-TRANSFERS.FAVOURITE.TEXT',
      view: 'favourites'
    },
    {
      name: 'ONESAIT-TRANSFERS.SCHEDULED.TEXT',
      view: 'scheduled'
    },
    {
      name: 'ONESAIT-TRANSFERS.PENDING.TEXT',
      view: 'historic'
    },
    {
      name: 'ONESAIT-TRANSFERS.INTERNATIONAL.TEXT',
      view: 'international'
    }
  ]
};

PageConfig['transfers-page-mobile'] = {
  tabs: [
    {
      name: 'ONESAIT-TRANSFERS.EMIT.TEXT',
      view: 'emit'
    },
    {
      name: 'ONESAIT-TRANSFERS.FAVOURITE.TEXT',
      view: 'favourites'
    },
    {
      name: 'ONESAIT-TRANSFERS.SCHEDULED.TEXT',
      view: 'scheduled'
    },
    {
      name: 'ONESAIT-TRANSFERS.PENDING.TEXT',
      view: 'historic'
    }
  ]
};

PageConfig['sepa-page'] = {
  tabs: [
    {
      name: 'ONESAIT-SEPA.SEND-REMITTANCE.VIEW',
      view: 'send-remittance'
    },
    {
      name: 'ONESAIT-SEPA.REMITTANCE-LIST.VIEW',
      view: 'remittance-list'
    },
    {
      name: 'ONESAIT-SEPA.REMITTANCE-RETURNED-LIST.VIEW',
      view: 'remittance-returned-list'
    }
  ]
};

PageConfig['leasing-detail-page'] = {
  tabs: [
    {
      name: 'ONESAIT-LEASING.AMORTIZATION-TABLE.VIEW',
      view: 'amortization-table'
    },
    {
      name: 'ONESAIT-LEASING.CONDITIONS.VIEW',
      view: 'conditions'
    }
  ]
};

PageConfig['factoring-contract-page'] = {
  tabs: [
    {
      name: 'ONESAIT-FACTORING.UPLOAD-INVOICE.VIEW',
      view: 'upload-invoice'
    },
    {
      name: 'ONESAIT-FACTORING.INVOICES.VIEW',
      view: 'invoices'
    },
    {
      name: 'ONESAIT-FACTORING.CONDITIONS.VIEW',
      view: 'conditions'
    }
  ]
};

PageConfig['settings-page'] = {
  tabs: [
    {
      name: 'ONESAIT-CONSENTS.CONSENTS-TAB.CHANGE-PASS',
      view: 'change-password'
    },
    {
      name: 'ONESAIT-CONSENTS.CONSENTS-TAB.GENERALITIES',
      view: 'generalities'
    },
    {
      name: 'ONESAIT-CONSENTS.CONSENTS-TAB.ALERTS',
      view: 'alerts'
    },
    {
      name: 'ONESAIT-CONSENTS.CONSENTS-TAB.CONSENTS',
      view: 'consent'
    },
  ]

};

PageConfig['taxes-page'] = {
  tabs: [
    {
      name: 'ONESAIT-TAXES.PAYMENTS-RETURNS.VIEW',
      view: 'payments-returns'
    },
    {
      name: 'ONESAIT-TAXES.INQUIRYS.VIEW',
      view: 'inquirys'
    }
  ]
};

PageConfig['profile-main-page'] = {
  tabs: [
    {
      name: 'ONESAIT-PROFILE.PERSONAL-DATA.TITLE',
      view: 'personal-data'
    },
    {
      name: 'ONESAIT-PROFILE.FISCAL.TITLE',
      view: 'fiscal-info'
    }
  ]
};


