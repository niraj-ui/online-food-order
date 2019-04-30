import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mainService } from 'src/app/home/main.services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otp_form:FormGroup;
  submitted=false;
  loading:boolean=false;
   otp_Data;
  constructor(private fb:FormBuilder, private _mainservice:mainService , private router:Router) { }

  ngOnInit() {
    let user_local_id=localStorage.getItem('user_id');
    console.log(user_local_id);

    this.otp_form = this.fb.group({
      otp:['',Validators.required],
      user_id:[user_local_id,Validators.required]
   });
   
  } // end otp 
  get f() { return this.otp_form.controls; }

  onSubmit(){
    
    this.submitted=true;
    //this.otp_Data=this.otp_form.value;
    this.loading=true;
    //console.log(this.otp_Data);

    this._mainservice.get_otp(this.f.otp.value, this.f.user_id.value)
    .pipe(first())
    .subscribe(
      res=>{
        console.log(res);
        this.otp_Data=res;
        console.log(this.otp_Data)
        if(this.otp_Data.status){
          console.log(' true condition')
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/otp']);
        }
        
        
      },
      error=>console.log(error)
    )// subcribe


  }


}
