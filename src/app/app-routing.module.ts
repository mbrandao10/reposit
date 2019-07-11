import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent, FirstAccessComponent, ErrorLoginPageComponent, Error500PageComponent, InProgressPageComponent } from 'itecban-common';
import { RouteExtended, RouterHelperService } from 'onesait-core';
import { PasswordExpiredPageComponent } from 'itecban-persons';


const routes: RouteExtended[] = [
    {
        id: 'default-page',
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        id: 'login-page',
        path: 'login',
        component: LoginComponent
    },
    {
        id: 'first-access-page',
        path: 'first-access',
        component: FirstAccessComponent
    },
     {
        id: 'password-expired-page',
        path: 'password-expired',
        component: PasswordExpiredPageComponent,
    },
    {
        id: 'error-login-page',
        path: 'errorLogin',
        component: ErrorLoginPageComponent
    },
    {
        id: 'error-500-page',
        path: 'error500',
        component: Error500PageComponent

    },
    {
        id: 'in-progress-page',
        path: 'in-progress',
        component: InProgressPageComponent
    }
];

RouterHelperService.register(routes);


@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
