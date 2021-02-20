import { Options,ChangeContext } from 'ng5-slider';

export class filter{
    public name:string;
    public min_value:number=0;
    public max_value:number=10;
    public options: Options = {
        floor: 0,
        ceil: 10
      };
    public display:string;

 }