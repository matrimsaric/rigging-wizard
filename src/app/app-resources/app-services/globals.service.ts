import { Injectable, OnInit } from '@angular/core'

import { FileLoaderService } from './file-loader.service';
import { CalculationData } from '../app-types/calculation-data';
import { ClassData } from '../app-types/class-data';

export class Rope {
    id: number;
    name: string;
}

export class RopeData{
    parentId: number;
    actualMm: number;
    actualCm: number;
    actualInch: number;
    scaleMm: number;
    scaleCm: number;
    scaleInch: number;
    roundedActualMm: number;
    roundedActualCm: number;
    roundedActualInch: number;
    roundedScaleMm: number;
    roundedScaleCm: number;
    roundedScaleInch: number;

    


    constructor(newParent: number){
        this.parentId = newParent;
    }
}




@Injectable()
export class GlobalsService implements OnInit {
    private _dataUrl = 'public/master/rigging.json';

    public ropes: Rope[] = [
        { "id": 1, "name": "Lower Stay"},
        { "id": 2, "name": "Fore Stay"},
        { "id": 3, "name": "Main Stay"}
    ];

    public calcData: CalculationData[] = [];
    public classData: ClassData;

    public scaleFactor: number = 48;// default though will be set either via json or cookies
    public roundingFactor: number = 100;// default will also only be applied to last value 100 is equivelant to rounding to 2 decimal places
    public mmToInch: number = 25.4;
    private errorMessage: string;
    public showInch: boolean = true;
    public showMm: boolean = true;
    public showCm: boolean = true;
    private classFile: number = 1;
    private shipChoice: number = 1;

    // these are always seperate as they may be added/adjusted by the user
    public mainMastDiameter: number = 0;
    public foreMastDiameter: number = 0;
    public mizzenMastDiameter: number = 0;


    constructor(public _fileLoader: FileLoaderService){
        console.log('loading');
    }

    ngOnInit(): void{
        // load the calculation data json from the relevant public folder
       this.load();
    }

    load(): void {
        //  console.log('loading rope data');
        this._fileLoader.loadClassFile(this.classFile)
            .subscribe(retdata => this.loadClassData(retdata)),
            error => this.errorMessage = <any>error;

    }

    loadClassData(retData){
        this.classData = retData;

        this.mainMastDiameter = this.classData.shipData[this.shipChoice].mainMast;
        this.foreMastDiameter = this.classData.shipData[this.shipChoice].foreMast;
        this.mizzenMastDiameter = this.classData.shipData[this.shipChoice].mizzenMast;



        this._fileLoader.loadRopeBaseData(this.classData.useGuide)
            .subscribe(retdata => this.loadRopeData(retdata)),
            error => this.errorMessage = <any>error;
    }

    loadRopeData(retData): void{
        // console.log('method returned ' + JSON.stringify(retData));
        this.calcData = retData;

    }

    getSpecificCalculation(id: number): CalculationData {
        for(var i: number = 0; i < this.calcData.length; i++){
            if(this.calcData[i].id == id){
                return this.calcData[i];
            }
        }
        return null;
    }

    getVersion(): string{
        return this._fileLoader.currentVersion;
    }

    
}
