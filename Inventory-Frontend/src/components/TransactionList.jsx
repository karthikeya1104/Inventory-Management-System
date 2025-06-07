import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/TransactionList.css'
import { BACKEND_URL } from '../config';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/transactions/`)
            .then(response => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching transactions:", error);
                setError("Error fetching transactions.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${BACKEND_URL}/transactions/${id}/`)
            .then(() => {
                setTransactions(transactions.filter(transaction => transaction.id !== id));
                alert('Transaction deleted successfully');
            })
            .catch(error => {
                console.error("Error deleting transaction:", error);
                alert('Failed to delete transaction');
            });
    };

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>{`Error: ${error}`}</div>;

    return (
        <div>
            <h2>Transaction List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price per Unit</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.quantity}</td>
                            <td>${transaction.price_per_unit}</td>
                            <td>${(transaction.quantity * transaction.price_per_unit).toFixed(2)}</td>
                            <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
