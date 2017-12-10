/**
 *  * https://github.com/tongyy/react-native-draggable
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
const Window = Dimensions.get('window');

export default class Draggable extends Component {
    static propTypes = {
        renderText: PropTypes.string,
        renderShape: PropTypes.string,
        renderSize: PropTypes.number,
        imageSource: PropTypes.number,
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        renderColor: PropTypes.string,
        reverse: PropTypes.bool,
        pressDrag: PropTypes.func,
        pressDragRelease: PropTypes.func,
        longPressDrag: PropTypes.func,
        pressInDrag: PropTypes.func,
        pressOutDrag: PropTypes.func,
        isVisible:PropTypes.bool,
        z: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number

    };
    static defaultProps = {
        offsetX: 100,
        renderShape: 'circle',
        renderColor: 'yellowgreen',
        renderText: '＋',
        renderSize: 36,
        offsetY: 100,
        reverse: true
    }

    constructor(props) {
        super(props);
        const {pressDragRelease, reverse, renderSize, x, y} = props;

        this.state = {
            pan: new Animated.ValueXY(),
            _value: {x: 0, y: -Window.height / 2},
            size: renderSize
        };
        this.state.pan.setValue(this.state._value)

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                // if (reverse == false) {
                    this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
                    this.state.pan.setValue({x: 0, y: 0});
                // }
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gestureState) => {
                if (pressDragRelease) {
                    this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
                    this.state.pan.setValue({x: 0, y: 0});
                    //this.reversePosition()
                    pressDragRelease(this.state._value)

                }
            }
        });
    }

    componentWillMount() {
        this.state.pan.addListener((c) => this.state._value = c);
        const {x, y} = this.props;
        Animated.timing(
            this.state.pan, {
                toValue: {y: y, x: x},
                duration: 3 * 1000,
            }
        ).start();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible===false) {
            
            Animated.timing(
                this.state.pan, {
                    toValue: {y: -1000, x: -1000},
                    duration: 3 * 1000,
                }
            ).start();
        }
    }

    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }

    _dragItemCss = () => {
        const {renderShape, renderSize, renderColor} = this.props;
        if (renderShape == 'circle') {
            return {
                backgroundColor: renderColor,
                width: renderSize * 2,
                height: renderSize * 1,
                borderRadius: renderSize,
                opacity: 0.92
            };
        } else if (renderShape == 'square') {
            return {
                backgroundColor: renderColor,
                width: renderSize * 2,
                height: renderSize * 2,
                borderRadius: 0
            };
        } else if (renderShape == 'image') {
            return {
                width: renderSize,
                height: renderSize
            };
        }
    }
    _dragItemTextCss = () => {
        const {renderSize} = this.props;
        return {
            marginTop: renderSize - 20,
            marginLeft: 5,
            marginRight: 5,
            textAlign: 'center',
            color: '#fff'
        };
    }
    _getTextOrImage = () => {
        const {renderSize, renderShape, renderText, imageSource} = this.props;
        if (renderShape == 'image') {
            return (<Image style={this._dragItemCss(renderSize, null, 'image')} source={imageSource}/>);
        } else {
            return (<Text style={this._dragItemTextCss(renderSize)}>{renderText}</Text>);
        }
    }

    reversePosition = () => {
        var halfw = this.state.renderSize / 2;
        var halfh = this.state.renderSize / 2;
        var bounds = {
            tl: {x: halfw, y: halfh},
            br: {x: Window.width, y: Window.height}
        };

        // // top-left  corner
        // // alert(Window.width);
        // if(this.state._value.x < 0 || this.state._value.y < 0){
        //     this.state._value.x = Math.max(this.state._value.x, bounds.br.x );
        //     this.state._value.y = Math.max(this.state._value.y , bounds.br.y )
        //     Animated.spring(
        //         this.state.pan,
        //         {toValue:{x:this.state._value.x,y:this.state._value.y}}
        //     ).start();
        // }
        //
        //
        // // bot-right corner
        // if(this.state._value.x > bounds.br.y || this.state._value.y > bounds.br.x ){
        //     this.state._value.x = Math.min(this.state._value.x, 0  );
        //     this.state._value.y = Math.min(this.state._value.y, Window.height/2 )
        //     Animated.spring(
        //         this.state.pan,
        //         {toValue:{x:this.state._value.x,y:this.state._value.y}}
        //     ).start();
        // }


    }
    render() {
        const touchableContent = this._getTextOrImage();
        const {pressDrag, longPressDrag, pressInDrag, pressOutDrag} = this.props;

        return (

            <Animated.View
                //pointerEvents={this.props.isVisible ? 'auto' : 'none'}
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout()]}>
                <TouchableOpacity
                    style={this._dragItemCss()}
                    onPress={pressDrag}
                    onLongPress={longPressDrag}
                    onPressIn={pressInDrag}
                    onPressOut={pressOutDrag}
                >
                    {touchableContent}
                </TouchableOpacity>
            </Animated.View>

        );
    }
}


