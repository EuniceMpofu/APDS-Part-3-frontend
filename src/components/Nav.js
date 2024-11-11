import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import Cookies from 'js-cookie';

function Nav() {
    const location = useLocation();

    const handleSignout = async () => {
        Cookies.remove('token');
        window.location.href = '/';
    }
  return (
    <nav>
        <ul class="nav-bar">
            <li class="nav-item">
                <Link to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : 'collapsed'}`}
                >
                    Home
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/signup"
                    className={`nav-link ${location.pathname === '/signup' ? 'active' : 'collapsed'}`}
                >
                    Sign-up
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/login"
                    className={`nav-link ${location.pathname === '/login' ? 'active' : 'collapsed'}`}
                >
                    Login
                </Link>
            </li>

            <li class="nav-item">
                <a onClick={handleSignout}
                    className={`nav-link ${location.pathname === '/sign-out' ? 'active' : 'collapsed'}`}                    
                >
                    Sign-out
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default Nav