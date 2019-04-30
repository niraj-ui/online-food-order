import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/home/main.services';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  reg_form: FormGroup;
  submitted = false;
  loading:boolean= false;
  private reg;
  reg_data;

  constructor(private _mainservice: mainService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.reg_form = this.fb.group({
     name: ['', Validators.required],
     mobile: ['', Validators.required],
     cb: [false, Validators.requiredTrue]
    //  email:['superuser@gmail.com',Validators.required],
    //  password:['super12345',Validators.required]
    });

    localStorage.setItem('token','0')

  }
  get f() { return this.reg_form.controls; }


  onSubmit() {
    this.submitted = true;
    this.reg = this.reg_form.value;
    this.loading = true;
    console.log(this.reg);

    this._mainservice.register(this.f.name.value, this.f.mobile.value)
    .pipe(first())
    .subscribe(
      res => {
        console.log(res);
        this.reg_data=res;
      
      if (this.reg_data.status) {
      // if(res.status){     
        this.router.navigate(['/otp']);
       } else {
        this.router.navigate(['/register']);
       }
        // console.log(res.data.access)
      }//,
      // error => {console.log(error);

      // }

    );
  }

}
