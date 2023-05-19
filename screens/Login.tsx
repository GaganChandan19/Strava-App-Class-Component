import {Text, StyleSheet, View, Button, Image, Linking} from 'react-native';
import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}
export default class Login extends Component<Props> {
  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken = async () => {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken !== undefined) {
        this.props.navigation.navigate('Activities');
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleOnPress = async () => {
    try {
      let config = {
        clientId: '106452',
        clientSecret: '24af8eeb27995f278d422d0bf3a990c2dabc55b5',
        redirectUrl: 'myapp://myapp',
        serviceConfiguration: {
          authorizationEndpoint:
            'https://www.strava.com/oauth/mobile/authorize',
          tokenEndpoint:
            'https://www.strava.com/oauth/token?client_id=106452&client_secret=24af8eeb27995f278d422d0bf3a990c2dabc55b5',
        },
        scopes: ['activity:read_all,activity:write'],
      };
      const result = await authorize(config);

      if (result.accessToken) {
        AsyncStorage.setItem('accessToken', result.accessToken),
          this.props.navigation.navigate('Activities');
      }
    } catch (error) {
      console.log('Authorization error:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgbox}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://lesolympistes.files.wordpress.com/2021/10/69bea-logo.png',
            }}
          />
        </View>
        <Button
          title="Login with strava"
          color="#FC5200"
          onPress={() => this.handleOnPress()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  imgbox: {
    marginTop: 200,
    marginBottom: 60,
  },
  logo: {
    width: 120,
    height: 60,
  },
});
