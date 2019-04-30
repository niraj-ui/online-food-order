import { Component, OnInit, inject, Inject, Input, Output } from '@angular/core';
import { mainService } from '../home/main.services';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/OrderItem.Model';
import { SharedService } from '../Services/shared.service';
import { IAlert } from '../models/IAlert';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product_full } from '../models/product_full.Model';
import { Product_half } from '../models/product_half.Model';
import { Product_base } from '../models/product_base.Model';
import { EventEmitter } from 'events';

export interface DialogData {
  half_price: number;
  pro_name: string;
  full_price:number;
}

@Component({
  selector: 'app-subcateg',
  templateUrl: './subcateg.component.html',
  styleUrls: ['./subcateg.component.css']
})
export class SubcategComponent implements OnInit {

  //@Input()  productAddedTocart_input:Product[];
  // @Input() allTotal_cart:number ;
  // @Output() calculteAllTotal_cart =new EventEmitter();

  subdata=[];
  public alerts: Array<IAlert> = [];
  private counter:number=1;
  productAddedTocart:Product[];
  productAddedTocart_base:Product_base[];
  Quantity:number=1; 
  allItems;
  totcart:any;

  allTotal:number;
  subcat_id:number;
  orderItem:OrderItem[];

  Quantities
  cartItemCount: number = 0;

  half_price: number;
  pro_name: string;
  full_price:number;
  //user:number;
  constructor(private _mainservice:mainService, private _route:ActivatedRoute, private sharedService:SharedService, public dailog:MatDialog) {
  }


  ngOnInit() {

    //this._mainservice.cast.subscribe(user=>this.user=user);

  
    

    this._route.params.subscribe(val=>{
      this._mainservice.get_subcat(this._route.snapshot.params['id'])
      .subscribe(data=>{
        console.log(data)
        data=this.subdata.push(data);
        
        this.subcat_id=this._route.snapshot.params['id'];
        console.log(this.subcat_id);
   
      }) // end subscribe
    }) // route end

    // end routing id get 
    this.productAddedTocart=this._mainservice.getProductFromCart();
    for(let i in this.productAddedTocart){
      //this.productAddedTocart[i].Quantity=1;
    }

    

    // add to
    this._mainservice.removeAllProductFromCart();
    this._mainservice.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart); 

    console.log(this.allTotal)
    


  } // end of ng onit
  
  pQ(product:Product){
    let localprod = JSON.parse(localStorage.getItem('product'))
    for (let singleproduct in localprod){
    let lProdid = localprod[singleproduct];
    if(product.id == lProdid.id){
    return lProdid.Quantity // product.Quantity = +product.Quantity+1
    }

    } // for loop
  } // end pq function
pq_full(product:Product){
      let localprod = JSON.parse(localStorage.getItem('product'))
      for (let singleproduct in localprod){
      let lProdid = localprod[singleproduct];
      if(product.id == lProdid.id && product.full_price==lProdid.full_price){
      // console.log(lProdid);
      // console.log(product.pro_id);
      //this.calculteAllTotal(this.productAddedTocart_base);
      return lProdid.Quantity // product.Quantity = +product.Quantity+1
      }
      } // for loop
    } // end pq function

    pq_half(product:Product){
      let localprod = JSON.parse(localStorage.getItem('product'))
      for (let singleproduct in localprod){
      let lProdid = localprod[singleproduct];
      if(product.id == lProdid.id && product.half_price==lProdid.half_price){
       // console.log(lProdid);
       // console.log(product.pro_id);
       //this.calculteAllTotal(this.productAddedTocart_base);
      return lProdid.Quantity // product.Quantity = +product.Quantity+1
      }
      } // for loop
    } // end pq function


  // dailog open 
  openDialog(product:Product):void{
    console.log('click' + product)
    console.log(product)
    console.log(  product.sub_category_name)

    const dailogRef= this.dailog.open(DialogOverviewExampleDialog,{
      width:'450px',
      data:{id:product.id,sub_category_name:product.sub_category_name, half_price:product.half_price,full_price:product.full_price}
    });

    dailogRef.afterClosed().subscribe(result=>{
      console.log('the dailog is closed');
    })

    //this.calculteAllTotal(this.productAddedTocart_base);

  };// end dailog open 
   

  

  increase(product:Product_base){
    console.log(product);
    this.productAddedTocart_base=this._mainservice.getProductFromCart();   
    //this.productAddedTocart.find(p=>p.id==product.id).Quantity=product.Quantity+1;
    //Find produc for which we want to update the quantity
    let tempProd= this.productAddedTocart_base.find(p=>p.id==product.id);  
    tempProd.Quantity=tempProd.Quantity+1;
    
    console.log(tempProd.Quantity);
    this._mainservice.removeAllProductFromCart();
    this._mainservice.addProductToCart(this.productAddedTocart_base);

    // console.log(this.productAddedTocart_base);
    this.calculteAllTotal(this.productAddedTocart_base);
    return this.calculteAllTotal(this.productAddedTocart_base);

  }
