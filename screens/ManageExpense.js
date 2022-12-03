import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses.context';

const ManageExpense = ({ route, navigation }) => {
  const { deleteExpense, addExpense, updateExpense } = useContext(ExpensesContext);
  const id = route.params?.expenseId;
  const isEditing = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Edit your expense' : 'Manage Expenses' });
  }, [isEditing, navigation]);

  const deleteHandler = () => {
    deleteExpense(id);
    this.toast.show('Expense successfully deleted!', 500);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(id, {
        description: 'Test!!!!!!',
        amount: 19.99,
        date: new Date('2022-12-01'),
      });
    } else {
      addExpense({ description: 'Text', amount: 29.99, date: new Date('2022-11-29') });
    }
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button style={styles.button} mode='flat' onPress={cancelHandler}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={confirmHandler}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </View>
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              iconName='trash'
              color={GlobalStyles.colors.error500}
              size='36'
              onPress={deleteHandler}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
});
