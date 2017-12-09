

/**
 * Created by jlmconsulting on 12/6/17.
 */

import firebase from 'firebase'

    let config = {
        apiKey: "AIzaSyATnaD4MeuC4mD52iDPo3OcqpRkhQOPxI4",
        authDomain: "upcoin-c20db.firebaseapp.com",
        databaseURL: "https://upcoin-c20db.firebaseio.com",
        projectId: "upcoin-c20db",
        storageBucket: "upcoin-c20db.appspot.com",
        messagingSenderId: "957416747764"
    }
firebase.database.enableLogging(true)
firebase.initializeApp(config)

export default firebase


// $scope.remote = $firebase(db.child('a/b/c')).$asArray();
// $scope.remote.$add({new:'record'});

// import * as firebase from 'firebase'
// let database
//
// export const init = () => {

//     database = firebase.database()
// }