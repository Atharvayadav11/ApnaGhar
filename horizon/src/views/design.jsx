import React from 'react';

const DesignPage = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <iframe
                src="https://lumen.fillmember.net/app"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Embedded Page"
            ></iframe>
        </div>
    );
};

export default DesignPage;