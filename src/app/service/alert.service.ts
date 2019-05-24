import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar:MatSnackBar) { }

  ShowSuccessToast(message)
  {

  this.snackbar.open(message,null,{
       duration: 3000,
       panelClass:['success'],
       verticalPosition: 'top',
       horizontalPosition: 'right'
     });
  }
  ShowFailedToast(message)
  {
   this.snackbar.open(message,null,{
    duration: 3000,
    panelClass:['failure'],
    verticalPosition: 'top',
    horizontalPosition: 'right'
    });
  }
}
