import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
// import { MaterialModule } from './material/material.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from './service/security/auth.service';
import { AuthguardService } from './service/security/authguard.service';
import { LoadingService } from './service/loading.service';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { MaterialModule } from '../app/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoadingComponent,
    OrdersPageComponent,
    OrderDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents:[LoadingComponent,OrderDialogComponent],
  providers: [AuthService,AuthguardService,LoadingService],

  bootstrap: [AppComponent]
})
export class AppModule { }
