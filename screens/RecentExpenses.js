import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import Loading from '../components/UI/Loading';
import { ExpensesContext } from '../store/expenses.context';
import { getRecentDays } from '../util/date';
import { fetchExpenses } from '../util/services';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses');
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  const handleError = () => setError(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay onConfirm={handleError} message={error} />;
  }

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
