import { useState } from 'react';
import './App.css';

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
        <div className="app">
            <h1>Трекер бюджета</h1>
            <div className="balance">
                <h2 style={{ color: balance >= 0 ? '#2ecc71' : '#e74c3c' }}>
                    Баланс: {balance} ₽
                </h2>
            </div>
            <div className="form">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" />
                <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сумма" type="number" />
                <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
                    <option value="income">Доход</option>
                    <option value="expense">Расход</option>
                </select>
                <button onClick={addTransaction}>Добавить</button>
            </div>
            <div>
                {transactions.map(t => (
                    <div key={t.id} className={`transaction ${t.type}`}>
                        <span>{t.title} — {t.type === 'income' ? '+' : '-'}{t.amount} ₽</span>
                        <button onClick={() => deleteTransaction(t.id)}>✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;