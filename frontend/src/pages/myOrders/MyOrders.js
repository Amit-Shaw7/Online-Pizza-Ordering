import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import "../../styles/table.scss";
import { toast } from 'react-hot-toast';
import { server } from '../../redux/Store';
import axios from 'axios';
import '../../styles/empty.scss';
import { BsFillBagXFill } from 'react-icons/bs';
import Loader from '../../layout/Loader';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const url = `${server}/orders/myorders`;
      const res = await axios.get(url, { withCredentials: true });
      if (res.status === 200) {
        setOrders(res.data.orders);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <section className="table">
      {
        loading
          ?
          <Loader />
          :
          <>
            {
              orders?.length === 0
                ?
                <div className='empty'>
                  <div>
                    <BsFillBagXFill />
                    <span>No Order</span>
                  </div>
                </div>
                :
                <main>
                  <table>
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {
                      orders && orders?.map((order) => (
                        <tbody key={order._id}>
                          <tr>
                            <td>{order?._id}</td>
                            <td>{order?.orderStatus}</td>
                            <td>{order?.orderItems.length}</td>
                            <td><BiRupee />&nbsp;{Math.round(order.totalAmount)}</td>
                            <td>{order?.paymentMethod}</td>
                            <td><Link to={`/order/${order?._id}`}>
                              <AiOutlineEye />
                            </Link></td>
                          </tr>
                        </tbody>
                      ))
                    }
                  </table>
                </main>
            }
          </>
      }

    </section>
  )
}

export default MyOrders