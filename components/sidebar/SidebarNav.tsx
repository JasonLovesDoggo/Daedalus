import React from "react";
import Link from "next/link";
import { Clock, LayoutDashboard, List, QrCode } from "lucide-react";

const SidebarNav = () => {
  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/application"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <List size={20} />
            <span>Application</span>
          </Link>
        </li>
        <li>
          <Link
            href="/schedule"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <Clock size={20} />
            <span>Schedule</span>
          </Link>
        </li>
        <li>
          <Link
            href="/qrcode"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <QrCode size={20} />
            <span>QR Code</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
