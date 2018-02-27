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
    Dimensions, Image, Picker, TouchableWithoutFeedback
} from 'react-native';
import {
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Header,
    Input,
    SwipeRow,
    Text
} from "native-base";
import MapView from 'react-native-maps';
import Axios from 'axios'
import {icon} from './Function'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';

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

let url_ = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-7.795580,110.369490&radius=1000&type=hospital&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
let data = []
// const Item = Picker.Item;
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            data: [],
            value: "Select Me Please",
            type: ""
        }
        //this.place = this.place.bind(this)
    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let url = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&radius=1000&type=hospital&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
                Axios.get(url).then((response) => {
                    //console.log(response)
                    this.setState({
                        data: response.data.results
                    })
                })
                //console.log(position)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
    }

    onMyPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let url = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&radius=1000&type='+this.state.type+'&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
                Axios.get(url).then((response) => {
                    //console.log(response)
                    this.setState({
                        data: response.data.results
                    })
                })
                //console.log(position)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
    }

    onChange(type) {
        this.setState({
            type: type
        })
        let urll = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-7.795580,110.369490&radius=5000&type=' + type + '&key=AIzaSyDV81G_vdgQeSlMd2Z3Suc-FM7x3tNO-j4'
        Axios.get(urll).then((response) => {
            //console.log(response)
            this.setState({
                data: response.data.results
            })
        })
        //console.log(type)
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
                                            {icon(this.state.type)}
                                        </View>
                                    </MapView.Marker>
                                )
                            })
                        }
                    </MapView.Animated>
                </Content>
                <View style={{
                    height: 50, backgroundColor: '#ffffff', borderWidth: 0.5,
                    borderColor: '#BDBDBD', borderRadius: 5, flexDirection: 'row', margin: 5
                }}>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={this.state.type}
                        onValueChange={(loc) => {this.onChange(loc)}}>
                        <Picker.Item label="-- Please select type --" value=""/>
                        <Picker.Item label="Hospital" value="hospital"/>
                        <Picker.Item label="Atm" value="atm"/>
                        <Picker.Item label="Bank" value="bank"/>
                        <Picker.Item label="Cafe" value="cafe"/>
                        <Picker.Item label="Museum" value="museum"/>
                        <Picker.Item label="Restaurant" value="restaurant"/>
                        <Picker.Item label="Gas Station" value="gas_station"/>
                        <Picker.Item label="Church" value="church"/>
                        <Picker.Item label="Mosque" value="mosque"/>
                        <Picker.Item label="Hindu Temple" value="hindu_temple"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback onPress={()=>this.onMyPosition()}>
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        height: 40,
                        width: 40,
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon name="location-arrow" color={'#2196F3'} size={20}/>
                    </View>
                </TouchableWithoutFeedback>
            </Container>
        );
    }
}
