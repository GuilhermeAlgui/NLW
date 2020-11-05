import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';


import mapMarkerImg from '../../images/map-marker.png';

interface Coords {
  latitude: number,
  longitude: number,
}


export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position,setPosition] = useState({ latitude: 0, longitude: 0})
  const [updatePosition,setUpdatePosition] = useState(true);

  const [location,setLocation] = useState<object>();
  const [coordernada,setcoordenada] = useState<Coords>({
    latitude: 0,
    longitude:0 ,
  });

  const [defaultCoordernada,setCoordenada] = useState<Coords>({
    latitude: 2.8168445,
    longitude:-50.7330675 ,
  })

  const [stringTeste,setStringTeste] =useState<string>()


  async function grantLocation(){
    if(updatePosition){
      let {status} = await Location.getPermissionsAsync();
      const stat = await Location.hasServicesEnabledAsync();
      
  
      if(!stat){
        await Location.requestPermissionsAsync();
        grantLocation();
  
      }
  
      if(status!== 'granted'){
        setStringTeste('erro')
  
      }
  
      let location = await Location.getCurrentPositionAsync({
      });
      setLocation(location)
  
      let {coords} = location;
      const {latitude,longitude}= coords;
        setcoordenada({
          latitude,longitude
        })
      
  
    }

   

  }


  function handleNextStep() {
    navigation.navigate('OrphanageData', {position});
  }


  function handleSelectMapPosition(event: MapEvent){
    setPosition(event.nativeEvent.coordinate);
    setCoordenada(position)
  }

  useEffect(()=>{
    
    
    
    grantLocation();
     
/** */

    
  
  },
  []);

  function HandleMap(){
    if(coordernada.longitude ===0){
      return(
        
      <MapView 
      initialRegion={{
        latitude: defaultCoordernada.latitude,
        longitude: defaultCoordernada.longitude,
        latitudeDelta:0.008 ,
        longitudeDelta: 0.008,
      }}
      style={styles.mapStyle}
      onPress={handleSelectMapPosition}
    >

      {position.latitude !== 0 && ( <Marker 
        icon={mapMarkerImg}
        coordinate={{ latitude: position.latitude, longitude: position.longitude }}
      />) }
     
    </MapView>

      )
    }
    else if(position.longitude ===0){
      return(
      
      <MapView 
        initialRegion={{
          latitude: coordernada.latitude,
          longitude: coordernada.longitude,
          latitudeDelta:0.008 ,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >

        {position.latitude !== 0 && ( <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />) }
       
      </MapView>

    )}
    else{
      return(
        <MapView 
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta:0.008 ,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >

        {position.latitude !== 0 && ( <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />) }
       
      </MapView>
      )
    }
  }

  return (
    <View style={styles.container}>
      <HandleMap/>

      {position.latitude !==0 && (<RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    ) }
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})