import { Component, OnInit, Input } from '@angular/core';
import { mainService } from 'src/app/home/main.services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  showNav = false;

  showFiller = false;
  navdata=[];
  events: string[] = [];
  user:number;
  user_data:any;
  user_data_in:any;
  user_data_inner=[]
  total$: Observable<number>;
  productAddedTocart;
  get_user_id:number;
  constructor(private _mainservice:mainService, private router:Router) {
     this.total$ = _mainservice.total$;
   //  console.log(this.total$)
     //console.log(this.total$)
   }

  ngOnInit() {
 
    this.productAddedTocart=JSON.parse(localStorage.getItem('product'))
    this._mainservice.addProductToCart(this.productAddedTocart);
    //this.total$ = this._mainservice.total$;
    //this._mainservice.cast.subscribe(user=>this.user=user);

    console.log(this.total$)
    

    this._mainservice.page_list()
    .subscribe(
      data=>{
      //  console.log(data)
        data=this.navdata.push(data)
    //  this.navdata=data;
     // console.log(this.navdata);
    })

   // console.log(this.events);

    // user details
     this.get_user_id=JSON.parse(localStorage.getItem('user_id'))
    //console.log(this.get_user_id);
    this._mainservice.user_details(this.get_user_id)
    .subscribe(data=>{
     // console.log(data);
 
      this.user_data_in=data
      this.user_data=this.user_data_in.user_details
      this.user_data_inner=this.user_data[0]
      
      localStorage.setItem('token', this.user_data[0].auth_token);
     // this.user_data_in=this.user_data.user_details

    })

  } // end ng onit
  // Listen to all clicks on the document
getUser(){
  //this._mainservice.user_details(this.get_user_id)
  // console.log(this.user_data_inner)
   return this.user_data_inner
}
  isValid(){
    if(this.router.url != '/' && this.router.url != '/register' && this.router.url != '/login' && this.router.url != '/otp'){
    return true
    }
    return false
    }



}
