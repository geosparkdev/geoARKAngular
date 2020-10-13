import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { addoriginator}  from '../models/addoriginator';
import { adddataset } from '../models/adddataset';
import { addattributes } from '../models/addattributes';
import { adddata } from '../models/adddata'

@Component({
  selector: 'app-uploaddata',
  templateUrl: './uploaddata.component.html',
  styleUrls: ['./uploaddata.component.css']
})
export class UploaddataComponent implements OnInit {


  //Data Originators
  public originators: any =[];
  public originatortogg: boolean = false;
  public addoriginator: addoriginator;
  public originator_name: any;


  //Datasets
  public datasetchoicetogg: boolean=false;
  public adddataset: adddataset;
  public datasettogg: boolean= false;
  public datasettogg2: boolean= false;
  public dataset_name:any;

  public updatedatasettogg: boolean= false;
  public updatedatasettogg2: boolean= false;
  public datasets: any=[];
  public selected_ds: string = "";
  public editdataset: adddataset;
  public datasetinfo: any=[];



  //Attributes
  public addattributes: addattributes;
  public attributetogg: boolean=false;
  public attributetogg2: boolean=false;
  public currentInput:any;
  public displayfile:any;

  //Data
  public adddata: adddata;
  public datatogg: boolean=false;
  public datacsv:any;
  public currentDataInput:any;
  public displayDatafile:any;
  public datatogg2: boolean=false;

  //Other
  public selected: string = "";
  public p: number = 1;
  public p2: number = 1;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.getOriginator();
    this.addoriginator= new addoriginator();
    this.adddataset= new adddataset();
    this.addattributes= new addattributes();
    this.adddata= new adddata();
    this.displayfile="no file has been chosen"
    this.displayDatafile="no file has been chosen"

    this.editdataset= new adddataset();

  }




// *********************************
//            ORIGINATOR
// *********************************

// Get originator names to display in table
  getOriginator(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get("http://localhost:5000/getoriginator", {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.originators=response;
      },
      error => {
        console.log(error)
      }
    )
  }


  // Add new originator to originator collection
  addOriginator(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post("http://localhost:5000/addoriginator", JSON.stringify(this.addoriginator), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)

        //Set  displayname and rebuild form
        this.originator_name=this.addoriginator.originator_name;
        this.addoriginator= new addoriginator();

        //update originator list
        this.getOriginator();


        //Toggle Originator Block to display originator name in summary block
        this.originatortogg= true;

        //toggle dataset form
        this.datasetchoicetogg=true;
        this.adddataset.originator_id=response.toString();

        console.log(this.adddataset.originator_id)
      },
      error => {
        console.log(error)
      }
    )
  }


// Select originator from list
  selectOriginator(id:string, name:string){
    //select originator ID to add dataset
    this.selected=id;
    this.adddataset.originator_id=id;

    //toggle originator block off and display originator name in summary block
    this.datasetchoicetogg=true;
    this.originatortogg=true;
    this.originator_name=name;

    console.log(this.adddataset.originator_id)
  }

// *********************************
//             DATASET
// *********************************

  toggDataset(){
    this.datasettogg=true; 
    this.datasetchoicetogg=false
  }

  toggUpdateDataset(){
    this.updatedatasettogg=true; 
    this.datasetchoicetogg=false;

    this.getDatasets(this.selected);
  }


  getDatasets(orig_id: string){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get("http://localhost:5000/getdatasets?orig_id=" + orig_id, {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.datasets=response;
      },
      error => {
        console.log(error)
      }
    )
  }


  addDataset(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post("http://localhost:5000/adddataset", JSON.stringify(this.adddataset), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)

        this.addattributes.dataset_id=response;
        this.adddata.dataset_id=response;
        //set displayname and rebuild form
        this.dataset_name=this.adddataset.dataset_name;
        this.adddataset= new adddataset();

        //toggle dataset block off and display dataset name in summary block
        this.datasettogg= false;
        this.datasettogg2 = true;

        //toggle attribute block
        this.attributetogg=true;


      },
      error => {
        console.log(error)
      }
    )
  }

// select dataset to update
  selectDataset(id:string, name:string){
    this.selected_ds=id;

    //toggle dataset selection box off and update block on
    this.updatedatasettogg2=true;
    this.updatedatasettogg=false;
    //toggle dataset summary block
    this.datasettogg2 = true;

    //display dataset name in summary block
    this.dataset_name=name;

    this.getDatasetInfo(id);

    console.log(this.selected_ds)
  }


  getDatasetInfo(dataset_id: string){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get("http://localhost:5000/getdatasetinfo?dataset_id=" + dataset_id, {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.datasetinfo=response;

        console.log(this.datasetinfo)

        this.editdataset.use_constraint=this.datasetinfo.use_constraint;
        console.log(this.editdataset.use_constraint)
      },
      error => {
        console.log(error)
      }
    )
  }


// *********************************
//            ATTRIBUTES
// *********************************

  getAttributesCSV(event) {
    const reader = new FileReader();


    this.displayfile=this.currentInput.split('\\').pop().split('/').pop()
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.addattributes.attributescsv= reader.result
      };
    }
  }

  testfunc(){
    this.datatogg=true;
  }

  uploadAttributes(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post("http://localhost:5000/uploadattributes", JSON.stringify(this.addattributes), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        console.log("TESTSETSETSETSETSETSETSETSET")
        this.attributetogg=false;
        this.datatogg=true;
        this.attributetogg2=true;

  
      },
      error => {
        console.log(error)
      }
    )
  }



// *********************************
//                DATA
// *********************************


  getDataCSV(event) {
    const reader = new FileReader();


    this.displayDatafile=this.currentDataInput.split('\\').pop().split('/').pop()
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.adddata.datacsv= reader.result
      };
    }
  }



  uploadData(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post("http://localhost:5000/uploaddata", JSON.stringify(this.adddata), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.datatogg=false;
        this.datatogg2=true;
      },
      error => {
        console.log(error)
      }
    )
  }






  
}

