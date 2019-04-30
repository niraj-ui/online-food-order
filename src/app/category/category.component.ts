import { Component, OnInit } from '@angular/core';
import { mainService } from '../home/main.services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private _mainservice:mainService) { }
  ca_data=[];
  subcategorydata:object;
  cat_data_send;
  niraj_data=[];

  ngOnInit() {
    console.log('get category')
    this._mainservice.get_cat().subscribe(data=>{
      data=this.ca_data.push(data)     
     // console.log(data)
    })

    // form set

  }

  // post id 
  // click_post_cat_id(id){
  //   //console.log(id);
  //   //let food = {category_id: id};
  //   //this.cat_data_send=id ;
  //   console.log(id)
  //   this._mainservice.get_subcat(id)
  //   .subscribe(
  //     data=>{ 
  //       this.subcategorydata=data; 
  //       data=this.niraj_data.push(data);
  //       console.log(data);
  //      },
  //     error=>console.log(error)
      
  //   )
    
  // }

}
