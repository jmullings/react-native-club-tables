import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Note from './Note'
import firebase from '../lib/firebase'
import SQLiteDB from '../lib/sqlite'
import _ from 'lodash'


export default class NoteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            new: 0
        };
    }
    componentDidMount() {
        this.getData()
    }



    componentWillUnmount() {
        this.fire.off('value', this.updateMe)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.addTable!==this.state.new)
        this.forceUpdate()
        this.getData()
        this.setState(this.state)
    }
    getData(){
        firebase.database()
            .ref('/tables')
            .once('value')
            .then((snapshot) => {
                this.updateMe(_.map(snapshot.val(), (key, ind)=> {

                    var result = snapshot.val()[key];
                    "object" === typeof result ? result.key = key : result = {_key: key, val: result, ind: ind};
                   // SQLiteDB.insert(`INSERT INTO 'tables' (dataDump) VALUES (${result.toString()})`);
                    return result
                }))
            });
         // SQLiteDB.select("SELECT * FROM `Tables`")
    }


    updateMe(notes) {

        this.setState({notes})
    }

    render() {
        var style = {
            position: 'absolute'
        };

        return (
            <View style={style}>
                {this.state.notes.map((note) => {
                    // console.log(note)
                return <Note
                    key={note.ind}
                    left={note._key.left}
                    top={note._key.top}
                    zIndex={note._key.zIndex}
                    title={note._key.title}
                    text={note._key.text}
                    index={note.ind}/>
            })}
            </View>
        )
    }
}
