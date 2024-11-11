import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { firebase } from './firebaseConfig';

export default function App() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '530403653140109',
    redirectUri: 'https://chatapp-eee5e.firebaseapp.com/__/auth/handler',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const credential = firebase.auth.FacebookAuthProvider.credential(authentication.accessToken);

      firebase.auth().signInWithCredential(credential)
        .then(userCredential => {
          console.log('user connected succusfully!',userCredential.user);
        })
        .catch(error => {
          console.error('Erreur d\'authentification Firebase:', error.code, error.message);
        });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Se connecter avec Facebook"
        disabled={!request}
        onPress={() => promptAsync()} 
      />
    </View>
  );
}

