import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthInfo } from "./auth-info";
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  authState: Observable<firebase.User>;
  authUser: firebase.User;
  sbAuthState: Subscription;
  curUserOB: Observable<any>;
  sbCurUserOB: Subscription;



  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);



  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private router:Router
    ) {
    this.authState = afAuth.authState;

   }

  userSignIn(username, password, successCallback, onErrorCallBack) {
    
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
      .then(value => {

        this.authUser = value.user;
        this.authInfo$.next(new AuthInfo(this.afAuth.auth.currentUser.uid));
        this.getCurrentUser(successCallback, onErrorCallBack)
      })
      .catch(err => {
        if (onErrorCallBack)

          onErrorCallBack(err);
        onErrorCallBack = null;
      });
  }


  authStateObservable(): any {
    return this.authState;
  }

  SendPasswordResetEmail(email, SendForgotEmailAction) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(() =>
      SendForgotEmailAction(true)
    ).catch((error) =>
      SendForgotEmailAction(false)
    );
  }

  getCurrentUser(successCallback, onErrorCallBack) {
    this.sbAuthState = this.authState.subscribe(authuser => {
    if(authuser == null) return onErrorCallBack("");
    if(authuser.uid != null || typeof(authuser.uid)!="undefined")
      successCallback(authuser.uid);
      // this.authUser = authuser;
    }),err=>{
      onErrorCallBack(err);
    };
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

 logout() {
  this.afAuth.auth.signOut();
  this.authInfo$.next(AuthService.UNKNOWN_USER);
  this.router.navigate(['/login'],{ replaceUrl: true });
}
}
