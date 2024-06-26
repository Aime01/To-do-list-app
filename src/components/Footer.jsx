import React, {useEffect, useState} from 'react';
import {FcLike} from "react-icons/fc";

function Footer() {
    const teamMembers = [
        'Winnie Thomas',
        'Aime Shimirwa',
        'Chloe Zhao',
    ]
    return (
        <div className='footer'>
            <div>Created with <FcLike/> by</div>
            {teamMembers.map((team, index) => (
                <div key={index} className='team'> {team}</div>
            ))
            }
        </div>
    );
}

export default Footer;
