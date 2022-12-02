import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = ({ item }) => {
  return <ExpenseItem item={item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <View>
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default ExpensesList;
