
import styles from './Admin.module.css';

import Sidebar from '../components/Sidebar';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import { Routes, Route } from 'react-router-dom';

function Admin() {
  return (
    <>
      <div className={styles.admin_container}>
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct />}/>
          <Route path='/listproduct' element={<ListProduct />}/>
        </Routes>
      </div>
    </>
  )
}

export default Admin;
