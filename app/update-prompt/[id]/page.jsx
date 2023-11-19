"use client";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = ({ params }) => {
  const promptId = params.id;
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const updatePrompt = async (e) => {
    e.preventDefault();
    console.log(post);
    setSubmitting(true);
    //fetch the backend patch
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt : post.prompt,
          tag: post.tag
        })
      })


      if (response.ok) {
        router.push("/");
      }


    } catch (error) {
      console.log(error);
      
    }
    


  };

  const fetchPostById = async (id) => {
    const result = await fetch(`/api/prompt/${id}`);
    const data = await result.json();
    setPost(data);
  };

  useEffect(() => {
    fetchPostById(promptId);
  }, [promptId]);

  return (
    <Form
      type="Edit"
      handleSubmit={updatePrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
    />
  );
};

export default UpdatePrompt;
