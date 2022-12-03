import { View, Text, TextInput } from 'react-native';
import React from 'react';

const Form = () => {
  return (
    <View>
      <TextInput label='Email' value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput label='Email' value={email} onChangeText={(text) => setEmail(text)} />
      Form
    </View>
  );
};

export default Form;
