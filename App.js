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
    Dimensions, Image
} from 'react-native';
import MapView from 'react-native-maps';
import Axios from 'axios'

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
let url = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-7.795580,110.369490&radius=1000&type=hospital&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
let url_ = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-7.795580,110.369490&radius=1000&type=hospital&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
let data = []
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            data: []
        }
        //this.place = this.place.bind(this)
    }


    componentDidMount() {
        Axios.get(url).then((response) => {
            //console.log(response)
            // response.data.results.map((v, k) => {
            //     this.place(v.place_id)
            //     //console.log("-->",v.place_id)
            // })
            this.setState({
                data:response.data.results
            })
        })
        console.log('asu')
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: -7.795580,
                    longitude: 110.369490
                })
                console.log("--->", position.coords.latitude)
                console.log("--->", position.coords.longitude)
            })
    }

    // place(id) {
    //     Axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4')
    //         .then((response) => {
    //             this.setState({
    //                 data: [...this.state.data, response.data.result]
    //             })
    //             //console.log(response.data.result)
    //             //data.push(response.data.result)
    //             //let joined = this.state.data.concat(response.data.result);
    //             // this.setState({
    //             //     data: joined
    //             // })
    //             //console.log(joined)
    //         })
    //     //console.log(id)
    // }

    render() {
        const {region} = this.props;
        console.log("--->", this.state.data);
        return (
            <View style={styles.container}>
                <View style={styles.container}>
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
                            onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
                        />
                        {
                            this.state.data.map((v, k) => {
                                console.log("-->",v)
                                return (
                                    <MapView.Marker
                                        key={k}
                                        coordinate={{
                                            latitude: v.geometry.location.lat,
                                            longitude: v.geometry.location.lng
                                        }}
                                        onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
                                    >
                                        <View>
                                            <Text>hos</Text>
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={{uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png'}}/>
                                        </View>
                                    </MapView.Marker>
                                )
                            })
                        }

                        {/*<MapView.Marker*/}
                        {/*coordinate={{*/}
                        {/*latitude: -7.7835968,*/}
                        {/*longitude: 110.3777088*/}
                        {/*}}*/}
                        {/*onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}*/}
                        {/*/>*/}
                    </MapView.Animated>
                </View>
            </View>
        );
    }
}
