import React from "react";
import { Icon, enableCache } from "@iconify/react";

const Icons = ({ icon, className, width, rotate, hFlip, vFlip, onClick }) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
        onClick={onClick}
      />
    </>
  );
};

export default Icons;
