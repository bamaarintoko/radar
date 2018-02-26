import Icon from 'react-native-vector-icons/FontAwesome'
import React from "react";
import {Image} from "react-native";

export function icon(key) {
    console.log(key)
    let sz = 50;
    let clr = '#2196F3';
    let uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png'
    switch (key) {
        case 'hsopital' :
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png'
            break;
        case 'atm' :
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/atm-71.png'
            break;
        case 'bank':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/bank_dollar-71.png'
            break
        case 'cafe' :
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png'
            break;
        case 'museum':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png'
            break;
        case 'restaurant':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png'
            break;
        case 'gas_station':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png'
            break;
        case 'church':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/worship_christian-71.png'
            break;
        case 'mosque':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/worship_islam-71.png'
            break;
        case 'hindu_temple':
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png'
            break;
        default :
            uri = 'https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png'
    }
    // if (key==='hospital' || key ===''){
    //     ic = <Icon name={"h-square"} color={'#2196F3'} size={20}/>
    // }
    return <Image style={{width: 20, height: 20}} source={{uri: uri}}/>
    //console.log(key)
}