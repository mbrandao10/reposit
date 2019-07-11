import { LiteralFormats } from '../../pipes/format-literal.pipe';

export class HeaderTitle {
    level1: string | HeaderTitleElement | HeaderTitleArray;
    level2?: string | HeaderTitleElement | HeaderTitleArray;
    level3?: string | HeaderTitleElement | HeaderTitleArray;
}

export class HeaderTitleArray {
    selectedTitle: string;
    elements: HeaderTitleElement[];
    selectedId?: string;
    fmt?: LiteralFormats;

}
export class HeaderTitleElement {
    title: string;
    routeId?: string;
    routeParams?: any;
    routeCardId?: any;
    fmt?: LiteralFormats;
}
