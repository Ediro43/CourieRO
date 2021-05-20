import React, { Component, useState } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';

export const InsertCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          placeholder="Insert your code"
          style={styles.textInput}
          onChangeText={(text) => setCode(text)}
          defaultValue={code}
        />
        <Button
          buttonStyle={styles.innerButton}
          titleStyle={styles.title}
          containerStyle={styles.buton}
          title="See your package"
          onPress={() =>
            navigation.push('YourPackageScreen', {
              packageCode: code,
              entity: 'customer',
            })
          }
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6c63ff',
  },
  innerButton: {
    backgroundColor: '#efa912',
  },
  title: {
    color: 'white',
  },
  buton: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  textInput: {
    color: '#121212',
    width: '75%',
    height: '14%',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    //borderWidth: 2,
    //borderColor: '#000000',
    borderRadius: 18,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.35,
    shadowRadius: 0,
    alignSelf: 'center',
    marginTop: '80%',
  },
  button: {
    width: '60%',
    height: 80,
    borderWidth: 8,
    borderColor: 'rgba(216,217,234,1)',
    borderStyle: 'solid',
    borderRadius: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: 90,
    alignSelf: 'center',
  },
});
