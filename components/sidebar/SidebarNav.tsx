import React from "react";
import { Clock, Layout, List, QrCode } from "lucide-react";

const SidebarNav = () => {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <Layout size={16} />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <List size={16} />
            <span>Application</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <Clock size={16} />
            <span>Schedule</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <QrCode size={16} />
            <span>QR Code</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
