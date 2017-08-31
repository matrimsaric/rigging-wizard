import { Component, ViewChild, SimpleChange } from '@angular/core';

// txt classes
import { AppDialogComponent } from '../../../app-resources/app-dialog/app-dialog.component';
// to get version data
import { GlobalsService } from '../../../app-resources/app-services/globals.service';


@Component({
    selector: "DMM-about",
    templateUrl: '/about.component.html'

})

export class AboutComponent   {
    modal: AppDialogComponent;
    version: string = "0.1.0";
    build: string = "0.0.54211.089445";
    server: string = "VMRDDEVDATAONE\MSSQL2014";
    servertype: string = "MS SQL Server";
    intlSupport: boolean;

    constructor( public _modal: AppDialogComponent,
                 private _globals: GlobalsService)
    {




        this.modal = _modal;

    }

    ngOnInit(): void{
            // load the package file
           this.version = this._globals.getVersion();
        }

}