import { currentUser , redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();

    if( !user ){ // if user is not in clerk
        return redirectToSignIn();
    }

    // user find in clerk now find user's profile in the db in profile model
    const profile = await db.profile.findUnique({
        where:{
            userId: user.id
        }
    });

    if( profile ){
        return profile;
    }

    // if profile is not find in the db we need to create new profile for the user
    const newProfile = await db.profile.create({
        data:{
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    return newProfile;
}


