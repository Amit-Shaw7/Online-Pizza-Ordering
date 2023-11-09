import React, { useEffect } from 'react';
import "../../styles/cart.scss";
import CartItem from './CartItem';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
import { CgShoppingCart } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/actions/CartAction';
import { toast } from 'react-hot-toast';
import Loader from '../../layout/Loader';
import "../../styles/empty.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const { tax, subTotal, shippingCharges, message, refresh, cartItems, loading } = useSelector(state => state.cart);
    // const [cartItems, setCartItems] = useState(null);



    useEffect(() => {
        dispatch(fetchCartItems());
    }, [refresh , dispatch]);

    useEffect(() => {
        message && toast.success(message);
        dispatch({ type: "CLEAR_TOAST_MSG" });
    }, [message , dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {
                loading
                    ?
                    <Loader />
                    :
                    <section className="cart">

                        {

                           cartItems && cartItems?.length === 0
                                ?
                                <div className='empty'>
                                    <div>
                                        <CgShoppingCart />
                                        <span>No Items</span>
                                    </div>
                                </div>
                                :
                                <main >
                                    {
                                        cartItems?.map((item) => (
                                            <CartItem item={item} key={item._id} />
                                        ))
                                    }

                                    <article>
                                        <div>
                                            <h4>Sub Total</h4>
                                            <p><BiRupee /> {Math.round(subTotal)}</p>
                                        </div>
                                        <div>
                                            <h4>Tax</h4>
                                            <p><BiRupee /> {Math.round(tax)}</p>
                                        </div>
                                        <div>
                                            <h4>Shipping Charges</h4>
                                            <p><BiRupee /> {Math.round(shippingCharges)}</p>
                                        </div>
                                        <div>
                                            <h4>Total</h4>
                                            <p><BiRupee /> {Math.round(subTotal + subTotal * 0.18 + shippingCharges)}</p>
                                        </div>
                                        {
                                            cartItems?.length !== 0 && <Link to="/shipping">Checkout <BsFillArrowRightCircleFill style={{ marginLeft: "5px" }} /></Link>
                                        }
                                    </article>
                                </main>
                        }

                    </section>
            }
        </>
    )
}

export default Cart