import React from 'react';

const Avatar = (props) => {
    return <div className="avatar"><img src={props.src} alt={props.alt} /></div>
}

export default Avatar;