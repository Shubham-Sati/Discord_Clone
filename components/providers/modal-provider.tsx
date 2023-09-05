"use client";

import React, { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export const ModalProvider = () => {
  // these isMounted , useEffect is used to prevent the modals to render on the server side because it can cause inconsistency thus creating hydration errors
  const [isMounted, setIsMounted] = useState(false); // to overcome hydration errors as when modal are displayed to UI they cause Hydration errors

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // to overcome hydration errors as when modal are displayed to UI they cause Hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <React.Fragment>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </React.Fragment>
  );
};
