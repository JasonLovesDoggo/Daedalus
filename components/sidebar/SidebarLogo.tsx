import React from "react";
import Image from "next/image";

const SidebarLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* TODO: Add Logo */}
      <Image src="/logo.webp" alt="Hack Canada Logo" width={48} height={48} />
      <p className="text-lg font-bold">
        Hack
        <br />
        Canada
      </p>
    </div>
  );
};

export default SidebarLogo;
