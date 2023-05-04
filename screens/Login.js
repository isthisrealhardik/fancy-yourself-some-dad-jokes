import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Alert } from 'react-native'

export let userId = null;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signIn = async () => {
        if (email.length != 0 && password.length != 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then(cred => {
                    const user= cred.user;
                    userId = user.uid
                    console.log(`user: ${user.uid} logged in successfully.`)
                    navigation.navigate('Home')
                    setEmail('');
                    setPassword('');
                })
                .catch((error) => {
                    // Handle any errors
                    if (error.code === 'auth/user-not-found') {
                      Alert.alert('Error', 'User not found');
                    } else {
                      Alert.alert('Error', error.message);
                    }
                    console.log('Error signing in:', error);
                  });
        } else {
            console.log('email field is empty')
        }
    }

  return (
    <View style={styles.container}>
        <Text>You Like Dad Jokes Ehh?</Text>
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder='Email..' />
            <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Password...' />
            <TouchableOpacity
                onPress={signIn}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
            >
                <Text >Don't have an account?, <Text>Register</Text>?</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    button: {
        padding: 10, 
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    redText: {
        color: 'red',
        fontSize: 10,
    }
})