import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-part1start',
  templateUrl: './part1start.component.html',
  styleUrls: ['./part1start.component.css']
})
export class Part1startComponent implements OnInit {



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

  startPart1(){
    this.router.navigate(['/counties'], { queryParams: { userid: this.userid}})
  }

}
