import React from "react";
import Image from "next/image";
import { DICEBEAR_URL } from "../../helper/global";
import { IDiceBearAvatarProps } from "./types";

const DiceBearAvatar: React.FC<IDiceBearAvatarProps> = ({
  id,
  optimize = true,
}) => {
  return (
    <Image
      src={`${DICEBEAR_URL}/big-ears-neutral/${id}.svg`}
      width={250}
      height={250}
      alt="Dice Bear Avatar"
      unoptimized={!optimize}
    />
  );
};
export default DiceBearAvatar;
