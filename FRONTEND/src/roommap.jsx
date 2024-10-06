// src/EmbedReactPlanner.js
import React from 'react';

const EmbedReactPlanner = () => {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="https://cvdlab.github.io/react-planner"
                style={{ width: '70%', height: '70%', border: 'none' }}
                title="React Planner"
            />
        </div>
    );
};

export default EmbedReactPlanner;
