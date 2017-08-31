import {    Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation } from '@angular/core';

import { GlobalsService,  Rope, RopeData } from './app-resources/app-services/globals.service';

import { AboutComponent } from './modules/admin/about/about.component';
import { SettingsComponent } from './modules/admin/settings/settings.component';
import { AppDialogComponent } from './app-resources/app-dialog/app-dialog.component';

// language
import { Language, TranslationService, LocaleService } from 'angular-l10n';


export type LayoutDirection = 'ltr' | 'rtl';
const window: any = {};

@Component({
selector: 'app-root',
encapsulation: ViewEncapsulation.None,
templateUrl: './app.component.html',
styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit, OnDestroy {

@Language() lang: string;
selectedLocale: string = "";
displayedLocale: string = "";
dir: LayoutDirection = "ltr";
showModal: boolean = false;


@ViewChild(AppDialogComponent) modal;

constructor(    private _globals: GlobalsService,
          private _locale: LocaleService,
          public _translation: TranslationService   ) {



}

ngOnInit(): void {
  // when first starting the country does not appear correctly so sort ourselves
  switch(this._locale.getCurrentLocale()){
    case "it":
      this.displayedLocale = "ITALIAN";
    break;
    case "en":
      this.displayedLocale = "ENGLISH";
    break;
    case "de":
      this.displayedLocale = "GERMAN";
    break;
  }

var localString: string = 'test';
localString = "now not test";

this._globals.load();


}

// ********************* Language Methods ******************************
  // sets a new locale & currency.
  selectLocale(language: string, country: string, currency: string, selectionText: string): void {
    // page will translate to new language automatically and without refreshing 
    // the power of pipes...
    this._locale.setCurrentLanguage(language);
    this._locale.setCurrentCurrency(currency);
    this.displayedLocale = country;
  }

get currentCountry(): string {

  return this._locale.getCurrentCountry();

}

loadBaseLocale(userLanguage: string): void{
  var lang: string = userLanguage.substring(0,2);
  var country: string = userLanguage.substring(2,2);

  this._locale.setCurrentLanguage(lang);
  
  // note currency is not tracked, if we ever use currency then this will also need to be held within the relevant tables
  this.displayedLocale = country;


}

// ****************** End Language Methods ********************************


// when app closes remember to disconnect from server
ngOnDestroy(): void{

}

closeConnection(): void {

}

openHelpAbout(): void {

this.modal.modalTitle = this._translation.translate("HELP_ABOUT");
this.modal.okButton = true;
this.modal.cancelButton = false;
this.modal.modalMessage = true;
this.modal.open(AboutComponent);// pass in a component to populate the modal

}

openSettingsWindow(): void{
this.modal.modalTitle = this._translation.translate("APPLICATION_SETTINGS");
this.modal.okButton = true;
this.modal.cancelButton = false;
this.modal.modalMessage = true;
this.modal.open(SettingsComponent);// pass in a component to populate the modal

}






}


