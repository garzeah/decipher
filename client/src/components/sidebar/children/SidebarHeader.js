import React, { useEffect } from "react";

import DisplayAvatar from "../../DisplayAvatar/DisplayAvatar";
import Settings from "./Settings";
import ChangeAvatar from "./ChangeAvatar";
import "../Sidebar.css";

import { retrieveMyProfile } from "../../../api/users";

const SidebarHeader = ({ user, setUser }) => {
  useEffect(() => {
    retrieveMyProfile(setUser);
    console.log("hi");
  }, [setUser]);

  return (
    <div className="sidebarHeaderContainer">
      <div className="sidebarHeaderUser">
        <ChangeAvatar>
          <DisplayAvatar user={user} width={6} height={6} />
        </ChangeAvatar>
        <h2 style={{ marginLeft: "15px" }}>{user.displayName}</h2>
      </div>
      <div className="sidebarHeaderUserSettings">
        <Settings user={user} />
      </div>
    </div>
  );
};

export default SidebarHeader;
