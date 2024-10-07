import React from 'react';
import { Github, Twitter, Linkedin, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card'
import Navbar from '../shared/Navbar';

const Home = () => (
<>
    <div className='sticky z-30 top-0'>
    <Navbar/>
    </div>
  <div className="p-8  min-h-screen">
    <div className="mx-8 flex">
      <header className="mb-12">
        <h1 className="text-7xl font-bold mb-4">
          <span >Project management for</span>{' '}
          <span >interior designers</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Streamline your interior design projects with our all-in-one platform. Manage tasks, track costs, and collaborate effortlessly.
        </p>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
           Register
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold border border-gray-300 flex items-center">
             Log in
          </button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
        
        
        <Card className="bg-white shadow-lg max-h-96">
          <CardHeader>
            <img src="/api/placeholder/80/80" alt="User avatar" className="rounded-full" />
            <h3 className="text-xl font-semibold mt-2">Sarah Johnson</h3>
            <p className="text-green-600">Interior Designer</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              "Designify has revolutionized how I manage my projects. The centralized dashboard and cost tracking features are game-changers!"
            </p>
            <div className="flex mt-4 space-x-2">
              <Github size={20} />
              <Twitter size={20} />
              <Linkedin size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg max-h-96">
          <CardHeader className="flex items-center">
            <Lightbulb className="text-green-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold">Powerful Features</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Centralized Dashboard</li>
              <li>• Task Management System</li>
              <li>• Cost Tracking and Budgeting</li>
              <li>• Communication Hub</li>
              <li>• Analytical Tools</li>
              <li>• E-commerce Integration</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  </>
);

export default Home;
