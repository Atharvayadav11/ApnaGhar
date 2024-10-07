import React, { useState } from 'react';
import AuthPage from './components/AuthPage';  // Import the AuthPage component
import Chat from './components/Chat';  // Import the Chat component

const Contact = () => {
  const [user, setUser] = useState(undefined); // State to manage authenticated user

  return (
    <div>
      {/* Ensure there's no typo in the arrow function */}
      {!user ? (
        <AuthPage onAuth={(authUser) => setUser(authUser)} />
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
};

export default Contact;
