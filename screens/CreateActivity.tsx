import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {Component} from 'react';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Props {
  navigation: any;
}

type MyState = {
  open: boolean;
  name: string;
  type: string;
  sport_type: string;
  start_date_local: any;
  elapsed_time: number;
  description: string;
  distance: number;
  trainer: number;
  commute: number;
};

export default class CreateActivity extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      name: '',
      type: '',
      sport_type: '',
      start_date_local: new Date(),
      elapsed_time: 0,
      description: '',
      distance: 0,
      trainer: 0,
      commute: 0,
    };
  }
  successToast = () => {
    ToastAndroid.showWithGravity(
      'New Activity Created Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  errorToast = () => {
    ToastAndroid.showWithGravity(
      'Activity Creation Failed',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  handleCreate = async () => {
    const {
      name,
      type,
      start_date_local,
      elapsed_time,
      description,
      distance,
      trainer,
      commute,
    } = this.state;

    let accessToken = await AsyncStorage.getItem('accessToken');

    axios
      .post(
        `https://www.strava.com/api/v3/activities?access_token=${accessToken}&name=${name}&sport_type=${type}&start_date_local=${start_date_local}&elapsed_time=${elapsed_time}&trainer=${trainer}&description=${description}&commute=${commute}&distance=${distance}`,
      )
      .then((res: any) =>{this.successToast();this.props.navigation.navigate('Activities')})
      .catch((err: any) => {
        this.errorToast();
        console.error(err);
      });
  };
  render() {
    const {open, name, type, sport_type, start_date_local, elapsed_time} =
      this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            style={styles.input1}
            placeholderTextColor="#FC5200"
            onChangeText={text => this.setState({name: text})}></TextInput>
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Type"
              style={styles.input}
              placeholderTextColor="#FC5200"
              onChangeText={text => this.setState({type: text})}></TextInput>
            <TextInput
              placeholder="Sport"
              style={styles.input}
              placeholderTextColor="#FC5200"
              onChangeText={text =>
                this.setState({sport_type: text})
              }></TextInput>
          </View>
          <View style={styles.inputcontainer}>
            <Button
              title="Start date local"
              onPress={() => this.setState({open: true})}
              color="#FC5200"
            />
            <TextInput
              placeholder="Elapsed time"
              style={styles.input}
              placeholderTextColor="#FC5200"
              onChangeText={text =>
                this.setState({elapsed_time: parseInt(text)})
              }></TextInput>
          </View>
          <TextInput
            placeholder="Description"
            style={styles.input1}
            placeholderTextColor="#FC5200"
            onChangeText={text =>
              this.setState({description: text})
            }></TextInput>
          <TextInput
            placeholder="Distance"
            style={styles.input1}
            placeholderTextColor="#FC5200"
            onChangeText={text =>
              this.setState({distance: parseInt(text)})
            }></TextInput>
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Trainer"
              style={styles.input}
              placeholderTextColor="#FC5200"
              onChangeText={text =>
                this.setState({trainer: parseInt(text)})
              }></TextInput>
            <TextInput
              placeholder="Commute"
              style={styles.input}
              placeholderTextColor="#FC5200"
              onChangeText={text =>
                this.setState({commute: parseInt(text)})
              }></TextInput>
          </View>
          <Button
            title="Create"
            onPress={this.handleCreate}
            color="#FC5200"
            disabled={
              name === '' ||
              type === '' ||
              sport_type === '' ||
              elapsed_time === 0
            }></Button>
        </View>
        <DatePicker
          modal
          open={open}
          date={start_date_local}
          onConfirm={date => {
            this.setState({open: false});
            this.setState({start_date_local: date});
          }}
          onCancel={() => {
            this.setState({open: false});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
    backgroundColor: 'transparent',
    width: 330,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#FC5200',
    gap: 10,
  },
  inputcontainer: {
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    borderWidth: 1,
    width: '49%',
    padding: 5,
    borderColor: '#FC5200',
    borderRadius: 5,
    color: '#FC5200',
  },
  input1: {
    borderWidth: 1,
    width: '100%',
    padding: 5,
    borderColor: '#FC5200',
    borderRadius: 5,
    color: '#FC5200',
  },
});
