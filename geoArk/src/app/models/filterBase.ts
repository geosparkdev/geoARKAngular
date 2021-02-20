import { Options,ChangeContext } from 'ng5-slider';

export class filter{
    public name:string;
    public min_value:number=0;
    public max_value:number=0;
    public options: Options = {
        floor: 0,
        ceil: 0
      };
    public display:string;
    public toggle:boolean=false;

 }