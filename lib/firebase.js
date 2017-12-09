

/**
 * Created by jlmconsulting on 12/6/17.
 */

import firebase from 'firebase'

    let config = {
        apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        messagingSenderId: "XXXXXXXXXXXXX"
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