import * as React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  SafeAreaView,
  FlatList,
} from 'react-native';

const DATA = {
  id: 1,
  title: 'package',
  id: 2,
  title: 'package',
  id: 3,
  title: 'package',
  id: 4,
  title: 'package',
  id: 5,
  title: 'package',
  id: 6,
  title: 'package',
}; // TODO: Conexiunea cu baza de date de la Victor

const Item = ({ title }) => {
  <View style={}>
    <Text>{title}</Text>
  </View>;
};

const renderItem = ({ item }) => {
  <Item title={item.title} />;
};

const DeliveryScreen = ({}) => {
  return (
    <SafeAreaView style={{}}>
      <View style={{}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default DeliveryScreen;
