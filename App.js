/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: width,
        height: height
    },
});
type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            latitude : 0,
            longitude : 0
        }
    }


    componentDidMount() {
        console.log('asu')
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude : -7.795580,
                    longitude : 110.369490
                })
                console.log("--->",position.coords.latitude)
                console.log("--->",position.coords.longitude)
            })
    }


    render() {
        const { region } = this.props;
        //console.log(region);
        return (
            <View style={styles.container}>
                <View style ={styles.container}>
                    <MapView.Animated
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                        <MapView.Marker
                            coordinate={{
                                latitude: -7.800972499999999,
                                longitude: 110.3622568
                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                        <MapView.Marker
                            coordinate={{
                                latitude: -7.7835968,
                                longitude: 110.3777088
                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                    </MapView.Animated>
                </View>
            </View>
        );
    }
}
