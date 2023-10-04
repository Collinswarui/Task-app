import React from 'react';
import './footer.css';

export const Footer = () =>{

    const year = new Date().getFullYear();

    return(
        <div className='footer'>
            <div className='copyright'>
                &copy; { year }  Designed by Wakori Tech. All Rights Reserved.
            </div>
        </div>
    )
};
