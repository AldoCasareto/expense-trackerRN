import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses.context';
import { getRecentDays } from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getRecentDays(today, 7);

    return expense.date > date7daysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 days'
      fallBackText='No expenses in the past 7 days'
    />
  );
};

export default RecentExpenses;
