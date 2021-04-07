import * as React from 'react';
import { TextInput } from 'react-native';
import { View, Image, Text, Button, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

const CreateAccountScreen = ({}) => {
  return (
    <SafeAreaView style={{}}>
      <View style={{}}>
        <Text>UserName</Text>
        <TextInput style={{}}></TextInput>
        <Text>Password</Text>
        <TextInput style={{}}></TextInput>
        <Text>Confirm Password</Text>
        <TextInput style={{}}></TextInput>
      </View>
    </SafeAreaView>
  );
};
export default CreateAccountScreen;
