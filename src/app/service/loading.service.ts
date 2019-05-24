import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dialogRef:any


  constructor(private dialog: MatDialog)
  {

  }
  show()
  {
     this.dialogRef = this.dialog.open(LoadingComponent, { disableClose:true});
  }
  hide()
  {
    if(typeof(this.dialogRef) != "undefined")
    this.dialogRef.close()
  }
}
