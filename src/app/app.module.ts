import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SubcategComponent, DialogOverviewExampleDialog } from './subcateg/subcateg.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgetPassComponent } from './user/forget-pass/forget-pass.component';
import { OtpComponent } from './user/otp/otp.component';
import { ResetPassComponent } from './user/reset-pass/reset-pass.component';
import { HomeComponent } from './home/home.component';
import { mainService } from './home/main.services';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {DemoMaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
 
import { OwlModule } from 'ngx-owl-carousel';
import { SlickModule } from 'ngx-slick';
import { NgImageSliderModule } from 'ng-image-slider';
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageComponent } from './page/page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MycartComponent } from './mycart/mycart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BonusComponent } from './inner-page/bonus/bonus.component';
import { FeedbacksComponent } from './inner-page/feedbacks/feedbacks.component';
import { ContactComponent } from './inner-page/contact/contact.component';
import { NotificationComponent } from './inner-page/notification/notification.component';
import { MyorderComponent } from './myorder/myorder.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './user/token-interceptor.service';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireMessagingModule} from '@angular/fire/messaging'

import { from } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
//import { environment } from 'src/environments/environment';
import { AsyncPipe } from '@angular/common';
import { MessagingService } from './Services/messaging.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SubcategComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPassComponent,
    OtpComponent,
    ResetPassComponent,
    HomeComponent,
    PageComponent,
    MycartComponent,
    CheckoutComponent,
    BonusComponent,
    FeedbacksComponent,
    ContactComponent,
    NotificationComponent,
    MyorderComponent,DialogOverviewExampleDialog, OrderDetailsComponent, OrderListComponent,

  ],
  imports: [
    
    BrowserModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    OwlModule,
    SlickModule.forRoot(),
    NgImageSliderModule,
    NgbModule,
    FormsModule,
    
    // for firebase notification
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // end firebase notfication

  ],
  providers: [mainService, AuthGuard, AsyncPipe,MessagingService,
  {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent,],
  entryComponents:[DialogOverviewExampleDialog]
})
export class AppModule { }
