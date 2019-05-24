import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/service/order.service';
import { AlertService } from 'src/app/service/alert.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit,OnDestroy {

  dialogRef:MatDialogRef<OrderDialogComponent>;
  // allOrders:OrderModel[];
  allOrders = [];

  items = [];

  sbOrders:Subscription;
  sbItems:Subscription;


  view = false;
  edit = false;
  add  = false;

  orderModel:OrderModel = {
    orderDueDate:new Date(),
    orderId         : '',
    orderNumber     : 0,
    customerName    : '',
    customerAddress : '',
    customerPhone   : '',
    orderTotal      : 0  

  }

  constructor( private dialog:MatDialog,private afs:AngularFirestore, private orderService:OrderService,
    private alertService:AlertService, private loadingService:LoadingService) {
      this.loadingService.show();
      this.sbItems = this.orderService.getAllItems().subscribe(items=>{
      this.items = items;
      this.sbOrders = this.orderService.getAllOrders().subscribe(data=>{
        this.allOrders = data;
        this.loadingService.hide();
        this.allOrders.forEach(ele=>{
          ele.orderName =  this.items.find(x=>x.id == ele.orderId).value;
        })
      })
    })

   }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.sbItems)  this.sbItems.unsubscribe();
    if(this.sbOrders) this.sbOrders.unsubscribe();

  }

  addOrder(){
    this.add = true;
    this.edit = false;
    this.view = false; 
    this.openDialog("ADD");
  }

  viewOrder(order){
    this.view = true;
    this.edit = false;
    this.add = false;
    this.openDialog("VIEW",order);
  }
  
  editOrder( order){
    this.edit = true;
    this.view = false;
    this.add = false; 
    // delete order.orderName;
    this.openDialog("EDIT",order);
  }
  



  openDialog(actionType, order?){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    dialogConfig.direction='ltr'; 
    dialogConfig.closeOnNavigation = true;

    if((actionType == 'ADD')||(actionType =='VIEW')||(actionType =='EDIT')){
      dialogConfig.data = {
                              actionType   : actionType,
                              order         :order? order:this.orderModel,
                              items       :this.items
                          }
                        }
                        this.dialogRef = this.dialog.open(OrderDialogComponent, 
                          dialogConfig
                        );

                    if(this.add){
                      this.AddClosedEvent(order)
                    }
                    if(this.edit || this.view){
                      this.edit = true;
                      this.EditClosedEvent(order)
                    }
                }

  AddClosedEvent(order){
    this.dialogRef.afterClosed().subscribe(
      (result) => {   
        if(!result) return;
        if(this.add){
          this.orderService.addOrder(result).then(out=>{
                     this.alertService.ShowSuccessToast('Order Placed Succesfully.')
                   }).catch(err =>{
                      this.alertService.ShowFailedToast('Order Not Placed : '+err);
                   })
          }
          })
  }          
  
  EditClosedEvent(order){
    this.dialogRef.afterClosed().subscribe(
      (result) => { 
        if(!result) return;
        if(this.edit){
    delete order.orderName;
          this.orderService.addOrder(result).then(out=>{
                     this.alertService.ShowSuccessToast('Order Edited Succesfully.')
                   }).catch(err =>{
                      this.alertService.ShowFailedToast('Order Not Placed : '+err);
                   })
          }
      }),
      (error)=>{
        console.log('Dialog Error:',error);
      }
  }

  deleteOrder(order){
    if(window.confirm("Are,You Sure Want to Delete This Order")){
      this.orderService.deleteOrder(order)
      .then(x=>{
        this.alertService.ShowSuccessToast('Order Deleted')
      })
    }
  }

}
