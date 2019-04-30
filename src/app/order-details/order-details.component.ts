import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mainService } from '../home/main.services';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  ordr_det_data=[];
  constructor(private _route:ActivatedRoute, private _mainservice:mainService) { }

  ngOnInit() {

    this._route.params.subscribe(val=>{
      this._mainservice.order_det(this._route.snapshot.params['id'])
      .subscribe(data=>{
        data=this.ordr_det_data.push(data);
        console.log(data)
        console.log(this.ordr_det_data)
      },
      error=>console.log(error)
      )
    })


  }

}
