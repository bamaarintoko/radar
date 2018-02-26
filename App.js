/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions, Image
} from 'react-native';
import {Button, Container, Content, Footer, FooterTab, Form, Header, Input, Item, SwipeRow, Text} from "native-base";
import MapView from 'react-native-maps';
import Axios from 'axios'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import Geocoder from 'react-native-geocoder';

let {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container_: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },
    map: {
        width: width,
        height: height,
        alignSelf: 'flex-end',
        marginTop: -5,
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
            console.log(response)
            this.setState({
                data: response.data.results
            })
        })
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: -7.795580,
                    longitude: 110.369490
                })
            })
    }

    render() {
        const {region} = this.props;
        return (
            <Container>

                <Content style={styles.container_}>



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
                                //console.log("-->",v)
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
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={{uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png'}}/>
                                        </View>
                                    </MapView.Marker>
                                )
                            })
                        }
                    </MapView.Animated>
                </Content>
                <View style={{
                    height: 50, backgroundColor: '#ffffff', borderWidth: 0.5,
                    borderColor: '#BDBDBD', borderRadius: 5, flexDirection: 'row',margin:5
                }}>
                </View>
            </Container>
        );
    }
}
