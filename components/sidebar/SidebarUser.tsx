"use client";

import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

import { LogoutButton } from "../auth/LoginButton";

const SidebarUser = () => {
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="w-2/3 border-t-2 border-primary"></div>
        <Image src="/blue-leaf.png" alt="Leaf" width={16} height={16} />
      </div>
      <div className="flex space-x-4">
        {/* Avatar */}
        <div className="size-8 rounded-full bg-gray-300 xl:size-12"></div>
        <div>
          <div className="font-semibold">{data.user.name}</div>
          <LogoutButton
            label="Logout"
            icon={<LogOut className="size-4" />}
            className="px-0 text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
