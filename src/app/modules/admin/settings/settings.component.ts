import { Component, ViewChild, SimpleChange } from '@angular/core';

// txt classes
import { AppDialogComponent } from '../../../app-resources/app-dialog/app-dialog.component';
// to get version data
import { GlobalsService } from '../../../app-resources/app-services/globals.service';

// translation
import { Translation, TranslationService } from 'angular-l10n';



@Component({
    selector: "DMM-settings",
    templateUrl: '/settings.component.html'

})

export class SettingsComponent extends Translation  {
    modal: AppDialogComponent;

    private scale: number;
    private round: number;
    private mms: boolean = true;
    private cms: boolean = true;
    private ins: boolean = true;
    

    constructor( public _modal: AppDialogComponent,
                 private _globals: GlobalsService,
                 public _translation: TranslationService)
    {
        super(_translation);
        this.modal = _modal;

    }

    ngOnInit(): void{
            this.scale = this._globals.scaleFactor;
            this.round = this._globals.roundingFactor;
            this.mms = this._globals.showMm;
            this.cms = this._globals.showCm;
            this.ins = this._globals.showInch;
        }

    save(rndFld: string, scaleFld: string,
        mmCheck: boolean, cmCheck: boolean, inCheck: boolean,
        mmFld:string, fmFld: string, mzFld: string): void{
        console.log("saving");
        // adjust the globals to use the new user values
        this._globals.scaleFactor = Number(scaleFld);
        this._globals.roundingFactor - Number(rndFld);
        this._globals.showCm = cmCheck;
        this._globals.showInch = inCheck;
        this._globals.showMm = mmCheck;
        this._globals.mainMastDiameter = Number(mmFld);
        this._globals.foreMastDiameter = Number(fmFld);
        this._globals.mizzenMastDiameter = Number(mzFld);

    }

}