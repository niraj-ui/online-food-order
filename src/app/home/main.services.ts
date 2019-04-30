import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
 import 'rxjs/operators';
 import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
 //import { Observable} from 'rxjs/Rx';
 //import {Subject} from 'rxjs/Subject'
// import { Observable } from 'rxjs/Rx';
 
//import { RequestOptions } from 'https';

@Injectable({providedIn:"root"})

export class mainService{
    private total = new BehaviorSubject<number>(0);
     // loggedIn_ser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   // private user=new BehaviorSubject<number>(0)
    //cast=this.user.asObservable();
      //niraj= localStorage.getItem('product');

editUser(newUser){   
    console.log(newUser)   
   // this.user.next(newUser);
}

base_url='http://www.petukibiryani.com/pos/api/';
//base_url='http://192.168.1.14/pkb/api/';
//base_url='http://192.168.1.25/pkb/api/';
//base_new_url='http://ec2-13-232-114-103.ap-south-1.compute.amazonaws.com/dev/api/v1/'
 constructor(private _http:HttpClient){ }

 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', })
  };


// registration api 
register(name: string, mobile: number){
    console.log({ name, mobile })
    return this._http.post(this.base_url+ 'v1/App/auth/user_registration', "name=" + encodeURIComponent(name) +  "&mobile=" + (mobile))    
    //return this._http.post(this.base_new_url+ 'auth/login/', body, this.httpOptions)    
}
login(mobile: number){
    console.log({mobile })
    return this._http.post(this.base_url+ 'v1/App/auth/user_login', "mobile=" + (mobile), this.httpOptions)    
    //return this._http.post(this.base_new_url+ 'auth/login/', body, this.httpOptions)    
}

getToken(){
    return localStorage.getItem('token')
}

loggedIn(){
    return !!localStorage.getItem('token')
}
// get isLoggedIn() {
//     return this.loggedIn_ser.asObservable();
//   }
// home page get banner
get_banner(){
    return this._http.get(this.base_url + 'v1/App/Home/promotional_banner')
}

get_cat(){    
return this._http.get( this.base_url +  'v1/App/Category/')
}



get_subcat(category_id:string){
   // console.log(category_id)
    return this._http.post( this.base_url +  '/v1/App/Category/subcategory/',  "category_id=" + encodeURIComponent(category_id), this.httpOptions)
}

get_otp(otp:number, user_id:number){
console.log({otp,user_id})
//let user_local_id=localStorage.getItem('user_id');
//console.log(user_local_id);
return this._http.post(this.base_url + '/v1/App/auth/verify_user', "otp=" + (otp) + "&user_id=" + (user_id), this.httpOptions)
}

// ---------- page click on page
page_list(){
    return this._http.get( this.base_url+ '/v1/App/Page/page_list')
}
page_det(id){
    return this._http.get( this.base_url + '/v1/App/Page/page_detail/'+ id )
}

// 
get total$(){
//    console.log(this.total)
    return this.total.asObservable();
  }

/* ----********************product add or remove ------------ */
addProductToCart(prodcuts:any){
    //console.log(prodcuts);
    localStorage.setItem("product", JSON.stringify(prodcuts));  
    this.total.next(this.calcTotal());
    // return   
}

calcTotal(){
    let niraj=JSON.parse(localStorage.getItem('product'))
    console.log(niraj)
    let sum = 0;
    let total=0;
    for(let i in niraj){
        total=total+(niraj[i].Quantity)
       } // end for llop
    console.log(total)
    return total;
  }
 // end calculate items

 


getProductFromCart(){
//console.log(localStorage.getItem('product'))
return JSON.parse(localStorage.getItem('product'))

}

// all product remove 
removeAllProductFromCart(){
    return localStorage.removeItem("product")
}

add_adress(address_line1:string,
    address_line2:string, 
    locality:string, 
    landmark:string, 
    user_id:number,
    order_item:any,
    
    cgst:string,
    sgst:string,
    points:string,

    total_price:string,
    delivery_charge:string,
    payable_price:string,

    grand_total:string,
    order_status:string,
    created_on:string

    ){
 //  let user_local_id=localStorage.getItem('user_id');
   console.log(user_id)

   return this._http.post(this.base_url+ '/v1/App/Order/saveOrder',
    "address_line1=" + encodeURIComponent(address_line1) + 
    "&address_line2=" + encodeURIComponent(address_line2) + 
    "&locality=" + encodeURIComponent(locality) + 
    "&landmark=" + encodeURIComponent(landmark) + 
    "&user_id=" + (user_id)+ 
    "&order_item="+ JSON.stringify(order_item) +

    "&cgst="+ encodeURIComponent(cgst) +
    "&sgst="+ encodeURIComponent(sgst) +
    "&points="+ encodeURIComponent(points) +

    "&total_price="+ encodeURIComponent(total_price) +
    "&delivery_charge="+ encodeURIComponent(delivery_charge) +
    "&payable_price="+ encodeURIComponent(payable_price) +

    "&grand_total="+ encodeURIComponent(grand_total) +
    "&order_status="+ encodeURIComponent(order_status) +
    "&created_on="+ encodeURIComponent(created_on), this.httpOptions)
    
}
 

///// user details

user_details(user_id:number){
    console.log(user_id);
    return this._http.post(this.base_url+ 'v1/App/User/userDetails', "user_id="+(user_id), this.httpOptions )
}
// --------- new add to cart full 

addProductToCart_full(prodcuts:any){
    console.log(prodcuts);
    localStorage.setItem("product", JSON.stringify(prodcuts));    
    this.total.next(this.calcTotal());
}

getProductFromCart_full(){
//console.log(localStorage.getItem('product'))
    return JSON.parse(localStorage.getItem('product'))
    
}

// all product remove 
removeAllProductFromCart_full(){
    return localStorage.removeItem("product")
}


order_list(user_id:number){
    console.log(user_id)
    return this._http.post(this.base_url+ 'v1/App/Order/orderList/',  "user_id="+(user_id) ,  this.httpOptions)
}

order_det(order_id:number){
    console.log(order_id);
    return this._http.post(this.base_url+ 'v1/App/Order/details/', "order_id="+(order_id), this.httpOptions)
}


//  user feedback 
user_fedbcak(order_id:number,rating:number,message:string){
    return this._http.post(this.base_url+ 'v1/App/Feedback/user_feedback', "order_id="+(order_id) + "&message="+encodeURIComponent(message) + "&rating="+(rating), this.httpOptions)
}

user_notfiy(user_id:number){
    return this._http.post(this.base_url+ 'v1/App/Notification/user_notifications', "user_id="+(user_id), this.httpOptions)
}

}