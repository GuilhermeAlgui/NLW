import { Image } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ilustra01 from '../../images/Ilustra01.png';
import Ilustra02 from '../../images/Ilustra02.png';

function Simple(){

    const navigation = useNavigation()

    async function end(){
       await AsyncStorage.setItem('alredyLaunched','true');
        navigation.navigate('OrphanagesMap')

    }

    return(
        <Onboarding
            
          onDone={end}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={Ilustra01} />,
              title: 'Leve Felicidade ao Mundo!',
              subtitle: 'Visite orfanatos e mude a vida de crianças',
            },
            {
              backgroundColor: '#fe6e58',
              image: <Image source={Ilustra02} />,
              title: 'Escolha um Orfanato do mapa e faça uma visita',
              subtitle: 'This is the subtitle that sumplements the title.',
            },
           
          ]}
        />
      );
}




export default Simple;