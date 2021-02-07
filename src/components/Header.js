import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Header() {
    const [{ basket, user, location }, dispatch] = useStateValue();
    const [city, setCity] = useState(`Don't Know! :/`)

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }

    }
    const index = user ? user.email.indexOf("@") : 0
    const tempName = user ? user.email.substr(0, index) : null;


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((Lat) => {
            console.log("Location is:" + Lat.coords.latitude);

            dispatch({
                type: 'SET_LOCATION',
                payload: Lat.coords.latitude
            })
        })
    }, [])

    return (
        <React.Fragment >
            {/* className="header__main" */}
            <div className='header'>
                <Link to="/">
                    <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
                </Link>
                <div className="header__search" >
                    <input className="header__searchInput" type="text" />
                    <SearchIcon className="header__searchIcon"></SearchIcon>
                </div>
                <div className="header__nav">
                    <Link to={!user && '/login'}>
                        <div onClick={handleAuth} className="header__option">
                            <span className="header__optionLineOne">Hello, {user?.email}</span>
                            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            <ShoppingCartIcon />
                            <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='header__shop'>
                <div className="header__delivery" >
                    <span className="header__optionLineOne"><LocationOnIcon /><b>Deliver at</b></span>
                    <span className="header__optionLineTwo">{location ? (location < 20 ? 'Bangalore' : 'Delhi') : `Don't Know! :/`}</span>
                </div>
                <div className="header__buyingoptions" >
                    <div>Electronics</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Clothing</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Kitchen</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Mobile</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Pantry</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Gifts</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Today's Deal</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Amazon Pay</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>Surprising offers!</div>
                </div>
                <div className="header__buyingoptions" >
                    <div>{tempName ? `${tempName}'s` : 'Your'} Amazon</div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Header
