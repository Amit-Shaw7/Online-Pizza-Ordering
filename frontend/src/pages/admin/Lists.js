import React, { useEffect } from 'react';
import "../../styles/table.scss";
import noAvatr from "../../assets/noavatar.png"
import { changeOrderStatus, deleteAProduct, fetchAllOrderList, fetchAllProuctsList, fetchAllUserList } from '../../redux/actions/AdminActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoAddSharp } from 'react-icons/io5';

const Users = ({ type }) => {
    const { loading, allUserList, allOrdersList, allProductsList, refresh } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const handleOrderStatus = (orderId) => {
        dispatch(changeOrderStatus(orderId));
    }

    const deleteProduct = (id) => {
        dispatch(deleteAProduct(id));
    }

    useEffect(() => {
        type === "orders" && dispatch(fetchAllOrderList());
        type === "products" && dispatch(fetchAllProuctsList());
        dispatch({ type: "CLEAR_MSG" });
    }, [refresh , dispatch , type]);

    useEffect(() => {
        type === "users" && dispatch(fetchAllUserList());
        dispatch({ type: "CLEAR_MSG" });
    }, [dispatch , type]);
    
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
                    <main>
                        <table>
                            <thead>
                                <tr>
                                    <th>{((type === "users" && "User Id") || (type === "orders" && "Order Id") || (type === "products" && "Product Id"))}</th>
                                    <th>{((type === "users" && "Name") || (type === "orders" && "Status") || (type === "products" && "Product Title"))}</th> {/*name*/}
                                    <th>{((type === "users" && "Role") || (type === "orders" && "Item Qty") || (type === "products" && "Product Price"))}</th> {/*role*/}
                                    <th>{((type === "users" && "Since") || (type === "orders" && "Price") || (type === "products" && "Created At"))}</th>
                                    {(type !== "users" && <th>{(type === "orders" && "Payment Method") || (type === "products" && "Img")}</th>)}
                                    {(type === "orders" && <th>User Id</th>)}

                                    <th>{((type === "users" && "Photo") || (type === "orders" && "Action") || (type === "products" && "Actions"))}</th>
                                </tr>
                            </thead>

                            {
                                type === "users" && allUserList && allUserList.map((user, idx) => (
                                    <tbody key={idx}>
                                        <tr>
                                            <td>{user?._id}</td>
                                            <td>{user?.name}</td>
                                            <td>{user?.role}</td>
                                            <td>{user?.createdAt.split("T")[0]}</td>
                                            <td>
                                                <img style={{ objectFit: "cover" }} src={user?.photo ? user.photo : noAvatr} alt={user?.name} />
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                            {
                                type === "orders" && allOrdersList && allOrdersList.map((order, idx) => (
                                    <tbody key={idx}>
                                        <tr>
                                            <td>{order?._id}</td>
                                            <td>{order?.orderStatus}</td>
                                            <td>{order?.orderItems.length}</td>
                                            <td><BiRupee />&nbsp;{Math.round(order?.totalAmount)}</td>
                                            <td>{order?.paymentMethod}</td>
                                            <td>{order?.user}</td>
                                            <td>
                                                <Link to={`/order/${order?._id}`}>
                                                    <AiOutlineEye />
                                                </Link>
                                                <button onClick={() => handleOrderStatus(order._id)}><BsArrowUpRightCircleFill /> </button>
                                            </td>

                                        </tr>
                                    </tbody>
                                ))
                            }
                            {
                                type === "products" && allProductsList && allProductsList.map((product) => (
                                    <tbody key={product?._id}>
                                        <tr>
                                            <td>{product?._id}</td>
                                            <td>{product?.title}</td>
                                            <td>{product?.price}</td>
                                            <td>{product?.createdAt.split("T")[0]}</td>
                                            <td>
                                                <img style={{ objectFit: "cover" }} src={product?.photoUrl} alt={product?.name} />
                                            </td>
                                            <td>
                                                <Link to={`/admin/product/update/${product._id}`}>
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => deleteProduct(product?._id)}><RiDeleteBin6Line /> </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }

                        </table>
                        {
                            type === "products" && <div className='add-product-cont'>
                                <Link to="/admin/product/new"><IoAddSharp style={{ fontSize: "1rem", marginRight: "5px" }} /> ADD PRODUCT</Link>
                            </div>
                        }
                    </main>
            }
        </section>
    )
}

export default Users