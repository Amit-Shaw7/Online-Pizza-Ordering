import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import "../../styles/orderDetails.scss";
import { useParams } from 'react-router-dom';
import { server } from '../../redux/Store';
import axios from 'axios';
import { useSelector } from 'react-redux';
import EachOrder from './EachOrder';
import Loader from '../../layout/Loader';

const OrderDetails = () => {
    const params = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.auth);
    // console.log(params.id);

    const getOrderDetails = async () => {
        setLoading(true);
        const url = `${server}/orders/${params?.id}`;
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
            setOrder(res.data.order);
        }
        setLoading(false);
    }

    useEffect(() => {
        getOrderDetails();
        // eslint-disable-next-line
    }, []);
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="order-details">
            {
                loading
                    ?
                    <Loader />
                    :
                    <main>
                        <h1>Order Details</h1>

                        <aside>
                            <h2>Shipping</h2>
                            <div>
                                <b>Address</b>
                                <span>{order?.shippingInfo.address}</span>
                            </div>
                        </aside>

                        <hr className='hr' />

                        <div>
                            <h2>Contact</h2>
                            <p>
                                <b>Name - </b>
                                <span>{user?.name}</span>
                            </p>
                            <p>
                                <b>Phone - </b>
                                <span>{user?.phone}</span>
                            </p>
                        </div>

                        <hr className='hr' />

                        <div>
                            <h2>Status</h2>
                            <p>
                                <b>Order Status - </b>
                                <span>{order?.orderStatus}</span>
                            </p>
                            <p>
                                <b>Placed At - </b>
                                <span>{order?.createdAt.split("T")[0]}</span>
                            </p>
                            <p>
                                <b>Devilevered at - </b>
                                <span>{order?.orderStatus === "Preparing" ? "Not Delivered" : order?.deliveredAt?.split("T")[0]}</span>
                            </p>
                        </div>

                        <hr className='hr' />


                        <div>
                            <h2>Payment</h2>
                            <p>
                                <b>Payment Method - </b>
                                <span>{order?.paymentMethod}</span>
                            </p>

                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
                                <b>Payment Refference Id </b>
                                <span>{order?.paymentInfo ? order.paymentInfo : "N/A"}</span>
                            </p>

                            <p>
                                <b>Paid At - </b>
                                <span>{order?.paidAt ? order?.paidAt.split("T")[0] : "Unpaid"}</span>
                            </p>

                        </div>

                        <hr className='hr' />

                        <div>
                            <h2>Amount</h2>
                            <p>
                                <b>Items Total - </b>
                                <span><BiRupee />{order?.itemsPrice}</span>
                            </p>
                            <p>
                                <b>Shipping Charges - </b>
                                <span><BiRupee />{order?.shippingCharges}</span>
                            </p>
                            <p>
                                <b>Taxes - </b>
                                <span><BiRupee />{Math.round(order?.taxPrice)}</span>
                            </p>
                            <p>
                                <b>Total Amount - </b>
                                <span><BiRupee />{Math.round(order?.totalAmount)}</span>
                            </p>

                        </div>

                        <hr className='hr' />

                        <article>
                            <h2 style={{ margin: "2rem 0px" }}>Ordered Items</h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {
                                    order?.orderItems?.map((item, idx) => (
                                        <EachOrder key={idx} item={item} />
                                    ))
                                }
                            </div>

                            <div className='summary'>
                                <h4 style={{ fontWeight: "800" }}>Total</h4>
                                <div style={{ fontWeight: "800" }}><BiRupee /> {Math.round(order?.totalAmount)}</div>
                            </div>
                        </article>
                    </main>}
        </section>
    )
}

export default OrderDetails