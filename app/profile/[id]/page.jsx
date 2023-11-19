"use client";
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useParams,useSearchParams,useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
  const [prompts, setPrompts] = useState([]);
  const {data : session } = useSession();
  const  param = useParams();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState();
  const router = useRouter();

  const fetchPostsById = async (id) => {
    const response = await fetch(`/api/prompt/userId/${id}`);
    const data = await response.json();
    console.log("Profile response from backend", data);
    setUsername(searchParams.get("name"));
    setPrompts(data);
  }

  const handelEditPrompt = (post) => {
    console.log("Edit", post._id);
    router.push(`/update-prompt/${post._id}`);

  }

  const handelDeletePrompt = async (post) => {
    console.log("Delete", post._id);
    //ask the action 
    const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );

    if(hasConfirmed){
        try {
            //fetch Delete the /api/prompt/[id];
            await fetch(`/api/prompt/${post._id}`,{
                method: "DELETE"
            });
            //update the prompts 
            const filteredPosts = prompts.filter((item) => item._id !== post._id);
            setPrompts(filteredPosts);
        } catch (error) {
            console.log(error);
            
        }
    }
  }

  useEffect(() => {
    fetchPostsById(param.id);
  },[param.id]);

  return (
    session?.user.id === param.id ? 
    (  <Profile  
        name= "My" 
        desc = "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination" 
        data={prompts}
        handelEditPrompt={handelEditPrompt}
        handelDeletePrompt={handelDeletePrompt}/>) : 
    (  <Profile  
        name= {username} 
        desc = {`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`} 
        data={prompts}/>)

  )
}

export default page