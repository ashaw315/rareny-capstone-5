import React from "react";
import { ChatEngine } from 'react-chat-engine';

function Messages(){
    return (
        <div>
            <p>This is the messages page</p>
            <ChatEngine
			projectID='00000000-0000-0000-0000-000000000000'
			userName='adam'
			userSecret='pass1234'
		/>
        </div>
    )
}

export default Messages;