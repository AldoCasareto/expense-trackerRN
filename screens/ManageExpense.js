import { View, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expenses.context';
import Form from '../components/ManageExpense/Form';

const ManageExpense = ({ route, navigation }) => {
  const { deleteExpense, addExpense, updateExpense, expenses } = useContext(ExpensesContext);
  const id = route.params?.expenseId;
  const isEditing = !!id;

  const selectedExpense = expenses.find((expense) => expense.id === id);

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

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      updateExpense(id, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <Form
          onCancel={cancelHandler}
          isEditing={isEditing}
          onSubmit={confirmHandler}
          defaultValue={selectedExpense}
        />

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
});
