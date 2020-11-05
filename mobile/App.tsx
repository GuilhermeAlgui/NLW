import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Dimensions, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons' 

import {useFonts} from 'expo-font';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';

import MapView, {Marker,Callout,PROVIDER_GOOGLE} from 'react-native-maps';
import Routes from './src/routes'
import OnboardingIndex from './src/pages/onboarding/onboardingIndex'

import mapMarker from './src/images/map-marker.png';

export default function App() {

  const [fontsloaded] = useFonts({
    Nunito_600SemiBold,
     Nunito_700Bold,
      Nunito_800ExtraBold,

  });
   
  if(!fontsloaded){
    return null;
  }


  

  return (
    <Routes/>
    
 );
}
