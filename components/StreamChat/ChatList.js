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
  useChatContext,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { useRouter } from "next/router";
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

const ChatList = () => {
  const [client, setClient] = useState(null);
  const [channels, setChannels] = useState(null);
  const { data: session, status } = useSession();

  const filters = {
    type: "team",
    members: {
      $in: [`${session.user.id}`],
    },
  };

  useEffect(() => {
    const newClient = new StreamChat(process.env.STREAM_CHAT_KEY);

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: session.user.id,
        name: session.user.name,
      },
      newClient.devToken(session.user.id)
    );
    reqChannels(newClient, filters).then((data) => {
      setChannels(data);
    });

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList channels={channels} sort={sort} options={options} />
      <Channel>
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

export default ChatList;
