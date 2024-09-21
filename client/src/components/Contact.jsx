import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landloard, setLandlord] = useState(null)
    const [message,setMessage] = useState()
    const onChange = () =>{
        setMessage(message)
    }
    useEffect(()=>{
        const fetchLandLoard = async ()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandLoard();
    },[listing.userRef])

  return (
   <>
        {
            landloard &&(
                <div className='flex flex-col gap-4 py-5'>
                    <p >Contact <span className='font-bold'>{landloard.username} </span>
                    <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea name="message" id="message"  rows="5" placeholder='Your Message' className='w-full border p-3 rounded-lg outline-none' value={message} onChange={onChange}></textarea>
                   <Link to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body${message}`} className='bg-slate-700 text-white text-center p-3 uppercase mt-3 rounded-lg hover:opacity-95'>
                       Send Message
                   </Link>
                </div>
            )
        }

   </>
  )
}

export default Contact