import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './assets/lgo.png';

const Nav = () => {
    return (
        <nav className='navbar navbar-expand-lg text-white'>
            <div className='container-fluid'>
                <img
                    src={Logo}
                    style={{ width: '60px', height: '60px', margin: '10px' }}
                    alt='logo'
                />

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current='page' to='/'>
                                Yes
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link className='nav-link' to='/link'>
                                Link
                            </Link>
                        </li>

                        <li className='nav-item dropdown'>
                            <Link
                                className='nav-link dropdown-toggle'
                                to='/'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'>
                                Actions
                            </Link>

                            <ul className='dropdown-menu'>
                                <li>
                                    <button className='dropdown-item'>Filter</button>
                                </li>

                                <li>
                                    <button className='dropdown-item'>Cut</button>
                                </li>

                                <li>
                                    <hr className='dropdown-divider' />
                                </li>

                                <li>
                                    <button className='dropdown-item'>Reset to Default</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
