import { Component } from '@angular/core';

@Component({
    selector: 'den-parser-home',
    templateUrl: '/source.component.html'
})

export class SourceComponent {

    master(): void{
        var t1: string = "test";
        t1 = "test2";
        debugger;
    }
}