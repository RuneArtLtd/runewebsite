import { Star as StarIcon } from "../Icons/Star";

export const Star = ({ animationDelay }: { animationDelay?: string }) => {
  return (
    <div className="relative">
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-star z-10 ${
          animationDelay || ""
        }`}
      >
        <StarIcon />
      </div>
      <div className="h-[25px] w-[25px] bg-[rgb(85,28,141)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(85,28,141)] absolute top-[-36px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(170,46,166)] absolute top-[-22px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(204,172,211)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(170,46,166)] absolute right-[-22px] top-1/2 transform -translate-y-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(170,46,166)] absolute left-[-22px] top-1/2 transform -translate-y-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(170,46,166)] absolute bottom-[-22px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(85,28,141)] absolute bottom-[-36px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(85,28,141)] absolute left-[-36px] top-1/2 transform -translate-y-1/2" />
      <div className="h-[15px] w-[5px] bg-[rgb(85,28,141)] absolute left-[-45px] top-1/2 transform -translate-y-1/2" />
      <div className="h-[5px] w-[15px] bg-[rgb(85,28,141)] absolute bottom-[-45px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[5px] w-[15px] bg-[rgb(85,28,141)] absolute top-[-45px] left-1/2 transform -translate-x-1/2" />
      <div className="h-[15px] w-[5px] bg-[rgb(85,28,141)] absolute right-[-45px] top-1/2 transform -translate-y-1/2" />
      <div className="h-[15px] w-[15px] bg-[rgb(85,28,141)] absolute right-[-36px] top-1/2 transform -translate-y-1/2" />
    </div>
  );
};
