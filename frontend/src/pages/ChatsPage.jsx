import React from 'react';
import "./app.css";
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';
import Header from '../components/Header'; // Import your Header component

const ChatsPage = (props) => {
  const chatProps = useMultiChatLogic(
    '2cbdcfd0-1227-4b28-8808-059f9c4d77af',
    props.user.username,
    props.user.secret
  );

  return (
    <div style={{ height: '100vh' }}>
      {/* Render the Header for navigation */}
      <Header />

      {/* Chat functionality */}
      <div style={{ height: 'calc(100vh - 72px)' }}> {/* Adjust height to fit below header */}
        <MultiChatWindow {...chatProps} />
        <MultiChatSocket {...chatProps} />
      </div>
    </div>
  );
};

export default ChatsPage;
