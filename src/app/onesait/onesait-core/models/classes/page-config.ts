import { InputValidatorOptions } from '../../components/input-validator/input-validator.component';
import { LiteralFormats } from '../../pipes/format-literal.pipe';

export class PagesConfiguration {
    [propName: string]: PageConfiguration
}

export class PageConfiguration {
    tabs?: TabElement[];
    searchConfig?: SearchConfigElement[];
}

export class TabElement {
    name: string;
    view: string;
    class?: string;
    hidden?: [string];
}

export enum SEARCH_CONFIG_TYPE {
    DATE,
    NUMBER,
    TEXT,
    SELECT,
    MONTH,
    EMPTY,
    TABLE,
    AMOUNT
}

export class SearchConfig {
    buttonFloatRight?: boolean;
    buttonText?: string;
    buttonDivClass?: string;
    mobileText?: string;
    mobileSearcherTitle?: string;
    formsControl:  SearchConfigElement[];
    formatsControl: any[];
    labelsContainerClass?: string;
    labelsTop?: SearchConfigLabel[];
}

/**
 * selectText: Campo que se utilizara de los elementos para mostrar en el select
 * selectChange: Campo que permite crear un select con la propiedad (ngModelChange) habilitada. SOLO se puede usar en UN select si se definen varios.
 * elements: Elementos para el tipo select
 */
export class SearchConfigElement {
    type: SEARCH_CONFIG_TYPE;
    labelTop?: string;
    label?: string;
    labelClass?: string;
    labelDiv?: string;
    labelDivClass?: string;
    class?: string;
    formControlName: string;
    elements?: any[];
    selectText?: string;
    selectValue?: string;
    selectChange?: boolean;
    selectPlaceHolder?: string;
    minDate?: Date;
    maxDate?: Date;
    opts?: InputValidatorOptions;
    config?: any;
    placeholder?: string;
    hide?: boolean;
    fmt?: LiteralFormats;
    textToImport?: boolean;
    currencySymbol?: string;
}

export class SearchConfigLabel {
    text: string;
    class?: string;
}




