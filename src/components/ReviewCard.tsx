import Image from "next/image";
import React from "react";
import { Icon } from "./common/Icons";

const ReviewCard = ({ review }: any) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-4">
        <img
          src={
            review.parent.profilePicture ||
            "https://i.pinimg.com/474x/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.jpg"
          }
          width={30}
          height={30}
          alt="user image"
          className="rounded-full h-[40px] w-[40px] object-cover"
        />
        <h3 className="font-medium text-sm">{review.parent.fullName}</h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(Math.round(review.rating))].map((_, index) => (
            <Icon.star key={index} />
          ))}
        </div>
        <p className="font-thin text-sm">{review.rating}</p>
      </div>
      <div>
        <p>Loved: </p>
        <p>{review.loved}</p>
      </div>

      <div>
        <p>Improvements: </p>
        <p>{review.improvements}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
