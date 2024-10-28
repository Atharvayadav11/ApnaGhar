import React from 'react';
import Header from '../components/Header';

const RoomMap = () => {
    return (
        <div>
            <Header />
            <iframe
                src="https://64323ff406fb264b1328e217--poetic-lokum-8589b1.netlify.app"
                style={{ width: '100%', height: '100vh', border: 'none' }}
                title="Room Map"
            ></iframe>
        </div>
    );
};

export default RoomMap;