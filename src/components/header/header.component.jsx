import './header.scss';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return(
        <>
        <div className='header-wrapper'>
        <div className='logo-img'>
            LAW GENIUS</div>
        <div className='route-links'>
        <NavLink to='/home' activeStyle>
            Home
        </NavLink>
        <NavLink to='/uploads' activeStyle>
        Recent Uploads
        </NavLink>
        <NavLink to='/' activeStyle>
        Logout
        </NavLink>
        </div>
        </div>
        </>
    )
}

export default Header;