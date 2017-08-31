import { Component, OnInit } from '@angular/core';

import { GlobalsService, Rope, RopeData } from '../../../app-resources/app-services/globals.service';
import { CalculationEngineService } from '../../../app-resources/app-services/calculation-engine.service';
import { CalculationData } from '../../../app-resources/app-types/calculation-data';

// language
import { Language, TranslationService } from 'angular-l10n';

@Component({
    selector: 'rigwiz-selection',
    templateUrl: './selection.component.html'
})

export class SelectionComponent implements OnInit {
    @Language() lang: string;
    private ropes: CalculationData[] = [];
    private ropeData: RopeData = null;
    private extra: string[] = null;
    private userRopeChoice: number = 1;// default to first option in list
    private imageLocation: string = "assets/images/rigshots/basestanding.jpg";
    

    constructor(private _globals: GlobalsService, 
                private _calc: CalculationEngineService,
                private _translation: TranslationService){

    }

    ngOnInit(): void{
        

        this.ropes = this._globals.calcData;
    }

    loadRopeData(userChoice): void{
        // for the moment hack it in
        // var testRope: RopeData = new RopeData(this.ropes[0].id);
        // testRope.actualCm = 5.6;
        // testRope.actualMm = 56;
        // testRope.actualInch = 5;
        // testRope.scaleCm = 0.5;
        // testRope.scaleMm = 50;
        // testRope.scaleInch = 6;
        
        //this.ropeData = testRope;

        // above is a simple drop to check fields work.
        // now try and use the calculation engine!
        this._calc.verboseReport = [];
        var res = this._calc.calcRopeSize(this.userRopeChoice);

        this.ropeData = res;

        console.log(this._calc.verboseReport);
        this.fillExtraTextArea(this._calc.verboseReport);

        this.setImage();
    }

    onSelect(userChoice): void{
       this.userRopeChoice = Number(userChoice);
       console.log("User Rope choice changed to: " + this.userRopeChoice);
    }

    fillExtraTextArea(verboseReport: string[]): void{
        this.extra = verboseReport;
    }

    setImage(): void {
        this.imageLocation = `assets/images/rigshots/${this.userRopeChoice}.jpg`;
    }
}