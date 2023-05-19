import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface Props {
  navigation: any;
}
type MyState = {data: any[]; loading: boolean};
export default class Activities extends Component<Props, MyState> {
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.getActivities();
  }

  getActivities = async () => {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');
      axios
        .get('https://www.strava.com/api/v3/athlete/activities', {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then((res: any) => {
          this.setState({
            data: res.data,
            loading: false,
          });
        })
        .catch((err: any) => {
          AsyncStorage.removeItem('accessToken');
          this.props.navigation.navigate('Login');
        });
    } catch (error) {
      console.log(error);
    }
  };
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  render() {
    let {data, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loadig}>Loading...</Text>
        ) : (
          <ScrollView>
            <View style={styles.grid}>
              {data?.map((el: any, index: any) => {
                return (
                  <View key={index} style={styles.box}>
                    <Text testID="1st">Name: {el.name}</Text>
                    <Text testID="2nd">Sport Type: {el.sport_type}</Text>
                    <Text testID="3rd">Distance: {el.distance}</Text>
                    <Text testID="4th">Average Speed: {el.average_speed}</Text>
                    <Text testID="5th">Max Speed: {el.max_speed}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '97%',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#FC5200',
    margin: 5,
    borderRadius: 6,
  },
  loadig: {
    fontSize: 20,
    color: '#FC5200',
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '100%',
    marginTop: 20,
  },
});