// one by one remove
  decrease(product:Product_base){
    console.log(product);
    this.productAddedTocart_base=this._mainservice.getProductFromCart();
    let tempProd=this.productAddedTocart_base.find(p=>p.id==product.id);
    tempProd.Quantity=tempProd.Quantity-1;
    console.log(tempProd);
    if(tempProd.Quantity<=0 ){
      tempProd.Quantity=0    
      this.productAddedTocart_base.splice(this.productAddedTocart_base.findIndex(item=>item.id===product.id),1) // splice array in find by id or name and delete
    }
    else{console.log('1 mores');}

    //myArray.splice(myArray.findIndex(item => item.field === "cStatus"), 1)
     
    //tempProd.Quantity=tempProd.Quantity-1;
    console.log(tempProd.Quantity);
    this._mainservice.removeAllProductFromCart();
    this._mainservice.addProductToCart(this.productAddedTocart_base);
    this.calculteAllTotal(this.productAddedTocart_base);
    
  }
  

  // add to cart product in cart 
  OnAddCart(product:Product_base){
  // console.log(product);
    this.productAddedTocart_base=this._mainservice.getProductFromCart();
    //this._mainservice.addProductToCart()]
    console.log( )

    if(this.productAddedTocart_base==null){
      product.Quantity=1;
      console.log('total product' +  this.productAddedTocart);
      this.productAddedTocart_base=[];
      console.log(product)
      this.productAddedTocart_base.push({id:product.id,sub_category_name:product.sub_category_name,base_price:product.base_price,Quantity:1});
      console.log(this.productAddedTocart_base)
      this._mainservice.addProductToCart(this.productAddedTocart_base);

      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Product added to cart.'
      });  // alert close 
      
      setTimeout(() => {
        this.closeAlert(this.alerts)
      }, 3000);


    }// if close 

    else{
      
      console.log('else work ads to cart' + this.productAddedTocart_base)
      let temProduct=this.productAddedTocart_base.find(p=>p.id==product.id &&  p.base_price==product.base_price);
      console.log(temProduct)
      //if(temProduct==null || temProduct.Quantity==0 ){
      if(temProduct==null  ){
        console.log(  temProduct);
        product.Quantity=1;
        this.productAddedTocart_base.push({id:product.id,sub_category_name:product.sub_category_name,base_price:product.base_price,Quantity:1});
        this._mainservice.addProductToCart(this.productAddedTocart_base);
        // alert se
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });

        setTimeout(() => {
          this.closeAlert(this.alerts);
        }, 3000);
        // end time
        

      } // end if
      else
      {
        console.log(  temProduct);
        this.alerts.push({
          id: 2,
          type: 'warning',
          message: 'Product already exist in cart.'
        });
        // start time
        setTimeout(() => {
          this.closeAlert(this.alerts);
        }, 3000);
      }// end else

    } // else end

         console.log(this.cartItemCount);
        this.cartItemCount=this.productAddedTocart_base.length;
        // this.cartEvent.emit(this.cartItemCount);
        this.sharedService.updateCartCount(this.cartItemCount);

  }

  calculteAllTotal(allItems:Product_base[]){
    console.log(allItems)
    let total=0;
    for(let i in allItems){
      total=total+(allItems[i].Quantity)
    } // end for llop

    this.allTotal=total;
    this.totcart=this.allTotal;    
    //console.log(this.totcart); 
   this._mainservice.editUser(this.allTotal);
   localStorage.setItem('total_cart', this.totcart);
    
  }// end calculate items




  ///// close alert 
  public closeAlert(alert:any){
    const index:number= this.alerts.indexOf(alert);
    this.alerts.splice(index,1)
  }



  // ---------------------- */------------------------------------------*/ -------

       
  



}
  // export start pop modal call

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-pop.html',
})
export class DialogOverviewExampleDialog implements OnInit{
  productAddedTocart_full: Product_full[];
  productAddedTocart_half: Product_half[];
  Quantity:number=1;
  public alerts: Array<IAlert> = [];
  allTotal;
  totcart
  //productAddedTocart_full_half_quan;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public  data:DialogData, private _mainservice:mainService){}

