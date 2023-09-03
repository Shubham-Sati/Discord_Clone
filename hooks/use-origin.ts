import { useEffect, useState } from "react"

// This custom hook is used to get the current url of the page for the invite link 
export const useOrigin = () => {
    const [mounted , setMounted] = useState( false );

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    if( !mounted ){
        return "";
    }

    return origin;
}


