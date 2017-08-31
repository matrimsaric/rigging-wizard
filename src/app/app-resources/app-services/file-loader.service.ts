import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CalculationData } from '../app-types/calculation-data';
import { ClassData } from '../app-types/class-data';


@Injectable()
export class FileLoaderService  {
    private _dataUrl = 'assets/master/';
    private _classUrl = 'assets/master/class.json';
    public currentVersion:string =  "0.0.0";

    constructor( private _http: Http){
        this.getVersionInfo().subscribe(retdata => this.loadVersion(retdata));
    }

    public loadRopeBaseData(chosenClass: string) : Observable<CalculationData[]> {
        this._dataUrl = this._dataUrl + chosenClass;
        return this._http.get(this._dataUrl)
            .map((response: Response) => <CalculationData[]>response.json())
            // .do(data => console.log("RopeData: " + JSON.stringify(data)))
            .catch(error => this.handleError(error));
    }

    public loadRopeSpecificData(id: number) : Observable<CalculationData> {
        return this._http.get(this._dataUrl)
            .map((response: Response) => <CalculationData>response.json().filter(data => data.id == id)[0])
            // .do(data => console.log("Getting: " + JSON.stringify(data)))
            .catch(error => this.handleError(error));
    }

    public loadClassFile(id: number) : Observable<ClassData> {
        return this._http.get(this._classUrl)
            .map((response: Response) => <ClassData>response.json().filter(data => data.id == id)[0])
            .do(data => console.log("RopeData: " + JSON.stringify(data)))
            .catch(error => this.handleError(error));
    }

    private handleError(error: any){
        // translate error message into valid json
         var retError: any = error;
         var retErrorBody: any = JSON.parse(retError._body);

        
        
        return Observable.throw(error.json().error || 'Server error');
    }

    getVersionInfo() {
        var _versionurl: string =  'package.json';// local mocked data

        return this._http.get(_versionurl)
            .map((response: Response) => <any[]>response.json());
    }

    // sets the globals version number
    loadVersion(packageData: any){
        this.currentVersion = packageData.version;
    }

   
}
