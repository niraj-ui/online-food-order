import { Component, OnInit } from '@angular/core';
 
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { mainService } from './main.services';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class HomeComponent implements OnInit {
  productAddedTocart:Product[];
  ca_data=[];
  home_ban:any
  home_ban_dat:any
  constructor(config: NgbCarouselConfig, private _mainservice:mainService) {
    
    // customize default values of carousels used by this component tree
    config.interval = 6000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  ngOnInit() {

    this.productAddedTocart=this._mainservice.getProductFromCart();

    this._mainservice.get_cat().subscribe(data=>{
      //this.ca_data=data;
      data=this.ca_data.push(data)
     // console.log(this.ca_data)
    })

    // home page banner
    this._mainservice.get_banner().subscribe(data=>{
    //  data=this.home_ban.push(data);

       this.home_ban=data;
      console.log(this.home_ban)
      this.home_ban_dat=this.home_ban[0].data;
      console.log(this.home_ban_dat)
    })
    
  }  // end ngonit

}