    ngOnInit(){

      this.productAddedTocart_full_half_quan(this.productAddedTocart_half); 

      this.productAddedTocart_full=this._mainservice.getProductFromCart_full();
      for(let i in this.productAddedTocart_full){
        //this.productAddedTocart[i].Quantity=1;
      }
    } // end ng oinit

    onNoClick(): void {
      this.dialogRef.close();
    }


    // start here decrease or increase
    pq_full(product:Product){
      let localprod = JSON.parse(localStorage.getItem('product'))
      for (let singleproduct in localprod){
      let lProdid = localprod[singleproduct];
      if(product.id == lProdid.id && product.full_price==lProdid.full_price){
        
       // console.log(product.pro_id);
      return lProdid.Quantity // product.Quantity = +product.Quantity+1
      }
      } // for loop
    } // end pq function

    pq_half(product:Product){
      let localprod = JSON.parse(localStorage.getItem('product'))
      for (let singleproduct in localprod){
      let lProdid = localprod[singleproduct];
      if(product.id == lProdid.id && product.half_price==lProdid.half_price){
       // console.log(lProdid);
       // console.log(product.pro_id);
      return lProdid.Quantity // product.Quantity = +product.Quantity+1
      }
      } // for loop
    } // end pq function

   
    sub_half_minus(product:Product_half){

      this.productAddedTocart_half=this._mainservice.getProductFromCart_full();
      console.log(this.productAddedTocart_half)
      let tempProd=this.productAddedTocart_half.find(p=>p.id==product.id &&  p.half_price==product.half_price);
     // console.log(tempProd.Quantity)
      tempProd.Quantity=tempProd.Quantity-1;
      console.log(tempProd.Quantity)


      if(tempProd.Quantity<=0 ){
        tempProd.Quantity=0          
      }
      else{console.log('1 mores');}

        this._mainservice.removeAllProductFromCart_full();
        this._mainservice.addProductToCart_full(this.productAddedTocart_half);

        this.productAddedTocart_full_half_quan(this.productAddedTocart_half)
    }// end half 

    sub_half_plus(product:Product_half){
      console.log(product);
      this.productAddedTocart_half=this._mainservice.getProductFromCart_full();   
   
      let tempProd= this.productAddedTocart_half.find(p=>p.id==product.id &&  p.half_price==product.half_price );  
      tempProd.Quantity=tempProd.Quantity+1;
      
      this._mainservice.removeAllProductFromCart_full();
      this._mainservice.addProductToCart_full(this.productAddedTocart_half);

      this.productAddedTocart_full_half_quan(this.productAddedTocart_half);
      //console.log(this.productAddedTocart_half);  
    } // end half product plus

    sub_full_minus(product:Product_full){
      this.productAddedTocart_full=this._mainservice.getProductFromCart_full();
      console.log(this.productAddedTocart_full)
      let tempProd=this.productAddedTocart_full.find(p=>p.id==product.id &&  p.full_price==product.full_price);
      console.log(tempProd.Quantity)
      tempProd.Quantity=tempProd.Quantity-1;
      console.log(tempProd.Quantity)
      if(tempProd.Quantity<=0 ){
        tempProd.Quantity=0          
      }
      else{console.log('1 mores');}

        this._mainservice.removeAllProductFromCart_full();
        this._mainservice.addProductToCart_full(this.productAddedTocart_full);
        this.product_full_quan(this.productAddedTocart_full)
    }

    sub_full_plus(product:Product){
      console.log(product);
      this.productAddedTocart_full=this._mainservice.getProductFromCart_full();   
   
      let tempProd= this.productAddedTocart_full.find(p=>p.id==product.id &&  p.full_price==product.full_price );  
      tempProd.Quantity=tempProd.Quantity+1;
      
      this._mainservice.removeAllProductFromCart_full();
      this._mainservice.addProductToCart_full(this.productAddedTocart_full);  
     // console.log(this.productAddedTocart_full);   
      this.product_full_quan(this.productAddedTocart_full) 
    }

 
    
