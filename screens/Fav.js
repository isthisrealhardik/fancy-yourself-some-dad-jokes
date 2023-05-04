import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { userId } from './Login';
import { Text, View, TouchableOpacity } from 'react-native';

const UserJokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchUserJokes = async () => {
      const userJokesQuery = query(collection(db, 'users'), where('id', '==', userId));
      const userJokesSnapshot = await getDocs(userJokesQuery);
      if (!userJokesSnapshot.empty) {
        const userJokesData = userJokesSnapshot.docs[0].data();
        setJokes(userJokesData.joke);
      }
    };

    fetchUserJokes();
  });

  return (
    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '100%', paddingHorizontal: 20, paddingVertical: 45 }} >
      <Text style={{ fontSize: 30, fontWeight: '700', textTransform: 'uppercase' }} >Favorites</Text>
      {jokes.length > 0 ? (
        <View >
          {jokes.map((joke, index) => (
            <Text style={{ marginVertical: 10, fontSize: 18, borderRadius: 10, borderColor: 'grey', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10 }} key={index}>{joke}</Text>
          ))}
        </View>
      ) : (
        <Text>No jokes found for this user.</Text>
      )}
    </View>
  );
};

export default UserJokes;
