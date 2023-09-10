"use client";

import React, { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

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
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </React.Fragment>
  );
};
