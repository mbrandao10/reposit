export class Currency {
    id: string;
    code: string;
}
export class MoneyCurrency {
    currency: Currency;
    string: string;
}

export class Money {
    amount: number;
    currency: MoneyCurrency;
}
