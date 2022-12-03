import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import FormInput from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const Form = ({ onCancel, onSubmit, isEditing, defaultValue }) => {
  const [inputs, setInputs] = useState({
    description: { value: defaultValue?.description ?? '', isValid: true },
    date: {
      value: (defaultValue && getFormattedDate(defaultValue.date)) ?? '',
      isValid: true,
    },
    amount: {
      value: (defaultValue && defaultValue.amount.toString()) ?? '',
      isValid: true,
    },
  });

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // return Alert.alert('Invalid input', 'Please check your input values');
      return setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
        };
      });
    }

    onSubmit(expenseData);
  };

  const handleInputForm = (identifier) => (enteredValue) => {
    setInputs((curInput) => {
      return {
        ...curInput,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.description.isValid || !inputs.date.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <FormInput
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: handleInputForm('amount'),
            value: inputs.amount.value,
          }}
        />
        <FormInput
          style={styles.rowInput}
          label='Date'
          invalid={!inputs.date.isValid}
          textInputConfig={{
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
            onChangeText: handleInputForm('date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <FormInput
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: handleInputForm('description'),
          value: inputs.description.value,
          multiline: true,
          autoCorrect: false,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid inputs, please check your entered data!</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
