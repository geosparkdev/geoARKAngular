import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-survey2done',
  templateUrl: './survey2done.component.html',
  styleUrls: ['./survey2done.component.css']
})
export class Survey2doneComponent implements OnInit {

  public userid:any;

  constructor(public route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {


    this.route.queryParams
    .subscribe(params => {
      this.userid=params.userid;
      console.log('USERIDUSERIDUSERID!***@*#*@#')
      console.log(this.userid)

    });

  }

  startPart2(){
    this.router.navigate(['/categories'], { queryParams: { userid: this.userid}})
  }


}
