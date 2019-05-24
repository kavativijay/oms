import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';

const routes: Routes = [
  {path:'',pathMatch:'prefix',redirectTo:'login'},
  { path: 'login', component: LoginComponent},
  {path:'ordersPage',component:OrdersPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
