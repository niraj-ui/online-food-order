import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mainService } from '../home/main.services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
order_data=[];
  constructor(private _route:ActivatedRoute, private _mainservice:mainService) { }

  ngOnInit() {
    
    this._mainservice.order_list(9)
    .subscribe(
      res=>{
        console.log(res);
        res=this.order_data.push(res)
        console.log(this.order_data)
      },
      error=>console.log(error)
    )
  }

}
