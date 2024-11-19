import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { validateEmail } from '../utils/validations'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../src/utils/firebase';


export default function RegisterForm({changeForm}) {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
    repeatPassword:''
  })

  const [formErrors, setFormErrors] = useState({})

const register = () => {
  let errors ={}
  if (!formData.email || !formData.password || !formData.repeatPassword) {

    if(!formData.email) errors.email = true
    if(!formData.password) errors.password = true
    if(!formData.repeatPassword) errors.repeatPassword = true

    setFormErrors(errors)
    
    
  }else if(!validateEmail(formData.email)){
    errors.email = true
  }else if(formData.password !== formData.repeatPassword){
    errors.password = true
    errors.repeatPassword = true
  }else if(formData.password.length <6 || formData.repeatPassword.length<6){
    errors.password = true
    errors.repeatPassword = true

  }else{

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message)
    // ..
  });
  
  
  }
  
  
}

  return (
    <>
       <Text style={styles.title} >Registro</Text>
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
       <TextInput
       style={[styles.input,formErrors.repeatPassword && styles.error]}
       textContentType='repetir password'
       placeholder='Repetir Contraseña'
       placeholderTextColor='#6fcf97'
       secureTextEntry
       onChange={e=>setFormData({...formData, repeatPassword:e.nativeEvent.text})}
       />

        <View style={styles.register} >
          <TouchableOpacity 
            onPress={register}
          >
            
              <Text style={styles.btnText}>
              Registrate
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={changeForm}
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
      fontSize:50,
      fontFamily:'serif',
      marginVertical:20,
      textAlign:'center',
      color: "#739AFF",
      textShadowColor: "#0044AA",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      
    },
})