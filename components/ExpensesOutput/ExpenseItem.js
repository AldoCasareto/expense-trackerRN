import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = ({ item }) => {
  const { id, description, amount, date } = item;

  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };
  return (
    <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View>
          <Text style={[styles.description, styles.textBase]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOpacity: 0.4,
    shadowOffset: { height: 1, width: 1 },
  },
  pressed: {
    opacity: 0.75,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
