import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './Login'

const Entry = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Do You Fancy Some Dad Jokes</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.buttonText} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}
        >
            <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Entry;

// const styles = StyleSheet.create({})