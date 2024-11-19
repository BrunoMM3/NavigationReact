import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { getAuth, onAuthStateChanged /*, signOut*/ } from "firebase/auth";
import { signOut } from "firebase/auth";
//import { createStackNavigator } from '@react-navigation/stack';
import Empleados from './src/components/Empleados';
import './gesture-handler';
import app from './src/utils/firebase'
import Auth from './src/components/Auth';
import { StyleSheet } from 'react-native';

function One() {
  return (
    <>
      <Empleados/>
    </>
  );
}

function Two() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#1d1d42' }}>
      <Button 
      style={styles.text}
      onPress={() => navigation.navigate('Empleados')}>
        IR A EMPLEADOS
      </Button>
    </View>
  );
}
function Three() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'aqua' }}>
      <Text>Three</Text>
    </View>
  );
}
function Four() {

  function logOut(){
    const auth = getAuth(app);
    signOut(auth).then(() => {
      console.log('Cerró sesión')
    }).catch((error) => {
      // An error happened.
    }); 
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text} onPress={logOut}> Cerrar Sesión</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Empleados" component={One} />
      <Tab.Screen name="Two" component={Two} />
      <Tab.Screen name='THREE' component={Three}/>
      <Tab.Screen name='Four' component={Four}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    setUser(true)
    } else {
    // User is signed out
    // ...
    
    setUser(false)
    console.log('No esta autenticado' , user)
  }
});
  
    
  }, [])
  

  if (user == undefined)  return null
  return (
    <>

      {
        user ? (
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>
            ): ( <Auth/>)
      }
      
    </>
  );
}
const styles = StyleSheet.create({
  viewFooter:{
      position:'absolute',
      bottom:0,
      flexDirection:'row',
      width:'100%',
      height:50,
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:30,
      marginBottom:30
  },
  viewClose:{
      backgroundColor:'#820000',
      borderRadius:50,
      paddingVertical:10,
      paddingHorizontal:30
  },
  text:{
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:10,
    backgroundColor:'#4e2ecf',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
  },
  viewDate:{
      backgroundColor:'#1ea1f1',
      borderRadius:50,
      paddingVertical:10,
      paddingHorizontal:30
  }

})
