import Link from "next/link";
import React from "react";

type Props = {
  name?: string;
  count?: number;
};

function CategoryCard({ name = "Mexican", count = 15 }: Props) {
  return (
    <Link
      href="#trucks?category=abc"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="group relative h-[176px] w-full overflow-hidden rounded-lg">
        <div
          className="h-full w-full transition-all group-hover:scale-105"
          style={{
            background:
              "linear-gradient(270deg,rgba(0, 0, 0, 0) 40.79%,rgba(0, 0, 0, 0.8) 100%),url(/img/restaurant/1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute bottom-5 left-5">
          <h5 className="mb-1 text-2xl font-medium text-white">{name}</h5>
          <p className="text-base font-normal text-gray-100">
            {count}+ listing
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
