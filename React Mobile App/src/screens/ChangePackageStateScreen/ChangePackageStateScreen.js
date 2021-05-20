import React, { Component, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { ChangePackageState } from '../../components/ChangePackageState';

export const ChangePackageStateScreen = ({ route, navigation }) => {
  const size = 70;
  const color = '#6c63ff';
  const [packageState, setPackageState] = useState(route.params.state);

  const changePackageStateById = (status) => {
    setPackageState(status);
    ChangePackageState(route.params.packageID, status);
  };

  console.log(
    'myID',
    route.params.packageID,
    route.params.state,
    route.params.entity
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.depositRow}>
          <View style={styles.rectStack}>
            <TouchableOpacity
              onPress={() =>
                route.params.entity === 'courier'
                  ? changePackageStateById('pending')
                  : null
              }
            >
              <Icon
                type="font-awesome-5"
                name="warehouse"
                color={color}
                size={size}
              ></Icon>
            </TouchableOpacity>
          </View>
          {packageState === 'pending' ? (
            <EntypoIcon
              name="arrow-long-left"
              style={styles.arrow}
            ></EntypoIcon>
          ) : null}
        </View>
        <View style={styles.depositRow}>
          <View style={styles.rectStack}>
            <TouchableOpacity
              onPress={() =>
                route.params.entity === 'courier'
                  ? changePackageStateById('delivering')
                  : null
              }
            >
              <Icon
                type="font-awesome-5"
                name="truck"
                color={color}
                size={size}
              ></Icon>
            </TouchableOpacity>
          </View>
          {packageState === 'delivering' ? (
            <EntypoIcon
              name="arrow-long-left"
              style={styles.arrow}
            ></EntypoIcon>
          ) : null}
        </View>
        <View style={styles.depositRow}>
          <View style={styles.rectStack}>
            <TouchableOpacity
              onPress={() =>
                route.params.entity === 'courier'
                  ? changePackageStateById('done')
                  : null
              }
            >
              <Icon
                type="font-awesome-5"
                name="home"
                color={color}
                size={size}
              ></Icon>
            </TouchableOpacity>
          </View>
          {packageState === 'done' ? (
            <EntypoIcon
              name="arrow-long-left"
              style={styles.arrow}
            ></EntypoIcon>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  deposit: {
    color: '#121212',
    marginTop: 16,
  },
  firstCircle: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'white',
    fontSize: 40,
  },
  rectStack: {
    width: 100,
    height: 205,
    marginLeft: '50%',

    alignSelf: 'center',
  },
  arrow: {
    color: '#3f3d56',
    fontSize: 40,
    marginLeft: 25,
    marginTop: '6%',
  },
  depositRow: {
    height: 207,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 18,
    marginRight: 160,
  },
  courier: {
    color: '#121212',
  },
  delivered: {
    color: '#121212',
    marginTop: 180,
    width: 120,
  },
  courierColumn: {
    width: 60,
    marginTop: 12,
    marginBottom: 11,
  },

  secondCircle: {
    left: 0,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    top: 206,
  },
  rect1Stack: {
    width: 35,
    height: 244,
    marginLeft: 26,
  },
  courierColumnRow: {
    height: 244,
    flexDirection: 'row',
    marginTop: 1,
    marginLeft: 18,
    marginRight: 224,
  },
});

// mutat pe partea de client atunci cand da click pe un pachet
// Courierul e editabil dar clientul nu e
