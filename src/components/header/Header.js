import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { Link } from "react-router-dom";
import './Header.scss';


function Header() {
    const context = useContext(Context);
    return (
        <header className='Header navbar sticky-top border-bottom bg-white'>
            <Link to={'/'} className='display-6 text-primary' style={{ cursor: 'pointer' }}>Rent<span>-A-</span>Car</Link>
            {
                context.user.id
                ? <div className='user-info'>
                    <div className='name-info'>
                        <p>Signed in as:</p>
                        <p>{ context.user.name }</p>
                    </div>
                    <button className='btn btn-secondary' onClick={ e => context.dispatch({ type: 'logout' })}>Sign out</button>
                </div>
                :<div className='btn-toolbar gap-2'>
                    <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#sign-in'>Sign in</button>
                    <button className='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#sign-up'>Sign up</button>
                </div>
            }
            
        </header>
    )
}
export default Header;
