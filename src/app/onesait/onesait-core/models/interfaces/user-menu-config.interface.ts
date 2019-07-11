export interface UserMenuConfig {
    sections: UserMenuSection[];
    buttons?: UserMenuButton [];
}

export interface UserMenuSection {
    name: string;
    routeId: string;
    icon: string;
    counter?: number;
    action?: string;
    counterMethod?: string;
    active?: boolean;
}

export interface UserMenuButton {
    name: string;
    routeId: string;
    icon: string;
    action: Function;
    active?: boolean;
}
