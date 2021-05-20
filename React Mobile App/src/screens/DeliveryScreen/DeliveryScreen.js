import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { PackageList } from '../../components/PackageList';
import { Button } from 'react-native-elements';
import { base } from '../../utilities/constant';
import axios from 'axios';

// const DATA = [
//   { id: 1, title: 'package' },
//   { id: 2, title: 'package' },
//   { id: 3, title: 'package' },
//   { id: 4, title: 'package' },
//   { id: 5, title: 'package' },
//   { id: 6, title: 'package' },
//   { id: 7, title: 'package' },
//   { id: 8, title: 'package' },
//   { id: 9, title: 'package' },
//   { id: 10, title: 'package' },
//   { id: 11, title: 'package' },
//   { id: 12, title: 'package' },
// ]; // TODO: Conexiunea cu baza de date de la Victor

export const DeliveryScreen = ({ route, navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const DATA = PackageList(route.params.id);
  // console.log('sda', route.params.id);
  // const courierPackages = `${base}packages?cid=${route.params.id}`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(courierPackages);

  //     console.log(result.data);
  //     setPackages(result.data);
  //   };
  //   fetchData();
  // }, [setPackages]);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View style={styles.viewTitle}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}
      >
        <Icon
          name="chevron-right"
          type="font-awesome5"
          size={60}
          color="#6c63ff"
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = 'white';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.push('ChangePackageState', {
            packageID: item.id,
            state: item.state,
            entity: 'courier',
          })
        }
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<Button title="Refresh" onPress={() => Refresh()}></Button>*/}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTitle: {
    flex: 8,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    height: 90,
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 20,

    elevation: 4,
    borderRadius: 10,
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  arrow: {
    flex: 2,
    backgroundColor: 'red', // de scos si pus sageata
  },
});
