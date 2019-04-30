import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { mainService } from '../home/main.services';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor{
    constructor( private _injector:Injector ){
    }

    intercept(req, next){
      //  console.log('tokenizeReq');
        let authService=this._injector.get(mainService)
        let tokenizeReq=req.clone({
            setHeaders:{
                authorization: authService.getToken()
            }
        }) // let close
     //   console.log(tokenizeReq);
        return next.handle(tokenizeReq); 
     }
}