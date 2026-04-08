import { useState, useEffect } from 'react';
import './App.css';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
      const saved = localStorage.getItem('transactions');
      return saved ? JSON.parse(saved) : [];
  });

  const balance = transactions.reduce((acc, t) =>
      t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('income');

    useEffect(() => {
        localStorage.setItem('transactions' ,JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = () => {
        if (!title || !amount) return;
        setTransactions([...transactions, {
            id: Date.now(),
            title,
            amount: Number(amount),
            type,
            category,
        }]);
        setTitle('');
        setAmount('');
    };
    const deleteTransaction = (id: number) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const categoryStats = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

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
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    <option value="еда">Еда</option>
                    <option value="транспорт">Транспорт</option>
                    <option value="зарплата">Зарплата</option>
                    <option value="развлечения">Развлечения</option>
                    <option value="другое">Другое</option>
                </select>
                <button onClick={addTransaction}>Добавить</button>
            </div>
            <div>
                {transactions.map(t => (
                    <div key={t.id} className={`transaction ${t.type}`}>
                        <span>{t.title} [{t.category}] — {t.type === 'income' ? '+' : '-'}{t.amount} ₽</span>
                        <button onClick={() => deleteTransaction(t.id)}>✕</button>
                    </div>
                ))}
            </div>
            <div className="balance">
                <h3>Расходы по категориям:</h3>
                {Object.entries(categoryStats).map(([cat, sum]) => (
                    <p key={cat}>{cat}: -{sum} ₽</p>
                ))}
            </div>
        </div>

    );
}

export default App;