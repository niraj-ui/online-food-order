import { Component, OnInit } from '@angular/core';
import { mainService } from '../home/main.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pagedata=[];
  constructor(private _mainservice:mainService, private _route:ActivatedRoute) {
    _route.params.subscribe(val=>{
      this._mainservice.page_det(this._route.snapshot.params['id'])
      .subscribe(data=>{
        //this.pagedata=data;
        data=this.pagedata.push(data);
        console.log(this.pagedata);
        
      })
    })
   }

  ngOnInit() {
  }

}
