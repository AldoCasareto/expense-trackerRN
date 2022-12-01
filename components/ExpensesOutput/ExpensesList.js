import { View, Text, FlatList } from 'react-native';
import React from 'react';

const renderExpenseItem = ({ item }) => {
  return <Text>{item.description}</Text>;
};

const ExpensesList = ({ expenses }) => {
  return (
    <View>
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default ExpensesList;
