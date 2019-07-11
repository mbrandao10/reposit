import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHelperService, AppConfigService, HeaderService, CustomersService } from 'onesait-core';
import { EquitiesService, EquitiesList, EquListByEquities, InversisManager } from 'itecban-common';

@Component({
    selector: 'app-equities-page',
    templateUrl: './equities-page.component.html'
  })

  export class EquitiesPageComponent extends InversisManager implements OnInit {

  loading: boolean;
  idAccount: string;
  accountEquitiesList: EquitiesList [];
  listByEquities: EquListByEquities [] = []; // en esta lista creamos un item por cada fondo
  item: EquListByEquities;
  view: string;
  accountForm: string;
  totalValue = { amount: 0, currency: { id: '', code: '' }};
  accountFormatView: string;

  constructor(
      protected routerHelperService: RouterHelperService,
      appConfigService: AppConfigService,
      private equitiesService: EquitiesService,
      private headerService: HeaderService,
      protected router: Router,
      protected customerService: CustomersService
      ) {
        super(customerService);
        this.view = appConfigService.getConfig().products.defaultView;
        this.accountFormatView = appConfigService.getConfig().account.viewKey;
      }

    ngOnInit() {
      this.headerService.setTitle('HEADER.TITLE.EQUITIES');
      this.getEquities();
    }
    getEquities() {
      this.loading = true;
      this.equitiesService.getEquities().subscribe(results => {
        this.totalValue.amount = 0;
        this.accountEquitiesList = results.data;
        // this.accountEquitiesList.forEach(accountEquities => {
        //   this.item = {};
        //   this.item.accountEquityId = accountEquities.accountEquityId;
        //   this.item.formats = accountEquities.formats;
        //   if (accountEquities.totalValue &&  accountEquities.totalValue.amount) {
        //   this.totalValue.amount = this.totalValue.amount + accountEquities.totalValue.amount;
        //   } else {
        //     this.item.empty = true;
        //   }
        //   this.listByEquities.push(this.item);


          /* if (accountEquities.equities) {
            accountEquities.equities.forEach(element => {
              this.item.equity = element;
              this.totalValue.amount = this.totalValue.amount + element.totalValue.amount;
              this.totalValue.currency = element.totalValue.currency;
            });
          } else {
            this.item.empty = true;
          }*/
        // });

        this.accountEquitiesList.forEach(element => {
              this.totalValue.amount = this.totalValue.amount + element.totalValue.amount;
              this.totalValue.currency = element.totalValue.currency;
        });
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }

    addEquities() {
      let link = [RouterHelperService.getPathFromId('equity-add-page')];
      this.router.navigate(link);
    }

    viewEquity(equity) {
      if (equity.accountEquityId) {
        let link = [RouterHelperService.getPathFromId('equity-page', {id: equity.accountEquityId/*, equityId: equity.equity.id*/})];
        this.router.navigate(link);
      }
    }

    operateInversis() {
      this.callInversis('Inversis', null, null);
    }

  }
