import { Component, OnInit } from '@angular/core';
import { mainService } from '../home/main.services';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/OrderItem.Model';
import { OrderDetail } from '../models/OrderDetail.Model';
import { Product_full } from '../models/product_full.Model';
import { Product_chck_out } from '../models/product_chck_out.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  productAddedTocart_full: Product_full[];
  productAddedTocart:Product[];
  productAddedTocart_chck_out:Product_chck_out[]
  allTotal:number;
  orderItem:OrderItem[];
  orderDetail:OrderDetail;
  constructor( private _mainService:mainService, private router:Router) { }

  ngOnInit() {
   this.productAddedTocart=this._mainService.getProductFromCart();
    for(let i in this.productAddedTocart){
     // this.productAddedTocart[i].Quantity=1;
    }

    this.productAddedTocart_chck_out=this._mainService.getProductFromCart();
    for(let i in this.productAddedTocart_full){

    }

    // add to
    this._mainService.removeAllProductFromCart();
   // this._mainService.addProductToCart(this.productAddedTocart);
   // this.calculteAllTotal(this.productAddedTocart); 
   //this._mainService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart); 

  } //  end ng onit

  // confrim order all data set
  ConfirmOrder(){
    const date:Date=new Date();
    var day=date.getDate();
    var monthIndex=date.getMonth()+1;
    var year=date.getFullYear();
    var minutes=date.getMinutes();
    var hours=date.getHours();
    var second=date.getSeconds();
    var dateTimeStamp=year.toString() +'-'+ monthIndex.toString() +'-'+ day.toString()+ ' ' + hours.toString() +':'+ minutes.toString() + ':'+ second.toString();
    console.log(dateTimeStamp)
   // console.log(monthIndex)
    console.log(day.toString())
    let orderDetail:any={};


    // start oder by json
    this.orderItem=[];


    let total_pricei = 0
    let price = 0
    let is_variant:number;
    let is_variant_st:number;
    let prod_price:number;
    for (let i in this.productAddedTocart_chck_out) {

      //console.log(this.productAddedTocart_chck_out)
      if(this.productAddedTocart_chck_out[i].base_price>0){
        price=this.productAddedTocart_chck_out[i].Quantity * this.productAddedTocart_chck_out[i].base_price;
        prod_price= this.productAddedTocart_chck_out[i].base_price;
        is_variant=0;        
      }

      if(this.productAddedTocart_chck_out[i].full_price>0){
        price=this.productAddedTocart_chck_out[i].Quantity * this.productAddedTocart_chck_out[i].full_price;
        prod_price= this.productAddedTocart_chck_out[i].full_price;
        is_variant=1;
       // console.log(is_variant)
        }

      if(this.productAddedTocart_chck_out[i].half_price>0){
        price=this.productAddedTocart_chck_out[i].Quantity * this.productAddedTocart_chck_out[i].half_price;
        prod_price= this.productAddedTocart_chck_out[i].half_price;
        is_variant=1;
      }
      total_pricei += price
      //is_variant_st:is_variant
      this.orderItem.push({      
        item_id:this.productAddedTocart_chck_out[i].id,              
        quantity:this.productAddedTocart_chck_out[i].Quantity,
        total_price:price,
       // total_price:this.productAddedTocart_chck_out[i].base_price,
       // total_price:this.productAddedTocart_chck_out[i].base_price,
        unit_price:prod_price,       
        quantity_type:is_variant
      }) ;
     
    } 
    

    // order 
    orderDetail.orderItem=this.orderItem;
    let time:number;
   // console.log( this.orderItem, 'time':dateTimeStamp);
   
   var testObject ={ order:this.orderItem,
    cgst:this.allTotal*2.5/100 ,
    sgst:this.allTotal*2.5/100,
    created_on:dateTimeStamp,
    total_price:this.allTotal,
    payable_price:this.allTotal,
    grand_total:this.allTotal+this.allTotal*2.5/100+this.allTotal*2.5/100,
    
   };

   localStorage.setItem("checkout", JSON.stringify( testObject));    
   // localStorage.setItem("checkout", JSON.stringify( this.orderItem ));    
    this.router.navigate(['/checkout']);
  }

  increase(product:Product){
    console.log(product);
    this.productAddedTocart=this._mainService.getProductFromCart();   
    //this.productAddedTocart.find(p=>p.id==product.id).Quantity=product.Quantity+1;
    //Find produc for which we want to update the quantity
    let tempProd= this.productAddedTocart.find(p=>p.id==product.id);  
    tempProd.Quantity=tempProd.Quantity+1;
    
    console.log(tempProd.Quantity);
    this._mainService.removeAllProductFromCart();
    this._mainService.addProductToCart(this.productAddedTocart);

    console.log('this product add'+ this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    return this.calculteAllTotal(this.productAddedTocart);

  }
// one by one remove
  decrease(product:Product){
    console.log(product);
    this.productAddedTocart=this._mainService.getProductFromCart();
    let tempProd=this.productAddedTocart.find(p=>p.id==product.id);
    tempProd.Quantity=tempProd.Quantity-1;

    console.log(tempProd.Quantity);
    this._mainService.removeAllProductFromCart();
    this._mainService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    
  }

  calculteAllTotal(allItems:Product[]){
    let total=0;
    let total_half=0;
    let total_full=0;
    let total_base=0;
    for(let i in allItems){
     // console.log(allItems)

      if(allItems[i].base_price ==null && allItems[i].full_price ==null && allItems[i].half_price >= 0 ){
       // console.log(allItems[i])
        total_half=total_half+(allItems[i].Quantity * allItems[i].half_price );
      //  console.log(total_half);
      }

      if(allItems[i].base_price ==null && allItems[i].full_price >= 0 && allItems[i].half_price ==null ){      
     //   console.log(allItems[i])
        total_full=total_full+(allItems[i].Quantity * allItems[i].full_price );
      //  console.log(total_full);
      }

      if(allItems[i].base_price >= 0 && allItems[i].full_price  ==null && allItems[i].half_price ==null ){      
      //  console.log(allItems[i])
        total_base=total_base+(allItems[i].Quantity * allItems[i].base_price );
       // console.log(total_base);
      }


      // total=total+(allItems[i].Quantity * allItems[i].base_price );
      // console.log(total_base ,total_full , total_half);  

    } // end for llop

    this.allTotal=total_base+total_full+total_half;
    //console.log(total);
    let totcart=allItems.length;
  //  console.log(totcart);
  }// end calculate items


}
