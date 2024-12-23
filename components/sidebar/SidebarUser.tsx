import React from "react";

import { LogoutButton } from "../auth/LoginButton";

const SidebarUser = () => {
  return (
    <div className="space-y-8">
      <div className="w-2/3 border-t border-gray-200"></div>
      <div className="flex items-center space-x-2">
        {/* Avatar */}
        <div className="size-10 rounded-full bg-gray-300"></div>
        <div>
          <div className="font-medium">Jeffery Bezos</div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
