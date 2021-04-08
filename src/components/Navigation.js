import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {FaMapMarkedAlt, FaBars, FaTimes, FaMap} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {AiOutlineCloudUpload} from 'react-icons/ai';

import './Navigation.css';

function Navigation() {
    const [click, setClick] = useState(false);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <nav className='navbar'>
            <div className='navbar-container container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <FaMapMarkedAlt className='navbar-icon' />
                LAGRING
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    <AiOutlineCloudUpload className='nav-upload'/>
                    Last opp bilder
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/kart'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    <FaMap className='nav-kart'/>
                    Kart
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    )
}

export default Navigation
