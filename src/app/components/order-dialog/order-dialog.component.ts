import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderModel } from 'src/app/models/order-model';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderService } from 'src/app/service/order.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  myform:FormGroup;
  add:boolean  = false;
  view:boolean = false;
  edit:boolean = false;
  @Input() actionType = "VIEW";
  // @Input() orderModel = new OrderModel();
  orderModel:any;
  items = [];
  selectedItem = new FormControl();
  value:string;


  
  constructor(@Inject(MAT_DIALOG_DATA) private data, private _formBuilder:FormBuilder, private alertService:AlertService,
   private dialogRef:MatDialogRef<OrderDialogComponent>, private afs:AngularFirestore, private orderService:OrderService) { 
    if(data) {
      if(data.actionType) {
      this.actionType = data.actionType;
    

     switch (this.actionType) {
        case "ADD":
            this.add = true;
            break;
        case "VIEW":
            this.view = true;
            break;
        case "EDIT":
          this.edit = true;
          break;
        default:
        this.view = true;
      }
    }
    if(data.order) this.orderModel = data.order;
    this.items = data.items;
    if(this.view || this.edit){
      const i  = this.items.find(x=>x.value == this.orderModel.orderName);
      this.selectedItem = new FormControl(i);
      this.value = this.selectedItem.value.price;
    }
    
  }
  debugger
  this.myform = this._formBuilder.group(this.orderModel);
  }

  ngOnInit() {
  }

  editOrder(){
    document.getElementById('hide').style.display ='none';
    this.view = false;
    this.edit = true;
    this.add = false;
  }

  deleteOrder(){
    if(window.confirm("Are you sure want to delete the order?")){
      this.orderService.deleteOrder(this.orderModel)
      .then(x=>{
          this.alertService.ShowSuccessToast("Order Deleted.")
        // alert('order deleted')
      })
    }
  }

  showCart(data){
    this.value = data.value.price;
  }

  dialogClose(){
    this.dialogRef.close();
  }

  submit(){
   this.orderModel = this.myform.value;
   this.orderModel.orderTotal = this.value;
   this.orderModel.orderNumber = Math.floor(100000 + Math.random() * 900000);
   this.orderModel.orderId = this.selectedItem.value.id;
   if(this.add)
   this.orderModel.id = this.afs.createId();
  //  this.afs.collection('orders').doc(this.orderModel.id).set(this.orderModel,{merge:true}).then(x=>{
  //    alert("Order Placed Successfully!!!")
  //    this.dialogRef.close();
  //  });

   this.dialogRef.close(this.orderModel);



  }

}
