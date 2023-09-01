import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

// this file is for creating the server and adding the current user ( who create a server as the admin of the server )

export async function POST(req: Request){
    try{
        const {name , imageUrl} = await req.json();
        const profile = await currentProfile();

        // checking if the current user exist in db or not
        if( !profile ){
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        // if user exist the creating the server
        const server = await db.server.create({
            data:{
                profileId: profile.id,
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                // creating default channels in the server eg = general
                channels: {
                    create: [
                        {name: "general", profileId : profile.id}
                    ]
                },

                // creating the members of the server and assigning role to it ( one who create the server )
                members:{
                    create:[
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            } 
        })

        return NextResponse.json(server);
    }catch(error){
        console.log("[SERVERS_POST] ", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
