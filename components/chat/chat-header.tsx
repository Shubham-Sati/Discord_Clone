// this component is used both for one to one commuication and for the channel communication

import { Hash, Mic, Video } from "lucide-react";

import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
// import { SocketIndicator } from "@/components/socket-indicator";
// import { ChannelType } from "@prisma/client";

// import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

// const iconMap = {
//   [ChannelType.TEXT]: Hash,
//   [ChannelType.AUDIO]: Mic,
//   [ChannelType.VIDEO]: Video,
// };

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  //   const Icon = type === "channel" ? iconMap[channel.type] : null;

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />

      {/* to display text channel icon */}
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}

      {/* to display one to one communication avatar */}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}

      {/* to display name of the user of name of the channel */}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        {/* {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator /> */}
      </div>
    </div>
  );
};
