import React, {useEffect,useState} from 'react';

import {Feather} from '@expo/vector-icons' 
 
import MapView, {Marker,Callout,PROVIDER_GOOGLE} from 'react-native-maps';


import mapMarker from '../images/map-marker.png';
import { StyleSheet, Text, View ,Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

import * as Location from 'expo-location';


interface OrphanageItem {
  id: number,
  name: string,
  latitude: number,
  longitude: number,

}

interface Coords {
  latitude: number,
  longitude: number,
}




export default function OrphanagesMap(){

    const [orphanages,setOrphanages] = useState<OrphanageItem[]>([])

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

    useEffect(()=>{
      api.get('orphanages').then(response=>{
        setOrphanages(response.data)
      });
      
      
      grantLocation();
       
/** */

      
    
    },
    []);

   

    let resolve = 'waiting...';
    if(stringTeste){
      resolve= stringTeste
    }
    else if(location){
      resolve = JSON.stringify(location);
    }

    function HandleMap(){
      if(coordernada.longitude ===0){
        return(
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: defaultCoordernada.latitude,
              longitude: defaultCoordernada.longitude,
              latitudeDelta:0.008 ,
              longitudeDelta: 0.008,
            }}
          >
            {orphanages.map(orphanage=>{
              return(
                
            <Marker
            key= {orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x:2.7 ,
              y: 0.8 ,
            }}
          
          >
            <Callout tooltip={true}
             onPress={()=> handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                  {orphanage.name}
                </Text>
              </View>
            </Callout>
          </Marker>
      
      
              )
            })}
      
      
          </MapView>
       )
      }
      else return(
<MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    initialRegion={{
      latitude: coordernada.latitude,
      longitude: coordernada.longitude,
      latitudeDelta:0.008 ,
      longitudeDelta: 0.008,
    }}
  >
    {orphanages.map(orphanage=>{
      return(
        
    <Marker
    key= {orphanage.id}
    icon={mapMarker}
    coordinate={{
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
    }}
    calloutAnchor={{
      x:2.7 ,
      y: 0.8 ,
    }}
  
  >
    <Callout tooltip={true}
     onPress={()=> handleNavigateToOrphanageDetails(orphanage.id)}>
      <View style={styles.calloutContainer}>
        <Text style={styles.calloutText}>
          {orphanage.name}
        </Text>
      </View>
    </Callout>
  </Marker>


      )
    })}


  </MapView>
      )
    }


    const navigation = useNavigation();
    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails',{id})

    }

    function handleNavigateToCreate(){
      navigation.navigate('SelectMapPosition')

    }


    return(
        
    <View style={styles.container}>


      <HandleMap/>
 
 
    <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} Orfanatos encontrados 
        </Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreate}>
          <Feather name='plus' size={20} color= '#fff'/>
        </RectButton>

    </View>
   {/* <StatusBar style="auto" /> */}
  </View>

    )
}



const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  
      
    },
  
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText:{
      color: '#0089a5',
      fontSize: 14, 
      fontFamily: 'Nunito_700Bold',
  
    },
  
    footer:{
  
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: "row",
  
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
  
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
  
    },
  
    createOrphanageButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
  
    }
  
  
  
  });
  