import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/UpdateRawMaterial.css'

const UpdateRawMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rawMaterial, setRawMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState();
  const [priceToAdd, setPriceToAdd] = useState();
  const [quantityToRemove, setQuantityToRemove] = useState();

  useEffect(() => {
    const fetchRawMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/raw_materials/${id}/`);
        setRawMaterial(response.data);
      } catch (err) {
        console.error("Error fetching raw material:", err);
        setError("Failed to load raw material data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRawMaterial();
    } else {
      setError("Invalid raw material ID.");
      setLoading(false);
    }
  }, [id]);

  const handleAddStock = async () => {
    if (quantityToAdd <= 0 || priceToAdd <= 0) {
      alert('Please enter valid quantity and price.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/raw_materials/${id}/`, {
        quantity_to_add: quantityToAdd,
        price_to_add: priceToAdd,
      });
      setRawMaterial(response.data);

      await axios.post('http://localhost:8000/api/transactions/', {
        raw_material: id,
        transaction_type: 'add',
        quantity: quantityToAdd,
        price_per_unit: priceToAdd,
    });

      setQuantityToAdd(0);
      setPriceToAdd(0);
      alert(`Successfully added ${quantityToAdd} units of ${rawMaterial.name} at $${priceToAdd} each.`);
    } catch (err) {
      console.error("Error adding stock:", err);
      alert('Failed to add stock.');
    }
  };

  const handleRemoveStock = async () => {
    if (quantityToRemove <= 0 || quantityToRemove > rawMaterial.quantity) {
      alert('Please enter a valid quantity to remove.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/raw_materials/${id}/`, {
        quantity_to_remove: quantityToRemove,
      });
      setRawMaterial(response.data);

      await axios.post('http://localhost:8000/api/transactions/', {
        raw_material: id,
        transaction_type: 'remove',
        quantity: quantityToRemove,
        price_per_unit: rawMaterial.price_per_unit,
    });
    
      setQuantityToRemove(0);
      alert(`Successfully removed ${quantityToRemove} units.`);
    } catch (err) {
      console.error("Error removing stock:", err);
      alert('Failed to remove stock.');
    }
  };

  if (loading) return <div>Loading raw material...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;
  if (!rawMaterial) return <div>Raw Material not found!</div>;

  return (
    <div>
      <h2>Update Raw Material: {rawMaterial.name}</h2>
      <p>Current Quantity: {rawMaterial.quantity}</p>
      <p>Current Average Price: ${rawMaterial.price_per_unit}</p>

      <div>
        <h3>Add Stock</h3>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantityToAdd}
          onChange={(e) => setQuantityToAdd(Number(e.target.value))}
        />
        <label>Price:</label>
        <input
          type="number"
          value={priceToAdd}
          onChange={(e) => setPriceToAdd(Number(e.target.value))}
        />
        <button onClick={handleAddStock}>Add Stock</button>
      </div>

      <div>
        <h3>Remove Stock</h3>
        <label>Quantity to Remove:</label>
        <input
          type="number"
          value={quantityToRemove}
          onChange={(e) => setQuantityToRemove(Number(e.target.value))}
        />
        <button onClick={handleRemoveStock}>Remove Stock</button>
      </div>
      <br />
      <button onClick={() => navigate('/raw-materials')}>Back to Raw Materials</button>
    </div>
  );
};

export default UpdateRawMaterial;
