import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-white bg-opacity-20">
      <div className="absolute left-0 right-0 -top-6">
        <Image
          alt={author.name}
          height="50"
          unoptimized
          width="50"
          className="align-middle rounded-full object-cover mx-auto"
          src={author.photo.url}
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <h3 className="text-gray-800 mt-4 my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-gray-600">{author.bio}</p>
    </div>
  );
};

export default Author;
