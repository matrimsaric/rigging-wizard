import { Injectable } from '@angular/core';

// globals (holds the relevant json lists)
import { GlobalsService, RopeData } from './globals.service';

import { CalculationData } from '../app-types/calculation-data';

// translation
import { Translation, TranslationService } from 'angular-l10n';

@Injectable()
export class CalculationEngineService extends Translation{
    
    public verboseReport: string[] = [];
    private calcData: RopeData = null;

    constructor(private _globals: GlobalsService,
                private _translation: TranslationService){
        super(_translation);
    }

    calcRopeSize(choice: number): RopeData {
        this.calcData = new RopeData(choice);// populate a global object to store the sizes
        // firstly get our base number which will be actual size millimetres
        var mmActual: number = this.loadRope(choice);
        this.calcData.actualMm = mmActual;

        // next we want to update the actual inch and actual cm
        this.getOtherActuals();
        // work out the scaled values
        this.getFiguresToScale();
        // round all the figures
        this.roundEndResults();

        return this.calcData;
    }

    private getOtherActuals(): void {
        // use the mm to get the cm
        this.calcData.actualCm = this.calcData.actualMm / 10;
        //repeat for inches
        this.calcData.actualInch = this.calcData.actualMm / this._globals.mmToInch;

        // report both
        this.verboseReport.push(`${this._translation.translate("ADDITIONAL_1")} ${this.calcData.actualInch} in`);
        this.verboseReport.push(`${this._translation.translate("ADDITIONAL_2")} ${this.calcData.actualCm} cm`);
    }

    private getFiguresToScale(): void{
        // scale is provided by the globals
        this.calcData.scaleMm = this.calcData.actualMm / this._globals.scaleFactor;
        this.calcData.scaleCm = this.calcData.actualCm / this._globals.scaleFactor;
        this.calcData.scaleInch = this.calcData.actualInch / this._globals.scaleFactor;

        // report all
        this.verboseReport.push(`${this._translation.translate("CONVERT_1")} ${this.calcData.scaleMm} mm`);
        this.verboseReport.push(`${this._translation.translate("CONVERT_2")} ${this.calcData.scaleInch} in`);
        this.verboseReport.push(`${this._translation.translate("CONVERT_3")} ${this.calcData.scaleCm} cm`);

    }

    private roundEndResults(): void{
        this.calcData.roundedActualCm = Math.round(this.calcData.actualCm * this._globals.roundingFactor) / this._globals.roundingFactor;
        this.calcData.roundedActualInch = Math.round(this.calcData.actualInch * this._globals.roundingFactor) / this._globals.roundingFactor;
        this.calcData.roundedActualMm = Math.round(this.calcData.actualMm * this._globals.roundingFactor) / this._globals.roundingFactor;
        this.calcData.roundedScaleCm = Math.round(this.calcData.scaleCm * this._globals.roundingFactor) / this._globals.roundingFactor;
        this.calcData.roundedScaleInch = Math.round(this.calcData.scaleInch * this._globals.roundingFactor) / this._globals.roundingFactor;
        this.calcData.roundedScaleMm = Math.round(this.calcData.scaleMm * this._globals.roundingFactor) / this._globals.roundingFactor;

        // report all
        this.verboseReport.push(`${this._translation.translate("ROUND_1")} ${this.calcData.roundedActualMm} mm`);
        this.verboseReport.push(`${this._translation.translate("ROUND_2")} ${this.calcData.roundedActualInch} in`);
        this.verboseReport.push(`${this._translation.translate("ROUND_3")} ${this.calcData.roundedActualCm} cm`);

        this.verboseReport.push(`${this._translation.translate("ROUND_4")} ${this.calcData.roundedScaleMm} mm`);
        this.verboseReport.push(`${this._translation.translate("ROUND_5")} ${this.calcData.roundedScaleInch} in`);
        this.verboseReport.push(`${this._translation.translate("ROUND_6")} ${this.calcData.roundedScaleCm} cm`);



    }

    private loadRope(choice: number): number{
        console.log('LOADING ROPE ' + choice);
        
        var allCalcs: CalculationData[] = this._globals.calcData;
        // we have a numeral - check that we can find this within the relevant json
        
        var master:CalculationData = this._globals.getSpecificCalculation(choice);

        

        // if an ACTUAL we need to get calc the value now
        if(master.workingCalculation == "ACTUAL"){
            var working: number = master.parentReference;
            if(master.id == 1){
                working = this._globals.mainMastDiameter;
            }
            else if(master.id == 2){
                working = this._globals.foreMastDiameter;
            }
            else if(master.id == 3){
                working = this._globals.mizzenMastDiameter;
            }
            this.verboseReport.push(`[${master.id}] ${master.name} ${this._translation.translate("ACTUAL_1")} ${working} mm`);
            return working;
        }
        else{
            var endResult: number =  this.runCalc(this.loadRope(master.parentReference), master.workingCalculation);
            this.verboseReport.push(`[${master.id}] ${master.name} ${this._translation.translate("IS")} ${this.getReadable(master.workingCalculation)} ${this._translation.translate("OF")}  [${master.parentReference}]`);
             this.verboseReport.push(`[${master.id}] ${master.name} ${this._translation.translate("IS")} ${endResult} mm`);

            return endResult;
        }

        // if not then we need to recursively move up the tree until we can
       
    }

    

    runCalc(returnedValue: number, sumType: string): number{
        var searchType: string = this.getCalcType(sumType);
        var val: number = 0;

        if(searchType == "PERC"){
            val = this.getPercentage(sumType);
        }
        switch(searchType){
            case "HALF":
                return returnedValue / 2.0;
            case "PERC":
                return (returnedValue / 100) * val;
        }
        return returnedValue;
    }


    private getCalcType(workingCalc: string): string{
        var searchType: string = workingCalc;
        var val: number = 0;
        if(workingCalc.startsWith("PERC")){
            searchType = "PERC";
        }

        return searchType;
    }

    private getPercentage(workingCalc: string): number{

        var val: number = 0;
        if(workingCalc.startsWith("PERC")){
            var testStr: string = workingCalc.replace("PERC","");

            val = Number(testStr);
        }
        return val;
    }


    private getReadable(calc: string): string{
        var searchType: string = this.getCalcType(calc);

        var val: number = 0;

        if(searchType == "PERC"){
            val = this.getPercentage(calc);
        }

        switch(searchType){
            case "HALF":
                return this._translation.translate("HALF");
            case "PERC":
                return ` ${val} ${this._translation.translate("PERCENT")} `
        }
    }



}