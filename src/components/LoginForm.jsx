import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { validateEmail } from '../utils/validations'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../utils/firebase';


export default function LoginForm({changeForm}) {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
    
  })

  const [formErrors, setFormErrors] = useState({})

const register = () => {
  let errors ={}
  if (!formData.email || !formData.password) {

    if(!formData.email) errors.email = true
    if(!formData.password) errors.password = true
    

    setFormErrors(errors)
    
    
  }else if(!validateEmail(formData.email)){
    errors.email = true
  }else{

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      
  
  }
  
  
}

  return (
    <>
        <Text style={styles.title} >Inicio de sesión</Text>
       <TextInput
       style={[styles.input,formErrors.email && styles.error]}
       placeholder='Correo electrónico'
       placeholderTextColor='#6fcf97'
       onChange={e=>setFormData({...formData, email:e.nativeEvent.text})}
       />
       <TextInput
       style={[styles.input,formErrors.password && styles.error]}
       textContentType='password'
       placeholder='Contraseña'
       placeholderTextColor='#6fcf97'
       secureTextEntry
       onChange={e=>setFormData({...formData, password:e.nativeEvent.text})}
       />
       

       <View style={styles.register} >
          <TouchableOpacity 
            onPress={changeForm}
          >
            
              <Text style={styles.btnText}>
              Registrate
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={register}
          >
            
              <Text style={styles.btnText}>
              Iniciar sesión
              </Text>
          </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    btnText:{
      color:'#ffffff',
      fontSize:20,
      marginBottom:10,
      backgroundColor:'#4e2ecf',
      width:'130%',
      height:40,
      textAlign:'center',
      textAlignVertical:'center',
      borderRadius:20
        
    },
    input:{
      height:50,
      color:'white',
      width:'85%',
      backgroundColor:'#4e2ecf',
      fontSize:18,
      marginBottom:20,
      borderWidth:1,
      borderRadius:30,
      paddingHorizontal:20,
      borderColor:'#ffffff',
      borderWidth:3,
    },
    register:{
      flex:1,
      justifyContent:'flex-end',
      marginBottom:10,
      
    },
    error:{
      borderColor:'#ffff00',
      borderWidth:3,
      

    },
    title:{
      fontSize:40,
      fontFamily:'serif',
      marginVertical:20,
      textAlign:'center',
      color: "#739AFF",
      textShadowColor: "#0044AA",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      
    },
})