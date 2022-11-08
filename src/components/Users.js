import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/Products', {
                });
                setProducts(response.data.products);
            } catch (err) {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProducts();
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {products?.length
                ? (
                    <ul>
                        {products.map((product, i) => <li key={i}>{product?.name}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;