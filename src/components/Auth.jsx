import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoginForm from './loginForm'
import RegisterForm from './RegisterForm'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false)

    const changeForm = () => {
        setIsLogin(!isLogin)
    }

  return (
    <View style={styles.view}>
        
        <Image 
            style={styles.logo}
            source={require('../../assets/dinero.png')} 
        />
        {isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        width:'80%',
        height:250,
        marginTop:50,
        marginBottom:50,
        
    },
    view:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#1d1d42'
    },
})