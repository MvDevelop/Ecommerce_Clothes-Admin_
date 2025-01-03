
import { useEffect, useState } from 'react';
import styles from './ListProduct.module.css';
import cross_icon from '../assets/cross_icon.png';

function ListProduct() {

  const [ allProducts, setAllProducts ] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res) => res.json())
    .then((data) => {setAllProducts(data)});
  }

  useEffect(() => {
    fetchInfo();
  },[]);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json', 
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <>
      <div className={styles.listProduct_container}>
        <h1>All Products List</h1>
        <div className={styles.listProduct_format_main}>
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className={styles.listProduct_allproducts}>
          <hr />
          {allProducts.map((product,index) => {
            return (
              <>
                <div key={index} className={styles.listProduct_format_main_listProduct_format}>
                <img src={product.image} alt="" className={styles.listProduct_product_icon}/>
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => {remove_product(product.id)}} src={cross_icon} alt="" className={styles.listProduct_remove_icon} />
                </div>
                <hr />
              </>
            ) })}
        </div>
      </div>
    </>
  )
}

export default ListProduct;
