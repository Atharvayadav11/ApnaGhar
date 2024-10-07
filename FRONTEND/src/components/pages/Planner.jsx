import React from 'react';
import EmbedReactPlanner from '@/roommap';
import Navbar from '../shared/Navbar';

const Planner = () => {
  return (
    <div>
      <Navbar/>
      <EmbedReactPlanner/>
    </div>
  );
}

export default Planner;
