import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './Login'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../firebase/config'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { userId } from './Login'

const Main = ({ navigation }) => {

  const [jokes, setJokes] = useState(null)
  const [favorite, setFavorite] = useState(false);


  useEffect(() => {
    fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
    })
      .then(response => response.json())
      .then(data => setJokes(data))
      .catch(error => console.error(error))
  }, [])
  
  const fetchDadJokes = () => {
    fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
    })
      .then(response => response.json())
      .then(data => setJokes(data))
      .catch(error => console.error(error))
    setFavorite(false)
  }

  const addToDb = async () => {
    const docRef = await addDoc(collection(db, 'Jokes'), {
      joke: jokes['joke'],
      timeStamp: serverTimestamp(),
    })
    console.log(`Document add with the id: ${docRef.id}`)
    setFavorite(true)
  }


  const signOutHandle = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
        console.log(`user signed out`)
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>You're ready for some Dad Jokes?</Text>
      {jokes && (<Text>{jokes['joke']}</Text>)}
      <TouchableOpacity
        onPress={fetchDadJokes}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Fetch Dad Jokes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={addToDb}
      >
        <Icon name={favorite ? 'favorite' : 'favorite-border'} color={'#000'} size={30}/>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.button}
          onPress={signOutHandle}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Main;
