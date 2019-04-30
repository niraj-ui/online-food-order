import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mainService } from 'src/app/home/main.services';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  fedback_form:FormGroup;
  submitted=false;
  loading:boolean=false;
  fedback_data=[];
  private fed_data;
  fedback_response;
  constructor(private _mainservice:mainService, private fb:FormBuilder, private _route:ActivatedRoute,private router:Router ) { }


  ngOnInit():void {

    this._route.params.subscribe(val=>{
      this._mainservice.order_det(this._route.snapshot.params['id'])
      .subscribe(data=>{
        console.log(data)
        data=this.fedback_data.push(data)
        console.log(this._route.snapshot.params['id'])
      })// end subcribe
    })

    // submit form start 
    this.fedback_form=this.fb.group({
       order_id:[this._route.snapshot.params['id']],
      rating:['', Validators.required],
      message:['', Validators.required]
     
    })
  } // ng onit 

  get f() { return this.fedback_form.controls; }

  onSubmit(){
    this.submitted=true;
    this.fed_data=this.fedback_form.value;
    this.loading=true;
    console.log(this.fed_data);

    this._mainservice.user_fedbcak(this.f.order_id.value,this.f.rating.value,this.f.message.value)
    .subscribe(data=>{
      console.log(data);
      this.fedback_response=data
      if(this.fedback_response.status){
        this.router.navigate(['/order-list'])
      }
      else{
        console.log(this.fedback_response.msg )
      }
    },
    error=>{console.log(error)}
    )

  }

}
