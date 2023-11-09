import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from './Box';
import '../../styles/dashboard.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart, Tooltip, ArcElement, Legend } from 'chart.js';
import Loader from '../../layout/Loader';
import { fetchStats } from '../../redux/actions/AdminActions';
import { useDispatch, useSelector } from 'react-redux';


Chart.register(Tooltip, ArcElement, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { users, loading, orders, income, preparing, shipped, delivered } = useSelector(state => state.admin);
    const data = {
        labels: ["Preparing", "Shipping", "Delivered"],
        datasets: [
            {
                label: "# of orders",
                data: [preparing, shipped, delivered],
                backgroundColor: ["rgba(80, 0, 0, 0.1)", "rgba(	252, 128, 25, 0.2)", "rgba(31, 251, 31 , 0.3)"],
                borderColor: ["rgb(159 , 63 , 176", "orange", "green"],
                borderWidth: 1
            }
        ]
    }

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [dispatch]);

    return (
        <section className="dashboard">
            <main>
                {
                    !loading ?
                        <>
                            <article>
                                <Box title="Users" value={users} />
                                <Box title="Orders" value={orders} />
                                <Box title="Income" value={Math.round(income)} />
                            </article>
                            <section>
                                <div>
                                    <Link to="/admin/orders">View Orders</Link>
                                    <Link to="/admin/users">View Users</Link>
                                    <Link to="/admin/product/all">All Product</Link>
                                </div>

                                <aside>
                                    <Doughnut data={data && data} />
                                </aside>
                            </section>

                        </> :
                        <Loader />
                }
            </main>
        </section>
    )
}

export default Dashboard