import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses.context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      Period='Total'
      fallBackText='No registered expenses'
    />
  );
};

export default AllExpenses;
