import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  // Getting all the channels and the members of the servers
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },

    include: {
      // below is getting channels
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },

      // below is getting members of the server
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  // Filtering the text type channels
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  // Filtering the audio type channels
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  // Filtering the video type channels
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  // Filtering all the members from current user
  const members = server?.members.filter(
    (member) => member.profileId != profile.id
  );

  // current logIn user role
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className=" flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
