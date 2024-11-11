import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';

export default function AuthScreen({ navigation }) {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '530403653140109',
    redirectUri:  'https://chatapp-eee5e.firebaseapp.com/__/auth/handler'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      // Utiliser le token pour l'authentification Firebase ou pour une redirection
      console.log('Token:', access_token);
      navigation.navigate('Chat');
    }
  }, [response]);

  return (
    <View>
      <Button
        title="Login with Facebook"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
