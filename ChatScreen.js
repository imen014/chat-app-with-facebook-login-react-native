import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { firebase } from './firebaseConfig';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    return unsubscribe;
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      firebase.firestore().collection('messages').add({
        text: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: firebase.auth().currentUser.displayName,
      });
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text>{`${item.user}: ${item.text}`}</Text>
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
