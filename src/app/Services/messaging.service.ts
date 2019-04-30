import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { messaging } from 'firebase';


@Injectable()

export class MessagingService {

    currentMessage=new BehaviorSubject(null)

    constructor(
        private angularFireDB : AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging:AngularFireMessaging

     ){
        this.angularFireMessaging.messaging.subscribe((_messaging)=>{
            _messaging.onMessage=_messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh=_messaging.onTokenRefresh.bind(_messaging);
        })// end subscribe
    } // end constructor 


updateToken(userId, token){
    console.log(token)
    console.log(userId)
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
        ()=>{
            const data={};
            data[userId]=token
            console.log(data);
            this.angularFireDB.object('fcmTokens/').update(data)

        }
    )
}   // end update token

requestPermission(userId){
   // console.log(userId)
    this.angularFireMessaging.requestToken.subscribe((token)=>{
        console.log(token);
        this.updateToken(userId,token)
    },
    (error)=>{console.log(error);}
    )
}// end reuest permission


receiveMessage(){
    this.angularFireMessaging.messaging.subscribe((payload)=>{
        console.log("new message recevide." + payload);
        console.log(payload)
        this.currentMessage.next(payload)
    })
}// end receving message

} // class 