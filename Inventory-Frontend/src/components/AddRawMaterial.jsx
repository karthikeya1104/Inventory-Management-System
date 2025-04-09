import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AddRawMaterials.css'

const AddRawMaterial = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
    
        const newRawMaterial = { 
            name, 
            quantity: parseInt(quantity), 
            price_per_unit: parseFloat(price) 
        };
    
        axios.post('http://localhost:8000/api/raw_materials/', newRawMaterial)
            .then(response => {
                alert('Raw material added successfully');
                setName('');
                setQuantity('');
                setPrice('');
                
                const transactionData = {
                    raw_material: response.data.name,
                    transaction_type: 'add',
                    quantity: response.data.quantity,
                    price_per_unit: response.data.price_per_unit
                };
    
                axios.post('http://localhost:8000/api/transactions/', transactionData)
                    .then(() => {
                        console.log("Transaction logged successfully");
                    })
                    .catch(error => {
                        console.error("Error logging transaction:", error);
                    });
    
                // Redirecting to the home page
                navigate('/');
            })
            .catch(error => {
                alert('Error adding raw material');
                console.error(error);
            });
    };
    

    return (
        <div>
            <h2>Add New Raw Material</h2>
            <form onSubmit={handleAdd}>
                <div>
                    <label>Material Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        step="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Raw Material</button>
            </form>
        </div>
    );
};

export default AddRawMaterial;
