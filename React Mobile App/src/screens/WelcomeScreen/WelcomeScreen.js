import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { GetLocation } from '../../components/GetLocation';
import * as Location from 'expo-location';

export const WelcomeScreen = ({ navigation }) => {
  let location = GetLocation();
  if (location !== null && location !== undefined) console.log(location);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.container}>
        {/* { <View style={styles.rect2}>
        <Image
          source={require('../../../assets/logocurier.png')}
          style={{
            alignSelf: 'center',
            marginTop: '50%',
          }}
          resizeMode="contain"
        />
      </View>} */}
        {location ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.rect3}>
              <Button
                buttonStyle={{
                  alignSelf: 'center',
                  backgroundColor: '#efa912',
                  width: 120,
                  height: 120,
                  borderRadius: 12,
                }}
                titleStyle={{ fontSize: 22 }}
                title="Courier"
                onPress={() => navigation.push('SignIn', { location })}
              ></Button>
            </View>
            <View style={styles.rect4}>
              <Button
                buttonStyle={{
                  alignSelf: 'center',
                  backgroundColor: '#efa912',
                  width: 120,
                  height: 120,
                  borderRadius: 12,
                }}
                titleStyle={{ fontSize: 22 }}
                title="Client"
                onPress={() => navigation.push('InsertCode')}
              ></Button>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#6c63ff',
  },

  rect2: {
    flex: 3,
  },
  rect3: {
    flex: 2,

    alignSelf: 'center',
  },
  rect4: {
    flex: 2,

    alignSelf: 'center',
  },
});

// un splash screen duratie 2 sec, pe mijloc o componenta care contine imaginea si CurieRO galbenul mustar sub imagine
// doua secunde in activitatea choose
