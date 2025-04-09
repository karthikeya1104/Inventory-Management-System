import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/RawMaterialList.css'

const RawMaterialList = () => {
    const [rawMaterials, setRawMaterials] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/raw_materials/')
          .then(response => { 
            setRawMaterials(response.data); 
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);
      
    const goToTransactions = () => {
        navigate('/transactions');
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/raw_materials/${id}/`)
            .then(response => {
                setRawMaterials(rawMaterials.filter(rawMaterial => rawMaterial.id !== id));
            })
            .catch(error => {
                console.error("Error deleting raw material:", error);
            });
    };

    return (
        <div className="container">
            <h2>Raw Materials</h2>
            <Link to="/add-raw-material" className="add-button">Add New Raw Material</Link>
            <button className="add-button" onClick={goToTransactions}>View Transactions</button>
            <div className="flex-container">
                {rawMaterials.map((rawMaterial) => (
                    <div key={rawMaterial.id} className="flex-item">
                        <div className="item-details">
                            <strong>{rawMaterial.name}</strong>
                            <p>Quantity: {rawMaterial.quantity}</p>
                            <p>Average Price: ${rawMaterial.price_per_unit}</p>
                        </div>
                        <div className="actions">
                            <Link to={`/update-raw-material/${rawMaterial.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(rawMaterial.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RawMaterialList;
