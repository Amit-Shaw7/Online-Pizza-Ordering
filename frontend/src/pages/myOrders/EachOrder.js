import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../../redux/Store';
import "../../styles/orderDetails.scss";

const EachOrder = ({ item }) => {

    const [product, setProduct] = useState(null);

    const getProductDetail = async () => {
        const url = `${server}/products/find/${item.productId}`;
        const res = await axios.get(url);
        if (res.status === 200) { setProduct(res.data.product) }
    }

    useEffect(() => {
        getProductDetail();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='eachOrder'>
            <h4>{product?.title}</h4>
            <div>
                <span>{item?.qty}</span> x <span>{Math.round(product?.price)}</span>
            </div>
        </div>
    )
}

export default EachOrder