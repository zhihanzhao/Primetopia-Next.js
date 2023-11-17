"use client";
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [prompts, setPrompts] = useState([]);
  const {data : session } = useSession();
  const  param = useParams();
  const [user, setUser] = useState();

  const fetchPostsById = async (id) => {
    const response = await fetch(`/api/prompt/userId/${id}`);
    const data = await response.json();
    console.log("Profile response from backend", data);
    setUser(data[0].creator);
    setPrompts(data);
  }

  useEffect(() => {
    fetchPostsById(param.id);
  },[param.id]);

  return (
    session?.user.id === param.id ? 
    (  <Profile  name= "My" desc = "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination" data={prompts}/>) : 
    (  <Profile  name= {user?.username} desc = {`Welcome to ${user?.username}'s personalized profile page. Explore ${user?.username}'s exceptional prompts and be inspired by the power of their imagination`} data={prompts}/>)

  )
}

export default page