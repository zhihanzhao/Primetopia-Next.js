"use client";
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const Feed = () => {
  const [allPosts , setAllPosts] = useState([]);
  const [searchText , setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const PromptCardList = ({data}) => {
      return (
        <div className='mt-16 prompt_layout'>
          {data.map((post) => (
              <PromptCard 
                key = {post._id}
                post = {post}
                handelClickTag = {handelClickTag}  
              />  
          ))}
        </div>
      )
    }

  const fetchPosts = async() => {
    const response = await fetch("/api/prompt");
    console.log("Response from the Backend", response);
    const data = await response.json();
    console.log("data", data);
    setAllPosts(data);
  } 

  const filterPosts = (text) => {
    const regex = new RegExp(text, "i");
    return allPosts.filter((post) => {
      return regex.test(post.prompt) || regex.test(post.creator.username) || regex.test(post.tag)
    })
  }

  const handelSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const result = filterPosts(e.target.value);
        setSearchedResults(result);
      },500)
    );
  }

  const handelClickTag = (tagText) => {
    console.log(tagText);
    setSearchText(tagText);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const result = filterPosts(tagText);
        setSearchedResults(result);
      },500)
    );

  }


  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text"
        placeholder='Search for a tag or a username'
        required
        className='search_input peer'
        value={searchText}
        onChange={handelSearchChange}
         />
      </form>
      {searchText ? (<PromptCardList data={searchedResults}/>
) : (<PromptCardList data={allPosts}/>
)}
      


    </section>

    
  )
}

export default Feed