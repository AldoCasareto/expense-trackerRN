import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';

const ManageExpense = ({ route, navigation }) => {
  const id = route.params?.expenseId;
  const isEditing = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Edit your expense' : 'Manage Expenses' });
  }, [isEditing, navigation]);

  const deleteHandler = () => {};

  return (
    <View style={styles.container}>
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
