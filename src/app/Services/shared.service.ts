
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn:'root' })

export class SharedService{
    private currentCartCount=new BehaviorSubject(0);
    currentMessage=this.currentCartCount.asObservable();

    constructor(){}

    updateCartCount(count:number){
        console.log(count);
        this.currentCartCount.next(count);
    }

}
