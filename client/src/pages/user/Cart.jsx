import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Layout from '../../components/Layout/Layout';

const CartPage = () => {
    const navigate = useNavigate();

    // Sample cart data
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 20.00,
            quantity: 1,
            image: 'https://via.placeholder.com/100',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 50.00,
            quantity: 2,
            image: 'https://via.placeholder.com/100',
        },
    ]);

    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, change) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + change } : item
        ));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Handle checkout logic here (e.g., navigate to checkout page)
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return <div>Your cart is empty!</div>;
    }

    return (
        <Layout>
            <div className="cart-page">
                <h1>Your Cart</h1>

                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                            </div>

                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                            </div>

                            <div className="remove-item">
                                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="total-price">
                        <h3>Total: ${getTotalPrice()}</h3>
                    </div>

                    <div className="checkout">
                        <button onClick={handleCheckout} disabled={cart.length === 0}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
