import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from './Login'
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Alert } from 'react-native'
import { styling } from './Entry'

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
    <View style={[styling.container, { paddingHorizontal: 80, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[styling.bigText, { marginVertical: 20, fontSize: 40, lineHeight: 60 }]} >Are you sure you seeketh some dad jokes?</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput value={name} onChangeText={setName} placeholder='Name' style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 0, height: 30, width: 200, marginBottom: 10 }} />
        {show && name.length == 0 && ( <Text style={styles.redText} >name field is empty</Text> )}
        <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 0, height: 30, width: 200, marginBottom: 10 }} />
        {show && email.length == 0 && ( <Text style={styles.redText} >email field is empty</Text> )}
        <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Password' style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 0, height: 30, width: 200, marginBottom: 10 }} />
        {show && password.length == 0 && ( <Text style={styles.redText} >password field is empty</Text> )}
        <TouchableOpacity
            onPress={signUp}
            style={[styling.button, { marginVertical: 10, width: 200, justifyContent: 'center', alignItems: 'center' }]}
        >
            <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{marginVertical: 5}}
        >
            <Text style={{ fontWeight: '300' }}>Have an account, <Text style={{ fontWeight: '500' }}>Sign In</Text>?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup

// const styles = StyleSheet.create({})