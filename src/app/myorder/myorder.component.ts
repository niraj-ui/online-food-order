import { Component, OnInit } from '@angular/core';
import { mainService } from '../home/main.services';
import { Product } from '../models/product.model';
import { MessagingService } from '../Services/messaging.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
   message;
    
  constructor(private _mainservice:mainService, private messagingservice:MessagingService) { }
 
 

  ngOnInit() {
     const userId=9;
     this.messagingservice.requestPermission(userId);
     this.messagingservice.receiveMessage()
     this.message=this.messagingservice.currentMessage



}
}
