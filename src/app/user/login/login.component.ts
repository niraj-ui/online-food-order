import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/home/main.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form:FormGroup;
  submitted=false;
  loading:boolean=false;
   login_Data;
  constructor(private _mainservice:mainService, private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.login_form=this.fb.group({
      mobile:['',Validators.required]
    });
  }
  get f(){return this.login_form.controls}

  onSubmit(){
    this.submitted=true;
    this.loading=true;
    //
    this._mainservice.login(this.f.mobile.value)
    .subscribe(res=>{
      console.log(res)
      this.login_Data=res
     console.log(this.login_Data.user_id);
      //console.log(this.login_Data.status);
      localStorage.setItem('user_id', this.login_Data.user_id);
      if(this.login_Data.status){
        console.log(' u are true');
        this.router.navigate(['/otp'])

      }else{
        console.log(' u are false')
        this.router.navigate(['/register'])
      }

    },
    error => {      
      console.log(error);
    }
    );

  }
}
