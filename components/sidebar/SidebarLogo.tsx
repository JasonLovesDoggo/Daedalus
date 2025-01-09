import React from "react";
import Image from "next/image";

type Props = {
  className?: string;
  mobile?: boolean;
};

const SidebarLogo = ({ className, mobile }: Props) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* TODO: Add Logo */}
      <Image
        src={mobile ? "/beaver-wave.webp" : "/logo.webp"}
        alt="Hack Canada Logo"
        width={48}
        height={48}
        className={mobile ? "translate-y-1" : ""}
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
