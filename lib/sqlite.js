/**
 * Created by jlmconsulting on 12/8/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
const RNFS = require('react-native-fs');
const SQLite = require('react-native-sqlite-storage')
const sourcePath = RNFS.MainBundlePath + '/www/' + 'schema.db';
const destinPath = RNFS.LibraryDirectoryPath + '/LocalDatabase/' + 'schema.db';

RNFS.exists(destinPath).then((res)=>{
    if (res !==true){
        RNFS.copyFile(sourcePath, destinPath)
        let db = SQLite.openDatabase({
            name: 'schema.db',
            createFromLocation: destinPath,
            location: RNFS.LibraryDirectoryPath

        });
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE `tables` (`index`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `top`	INTEGER, `left`	INTEGER, `zIndex`	INTEGER, `message`	INTEGER, `dates`	INTEGER, `dataDump`	TEXT))',
                [], () => {})
        })

    }

})

let db = SQLite.openDatabase({name: 'schema.db', location: RNFS.LibraryDirectoryPath});

global.SQLiteDB = {

//     const insert = jsonObject.toString();
//
// String json = Read_column_value_logic_here
// const jsonObject = new JSON.Object(json);

    update(query, callback) {
        db.transaction((tx) => {

            tx.executeSql(query, [], (tx, results) => {
                alert(JSON.stringify(results))
                return callback(results)

            })
        })
    },
    insert(query, callback) {
        db.transaction((tx) => {

            tx.executeSql(query, [], (tx, results) => {
                alert(JSON.stringify(results))
                return callback(results)

            })
        })
    },
    select(query, callback) {
        db.transaction((tx) => {

            tx.executeSql(query, [], (tx, results) => {
                var len = results.rows.length;
                alert(len)
                return callback(len)

            })
        })
    }

//     var len = results.rows.length;
// for (let i = 0; i < len; i++) {
//     let row = results.rows.item(i);
//     console.log(`Record: ${row.top}`);
//     this.setState({record: row});
// }

//'UPDATE `tables` SET `dataDump`=? WHERE _rowid_=`1`'

// CREATE TABLE `tables` (`index`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,`top`	INTEGER,`left`	INTEGER,`zIndex` INTEGER, `message` INTEGER,`dates`	INTEGER);
    //   console.log('RNFS.MainBundlePath', RNFS.MainBundlePath);



//INSERT INTO `tables`(`index`,`top`,`left`,`zIndex`,`message`,`dates`) VALUES (1,NULL,NULL,NULL,NULL,NULL);
//Attaching another database
//     let dbMaster, dbSecond;
//
// dbSecond = SQLite.openDatabase({name: 'second'},
//     (db) => {
//         dbMaster = SQLite.openDatabase({name: 'master'},
//             (db) => {
//                 dbMaster.attach( "second", "second", () => console.log("Database attached successfully"), () => console.log("ERROR"))
//             },
//             (err) => console.log("Error on opening database 'master'", err)
//         );
//     },
//     (err) => console.log("Error on opening database 'second'", err)
// );
}
export default  SQLiteDB