import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation.item";

// This is the server component theirfore it is async compoennt
export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  //Get all the server this user is the part off
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      {/* Add new Server button */}
      <NavigationAction />
      <Separator className="h=[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      {/* Displaying all servers user is the part of */}
      <ScrollArea className=" flex-1 w-full ">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>

      {/* user button to logout and mode toggle ( light / dark ) */}
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]  ",
            },
          }}
        />
      </div>
    </div>
  );
};
