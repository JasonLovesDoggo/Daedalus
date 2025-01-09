import React from "react";
import Image from "next/image";

type Props = {
  className?: string;
};

const SidebarLogo = ({ className }: Props) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* TODO: Add Logo */}
      <Image
        src="/beaver-wave.webp"
        alt="Hack Canada Logo"
        width={48}
        height={48}
        className="translate-y-1"
      />
      <p className="text-lg font-bold">
        Hack
        <br className="max-lg:hidden" />
        Canada
      </p>
    </div>
  );
};

export default SidebarLogo;
