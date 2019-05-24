import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router:Router){
    
  }

  hideNavBars()
  {
    if(this.router.url !="/" &&  !this.router.url.includes("/resetPassword") && this.router.url != '/login' && !this.router.url.includes("/signUp") && !this.router.url.includes("/mapWindow"))
    return true;
    else
    return false;
  }
}
