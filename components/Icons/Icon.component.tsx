import { HTMLAttributes } from "react";
import { BackIcon } from "@/components/Icons/Back.icon";
import { StarIcon } from "@/components/Icons/Star.icon";
import { ChevronRightIcon } from "@/components/Icons/ChevronRight.icon";
import { ChevronLeftIcon } from "@/components/Icons/ChevronLeft.icon";

type IconType = "star" | "back" | "chevronRight" | "chevronLeft";
const icons: Record<IconType, () => JSX.Element> = {
  star: StarIcon,
  back: BackIcon,
  chevronRight: ChevronRightIcon,
  chevronLeft: ChevronLeftIcon,
};

interface IconsProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconType;
}

export const Icon = ({ name, className = "", ...attrs }: IconsProps) => {
  const IconComponent = icons[name];

  return (
    <>
      {IconComponent && (
        <span
          className={`
            w-icon h-icon inline-block transform scale-icon
            ${className}
          `}
          {...attrs}
        >
          <IconComponent />
        </span>
      )}
    </>
  );
};
