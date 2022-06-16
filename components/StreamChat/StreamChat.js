/*
정도현
*/


import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { getSession, useSession, signIn, signOut } from "next-auth/react";

const reqChannels = async (newClient, filters) => {
  const channels = await newClient.queryChannels(filters, sort, {
    watch: true, // this is the default
    state: true,
  });
  return channels;
};

const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };
const App = (userID, userName, teamID) => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const { data: session, status } = useSession();

  const filters = { type: "team", id: teamID, members: { $in: [userID] } };

  useEffect(() => {
    const newClient = new StreamChat("r5sx846qqdpt");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: userID,
        name: userName,
      },
      newClient.devToken(userID)
    );
    reqChannels(newClient, filters).then((data) => {
      setChannel(data[0]);
    });

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
