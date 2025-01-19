
import styles from './AddProduct.module.css';

import upload_area from '../assets/upload_area.svg';
import { useState } from 'react';

const url = 'https://ecommerce-clothes-backend.onrender.com';

function AddProduct() {

  const [ image, setImage ] = useState(false);
  const [ productDetails, setProductDetails ] = useState({
    name:"", image:"", category:"women",
    new_price:"", old_price:"",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
  }

  const add_product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    //'http://localhost:4000/upload'
    await fetch(`${url}/upload`, {
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp) => resp.json()).then((data) => {responseData=data});

    if(responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      //'http://localhost:4000/addproduct'
      await fetch(`${url}/addproduct`, {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success?alert("Product Added"):alert("Failed");
      });
    }
  } 

  return (
    <>
        <div className={styles.addProduct_container}>
          <div className={styles.addProduct_itemfield}>
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
          </div>
          <div className={styles.addproduct_price}>
            <div className={styles.addProduct_itemfield}> 
              <p>Price</p>
              <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
            </div>
            <div className={styles.addProduct_itemfield}> 
              <p>Offer Price</p>
              <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
            </div>
          </div>
          <div className={styles.addProduct_itemfield}>
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className={styles.addproduct_selector}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className={styles.addProduct_itemfield}>
            <label htmlFor="file-input">
              <img src={image?URL.createObjectURL(image):upload_area} className={styles.addproduct_thumnail_img} alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
          </div>
          <button onClick={() => {add_product()}} className={styles.addproduct_btn}> ADD </button>
        </div>
    </>
  )
}

export default AddProduct;
