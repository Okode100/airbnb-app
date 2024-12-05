import React from 'react';

export default function Hero(){
    return (
        <section className='section1'>
            <nav className='navbar'>
                <div className='logo'>
                    <img src='/logo192.png' alt='logo' className='logo' />
                </div>
                <ul>
                <li>About</li>
                <li>Technology</li>
                <li>Contact Us</li>
                <button className='button'>Sign In</button>
                <button className='button'>Sing Up</button>
                </ul>
            </nav>
        </section>
    )
}

