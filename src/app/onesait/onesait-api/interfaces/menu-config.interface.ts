export interface MenuConfig {
    homeRoute: string;
    elements: MenuConfigElement[];
    errorPage: string;
    version?: string;
}

export interface MenuConfigElement {
    name: string;
    routeId?: string;
    icon?: string;
    counter?: number;
    available?: boolean;
    children?: MenuConfigElement[];
    hidden?: string;
    active?: boolean;
    showChildren?: boolean;
}
