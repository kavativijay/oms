// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyD3QCEFy9tzpQXxrXUsC44BT1wQE1IahbU",
    authDomain: "oms-orders.firebaseapp.com",
    databaseURL: "https://oms-orders.firebaseio.com",
    projectId: "oms-orders",
    storageBucket: "oms-orders.appspot.com",
    messagingSenderId: "646121828387",
    appId: "1:646121828387:web:1260656a23346a2e"
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
