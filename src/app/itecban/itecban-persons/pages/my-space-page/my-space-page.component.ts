import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService, RouterHelperService, CustomersService, PageConfiguration, AppConfigService } from 'onesait-core';
/*import { MailboxService } from 'itecban-common';
import { DocumentboxService } from 'itecban-common';*/

import * as _ from 'underscore';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-space-page',
  templateUrl: './my-space-page.component.html'
})
export class MySpacePageComponent implements OnInit, OnDestroy {

  token: any;
  userId: any;
  editEmail = false;
  userInitials: any = '';
  personalData: any;

  signatureCounter: number;
  mailboxCounter: number;
  documentboxCounter: number;
  view = 'mailbox';
  controllerView = '';
  productIdAlert: any;

  loading = false;

  protected paramsObservable: any;

  protected personalDataObservable: any = [];
  gendersTypes: any;
  maritalStatusTypes: any;
  economicRegimeTypes: any;
  fiscalRelationTypes: any;
  phonePrefixes: any;
  pageConfig: PageConfiguration;

  constructor(
    /*private mailboxService: MailboxService,
    private documentboxService: DocumentboxService,*/
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    protected curstormersService: CustomersService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.pageConfig = this.appConfigService.getPageConfig('my-space-page');
    this.paramsObservable = this.route.params.subscribe(params => {
      // console.log("initialize" +params['view']);
      if (params['view']) {
       this.controllerView = this.view = params['view'];
      }
      if (params['productId']) {
        this.productIdAlert = params['productId'];
      }
    });
    this.userId = this.utilsService.getUser().userNumber;
    this.userInitials = this.utilsService.getInitialsUser();
    // this.getPersonaltData();
    // let args =  { recipient: 'user' } ;
    // this.loading = true;
    // this.signatureService.getPendingOperations(args).subscribe((res) => {
    //   this.signatureCounter = res.data.length;
    //   this.loading = false;
    // }, (e) => {
    //   this.loading = false;
    //   console.log(e);
    // });

    /*this.mailboxService.getConversationsCounter({ disableErrors: true }).subscribe(result => {
      this.mailboxCounter = result.data.numOfNewConversations;
    }, (e) => {
      this.loading = false;
      console.log(e);
    });

    this.documentboxService.getCounter({ disableErrors: true }).subscribe(result => {
      this.documentboxCounter = result.data.numOfNewDocuments;
    }, (e) => {
      this.loading = false;
      console.log(e);
    });*/
  }

  writeMail() {
    let link = ['/itecban/mailbox-create'];
    this.router.navigate(link);
  }

  changeLang(lang: string) {
    this.utilsService.changeLanguage(lang);
  }

  ngOnDestroy() {
    this.paramsObservable.unsubscribe();
  }

  // getPersonaltData(){
  //   this.loading = true;

  //   this.personalDataObservable.push(this.curstormersService.getPersonalData(this.userId));
  //   this.personalDataObservable.push(this.curstormersService.getGendersTypes({disableErrors:true}));
  //   this.personalDataObservable.push(this.curstormersService.getMaritalStatusTypes());
  //   this.personalDataObservable.push(this.curstormersService.getEconomicRegime({disableErrors:true}));
  //   this.personalDataObservable.push(this.curstormersService.getFiscalRelationTypes({disableErrors:true}));
  //   this.personalDataObservable.push(this.curstormersService.getPhonePrefixes({disableErrors:true}));

  //   forkJoin(this.personalDataObservable).subscribe((result:any) => {
  //     this.personalData = result[0]['data'];
  //     this.gendersTypes = result[1]['data'];
  //     this.maritalStatusTypes = result[2]['data'];
  //     this.economicRegimeTypes = result[3]['data'];
  //     this.fiscalRelationTypes = result[4]['data'];
  //     this.phonePrefixes = result[5]['data'];
  //     let genderTypeSelected:any = _.findWhere(this.gendersTypes, {id:this.personalData.sex.id});
  //     let maritalStatusTypeSelected:any = _.findWhere(this.maritalStatusTypes, {id:this.personalData.maritalStatus.id});
  //     let economicRegimeSelected: any;
  //     if (this.personalData.economicRegime) {economicRegimeSelected = _.findWhere(this.economicRegimeTypes, {id:this.personalData.economicRegime.id});}
  //     // En el caso de Argentina no hay fiscalidad del iva asociada a la persona, asÃ­ que si no hay le asignamos el 00 de Iva liberado
  //     let fiscalRelationTypeSelected:any = _.findWhere(this.fiscalRelationTypes, {id: (this.personalData.fiscalRelationType.id ? this.personalData.fiscalRelationType.id : '00')  });

  //     if (this.personalData){
  //       this.personalData.sex.name = genderTypeSelected.name;
  //       this.personalData.maritalStatus.name = maritalStatusTypeSelected.name;
  //       this.personalData.fiscalRelationType.name = fiscalRelationTypeSelected.name;
  //       this.personalData.economicRegime.name = (economicRegimeSelected)?economicRegimeSelected.name:'';
  //     }else{
  //       this.personalData.sex.name = '';
  //       this.personalData.maritalStatus.name = '';
  //       this.personalData.fiscalRelationType.name = '';
  //       this.personalData.economicRegime.name = '';
  //     }
  //     this.loading =false;
  //   },e=> {
  //     this.loading =false;
  //   });
  // }

  // eventPersonalDataComponent(result:any){
  //   this.personalData = result;
  // }

  goTo(tab: string) {
    let link = [RouterHelperService.getPathFromId('my-space-page-tab:' + tab)];
    this.router.navigate(link);
  }

  conversationReaded(conversation: any) {
    this.mailboxCounter--;
    conversation = conversation;
  }

  viewChangeEvent(evento: any) {
    this.controllerView = '';
    //this.changeDetectorRef.detectChanges();
    this.controllerView =  evento;
    let link = [RouterHelperService.getPathFromId('my-space-page-tab:' + evento)];
    this.router.navigate(link);
  }

}
