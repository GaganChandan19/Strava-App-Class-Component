import {Text, StyleSheet, View, Button} from 'react-native';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Activities from './screens/Activities';
import CreateActivity from './screens/CreateActivity';
const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: '#F9F9F9'},
              headerTitleStyle: {color: '#FC5200'},
            }}
            
          >{(props)=><Login {...props}/>}</Stack.Screen>
          <Stack.Screen
            name="Activities"
            component={Activities}
            options={({navigation}) => ({
              headerBackVisible: false,
              headerTitleStyle: {color: '#FC5200'},
              headerStyle: {backgroundColor: '#F9F9F9'},
              headerRight: () => (
                <Button
                  title="Create Activity"
                  color="#FC5200"
                  onPress={() =>
                    navigation.navigate('CreateActivity')
                  }></Button>
              ),
            })}
          />
          <Stack.Screen
            name="CreateActivity"
            options={{
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: '#F9F9F9'},
              headerTitleStyle: {color: '#FC5200'}
            }}
            component={CreateActivity}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
