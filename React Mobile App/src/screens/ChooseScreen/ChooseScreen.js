// pagina de intrare cu doua butoane I am user or I am courier(pe mijloc) unu stanga unu dreapta
// I am user ma duce la o activitate cu cod
// I am courier te duce la logare

import * as React from 'react';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import { View, Image, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const WelcomeScreen = ({ navigation }) => (
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
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.rect3}>
          <Button
            buttonStyle={{
              alignSelf: 'center',
              backgroundColor: '#efa912',
            }}
            title="Courier"
            onPress={() => navigation.push('DeliveryScreen')}
          ></Button>
        </View>
        <View style={styles.rect4}>
          <Button
            buttonStyle={{
              alignSelf: 'center',
              backgroundColor: '#efa912',
            }}
            title="Client"
            onPress={() => navigation.push('YourPackageScreen')}
          ></Button>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

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
