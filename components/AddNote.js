import React from 'react'
import fire from '../lib/firebase'
import firebase from 'firebase'
import nextZIndex from '../components/notesZStore'
import {TouchableOpacity, Alert, StyleSheet, Text, View} from 'react-native'
import Form from 'react-native-advanced-forms'
import NoteList from './NoteList'
// import { Button } from 'react-native-elements'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            new: 0
        };
        this.items = [];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fire = fire.database()
            .ref(`/tables/${this.props.index}`);
        // Orientation.lockToLandscape();
        // // Orientation.lockToPortrait();
    }

    handleChange(event) {
        //this.setState({value: event.target.value});
    }

    render() {
        return (
            <View >
                <Form style={{flex: 1, flexDirection: 'row'}}
                      ref="form"
                      onChange={this.onChange.bind(this)}
                      onSubmit={this.onSubmit.bind(this)}
                      validate={this.validate.bind(this)}>
                    <Form.Field name="value" value="Create Tables" style={styles.field}>
                        <Form.TextField type="text"
                                        style={styles.fieldText}
                                        value={this.state.value}
                                        placeholder="Table Name"/>
                    </Form.Field>
                    < TouchableOpacity
                        style={styles.buttonCreate}
                        onPress={() => this.refs.form.validateAndSubmit()}
                    ><Text> Create </Text>
                    </TouchableOpacity>

                    < TouchableOpacity
                        onPress={this.saveToRemove}
                        style={styles.buttonSave}
                    ><Text> Save </Text>
                    </TouchableOpacity>
                </Form>
                <NoteList addTable={this.state.new}/>
            </View>

        )
    }

    onChange(values) {
        this.setState(values)

    }

    onSubmit(values) {
        alert('A Table was Created: ' + this.state.value);
        // console.log(event);
        let title = values.value;
        let data ={
            title: title,
            zIndex: nextZIndex(),
            left: -100,
            top: -200
        };
        firebase.database().ref('/tables').push(data);
        SQLiteDB.insert(`INSERT INTO 'tables' (dataDump) VALUES (${data.toString()})`);
        //NoteList.forceUpdate()
    }

    validate(values) {
        if (!values.value || !values.value.length)
            alert('Please name table!');
        this.setState({new: this.state.new++})
    }

    saveToRemove() {
        Alert.alert(
            `Update remote tables:`,
            'Would you like to update now?',
            [
                {text: 'Yes', onPress: () => console.log('Cancel Pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: false}
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 1,
        paddingHorizontal: 20
    },
    row: {
        marginBottom: 20,
    },
    columns: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    field: {
        marginRight: 5,
        marginTop: 5,
        width: 160,
        height: 35,
    },
    ageField: {
        width: 60,
    },
    buttonSave: {padding: 5, marginRight: 5, marginTop: 5, height: 30, backgroundColor: '#d8c5f9', opacity: 0.7},
    buttonCreate: {padding: 5, marginRight: 5, marginTop: 5, height: 30, backgroundColor: '#50c4b6', opacity: 0.7},
    fieldText: {padding: 5, height: 30, backgroundColor: '#f4fff4', opacity: 0.7},
    error: {
        marginTop: 10,
    },
    errorMsg: {
        color: 'red'
    }
});