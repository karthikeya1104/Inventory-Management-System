import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RawMaterialList from './components/RawMaterialList';
import AddRawMaterial from './components/AddRawMaterial';
import UpdateRawMaterial from './components/UpdateRawMaterial';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <Router>
      <div>
        <center><h1>Inventory Management System</h1></center>
        <Routes>
          <Route path="/" element={<RawMaterialList />} />
          <Route path="/raw-materials" element={<RawMaterialList />} />
          <Route path="/add-raw-material" element={<AddRawMaterial />} />
          <Route path="/update-raw-material/:id" element={<UpdateRawMaterial />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
