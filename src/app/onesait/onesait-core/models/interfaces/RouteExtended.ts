import { Route } from '@angular/router';

export interface RouteExtended extends Route {
    id: string;
    children?: RouteExtended[];
}
