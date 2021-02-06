import React from 'react';
import '../styles/Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from '../StateProvider';
import CheckOutProduct from './CheckOutProduct';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://tpc.googlesyndication.com/simgad/7773386700401865964" />
                <div>
                    <h3>{user ? `Hello , ${user?.email}`: null}</h3>
                    <h2 className="checkout__title">
                        Your shopping basket
                    </h2>

                    {basket.map((item) => {
                        return (<CheckOutProduct id={item.id} image={item.image} title={item.title} price={item.price} rating={item.rating} />)
                    })}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
