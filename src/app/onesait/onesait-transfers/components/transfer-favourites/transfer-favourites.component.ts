import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { List, TransferService, DeviceUtilsService, InfoHeaderService } from 'onesait-core';
import { TransferFavouriteOutput } from 'onesait-api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osb-transfer-favourites',
  templateUrl: './transfer-favourites.component.html'
})
export class TransferFavouritesComponent implements OnInit {

  @Output() reuseFavourite: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshFavList: EventEmitter<any> = new EventEmitter<any>();
  @Input() favourites: TransferFavouriteOutput [];

  protected listFavouriteObservable: Subscription;
  protected listFavourites: List;

  loading: boolean;
  selectedItem: string;
  hasMoreData: boolean;

  constructor(
    private transferService: TransferService,
    protected deviceUtilsService: DeviceUtilsService,
    private infoHeaderService: InfoHeaderService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.listFavourites = new List(this.transferService, 'getFavourites');
    // this.getFavourites();
  }

  getFavourites() {
    // this.listFavourites.reset();
    // this.next();
  }

  // next() {
  //   this.loading = true;

  //   if (this.listFavouriteObservable) {
  //     this.listFavouriteObservable.unsubscribe();
  //   }
  //   this.listFavouriteObservable = this.listFavourites.next().subscribe(results => {
  //     this.loading = false;
  //     this.favourites = results.data;
  //     if (results.paging && results.paging.hasMorePages) {
  //       this.hasMoreData = true;
  //     } else {
  //       this.hasMoreData = false;
  //     }
  //   }, (e) => {
  //     this.loading = false;
  //     console.log(e);
  //   });
  // }

  viewDetail(favourite) {
    if (this.selectedItem === favourite.id) {
      this.selectedItem = '';
    } else {
      this.selectedItem = favourite.id;
    }
  }

  repeatTransfer(favourite: TransferFavouriteOutput) {
    this.reuseFavourite.emit(favourite);
  }

  deleteFavOk() {
    this.infoHeaderService.showInfoHeader(this.translateService.instant('ONESAIT-TRANSFERS.FAVOURITE.DELETE.OK'));
    this.refreshFavList.emit();
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  close(): void {
    this.selectedItem = null;
  }

}
