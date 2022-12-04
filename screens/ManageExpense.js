import { View, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expenses.context';
import Form from '../components/ManageExpense/Form';
import { addExpenseDb, deleteExpenseDb, updateExpenseDb } from '../util/services';
import Loading from '../components/UI/Loading';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteExpense, addExpense, updateExpense, expenses } = useContext(ExpensesContext);
  const id = route.params?.expenseId;
  const isEditing = !!id;

  const selectedExpense = expenses.find((expense) => expense.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Edit your expense' : 'Manage Expenses' });
  }, [isEditing, navigation]);

  const deleteHandler = () => {
    setIsLoading(true);
    try {
      deleteExpense(id);
      deleteExpenseDb(id);
      navigation.goBack();
    } catch (error) {
      setError('could not delete de expense');
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        updateExpense(id, expenseData);
        updateExpenseDb(id, expenseData);
      } else {
        const id = await addExpenseDb(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError('could not save the expense');
      setIsLoading(false);
    }
  };

  const handleError = () => setError(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error && isLoading) {
    return <ErrorOverlay onConfirm={handleError} message={error} />;
  }

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
