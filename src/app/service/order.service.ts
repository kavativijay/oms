import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs:AngularFirestore) { }

  getAllOrders(){

     return this.afs.collection('orders').valueChanges();
  }

  getAllItems(){
   return this.afs.collection('items').valueChanges()

  }

  addOrder(orderModel:OrderModel){
    return this.afs.collection('orders').doc(orderModel.id).set(orderModel,{merge:true});
  }
  
  deleteOrder(orderModel:OrderModel){
    return this.afs.collection('orders').doc(orderModel.id).delete();

  }
}
