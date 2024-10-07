import React from 'react';
import "./app.css"
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';


const ChatsPage = (props) => {
  const chatProps = useMultiChatLogic(
    '2cbdcfd0-1227-4b28-8808-059f9c4d77af',
    props.user.username,
    props.user.secret
  );
  return (
    <div style={{height:'100vh'}}>
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} style={{height:'100%'}}/>
    </div>
  );
}

export default ChatsPage