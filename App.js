import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Orientation from 'react-native-orientation';
import AddNote from './components/AddNote'
import './lib/sqlite';
// import PinchZoomView from 'react-native-pinch-zoom-view';
// import ConsolePanel, {displayWhenDev} from 'react-native-console-panel';

export default class App extends Component<{}> {

    componentDidMount() {
       // Orientation.lockToLandscape();
        // Orientation.lockToPortrait();
    }


    render() {
        return (
                <View style={styles.container}>

                    <Image
                        style={styles.stretch}
                        source={require('./www/img/club_floorplan.png')}
                    />
                    <AddNote />
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    stretch: {
        position: 'absolute',
        width: '98%',
        height: '98%',
        resizeMode: 'contain',
    }
});
