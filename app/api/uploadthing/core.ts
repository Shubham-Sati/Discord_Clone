import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if( !userId ){
        throw new Error("Unauthorized");
    }
    
    return { userId: userId };
}
 
 
export const ourFileRouter = {

    // function to upload server Image
    serverImage : f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }) 
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
        
    // function to upload images and pdf's
    messageFile: f([ "image" , "pdf" ])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;