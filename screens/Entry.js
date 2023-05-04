import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// import { styles } from './Login'

const Entry = ({ navigation }) => {
  return (
    <View style={styling.container}>
      {/* <Text style={stlying.bigText}>Do You Fancy Some Dad Jokes</Text> */}
      <View style={{flexDirection: 'column', marginVertical: 100}} >
        <Text style={styling.bigText} >Do</Text>
        <Text style={styling.bigText} >You</Text>
        <Text style={styling.bigText} >Fancy</Text>
        <Text style={styling.bigText} >Some</Text>
        <Text style={styling.bigText} >Dad</Text>
        <Text style={styling.bigText} >Jokes?</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <TouchableOpacity 
            style={styling.button}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styling.buttonText} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styling.button}
            onPress={() => navigation.navigate('Signup')}
        >
            <Text style={styling.buttonText} >Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Entry;

export const styling = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  bigText: {
    // fontFamily: 'monospace',
    fontSize: 80,
    lineHeight: 80,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20, 
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  }
})