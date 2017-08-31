import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// our primary application routes
import {routing, appRoutingProviders } from './app-routes/app.routes';

import { AppComponent } from './app.component';
import { AppDialogComponent } from './app-resources/app-dialog/app-dialog.component';
import { DialogDirective } from './app-resources/app-dialog/dialog.directive';

// application components
import { AboutComponent } from './modules/admin/about/about.component';
import { SettingsComponent } from './modules/admin/settings/settings.component';
import { SourceComponent } from './modules/admin/source/source.component';
import { SelectionComponent } from './modules/rigging/selection/selection.component';

// services
import { GlobalsService, FileLoaderService, CalculationEngineService } from './app-resources/app-services/index';

// third party
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AppDialogComponent,
    DialogDirective,
    AboutComponent,
    SettingsComponent,
    SourceComponent,
    SelectionComponent
  ],
  entryComponents: [
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    TranslationModule.forRoot()
  ],
  providers: [
    TranslationService,
    GlobalsService, 
    FileLoaderService, 
    CalculationEngineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public locale: LocaleService, public translation: TranslationService) {
    
          this.locale.addConfiguration()
            .addLanguages(['en', 'it', 'de'])
            .setCookieExpiration(30)
            .defineLanguage('en');
    
            this.translation.addConfiguration()
            .addProvider('./assets/other/locale-');
    
          this.translation.init();
  }
    
 

 }
