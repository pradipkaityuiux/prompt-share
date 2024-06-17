"use client"
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const MyProfile = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const [prompts, setPrompts] = useState([]);
    const fetchPrompts = async () =>{
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPrompts(data);
    }
    useEffect(()=>{
        if(session?.user.id) fetchPrompts();
    }, [])
    function handleEdit(post){
        router.push(`/update-prompt?id=${post._id}`);
    }
    async function handleDelete(post){
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method:"Delete"
                })
                const filteredPost = prompts.filter((p)=> p._id !== post._id)
                setPrompts(filteredPost)
            } catch (error) {
                
            }
        }
    }
  return (
    <Profile 
        name="My"
        desc="Welcome to your profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile