import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from './Login'
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Alert } from 'react-native'

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let [show, setShow] = useState(false);

    const signUp = async () => {
        if (name.length != 0 && email.length != 0 && password.length != 0) {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length > 0) {
                Alert.alert('The user already exists');
                return;
            } else {
                createUserWithEmailAndPassword(auth, email, password)
                .then(cred => {
                    const user = cred.user;

                    updateProfile(user, {
                        displayName: name,
                    });
                    console.log(`user: ${user.uid}, signed up successfully`)
                })
                .catch(err => {
                    console.log(err.code, err.message);
                })
                setName('');
                setEmail('');
                setPassword('');
                setShow(false);

                navigation.navigate('Home')
            }
        } else {
            setShow(true)
            // console.log(show)
        }
    }

  return (
    <View style={styles.container}>
      <Text>Are you sure you seeketh some dad jokes?</Text>
      <View>
        <TextInput value={name} onChangeText={setName} placeholder='Name' />
        {show && name.length == 0 && ( <Text style={styles.redText} >name field is empty</Text> )}
        <TextInput value={email} onChangeText={setEmail} placeholder='Email' />
        {show && email.length == 0 && ( <Text style={styles.redText} >email field is empty</Text> )}
        <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Password' />
        {show && password.length == 0 && ( <Text style={styles.redText} >password field is empty</Text> )}
        <TouchableOpacity
            onPress={signUp}
            style={styles.button}
        >
            <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
        >
            <Text>Have an account, <Text style={{ fontWeight: '500' }}>Sign In</Text>?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup

// const styles = StyleSheet.create({})