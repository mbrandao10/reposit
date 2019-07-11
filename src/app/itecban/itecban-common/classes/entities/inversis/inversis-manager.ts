import { CustomersService } from 'onesait-core';
import { GenericResponse, externalSignOut } from 'onesait-api';

export class InversisManager {

   loading: boolean;

   constructor(private customerServices: CustomersService) {}

   callInversis(externalSistemId: string, externalUserId: string, externalPassword: string) {
      this.loading = true;
    this.customerServices.getInversisSingleSignOn(externalSistemId, externalUserId, externalPassword).subscribe( (result: GenericResponse<externalSignOut>) => {

        this.composeInversisSingleSignOn(result.data.url, result.data.accessToken);

      }).add(() => this.loading = false);
   }

    private composeInversisSingleSignOn(urlOpen, accessToken): void {
      let url = urlOpen;
      let token = accessToken;
      let tipo = '2';
      let institucion = '2816317';
      let canal = 'I';
      let returnUrl = '';

      let form = document.createElement('form');

      form.setAttribute('method', 'post');
      form.setAttribute('action', url);
      form.setAttribute('target', 'newWindow');

      let field = document.createElement('input');
      field.setAttribute('type', 'hidden');
      field.setAttribute('name', 'tipo');
      field.setAttribute('value', tipo);

      form.appendChild(field);

      let field2 = document.createElement('input');
      field2.setAttribute('type', 'hidden');
      field2.setAttribute('name', 'token');
      field2.setAttribute('value', token);

      form.appendChild(field2);

      let field3 = document.createElement('input');
      field3.setAttribute('type', 'hidden');
      field3.setAttribute('name', 'institucion');
      field3.setAttribute('value', institucion);

      form.appendChild(field3);

      let field4 = document.createElement('input');
      field4.setAttribute('type', 'hidden');
      field4.setAttribute('name', 'canal');
      field4.setAttribute('value', canal);

      form.appendChild(field4);

      let field5 = document.createElement('input');

      field5.setAttribute('type', 'hidden');
      field5.setAttribute('name', 'returnUrl');
      field5.setAttribute('value', returnUrl);

      form.appendChild(field5);

      document.body.appendChild(form);

      let navegador = navigator.appName;

      if (navegador !== 'Microsoft Internet Explorer') {
         window.open('', 'newWindow');
      }
      form.submit();
   }
}
