import { Component, OnInit, Input } from '@angular/core';
import { VoucherContainerComponent } from '../voucher/voucher.component';
import { ChannelService } from '../../services-http/channel-service/channel.service';
import { UtilsService } from '../../services/utils-service/utils.service';

@Component({
  selector: 'osb-download-info',
  templateUrl: './download-info.component.html'
})
export class DownloadInfoComponent implements OnInit {

  /**
   * Element container of all key-value pairs elements
   */
  @Input() voucherContainer: VoucherContainerComponent;

  /**
   * JSON contains all key values
   */
  @Input() voucherJson: any;

  @Input() text: string;

  @Input() templateTitle: string;


  constructor(private channelService: ChannelService, private utilsService: UtilsService ) { }

  ngOnInit() { }

  downloadDocument(name?: any) {
    let voucher = this.voucherContainer.getMap();
    let pdfName: string = name ? name : new Date().getTime().toString();
    if (!pdfName.endsWith('.pdf')) {
      pdfName = pdfName + '.pdf';
    }

    if(this.templateTitle){
      voucher["_template.title_"]= this.templateTitle;
    }

    this.channelService.postRenderPDF(voucher, pdfName).subscribe((response) => {
      this.utilsService.downloadBlob(response, pdfName);
    });
  }

}
