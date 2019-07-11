export class OptionList {
    id: string;
    name: string;
}

export class BankData {
    id: string;
    name: string;
}

export class Holders {
    type: TypeHolder;
    userId: string;
    userName: string;
}

export class TypeHolder {
    id: string;
    name: string;
    href: string;
}
