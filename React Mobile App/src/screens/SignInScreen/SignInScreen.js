import React, { Component, useState } from 'react';
import { Image } from 'react-native';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import { PackageList } from '../../components/PackageList';
import { Login } from '../../components/Login';
import { GetLocation } from '../../components/GetLocation';
import { SubscribeToNetwork } from '../../components/SubscribeToNetwork';

export const SignInScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const [uid, setUID] = useState('');

  SubscribeToNetwork();

  const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  };

  useConstructor(() => {
    setLongitude(route.params.location.coords.longitude);
    setLatitude(route.params.location.coords.latitude);
  });

  function setUserId(id) {
    setUID(id);
    console.log('ss', id);
    if (id !== undefined && id !== -1)
      navigation.push('DeliveryScreen', { id: id });
    else
      ToastAndroid.showWithGravity(
        'Password or username are wrong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
  }

  const signIn = (username, password) => {
    console.log(longitude, latitude);
    const courierID = Login(username, password, longitude, latitude, setUserId);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <View style={styles.logoColumn}>
          <View style={styles.logo}>
            <View style={styles.endWrapperFiller}>
              <Image
                source={require('../../../assets/logocurier.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.usernameColumn}>
              <View style={styles.username}>
                <EvilIconsIcon
                  name="user"
                  style={styles.icon22}
                ></EvilIconsIcon>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,1)"
                  secureTextEntry={false}
                  style={styles.usernameInput}
                  onChangeText={(text) => {
                    setUsername(text), console.log(text);
                  }}
                  defaultValue={username}
                ></TextInput>
              </View>
              <View style={styles.password}>
                <EvilIconsIcon name="lock" style={styles.icon2}></EvilIconsIcon>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,1)"
                  secureTextEntry={true}
                  style={styles.passwordInput}
                  onChangeText={(text) => setPassword(text)}
                  defaultValue={password}
                ></TextInput>
              </View>
            </View>
            <View style={styles.usernameColumnFiller}></View>
            <TouchableOpacity
              onPress={() => signIn(username, password)}
              style={styles.button}
            >
              <Text style={styles.text2}>Get Started!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#6c63ff',
  },

  logo: {
    width: 102,
    height: 111,
    alignSelf: 'center',
  },
  endWrapperFiller: {
    flex: 1,
    width: '108%',
  },
  text3: {
    color: 'rgba(255,255,255,1)',
    fontSize: 96,
    marginBottom: 4,
  },

  text3Column: {
    marginBottom: 6,
    marginLeft: 2,
    marginRight: -1,
  },
  form: {
    height: 230,
    marginTop: 59,
  },
  username: {
    height: 59,
    backgroundColor: 'rgba(251,247,247,0.25)',
    borderRadius: 5,
    flexDirection: 'row',
  },
  icon22: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    marginLeft: 20,
    alignSelf: 'center',
  },
  usernameInput: {
    height: 30,
    color: 'rgba(255,255,255,1)',
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14,
  },
  password: {
    height: 59,
    backgroundColor: 'rgba(253,251,251,0.25)',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 27,
  },
  icon2: {
    color: 'rgba(255,255,255,1)',
    fontSize: 33,
    marginLeft: 20,
    alignSelf: 'center',
  },
  passwordInput: {
    height: 30,
    color: 'rgba(255,255,255,1)',
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14,
  },
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1,
  },
  button: {
    height: 59,
    backgroundColor: 'rgba(31,178,204,1)',
    borderRadius: 5,
    justifyContent: 'center',
  },
  text2: {
    color: 'rgba(255,255,255,1)',
    alignSelf: 'center',
  },
  logoColumn: {
    marginTop: 130,
    marginLeft: 41,
    marginRight: 41,
  },
  logoColumnFiller: {
    flex: 1,
  },
  footerTexts: {
    height: 14,
    flexDirection: 'row',
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36,
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: 'flex-end',
  },
  createAccountFiller: {
    flex: 1,
  },
  createAccount: {
    color: 'rgba(255,255,255,0.5)',
  },
  button2Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  needHelp: {
    color: 'rgba(255,255,255,0.5)',
    alignSelf: 'flex-end',
    marginRight: -1,
  },
});
