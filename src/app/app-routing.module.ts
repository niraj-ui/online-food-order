import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubcategComponent } from './subcateg/subcateg.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { RegisterComponent } from './user/register/register.component';
import { MycartComponent } from './mycart/mycart.component';
import { OtpComponent } from './user/otp/otp.component';
import { ContactComponent } from './inner-page/contact/contact.component';
import { NotificationComponent } from './inner-page/notification/notification.component';
import { FeedbacksComponent } from './inner-page/feedbacks/feedbacks.component';
import { MyorderComponent } from './myorder/myorder.component';
import { BonusComponent } from './inner-page/bonus/bonus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LoginComponent } from './user/login/login.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
{path:'', redirectTo:'/home', pathMatch:'full'},
// tabbing start
{path:'category',  component:CategoryComponent, children:[
  {path: 'category', redirectTo: 'subcategory/1'}, 
    {
      path:'subcategory/:id',
      component: SubcategComponent
    },
 
]},

//{path:'category', component:CategoryComponent},
//{path:'subcategory/:id', component:SubcategComponent},
{path:'home',component:HomeComponent,  canActivate:[AuthGuard]},
{path:'page/:id',component:PageComponent, canActivate:[AuthGuard]},
{path:'register', component:RegisterComponent},
{path:'cart',component:MycartComponent, canActivate:[AuthGuard]},
{path:'otp',component:OtpComponent},
{path:'contact',component:ContactComponent, canActivate:[AuthGuard]},
{path:'notifications',component:NotificationComponent, canActivate:[AuthGuard]},

{path:'myorder',component:MyorderComponent, canActivate:[AuthGuard]},
{path:'bonus',component:BonusComponent, canActivate:[AuthGuard]},
{path:'checkout',component:CheckoutComponent, canActivate:[AuthGuard]},
{path:'feedback/:id',component:FeedbacksComponent, canActivate:[AuthGuard]},
{path:'order-details/:id',component:OrderDetailsComponent, canActivate:[AuthGuard]},
{path:'order-list',component:OrderListComponent, canActivate:[AuthGuard]},
{path:'login', component:LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
