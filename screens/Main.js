import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './Login'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../firebase/config'
import { addDoc, arrayUnion, collection, doc, getDocs, serverTimestamp, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { userId } from './Login'

export let usersCollections = null;

const Main = ({ navigation }) => {

  const [jokes, setJokes] = useState(null)
  const [favorite, setFavorite] = useState(false);

  // adds a new collection called 'users'
  usersCollections = collection(db, 'users');

  // fetches the id of the user
  let id = userId; 

  // by using the uder's id you create a new document in the users collection
  const createADocument = async () => {
    const docRefTwo = doc(usersCollections, id);
    const docSnap = await getDoc(docRefTwo);

    if (!docSnap.exists()) {
      await setDoc(docRefTwo, { id, joke: [] });
      console.log(`Document created with the id: ${docRefTwo.id}`)
    } else {
      console.log(`Document already exists with the id: ${docRefTwo.id}`)
    }
    
  }

  // add the joke to the joke field
  const addAJoke = async () => {
    const userDocRef = doc(usersCollections, id);
    await updateDoc(userDocRef, { joke: arrayUnion(jokes['joke']) })
    console.log(`Document add with the id: ${userDocRef.id}`)
    setFavorite(true);
  }

  useEffect(() => {
    fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
    })
      .then(response => response.json())
      .then(data => setJokes(data))
      .catch(error => console.error(error))

      createADocument();
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
        onPress={addAJoke}
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