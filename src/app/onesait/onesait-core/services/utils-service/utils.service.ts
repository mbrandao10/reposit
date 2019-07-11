import { Injectable } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../../config/constants';
import { AppConfigService } from '../app-config-service/app-config.service';

import { CurrencyPipe } from '../../pipes/currency.pipe';

import * as _moment from 'moment';
const moment = _moment;
import * as _ from 'underscore';
import { Json2PdfFieldDefinition } from '../../models/interfaces/Json2PdfFieldDefinition';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountElement } from 'onesait-api';
import { Router } from '@angular/router';
import { RouterHelperService } from '../router-helper-service/router-helper.service';
import { AbstractControl, FormGroup, FormArray, FormControl } from '@angular/forms';

@Injectable()
export class UtilsService {

  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected translate: TranslateService,
    private appConfigService: AppConfigService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private numerPipe: DecimalPipe,
    private router: Router
  ) { }

  dateToRFC3339(date: Date) {
    if (date) {
      return moment(date).format('YYYY-MM-DD');
    }
    return null;

    // let dateReturn;
    // console.log('222', date);
    // if (date) {
    //   dateReturn = moment(date).format('YYYY-MM-DD');
    //   console.log('333', date);
    //   if (dateReturn === 'Invalid date') {
    //     return date;
    //   } else {
    //     return dateReturn;
    //   }

    // }
    // return null;
  }

  replaceAccentMark(cadena: string) {
    if (cadena) {
      cadena = cadena.replace(/á/g, 'a');
      cadena = cadena.replace(/é/g, 'e');
      cadena = cadena.replace(/í/g, 'i');
      cadena = cadena.replace(/ó/g, 'o');
      cadena = cadena.replace(/ú/g, 'u');
      cadena = cadena.replace(/Á/g, 'A');
      cadena = cadena.replace(/É/g, 'E');
      cadena = cadena.replace(/Í/g, 'I');
      cadena = cadena.replace(/Ó/g, 'O');
      cadena = cadena.replace(/Ú/g, 'U');
    }

    return cadena;
  }

  setItemSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getItemSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  removeItemSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    let removeKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      removeKeys.push(sessionStorage.key(i));
    }
    removeKeys.forEach((key: string) => {
      sessionStorage.removeItem(key);
    });
  }

  setItemLocalStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, value);
    } catch (e) { }
  }

  getItemLocalStorage(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (e) { }
  }

  removeItemLocalStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) { }
  }

  clearLocalStorage() {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        localStorage.removeItem(localStorage.key(i));
      }
    } catch (e) { }
  }

  public getIsLogged(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

  public setIsLogged(logged: boolean) {
    this._isLogged.next(logged);
  }


  getUser() {
    let user: any = sessionStorage.getItem(constants.USER);
    return JSON.parse(user);
  }

  getInitialsUser() {
    let userInitials = '';
    let userSession: any = sessionStorage.getItem(constants.USER);
    let user: any = JSON.parse(userSession);
    if (user) {
      userInitials += (user.userName) ? user.userName.substr(0, 1) : '';
      userInitials += (user.userFirstSurname) ? user.userFirstSurname.substr(0, 1) : '';
    }
    return userInitials;
  }


  changeLanguage(lang: string) {
    moment.locale(lang);
    this.translate.use(lang);
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  getCurrency(code: any) {

    const currencySelected = this.getCurrencyObj(code);

    return (currencySelected) ? currencySelected.sign : '';
  }

  getCurrencyObj(code: any) {
    const arrCurrency = this.appConfigService.getConfig('currencies'); // Array con las monedas
    const currencySelected = _.find(arrCurrency, function (elem: any) {

      return (elem.code === code) ? elem : null;
    });

    return currencySelected;
  }

  printHtml(elementId) {
    let element: any = document.getElementById(elementId);
    if (element) {
      let newstr = element.innerHTML;
      if (newstr) {
        let iframe = document.createElement('iframe');
        iframe.id = 'printf';
        iframe.name = 'printf';
        document.body.appendChild(iframe);
        let mywindow = window.frames['printf'];
        mywindow.document.write('<html><head><title></title>' +
          '<link rel="stylesheet" href="styles/styles.css"/>' +
          '</head><body><div>' +
          newstr +
          '</div></body></html>');

        setTimeout(function () {
          mywindow.print();
          iframe.remove();
        },
          500);

      }

    }

  }

  getTablePDF(arrayObject: any, fieldDef: Json2PdfFieldDefinition[]) {
    const keys2trans: string[] = [],
      columns: any[] = [],
      rows: any[] = [];

    for (const def of fieldDef) {
      keys2trans.push(def.fieldTranslateKey);
    }

    let res = this.translate.instant(keys2trans);


    // ponemos las cabezeras
    for (const tDef of fieldDef) {
      columns.push(res[tDef.fieldTranslateKey]);
    }

    for (const obj of arrayObject) {
      const line: any = [];

      for (const tDef of fieldDef) {
        const value = this.extractFielFromObject(obj, tDef.field);
        line.push(this.formatField(value, tDef));
      }

      rows.push(line);
    }

    let doc: any = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    return doc;
  }

  downloadJsonListToPdf(arrayObject: any,
    fieldDef: Json2PdfFieldDefinition[],
    filename: string): void {

    let doc: any = this.getTablePDF(arrayObject, fieldDef);
    doc.save(filename + '.pdf');
  }

  printJsonListToPdf(arrayObject: any,
    fieldDef: Json2PdfFieldDefinition[]): void {

    let doc: any = this.getTablePDF(arrayObject, fieldDef);
    doc.autoPrint();
    let string = doc.output('datauristring');
    let iframe = '<iframe width="100%" height="100%" src="' + string + '"></iframe>';
    let x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();

  }

  getJsonForPdf(dataObject: any, fieldDef: Json2PdfFieldDefinition[], tittle: string) {
    const keys2trans: string[] = [],
      rows: any = {};

    for (const def of fieldDef) {
      keys2trans.push(def.fieldTranslateKey);
    }

    if (tittle) {
      rows['_template.title_'] = this.translate.instant(tittle);
    }

    let res = this.translate.instant(keys2trans);
    for (const tDef of fieldDef) {
      const value = this.extractFielFromObject(dataObject, tDef.field);
      rows[res[tDef.fieldTranslateKey]] = this.formatField(value, tDef);
    }
    return JSON.stringify(rows);
  }

  getJsonToPdf(dataObject: any,
    fieldDef: Json2PdfFieldDefinition[]) {
    const keys2trans: string[] = [],
      columns: any[] = ['clave', 'valor'],
      rows: any[] = [];

    for (const def of fieldDef) {
      keys2trans.push(def.fieldTranslateKey);
    }

    let res = this.translate.instant(keys2trans);

    for (const tDef of fieldDef) {
      const value = this.extractFielFromObject(dataObject, tDef.field);
      rows.push([res[tDef.fieldTranslateKey], this.formatField(value, tDef)]);
    }

    const doc: any = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, { showHeader: 'never' });
    return doc;
  }

  downloadJsonToPdf(dataObject: any,
    fieldDef: Json2PdfFieldDefinition[],
    filename: string): void {
    let doc = this.getJsonToPdf(dataObject, fieldDef);
    doc.save(filename + '.pdf');
  }

  formatField(value, fieldDef: Json2PdfFieldDefinition): string {
    let result = '';
    const arrCurrencies = this.appConfigService.getConfig('currencies');

    switch (fieldDef.fieldType.type) {
      case 'string':
        result = value;
        break;
      case 'number':
        result = this.numerPipe.transform(value, '2.2-2');
        break;
      case 'date':
        result = this.datePipe.transform(value, 'dd/MM/yyyy');
        break;
      case 'amount':
        result = this.currencyPipe.transform(value);
        break;
      case 'currency':

        if (fieldDef.fieldType.currencyCode) {
          for (let i = 0; i < arrCurrencies.length; i++) {
            if (arrCurrencies[i].code === fieldDef.fieldType.currencyCode) {
              result = this.currencyPipe.transform(value) + ' ' + arrCurrencies[i].ISOCode;
            } else {
              result = this.currencyPipe.transform(value, fieldDef.fieldType.currencyCode);
            }
            break;
          }
        } else {
          result = this.numerPipe.transform(value, '2.2-2');
        }
        break;
      case 'currencyOnly':
        for (let i = 0; i < arrCurrencies.length; i++) {
          if (arrCurrencies[i].code === value) {
            result = arrCurrencies[i].ISOCode;
          }
          break;
        }
        break;
    }
    return result;
  }

  extractFielFromObject(obj: object, key: string | Array<string>): any {
    let result;

    if (obj) {
      const [firstKey, ...path] = (key instanceof Array) ? key : key.split('.');

      result = obj[firstKey];

      if (path.length > 0) {

        return this.extractFielFromObject(obj[firstKey], path);
      }
    }

    return (result);
  }

  downloadJsonTo2Csv(arrayObject: any,
    fieldDef: Json2PdfFieldDefinition[],
    filename: string): void {
    const keys2trans: string[] = [];

    for (const def of fieldDef) {
      keys2trans.push(def.fieldTranslateKey);
    }

    this.translate.get(keys2trans)
      .subscribe((res: string) => {
        console.log(res);

        // ponemos las cabezeras
        let str = '';
        for (const tDef of fieldDef) {
          str += res[tDef.fieldTranslateKey] + ';';
        }
        str = str.slice(0, -1);
        str += '\r';

        for (const obj of arrayObject) {
          const line: any = [];

          for (const tDef of fieldDef) {
            let value = this.extractFielFromObject(obj, tDef.field);
            value = this.formatField(value, tDef);
            line.push(value);
          }

          str += line.join(';');
          str += '\r';
        }

        const blob = new Blob(['\ufeff', str], { type: 'text/csv' });

        if (window.navigator && window.navigator.msSaveBlob) { // IE
          window.navigator.msSaveOrOpenBlob(blob, filename + '.csv');
          return;
        }
        const blobURL = window.URL.createObjectURL(blob);
        const a: any = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = blobURL;
        a.download = filename + '.csv';
        a.click();

        window.URL.revokeObjectURL(blobURL);
      });
  }

  downloadBlob(fileBlob: Blob, filename: string) {
    let blob = new Blob([fileBlob], { type: 'application/octet-stream' });
    let url = window.URL.createObjectURL(blob);
    let extension = 'pdf';
    if (filename.indexOf('.') > 0) {
      extension = filename.substring(filename.indexOf('.') + 1, filename.length);
      filename = filename.substring(0, filename.indexOf('.'));
    }
    if (window.navigator && window.navigator.msSaveBlob) { // IE
      window.navigator.msSaveOrOpenBlob(blob, filename + '.' + extension);
      return;
    }

    let a: any = document.createElement('a');
    a.style = 'display: none';
    a.href = url;
    a.download = filename + '.' + extension;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  cloneObject(obj: any) {
    return Object.assign({}, obj);
  }

  cloneObjectAssign(obj: any) {
    return Object.assign({}, obj);
  }

  cloneObjectAssignArr(objArr: any) {
    let newArray = [];
    objArr.forEach(element => {
      newArray.push(Object.assign({}, element));
    });
    return newArray;
  }

  sendMailTo(subject?: string, body?: string, mail?: string | string[], cc?: string | string[]) {
    const a: any = document.createElement('a');
    document.body.appendChild(a);
    let mailTo = 'mailto:';
    if (mail) {
      if (mail instanceof Array) {
        mailTo += mail.join(';');
      } else {
        mailTo += mail;
      }
    }
    mailTo += '?';
    if (cc) {
      if (cc instanceof Array) {
        mailTo += '&cc=' + cc.join(';');
      } else {
        mailTo += '&cc=' + cc;
      }
    }
    if (subject) {
      mailTo += '&subject=' + subject;
    }
    if (body) {
      mailTo += '&body=' + body;
    }
    // let mailTo="mailto:test@example.com?subject=testing out mailto&body=Just testing&cc=test4@example.com;test2@example.com&bcc=test1@example.com";
    a.style = 'display: none';
    a.href = mailTo;
    a.click();
  }

  transformAccount(account: AccountElement, formats: any) {
    if (formats && account) {
      for (let format of formats) {
        format.format.id = (format.format.id).toUpperCase();
        account[format.format.id] = format.value;
      }
    }
  }

  validatorProfile(): boolean {
    let user = this.getItemSessionStorage('user');
    let perfilType = JSON.parse(user);
    let perfilId;
    if (perfilType.activeProfileObj.relationShip.id === '01') {
      perfilId = false;
    } else {
      perfilId = true;
    }
    return perfilId;
  }

  accesForbidden() {
    let link = [RouterHelperService.getPathFromId('global-position-page')];
    if (!this.validatorProfile()) {
      this.router.navigate(link);
    }
  }

  validateDNI(dni: string): boolean {
    let res: boolean;
    let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
    if (expresion_regular_dni.test(dni) === true) {
      let numero: any = dni.substr(0, dni.length - 1);
      let letr = dni.substr(dni.length - 1, 1);
      numero = numero % 23;
      let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero + 1);
      if (letra !== letr.toUpperCase()) {
        res = false;
      } else {
        res = true;
      }
    } else {
      res = false;
    }
    return res;
  }


  calcularIBAN(ccc, pais) {
    ccc = this.limpiar(ccc);
    pais = (pais === undefined ? 'es' : pais).toUpperCase();
    let cifras = ccc + this.valorCifras(pais) + '00';
    let resto = this.modulo(cifras, 97);
    return pais + this.cerosIzquierda(98 - resto, 2) + ccc;
  }

  limpiar(numero) {
    return numero
      .replace(/IBAN/g, '')
      .replace(/ /g, '')
      .replace(/-/g, '');
  }

  private valorCifras(cifras) {
    let LETRAS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // A=10, B=11, ... Z=35
    let items = [];
    for (let i = 0; i < cifras.length; i++) {
      let posicion = LETRAS.indexOf(cifras[i]);
      items.push(posicion < 0 ? '-' : posicion);
    }
    return items.join('');
  }

  private modulo(cifras, divisor) {
    /*
      El entero más grande en Javascript es 9.007.199.254.740.990 (2^53)
      que tiene 16 cifras, de las cuales las 15 últimas pueden tomar cualquier valor.
      El divisor y el resto tendrán 2 cifras. Por lo tanto CUENTA como tope
      puede ser de 13 cifras (15-2) y como mínimo de 1 cifra.
    */
    let CUENTA = 10;
    let largo = cifras.length;
    let resto = 0;
    for (let i = 0; i < largo; i += CUENTA) {
      let dividendo = resto + cifras.substr(i, CUENTA);
      resto = dividendo % divisor;
    }
    return resto;
  }

  private cerosIzquierda(cifras, largo) {
    cifras += '';
    while (cifras.length < largo) { cifras = '0' + cifras; }
    return cifras;
  }

  formatear(numero, separador) {
    numero = this.limpiar(numero);
    if (this.esIBAN(numero)) {
      return this.formatearIBAN(numero, separador);
    } else if (this.esCCC(numero)) {
      return this.formatearCCC(numero, separador);
    } else {
      return '';
    }
  }

  formatearIBAN(iban, separador?) {
    iban = this.limpiar(iban);
    if (separador === undefined) {
      separador = ' ';
    }
    let items = [];
    for (let i = 0; i < 6; i++) {
      items.push(iban.substr(i * 4, 4));
    }
    return items.join(separador);
  }

  formatearCCC(ccc, separador) {
    ccc = this.limpiar(ccc);
    if (separador === undefined) {
      separador = '-';
    }
    return ccc.substr(0, 4) + separador + ccc.substr(4, 4) + separador +
      ccc.substr(8, 2) + separador + ccc.substr(10, 10);
  }

  esCCC(cifras) {
    return cifras.length === 20;
  }

  esIBAN(cifras) {
    return cifras.length === 24;
  }

  /**
 * Deep clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
 * @param control AbstractControl
 * @returns AbstractControl
 */
  cloneAbstractControl<T extends AbstractControl>(control: T): T {
    let newControl: T;

    if (control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;

      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneAbstractControl(controls[key]));
      })

      newControl = formGroup as any;
    }
    else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);

      control.controls.forEach(formControl => formArray.push(this.cloneAbstractControl(formControl)))

      newControl = formArray as any;
    }
    else if (control instanceof FormControl) {
      newControl = new FormControl(control.value, control.validator, control.asyncValidator) as any;
    }
    else {
      throw new Error('Error: unexpected control value');
    }

    if (control.disabled) newControl.disable({ emitEvent: false });

    return newControl;
  }


}

