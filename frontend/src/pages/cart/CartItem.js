import React, { useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteAItem } from '../../redux/actions/CartAction';
import Loader from '../../layout/Loader';
import { useEffect } from 'react';
import { fetchCurrentProduct } from '../../redux/actions/AdminActions';


const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const { loading } = useSelector(state => state.cart);

  const increment = () => {
    dispatch({
      type: "INCREMENT_QTY",
      payload: item?.productId
    });
    dispatch({ type: "RESET_PRICE" });
    dispatch({ type: "CALCULATE_PRICE" });
    setQty(qty + 1);
  }

  const decrement = () => {
    if (qty > 1) {
      dispatch({
        type: "DECREMENT_QTY",
        payload: item?.productId
      });
      dispatch({ type: "RESET_PRICE" });
      dispatch({ type: "CALCULATE_PRICE" });
      setQty(qty - 1)
    }
  }

  const deleteItem = () => {
    dispatch(deleteAItem(item?.productId));
  }

  const fetchItemsDetails = async () => {
    const product = await dispatch(fetchCurrentProduct(item?.productId, "cart"));
    setProduct(product);
  }

  useEffect(() => {
    fetchItemsDetails();
  }, []);

  return (
    <>
      {
        loading
          ?
          <Loader />
          :
          <div className='cart-item' >
            <div>
              <img src={product?.photoUrl} alt="Cheese Pizza" />
              <h5>{item?.title}</h5>
              <h4 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><BiRupee /> {item?.price}</h4>
            </div>
            <div>
              <button onClick={decrement}>-</button>
              <input readOnly type="number" value={qty} />
              <button onClick={increment}>+</button>
              <button className='delete' onClick={deleteItem}> <RiDeleteBin6Line /></button>
            </div>
          </div>
      }
    </>
  )
}

export default CartItem