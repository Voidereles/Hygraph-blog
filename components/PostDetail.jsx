import React from "react";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    console.log(obj);
    console.log(type);
    switch (obj.type) {
      case "heading-two":
        return (
          <h3 key={index} className="text-2xl font-semibold text-slate-600 mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold text-slate-600 mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-slate-800 text-sm md:text-base">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold text-slate-500 mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return <img key={index} alt={obj.title} height={obj.height} width={obj.width} src={obj.src} />;
      case "bulleted-list":
        return (
          <ul>
            <RichText
              key={index}
              content={obj}
              renderers={{
                bold: ({ children }) => <strong>{children}</strong>,
              }}
            />
          </ul>
        );
      case "link":
        console.log("jioasdijoasdhijasid");
        return (
          <Link href={obj.href} title={obj.title}>
            {obj.children[0].text}
          </Link>
        );
      default:
        console.log(type);
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden md:shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top p-2 md:p-0 h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="block lg:flex text-center items-center mb-8 w-full">
            <div className="flex justify-center items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
              <img
                src={post.author.photo.url}
                className="align-middle rounded-full object-cover mr-2"
                alt={post.author.name}
                style={{ width: 30 + "px", height: 30 + "px" }}
              />
              <p className="inline align-middle text-gray-700 text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format("DD.MM.YYYY")}</span>
            </div>
          </div>
        </div>
        <article>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
