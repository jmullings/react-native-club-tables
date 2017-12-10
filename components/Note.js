import React from 'react'
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Draggable from '../components/Draggable';
import MarkdownTextarea from '../components/MarkUpDown'
import fire from '../lib/firebase'

export default class Note extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                        noteBlank: true,
                        isDateTimePickerVisible: false,
                        index: this.props.index,
                        cancelEdit: false,
                        displayName: 'Draggable',
                        deltaPosition: {
                        top: this.props.top,
                        left: this.props.left,
                        zIndex: this.props.zIndex,
                            deltaPosition: {
                                x: this.props.left,
                                y: this.props.top
                            },
                            activeDrags:null,
                        renderSize: 30,
                        isVisible :true
            },
        };
        this.prevZIndex = 0
        this.timer = 0;
        this.delay = 200;
        this.prevent = false;
    }

    getInitialState() {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: this.props.left, y: this.props.top
            }
        };
    }
    componentDidMount() {
        this.fire = fire.database()
            .ref(`/tables/${this.props.index}`)
    }

    // componentWillReceiveProps(nextProps) {
    //     this.refs.markdown.setState({
    //         value: nextProps.text,
    //     })
    //     this.refs.draggable.setState({
    //         clientX: nextProps.left,
    //         clientY: nextProps.top,
    //     })
    // }
    doDoubleClickAction(index) {
        Alert.alert(
            `Table Ref - ${index}`,
            'Would you like to update?',
            [
                {text: 'Delete', onPress: () => this.removeTable()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Edit', onPress: () => this.setState({ isDateTimePickerVisible: true })},
            ],
            { cancelable: false }
        )

    }
    removeTable(){

        this.fire.remove().then(function () {
            alert('Removed!!!')
        });
        this.setState({ isVisible: false });
    }
    _showDateTimePicker(){
        this.setState({ isDateTimePickerVisible: true });
    }

    _hideDateTimePicker(){
        this.setState({ isDateTimePickerVisible: false });
    }

    _handleDatePicked(date){
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };
    render() {
        const styles = {
            position: 'absolute',
            background: 'white',
            boxShadow: 'rgb(204, 204, 204) 3px 5px 5px 5px',
            borderRadius: '40%',
            width: 220, height: 100
        }
        let {title, text, left, top} = this.props
        let position = {x: left, y: top, z: this.props.zIndex, width: 220, height: 100}
        const {deltaPosition, controlledPosition} = this.state;
        return (
            <View >

            <Draggable
                renderSize={this.state.render}
                renderColor='#dae5e8'
                offsetX={0}
                offsetY={0}
                renderText= {title}
                z={position.z}
                x={position.x}
                y={position.y}
                isVisible={this.state.isVisible}
                onPressIn={this.handleDrag.bind(this)}
                pressDrag={this.handleDoubleClick.bind(this)}
                pressDragRelease={this.handleStopDrag.bind(this)}>

            </Draggable>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked.bind(this)}
                    onCancel={this._hideDateTimePicker.bind(this)}
                    mode="datetime"
                />
            </View>

        )
    }
    onLayout(event){
        console.log(event.nativeEvent.layout)
    }
    handleDoubleClick(){
        clearTimeout(this.timer);
        this.prevent = true;
        this.doDoubleClickAction(this.state.index);
    }

    handleDrag(event) {
        console.log(event.deltaPosition)
        // const {x, y} = this.state.deltaPosition;
        // this.setState({
        //     deltaPosition: {
        //         x: x + ui.deltaX,
        //         y: y + ui.deltaY,
        //     }
        // });
    }

    handleStopDrag(position) {

        this.setState({
            deltaPosition: {
                left: position.x,
                top: position.y,
                zIndex: this.props.zIndex + 1 || 10000 + 1
            }
        });
       this.fire.update(this.state.deltaPosition)

    }

    handleUpdateText(text) {
        this.fire.update({text})
    }


}
// <Text>x: {deltaPosition.x}, y: {deltaPosition.y}</Text>