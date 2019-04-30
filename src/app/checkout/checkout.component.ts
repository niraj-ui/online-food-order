import { Component, OnInit } from '@angular/core';
import { mainService } from '../home/main.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productAddedTocart:Product[];
  adress_form:FormGroup;
  submitted=false;
  loading:boolean=false;
  private adress_Data;
  store_dat:any;
  order_no:number;

  constructor(private _mainservice:mainService,private fb:FormBuilder , private router:Router) { }





  ngOnInit() {


    // this.productAddedTocart=this._mainservice.getProductFromCart();
    // for(let i in this.productAddedTocart){    
    // }
    // console.log(this.productAddedTocart)


    let localprod = JSON.parse(localStorage.getItem('checkout'))
    console.log( localprod.order) 

    let user_local_id=localStorage.getItem('user_id');

    this.adress_form=this.fb.group({
      address_line1:['',Validators.required],
      address_line2:['',Validators.required],
      locality:['',Validators.required],
      landmark:['',Validators.required],
      user_id:[9,Validators.required],
      // new add for post value
      order_item:[ localprod.order],

      cgst:[localprod.cgst,],
      sgst:[localprod.sgst,],
      points:['20',],

      total_price:[localprod.total_price,],
      delivery_charge:['0',],
      payable_price:[localprod.payable_price,],

      grand_total:[localprod.grand_total,],
      order_status:['0',],
      created_on:[localprod.created_on],
      

 
    })

  }// end ng onit

  get f(){return this.adress_form.controls;}

  onSubmit(){


    this.submitted=true;
    this.adress_Data=this.adress_form.value;
    this.loading=true;
    console.log(this.productAddedTocart)
    console.log(this.adress_Data);

    this._mainservice.add_adress(this.f.address_line1.value, 
      this.f.address_line2.value, 
      this.f.locality.value, 
      this.f.landmark.value,
      this.f.user_id.value, 
      this.f.order_item.value,
      
      this.f.cgst.value,
      this.f.sgst.value,
      this.f.points.value,

      this.f.total_price.value,
      this.f.delivery_charge.value,
      this.f.payable_price.value,

      this.f.grand_total.value,
      this.f.order_status.value,
      this.f.created_on.value
 
      )
    .pipe(first())
    .subscribe(
      res=>{
        console.log(res);
        this.store_dat=res;
         //store_dat=this.res;

        console.log(this.store_dat.msg);
        console.log(this.store_dat.order_no);
        this.order_no=this.store_dat.order_no;
        if(this.store_dat.status){
          this.router.navigate(['/order-details/',this.order_no])
         }
         else{
           console.log('error on chcek out ')
          //this.router.navigate(['/home'])
         }

      },
      error=>{
        console.log(error)
      }
    )
  
  }// on submit

}
