import React, { useEffect, useState } from 'react';
import '../../styles/productAction.scss';
import noImage from '../../assets/noimage.png';
import { AiFillCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/actions/UserAction';
import { addNewProduct, fetchCurrentProduct, updateProduct } from '../../redux/actions/AdminActions';
import toast from 'react-hot-toast';
import Loader from '../../layout/Loader';
import { useParams } from 'react-router-dom';

const AddProduct = ({ type }) => {
    const { message, error } = useSelector(state => state.admin)
    const dispatch = useDispatch();
    const params = useParams();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const [imageForPreview, setimageForPreview] = useState(null);
    const [imageToSend, setimageToSend] = useState(null);
    const [loading, setLoading] = useState(false);

    const setProductImage = (e) => {
        setimageForPreview(URL.createObjectURL(e.target.files[0]));
        setimageToSend(e.target.files[0]);
        console.log(e.target.files[0].size);
    }

    const addProduct = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = await dispatch(uploadImage(imageToSend));

        if (data) {
            const url = data.url ? data.url : false;
            if (type === "update") {
                dispatch(updateProduct(title, price, url, params.id))
            } else {
                dispatch(addNewProduct(title, price, url));
            }
        }
        setLoading(false);
    }


    useEffect(() => {
        message && toast.success(message);
        dispatch({ type: "CLEAR_MSG" })
    }, [message , dispatch]);

    useEffect(() => {
        error && toast.error(error);
        dispatch({ type: "CLEAR_ERROR" })
    }, [error , dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    const getProductDetails = async () => {
        setLoading(true);
        const res = await dispatch(fetchCurrentProduct(params.id));
        setTitle(res.title);
        setPrice(res.price);
        setimageForPreview(res.photoUrl)
        setLoading(false);
    }

    useEffect(() => {
        if (type === "update") {
            getProductDetails();
        }
        // eslint-disable-next-line
    }, [type])

    return (
        <section className="add-product">
            {
                loading
                    ?
                    <Loader />
                    :
                    <main>
                        <form onSubmit={addProduct}>
                            <div>
                                <img src={imageForPreview ? imageForPreview : noImage} alt="" />
                                <label className='upload' htmlFor="photo"><AiFillCamera /></label>
                                <input onChange={(e) => setProductImage(e)} style={{ display: "none" }} type="file" id='photo' name="photo" />
                            </div>

                            <div>
                                <label htmlFor="">Title : </label>
                                <input required onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                            </div>

                            <div>
                                <label htmlFor="">Price : </label>
                                <input required onChange={(e) => setPrice(e.target.value)} value={price} type="number" />
                            </div>

                            <button type='Submit'>{type === "update" ? "Submit Edit" : "Add Product"}</button>
                        </form>
                    </main>
            }
        </section>
    )
}

export default AddProduct