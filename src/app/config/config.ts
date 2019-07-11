export const config = {

    BASIC_HEADER_AUTHORIZATION:  'Basic YmFua2luZ19jbGllbnQ6c2VjcmV0MQ==',
    CHANNEL_KEY: 'B',
    APPLICATION_ID: 'BE',
    version: '0.1.27',

    grid: {
        sizes: {
            xs: 480,
            sm: 768,
            md: 1024,
            lg: 1920
        }
    },

    /****************************
     * Perfiles disponibles
     *     01 - Visualizador
     *     02 - Apoderado
     ****************************/
    menuConfig: {
        homeRoute: '/onesait/i/global-position',
        errorPage: '/in-progress',
        elements: [
            {
                routeId: 'global-position-page', name: 'MENU.GLOBAL.POSITION', icon: 'icon-global-position', counter: null, available: true,
                // hidden: ['01']
            },
            {
                routeId: 'accounts-page', name: 'MENU.ACCOUNTS', icon: 'icon-accounts', counter: null, available: true,
                // hidden: ['01']
            },
            {
                routeId: 'transfers-page', name: 'MENU.TRANSFER', icon: 'icon-transfers', counter: null, available: true,
                // hidden: ['02']
            },
            {
                name: 'MENU.PAYMENTS', icon: 'icon-payments', counter: null, available: true,
                // hidden: ['01']
                children: [
                    {
                        routeId: 'sepa-page', name: 'MENU.PAYMENTS_REMITTANCE', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'directdebits-page', name: 'MENU.PAYMENTS_DEBTS', available: true,
                        // hidden: ['01']
                    }
                ]
            },
            {
                routeId: 'cards-page', name: 'MENU.CARDS', icon: 'icon-cards', counter: null, available: true,
                // hidden: ['01']
            },
            {
                routeId: 'taxes-page', name: 'MENU.TAXES', icon: 'icon-taxes', counter: null, available: true,
               // hidden: ['01']
            },
            {
                name: 'MENU.FINANCING', icon: 'icon-financing', counter: null, available: true,
                // hidden: ['01']
                children: [
                    {
                        routeId: 'confirming-page', name: 'MENU.CONFIRMING', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'confirming-provider-page', name: 'ONESAIT-CONFIRMING-SUPPLIER.VIEW', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'factoring-page', name: 'MENU.FACTORING', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'leasing-page', name: 'MENU.LEASING', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'express-bill-page', name: 'MENU.EXPRESSBILL', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'loans-page', name: 'MENU.LOANS', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'credits-page', name: 'MENU.CREDITS', available: true,
                        // hidden: ['01']
                    }
                ]
            },
            {
                name: 'MENU.INVEST', icon: 'icon-loans', counter: null, available: true,
                // hidden: ['01']
                children: [
                    {
                        routeId: 'deposits-page', name: 'MENU.DEPOSITS', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'funds-page', name: 'MENU.FUNDS', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'equities-page', name: 'MENU.EQUITIES', available: true,
                        // hidden: ['01']
                    },
                    {
                        routeId: 'currency-exchange-page', name: 'MENU.CURRENCYEXCHANGE', available: true,
                        // hidden: ['01']
                    }
                ]
            }
        ]
    },

    userMenuConfig: {
        buttons: [
            { name: 'ITECBAN-HELP.TITLE', routeId: 'help-page', icon: 'icon-help', action: 'goTo' },
            // { name: 'USER.MENU.CONFIGURATION', routeId: 'persons-config-page', icon: 'icon-settings', action: 'goTo' },
            {name: 'USER.MENU.CONFIGURATION', routeId: 'settings-page', icon: 'icon-settings', action: 'goTo'},
            { name: 'USER.MENU.CLOSE.SESION', icon: 'icon-exit', action: 'logout' }

        ],
        sections: [
            {name: 'USER.MENU.SIGNATURES', routeId: 'my-space-page-tab:pending-signatures', icon: 'icon-firms',  counterMethod: 'getFirmCounter'},
           // {name: 'USER.MENU.MESSAGES', routeId: 'my-space-page-tab:mailbox', icon: 'icon-mailbox',  counterMethod: 'getMailboxCounter'},
            {name: 'USER.MENU.DOCUMENTS', routeId: 'my-space-page-tab:documentbox', icon: 'icon-documents',  counterMethod: 'getDocumentCounter'}
        ]
    },

    headerConfig: {
        // mySpaceUrl: 'my-space-page-tab:personal-data',
        mySpaceUrl: 'profile-main-page',
        sections: [
            {
                name: 'HEADER.CONTRACT.TEXT',
                icon: 'icon-contract',
                operations: [
                    { name: 'HEADER.CONTRACT.NEW-ACCOUNT', routeId: 'account-add-page'},
                    { name: 'HEADER.CONTRACT.NEW-FUND', routeId: 'funds-add-page' },
                    { name: 'HEADER.CONTRACT.NEW-EQUITY', routeId: 'equity-add-page'},
                    { name: 'HEADER.CONTRACT.NEW-LOAN', routeId: 'loan-add-page'}
                    // { name: 'HEADER.CONTRACT.OPERATION3', hidden: ['0000583850'] }
                ],
                hidden: ['01']
            },
            {
                name: 'HEADER.OPERATION.TEXT',
                icon: 'icon-operate',
                operations: [
                    // { name: 'HEADER.OPERATION.TRANSFER', hidden: ['0000583850'] },
                    { name: 'HEADER.OPERATION.TRANSFER-DOM', routeId: 'transfers-page' },
                    { name: 'HEADER.OPERATION.FILE', routeId: 'sepa-page' },
                    { name: 'HEADER.OPERATION.TRANSFER', routeId: 'transfers-page' },
                    // { name: 'HEADER.OPERATION.OPERATION3' },
                    // { name: 'HEADER.OPERATION.OPERATION4' },
                    // { name: 'HEADER.OPERATION.OPERATION5' }
                ]
            }
        ]
    },

    signature: {
        // responseErrorCode: 'API-S-001',
        // Habilitamos el error 096H, necesario para pruebas UAT
        responseErrorCode: '096H',
        securityCard: {
            length: 2
        }
    },

    telephoneContact: '0810-777-9262',

    infoHeader: {
        timeVisible: 5000
    },

    // PAGINAS DISPONIBLES
    pagesAvailable: {
        buyingCurrency: { available: false, message: 'ITECBAN-IN-PROGRESS.TEXT1' },
    },

    // LOGIN
    userCodeWarning: {
        passwordExpiresSoon: '079I'
    },

    login: {
        rememberPwd: {
            docType: '01'
        }
    },

    products: {
        defaultView: '978'
    },

    // Usamos esta configuracion para indicar en que formato se quiere visualizar las cuentas. Afecta a toda la app
    account: {
        formats: ['IBAN', 'CCC', 'CBU'],
        viewKey: 'IBAN'
    },

    // MAILBOX & DOCUMENTS
    maxNumberOfDocumentsAttached: 2,
    maxNumberOfMessages: 15,
    /*documentType: [
        {
            id: '040000',
            name: 'Contracts'
        }],
    */

    documentType: [
        {
            id: '040000',
            name: 'ContractAccount'
        },
        {
            id: '040017',
            name: 'ContractCard'
        },
        {
            id: '040002',
            name: 'ContractDeposit'
        },
        {
            id: '040011',
            name: 'ContractLoan'
        }
    ],

    documentProductParam: {
        account: 'accountId',
        card: 'cardId'
    },

    reportMovementType: '06',

    // LOANS
    loanTypes: {
        PRP01: 'PRP01',
        PRP02: 'PRP02'
    },

    loans: {
        maxLoansAmount: 80000,
        terms: [12, 24, 36]
    },
    loanTypeAmortize: '2', // Defect: amortize type Import
    loanMinAmountAmortize: 1, // Defect: min amortize limit amount
    loanMaxAmountAmortize: 1500, // Defect: max amortize limit amount

    // TRANSFER
    transfers: {
        defaultCurrency: {
            name: 'EUR',
            id: '978'
        },
        types: {
            NOW: 'S',
            DELAYERD: 'D',
            PERIODIC: 'P'
        },
        form: {
            conceptSelected: '06',
            orderAccountsCurrencyCodes: ['032', '840'],
            delayedFrequency: '9999'
        },
        /*amountExceded: {
            '032': 500000,
            '840': 3000
        }*/
    },

    // TRANSLATE
    codesTranslate: {
        alerts: 'ALERT.CODE.'
    },

    // DEBITCARDS
    cardsTypes: {
        debit: 'D', // Tarjetas débito
        credit: 'C' // Tarjetas crédito
    },

    // IDE DE TARJETAS
    cardsValues: {
        debit: [{
            id: 10,
            name: 'Electron'
        }],
        credit: [{
            id: 20,
            name: 'Oro'
        },
        {
            id: 30,
            name: 'Clásica'
        },
        {
            id: 40,
            name: 'ViaT'
        }]
    },

    cardTypedPay: {
        debit: [
            {id: '01', name: 'Inmediato'}
        ],
        credit: [
            {id: '01', name: 'Contado'},
            {id: '02', name: 'Aplazado'},
            {id: '01', name: 'Fijo Mensual'},

        ]
    },

    // TIPO DE IDENTIFICACIONES DE USUARIO
    identificationTypes: [
        { id: '00', name: 'NIF' },
        { id: '01', name: 'CIF' },
        { id: '06', name: 'NIE' },
        { id: '07', name: 'PASAPORTE' },
        { id: '09', name: 'CIF EXTRJ' },
        { id: '10', name: 'CIF EXTRJ. NR.' }
    ],

    debitCardStatus: {
        duplicate: '003', // CON SOLICITUD DE DUPLICADO
        inactive: '006', // PENDIENTE DE ACTIVAR
        activate: '007', // ACTIVA
        inactiveRenew: '008', // PENDIENTE ACTIVAR RENOVADA
        lock: '009' // CANCELADA
    },

    debitCardsTypes: {
        masterDebit: '525653',
        masterDebitWorldElite: '557717'
    },

    creditCardsTypes: {
        worldMasterCard: '518080',
        goldMasterCard: '518011',
        worldEliteMasterCard: '533434',
    },

    // CURRENCYS
    defaultCurrency: '978',

    currencyCodes: {
        euros: '978',
        pesos: '032',
        dolares: '840'
    },
    currencies: [
        {
            id: 'EUROS',
            ISOCode: 'EUR',
            code: '978',
            sign: '€',
            position: 'right'
        },
        {
            id: 'PESOS',
            ISOCode: 'ARS',
            code: '032',
            sign: '$',
            position: 'right'
        },
        {
            id: 'DÓLARES',
            ISOCode: 'USD',
            code: '840',
            sign: 'USD',
            position: 'right'
        },
        {
            id: 'ZłOTY',
            ISOCode: 'PLN',
            code: '985',
            sign: 'zł',
            position: 'right'
        },
        {
            id: 'KWACHA ZAMBIANO',
            ISOCode: 'ZMW',
            code: '967',
            sign: '',
            position: 'right'
        },
        {
            id: 'LIBRA ESTERLINA',
            ISOCode: 'GBP',
            code: '826',
            sign: '£',
            position: 'right'
        },
        {
            id: 'FRANCO SUIZO',
            ISOCode: 'CHF',
            code: '756',
            sign: 'Fr',
            position: 'right'
        },
        {
            id: 'CORONA SUECA',
            ISOCode: 'SEK',
            code: '752',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'RAND',
            ISOCode: 'ZAR',
            code: '710',
            sign: 'R',
            position: 'right'
        },
        {
            id: 'DÓLAR DE SINGAPUR',
            ISOCode: 'SGD',
            code: '702',
            sign: 'S$',
            position: 'right'
        },
        {
            id: 'CORONA NORUEGA',
            ISOCode: 'NOK',
            code: '578',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'DOLAR NEOZELANDES',
            ISOCode: 'NZD',
            code: '554',
            sign: 'NZ$',
            position: 'right'
        },
        {
            id: 'PESO MEXICANO',
            ISOCode: 'MXN',
            code: '484',
            sign: '$',
            position: 'right'
        },
        {
            id: 'YEN',
            ISOCode: 'JPY',
            code: '392',
            sign: '¥',
            position: 'rigth'
        },
        {
            id: 'RUPIA INDONESIA',
            ISOCode: 'IDR',
            code: '360',
            sign: 'Rp',
            position: 'rigth'
        },
        {
            id: 'DÓLAR DE HONG KONG',
            ISOCode: 'HKD',
            code: '344',
            sign: 'HK$',
            position: 'right'
        },
        {
            id: 'CORONA DANESA',
            ISOCode: 'DKK',
            code: '208',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'PESO CHILENO',
            ISOCode: 'CLP',
            code: '152',
            sign: '$',
            position: 'right'
        },
        {
            id: 'DÓLAR CANADIENSE',
            ISOCode: 'CAD',
            code: '124',
            sign: 'C$',
            position: 'right'
        },
        {
            id: 'DÓLAR AUSTRALIANO',
            ISOCode: 'AUD',
            code: '036',
            sign: 'A$',
            position: 'right'
        },
        {
            id: 'PESO COLOMBIANO',
            ISOCode: 'COP',
            code: '170',
            sign: '$',
            position: 'right'
        }],

    currenciesExchange: [
        {
            id: '',
            ISOCode: '',
            code: '',
            sign: '',
            position: ''
        },
        {
            id: 'CORONA CHECA',
            ISOCode: 'CZK',
            code: '203',
            sign: 'Kč',
            position: 'right'
        },
        {
            id: 'CORONA DANESA',
            ISOCode: 'DKK',
            code: '208',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'CORONA SUECA',
            ISOCode: 'SEK',
            code: '752',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'CORONA NORUEGA',
            ISOCode: 'NOK',
            code: '578',
            sign: 'kr',
            position: 'right'
        },
        {
            id: 'DIRHAM MARROQUÍ',
            ISOCode: 'MAD',
            code: '504',
            sign: 'MAD',
            position: 'right'
        },
        {
            id: 'DÓLAR AUSTRALIANO',
            ISOCode: 'AUD',
            code: '036',
            sign: 'A$',
            position: 'right'
        },
        {
            id: 'DÓLAR CANADIENSE',
            ISOCode: 'CAD',
            code: '124',
            sign: 'C$',
            position: 'right'
        },
        {
            id: 'DÓLAR USA',
            ISOCode: 'USD',
            code: '840',
            sign: 'USD',
            position: 'right'
        },
        {
            id: 'FRANCO SUIZO',
            ISOCode: 'CHF',
            code: '756',
            sign: 'Fr',
            position: 'right'
        },
        {
            id: 'LIBRA ESTERLINA',
            ISOCode: 'GBP',
            code: '826',
            sign: '£',
            position: 'right'
        },
        {
            id: 'YEN',
            ISOCode: 'JPY',
            code: '392',
            sign: '¥',
            position: 'rigth'
        }],

    exchangeType: [
    {
        id: '',
        name: ''
    }, {
        id: 'D',
        name: 'Divisa'
    }, {
        id: 'B',
        name: 'Billetes'
    }],

    // ALERTS
    eventGroupTypes: { // eventGroup de events, y productType de
        account: 'account',
        card: 'card',
        deposit: 'deposit',
        loan: 'loan',
        person: 'person'
    },

    // DIRECT DEBITS
    descriptionsContract: [
        { name: 'Agua' },
        { name: 'Gas' },
        { name: 'Telefonía' }],

    typeIssuerLegalDocumentDefect: '01',
    typeContractHolderLegalDocumentDefect: '01',

    // BANK CODE
    wanapBankCode: '384',
    cbuCode: 'CBU',
    transferOpertationType: {
        TRANSFERENCIA_NACIONAL: 'TRNE',
        TRASPASO: 'TRAE'
    },
    destinyAccountType: {
        WALAN: 'WALAN',
        ALIAS: 'Alias',
        CBU: 'CBU'
    },
    maxTRanferAmount: 50000,
    bsDatepicker: {
        bsConfig: {
            dateInputFormat: 'DD/MM/YYYY',
            containerClass: 'theme-default',
            locale: 'es',
            adaptivePosition: true,
            invalidDate: '',
            
        }
    },

    // DEPOSITS
    // depositCode: "PFFD1"
    depositCodes: { // Codigo del deposito según el tipo de cuenta
        pesos: 'PFFP1',
        dolares: 'PFFD1'
    },


    // DEBIN
    debinStatusCode: {
        pendingSeller: '10', // iniciado
        accredited: '14', // acreditado
        pendingBuyer: '50', // pendiente autorización
        authorized: '55', // autorizado
        debit: '58', // adeudado
        rejected: '60', // rechazado
        cancelado: '66' // cancelled
    },

    debinRangeDaysSearch: 90,

    // tslint:disable-next-line:eofline

    // PERSONAL DATA
    phonePrefixesDefault: { id: '0054', name: 'ARGENTINA' },

    // PERSONAL DATA - DOCUMENTS
    personalDataDocuments: {
        formFatcaCrs: 'e7d49543-91c6-4db3-b801-ee41dc345b8d',
        declarOrigenFondos: '980693cf-1558-4b5d-83cb-3be6919149dd',
        formPep: '2e2511fd-0138-4937-91ec-fe69520e3b9a',
        formSujetoObligado: 'd4f3bed1-52be-4832-9f32-ff3a9e630370'
    },

    // FORMULARIO
    cardDocuments: {
        formDesconocimientoGasto: '3592b47b-c930-4a4e-a1bd-cc03db4b842c',
    },

    economicRegimeAssociated: [
        {
            id: '02',
            name: 'CASADO/A'
        }],

    // MY SPACE
    // Número  de años a mostrar en la pestaña de información fiscal
    numYears: {
        years: 4
    }

};
