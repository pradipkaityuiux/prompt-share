"use client"
import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data?.length && data.map((post,index)=> <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>)}
    </div>
  )
}

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) =>{
    setSearchText(e.target.value);
  }
  const fetchPrompts = async () =>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setFeed(data);
  }
  useEffect(()=>{
      fetchPrompts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full fex-center'>
        <input 
          type="text"
          placeholder='Search for prompts / tag / username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          />
      </form>
      <PromptCardList
        data={feed}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed