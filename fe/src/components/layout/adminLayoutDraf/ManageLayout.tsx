import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { HeaderManage, NavBarManage } from "../../ui";

const ManageLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="flex h-full">
      <NavBarManage isExpanded={isExpanded} />
      <div className="relative flex flex-col flex-grow bg-gray-100">
        <HeaderManage isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className="flex-grow p-4 w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManageLayout;
