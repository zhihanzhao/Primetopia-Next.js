"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PromptCard = ({ post, handelClickTag, handelEditPrompt, handelDeletePrompt }) => {


  const [copied, setCopied] = useState("");
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);

  }

  const handelImgClick = () => {
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handelImgClick}
        >
          <Image className="rounded-full object-contain"
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={() => {handelClickTag && handelClickTag(post.tag)}}>
        {post.tag}
      </p>
      <div className="editBtns mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        {handelEditPrompt && <button className='font-inter text-sm green_gradient cursor-pointer' onClick={handelEditPrompt}>Edit</button>}
        {handelDeletePrompt && <button className='font-inter text-sm orange_gradient cursor-pointer' onClick={handelDeletePrompt}>Delete</button>}
      </div>
    </div>
  );
};

export default PromptCard;