  // add to cart product in cart 
  OnAddCart_full(product:Product_full){    

      this.productAddedTocart_full=this._mainservice.getProductFromCart_full();
      //this._mainservice.addProductToCart()]
      console.log( )
  
      if(this.productAddedTocart_full==null){
        console.log('total product' +  this.productAddedTocart_full);
        this.productAddedTocart_full=[];
        console.log(product)
        this.productAddedTocart_full.push({id:product.id,sub_category_name:product.sub_category_name,full_price:product.full_price,Quantity:1 });
        console.log(this.productAddedTocart_full)
        this._mainservice.addProductToCart_full(this.productAddedTocart_full);
  
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });  // alert close 
        
        setTimeout(() => {
        //  this.closeAlert(this.alerts)
        }, 3000);
  
  
      }// if close 
  
      else{
        
        console.log('else work ads to cart')
        console.log(this.productAddedTocart_full)
        let temProduct=this.productAddedTocart_full.find(p=>p.id==product.id &&  p.full_price==product.full_price);
        
        if(temProduct==null){
          product.Quantity=1;
          console.log('niraj' + temProduct);
          this.productAddedTocart_full.push({id:product.id,sub_category_name:product.sub_category_name,full_price:product.full_price,Quantity:product.Quantity});
          this._mainservice.addProductToCart_full(this.productAddedTocart_full);
          // alert se
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Product added to cart.'
          });
  
          setTimeout(() => {
         //   this.closeAlert(this.alerts);
          }, 3000);
          // end time
          
  
        } // end if
        else
        {
          this.alerts.push({
            id: 2,
            type: 'warning',
            message: 'Product already exist in cart.'
          });
          // start time
          setTimeout(() => {
           // this.closeAlert(this.alerts);
          }, 3000);
        }// end else
  
      } // else end
  
        
  
    } // end on add to cart full size

    OnAddCart_half(product:Product_half){    

      this.productAddedTocart_half=this._mainservice.getProductFromCart_full();
      //this._mainservice.addProductToCart()]
      console.log( )
  
      if(this.productAddedTocart_half==null){
        console.log('total product' +  this.productAddedTocart_half);
        this.productAddedTocart_half=[];
        console.log(product)
        this.productAddedTocart_half.push({id:product.id,sub_category_name:product.sub_category_name,half_price:product.half_price,Quantity:1 });
        console.log(this.productAddedTocart_half)
        this._mainservice.addProductToCart_full(this.productAddedTocart_half);
  
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });  // alert close 
        
        setTimeout(() => {
        //  this.closeAlert(this.alerts)
        }, 3000);
  
  
      }// if close 
  
      else{
        
        console.log('else work ads to cart')
        console.log(this.productAddedTocart_half)
        let temProduct=this.productAddedTocart_half.find(p=>p.id==product.id &&  p.half_price==product.half_price);
        
        if(temProduct==null){
          product.Quantity=1;
          console.log('niraj' + temProduct);
          this.productAddedTocart_half.push({id:product.id,sub_category_name:product.sub_category_name, half_price:product.half_price,Quantity:product.Quantity});
          this._mainservice.addProductToCart_full(this.productAddedTocart_half);
          // alert se
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Product added to cart.'
          });
  
          setTimeout(() => {
         //   this.closeAlert(this.alerts);
          }, 3000);
          // end time
          
  
        } // end if
        else
        {
          this.alerts.push({
            id: 2,
            type: 'warning',
            message: 'Product already exist in cart.'
          });
          // start time
          setTimeout(() => {
           // this.closeAlert(this.alerts);
          }, 3000);
        }// end else
  
      } // else end
  
        
  
    } // end on add to cart full size
  

    productAddedTocart_full_half_quan(prod_count:Product_half[]){
      console.log(prod_count);
      let total=0;
    for(let i in prod_count){
      total=total+(prod_count[i].Quantity)
    } // end for llop
    console.log()
    this.allTotal=total;
    console.log(this.allTotal)
    this.totcart=this.allTotal;    
    console.log(this.totcart)
    this._mainservice.editUser(this.allTotal);
    localStorage.setItem('total_cart', this.totcart);
    }

    product_full_quan(prod_count:Product_full[]){
      console.log(prod_count);
      let total=0;
    for(let i in prod_count){
      total=total+(prod_count[i].Quantity)
    } // end for llop
    console.log()
    this.allTotal=total;
    console.log(this.allTotal)
    this.totcart=this.allTotal;    
    console.log(this.totcart)
    this._mainservice.editUser(this.allTotal);
    localStorage.setItem('total_cart', this.totcart);
    }
  
}
