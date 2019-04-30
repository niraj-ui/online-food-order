import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { mainService } from './home/main.services';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()

export class AuthGuard implements CanActivate{
    chcek_user;

    constructor(private _mainservice:mainService, private router:Router){}

    canActivate():boolean{
        if(this._mainservice.loggedIn()){
            return true;
        }// end if
        this.router.navigate(['/login']);
        return false;
    }// end 


}
