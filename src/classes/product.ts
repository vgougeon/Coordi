export class Product {
    
    constructor(private _code: number, private _name: string, private _price: number) {}

    public get code(): number {
        return this._code;
    }
    public set code(value: number) {
        this._code = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
}