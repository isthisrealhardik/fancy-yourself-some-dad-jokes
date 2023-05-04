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
  }, [userId]);

  return (
    <View>
      {jokes.length > 0 ? (
        <View>
          {jokes.map((joke, index) => (
            <Text key={index}>{joke}</Text>
          ))}
        </View>
      ) : (
        <Text>No jokes found for this user.</Text>
      )}
    </View>
  );
};

export default UserJokes;
