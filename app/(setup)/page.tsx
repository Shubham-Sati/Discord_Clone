import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () => {
  const profile = await initialProfile();

  //   finding any server this user/profile is the member of
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  //   if server found then redirect user to that vary server
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a server</div>;
};

export default SetupPage;
