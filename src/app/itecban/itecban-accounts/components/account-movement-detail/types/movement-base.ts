import { OnInit, Input } from '@angular/core';
import { Json2PdfFieldDefinition } from 'onesait-core';

export abstract class MovementBaseComponent implements OnInit {

    @Input()
    movementDetail: any;

    constructor() { }

    ngOnInit() { }

    public abstract getExportToPdfFieldsDef(): Json2PdfFieldDefinition[];

}
