import React from "react";

import { Skeleton } from "@material-ui/lab";

import "./HomeSkeleton.css";

const HomeSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="cards-status-dots-container">
        <Skeleton variant="circle" width={20} height={20} />
        <Skeleton variant="circle" width={20} height={20} />
        <Skeleton variant="circle" width={20} height={20} />
      </div>
      <main>
        <Skeleton variant="rect" width={25} height={220} />
        <div className="habit-cards-container">
          <Skeleton variant="rect" width={215} height={500} />
        </div>
        <Skeleton variant="rect" width={25} height={220} />
      </main>
    </div>
  );
};

export default HomeSkeleton;
