import React, { useEffect } from "react";

import DisplayAvatar from "../../DisplayAvatar";
import Settings from "./Settings";
import ChangeAvatar from "./ChangeAvatar";
import "../Sidebar.css";

const SidebarHeader = ({ user, setUser }) => {
	// Retrieves user information
	useEffect(() => {
		const retrieveUserInformation = async () => {
			// Fetching user data
			let data = await fetch("/api/users/me");
			data = await data.json();
			setUser(data);
		};
		retrieveUserInformation();
	}, [setUser]);

	return (
		<div className="sidebarHeader">
			<div className="sidebarHeaderUser">
				<ChangeAvatar>
					<DisplayAvatar user={user} width="6" height="6" />{" "}
				</ChangeAvatar>
				<h2 style={{ marginLeft: "15px" }}>
					{user.firstName} {user.lastName}
				</h2>
			</div>
			<div className="sidebarHeaderUserSettings">
				<Settings />
			</div>
		</div>
	);
};

export default SidebarHeader;
