import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faChair, faLocation, faMap, faMapLocation, faParking } from '@fortawesome/free-solid-svg-icons'; // Import the bed icon
import {useSelector } from 'react-redux'
import Contact from "../components/Contact";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact,setContact] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state)=>state.user)
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const listingId = params.listingId;
        console.log(listingId);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <main className="mb-10">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Somthing went wrong</p>
      )}
      {listing && listing.imageUrls && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      <div className="max-w-6xl mx-auto p-3">
        <h2 className="text-black text-2xl font-semibold mt-3">
          {listing.name}
        </h2>
        <p className="flex items-center w-full max-w-[200px] text-slate-600 text-center p-1 rounded-md">
        <FontAwesomeIcon icon={faMapLocation}  className="text-lg pr-2 text-blue-700"/>
        
          {listing.address}
        </p>
        <div className="flex gap-4">
          <p className="bg-blue-700 w-full max-w-[200px] text-white text-center p-1 rounded-md mt-3">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing.offer && (
            <p className="bg-gray-700 w-full max-w-[200px] text-white text-center p-1 rounded-md mt-3">
              ${+listing.regularPrice - +listing.discountPrice}
            </p>
          )}
        </div>
        <p className="mt-3 text-slate-8 flex flex-col gap-2"><span className="font-semibold text-black text-2xl">About Property</span>
            {listing.description}</p>
        <ul className="mt-3  text-slate-900 text-sm sm:text-lg font-bold flex gap-4 sm:gap-6 items-center flex-wrap">
            <li className="flex items-center gap-1 whitespace-nowrap"><FontAwesomeIcon icon={faBed}  className="text-lg"/>
             {listing.bedrooms}{listing.bedrooms > 1 ?'beds':'bed'}</li>
             <li className="flex items-center gap-1 whitespace-nowrap "><FontAwesomeIcon icon={faBath}  className="text-lg"/>
             {listing.bathrooms}{listing.bathrooms > 1 ?'Baths':'Bath'}</li>
             <li className="flex items-center gap-1 whitespace-nowrap "><FontAwesomeIcon icon={faParking}  className="text-lg"/>
             {listing.bathrooms}{listing.bathrooms > 1 ?'Baths':'Bath'}</li>
             <li className="flex items-center gap-1 whitespace-nowrap "><FontAwesomeIcon icon={faChair}  className="text-lg"/>
             {listing.bathrooms}{listing.furnished > 1 ?'Fursnished':'Unfurnished'}</li>
             
        </ul>
        {currentUser && listing.userRef != currentUser._id && !contact && (
            <button onClick={()=>setContact(true)} className="bg-blue-700 text-white rounded-lg uppercase hover:opacity-90 w-full p-3 my-5">Contact Owner</button>
        )}
        {contact && <Contact listing={listing} />}
      </div>
    </main>
  );
};

export default Listing;
