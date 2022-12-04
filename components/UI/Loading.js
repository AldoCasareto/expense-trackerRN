import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='white' />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
