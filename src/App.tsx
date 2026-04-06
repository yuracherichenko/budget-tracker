import { useState } from 'react';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = transactions.reduce((acc, t) =>
      t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('income');

    const addTransaction = () => {
        if (!title || !amount) return;
        setTransactions([...transactions, {
            id: Date.now(),
            title,
            amount: Number(amount),
            type
        }]);
        setTitle('');
        setAmount('');
    };
    const deleteTransaction = (id: number) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

  return (
      <div>
        <h1>Трекер бюджета</h1>
        <h2>Баланс: {balance} ₽</h2>
          <div>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" />
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сумма" type="number" />
              <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
                  <option value="income">Доход</option>
                  <option value="expense">Расход</option>
              </select>
              <button onClick={addTransaction}>Добавить</button>
          </div>
          <ul>
              {transactions.map(t => (
                  <li key={t.id}>
                      {t.title} — {t.type === 'income' ? '+' : '-'}{t.amount} ₽
                      <button onClick={() => deleteTransaction(t.id)}>✕</button>
                  </li>
              ))}
          </ul>
      </div>

  );
}

export default App;