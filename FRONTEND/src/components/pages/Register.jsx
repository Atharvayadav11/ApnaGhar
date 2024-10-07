import React, { useState } from 'react'; // Adjust import based on your UI library
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Navbar from '../shared/Navbar';
const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    age: '',
    description: '',
    address: '',
    lookingFor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData); // Log user data to console
  };

  return (
<div className='bg-gray-100 h-screen'>
 <Navbar/>
  <div className='w-10/12 sm:w-10/12 md:w-8/12 mx-auto bg-white p-16 mt-16 rounded-3xl'>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label htmlFor="username" className="text-lg font-semibold">Username</Label>
    <Input type="text" id="username" name="username" onChange={handleChange} required />
  </div>
  <div>
    <Label htmlFor="address" className="text-lg font-semibold">Address</Label>
    <Input type="text" id="address" name="address" onChange={handleChange} />
  </div>
  <div>
    <Label htmlFor="password" className="text-lg font-semibold">Password</Label>
    <Input type="password" id="password" name="password" onChange={handleChange} required />
  </div>
  <div>
    <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
    <Input type="text" id="description" name="description" onChange={handleChange} />
  </div>
  <div>
    <Label htmlFor="email" className="text-lg font-semibold">Email</Label>
    <Input type="email" id="email" name="email" onChange={handleChange} required />
  </div>
  <div>
    <Label htmlFor="age" className="text-lg font-semibold">Age</Label>
    <Input type="number" id="age" name="age" onChange={handleChange} required />
  </div>
  <div>
    <Label htmlFor="phoneNumber" className="text-lg font-semibold">Phone Number</Label>
    <Input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} required />
  </div>
  <div>
    <Label htmlFor="lookingFor" className="text-lg font-semibold">Looking For</Label>
    <Input type="text" id="lookingFor" name="lookingFor" onChange={handleChange} />
  </div>

  {/* Submit Button */}
  <div className="col-span-2">
    <Button type="submit" className='w-full text-xl'>Register</Button>
  </div>
</form>
    </div>
    </div>
  );
};

export default Register;