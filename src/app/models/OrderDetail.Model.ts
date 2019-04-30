import { OrderItem } from "./OrderItem.Model";

export interface OrderDetail
{
     OrderID :string;
     CustomerId :string;
     CustomerName:string;
     DeliveryAddress:string;
     Phone:string;
     OrderPayMethod :string;
     PaymentRefrenceId :string;
     OrderItems:OrderItem[];

     ProductName :string;
     
}