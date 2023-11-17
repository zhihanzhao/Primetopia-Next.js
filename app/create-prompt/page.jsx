"use client"
import React, { useState } from 'react'
import Form from '@components/Form'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const CreatePromptPage = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: "", tag:""});
 
    const createPrompt= async (e) => {
        console.log('create the new prompt event FrontEnd', e);
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/new`, {
                method:"POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            }) ;

            console.log("response from Backend ", response);

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }

    }


  return (
    <Form
    type = 'Create'
    handleSubmit = {createPrompt}
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    />
  )
}

export default CreatePromptPage