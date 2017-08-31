export class ShipData{
    name: string;
    exampleName: string;
    mainMast: number;
    foreMast: number;
    mizzenMast: number;
}

export class ClassData{
    id: number;
    name: string;
    date: string;
    useGuide: string;
    shipData: ShipData[];
}