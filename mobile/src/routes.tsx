import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen} = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails'

import OrphanageData from './pages/createOrphanage/OrphanagesData';
import SelectMapPosition from './pages/createOrphanage/SelectMapPosition';
import Header from './components/Header';
import onboardingIndex from './pages/onboarding/onboardingIndex'

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Routes(){
    
    const [isFirstLaunch,setIsFirstLaunch] = useState<boolean>(true);

    const [waitForEffect,setWaitForEffect] = useState(false);


    useEffect(()=>{
        AsyncStorage.getItem('alredyLaunched').then(value => {
            if(value ===null){
                setIsFirstLaunch(true);
                

                console.log('alredy launched? '+ value)
                
            }else {
                console.log('alredy launched? 2'+ value)
                setIsFirstLaunch(false);
                setWaitForEffect(false);

            }
        })
    },[])


    if(waitForEffect){
        
        return(null)
    }


   
    
    if(!isFirstLaunch){
        console.log('first launch? 2'+isFirstLaunch)

        return(
            
            <NavigationContainer>
                <Navigator screenOptions={{
                    headerShown: false,cardStyle:{backgroundColor:'#f2f3f5'}
                }}>
    
                    <Screen name= "OrphanagesMap" component={OrphanagesMap}/>
    
                    <Screen 
                        name= "OrphanageDetails" 
                        component={OrphanageDetails}
                        options={{
                            headerShown: true,
                            header: () => <Header showCancel={false} title= "Orfanato"/>
                        }}
                    />
    
                    <Screen 
                        name= "OrphanageData" 
                        component={OrphanageData}
                        options={{
                            headerShown: true,
                            header: () => <Header title= "Selecione no Mapa"/>
                        }}
                    />
    
                    <Screen 
                        name= "SelectMapPosition"
                        component={SelectMapPosition}
                        options={{
                            headerShown: true,
                            header: () => <Header title= "Informe nos dados"/>
                        }}
                     />
    
                </Navigator>
            </NavigationContainer>
        
        )
    }
    


    
    
    
    return(

        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,cardStyle:{backgroundColor:'#f2f3f5'}
            }}>
                <Screen name= "Onboarding" component={onboardingIndex}/>

                <Screen name= "OrphanagesMap" component={OrphanagesMap}/>

                <Screen 
                    name= "OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title= "Orfanato"/>
                    }}
                />

                <Screen 
                    name= "OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title= "Selecione no Mapa"/>
                    }}
                />

                <Screen 
                    name= "SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title= "Informe nos dados"/>
                    }}
                 />

            </Navigator>
        </NavigationContainer>
    
    )
}