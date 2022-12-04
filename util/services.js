import axios from 'axios';

const url = 'https://practice-38581-default-rtdb.firebaseio.com';

export const addExpenseDb = async (expenseData) => {
  const response = await axios.post(url + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const { data } = await axios.get(url + '/expenses.json');

  const mappedObject = Object.keys(data).map((key) => {
    return {
      id: key,
      ...data[key],
      date: new Date(data[key].date),
    };
  });
  return mappedObject;
};

export const updateExpenseDb = (id, updatedExpenseData) => {
  return axios.put(`${url}/expenses/${id}.json`, updatedExpenseData);
};
export const deleteExpenseDb = (id) => {
  return axios.delete(`${url}/expenses/${id}.json`);
};
