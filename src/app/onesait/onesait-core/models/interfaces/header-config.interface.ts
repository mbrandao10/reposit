export interface HeaderConfig {
    userInitials: string;
    mySpaceUrl: string;
    sections?: HeaderSectionsConfig[];
}

export interface HeaderSectionsConfig {
    name: string;
    operations: {
        name: string;
        action?: string;
        routeId?: string;
        hidden?: string;
    };
}


