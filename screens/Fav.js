import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { styles } from './Login';

const Favorite = () => {
    const [data, setData] = useState([]);

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>{item['joke']}</Text>
            </View>
        )
    }

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, 'Jokes'));
        querySnapshot.forEach(obj => {
          const field = obj.data();
          const allData = {
            joke: field.joke,
            timeStamp: field.timeStamp,
          }
          setData(prevItem => [...prevItem, allData])
        })
        // console.log(Array.isArray(data));
      }

      useEffect(() => {
        getData();
      }, []);

  return (
    <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={renderItem} 
        />
    </View>
  )
}

export default Favorite

// const styles = StyleSheet.create({})