import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper , SwiperSlide } from 'swiper/react'
import  SwiperCore  from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false);
    const [error,setError]     = useState(false)
    const params = useParams(); 
    console.log(listing)
    useEffect(()=>{
        const fetchListing = async () =>{

            try {
                setLoading(true)
                setError(false)
                const listingId = params.listingId
                console.log(listingId)
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data =  await res.json();
                if(data.success === false){setError(true);return;}
                setListing(data);
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
           
        }
        fetchListing();
    },[])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Somthing went wrong</p>}
        {listing && listing.imageUrls && !loading && !error && (
            <>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                                <div className='h-[500px]' style={{background:`url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                                </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )}
    </main>
  )
}

export default Listing