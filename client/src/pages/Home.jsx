import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css/bundle'
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper'
import ListingItem from "../components/ListingItem";
const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation])
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  },[]);

  return (
    <div>
      {/* top  */}
      <div className="flex flex-col gap-6 p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your Next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          AnilState Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Porro, incidunt?
          <br />
          Lorem ipsum dolor sit amet consectetur.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Search Now
        </Link>
      </div>
      {/* swiper  */}
       <Swiper navigation>
       {
          offerListings && offerListings.length > 0 &&
          offerListings.map((listing)=>(
            <SwiperSlide key={listing._id}>
               <div style={{background:`url(${listing.imageUrls}) center no-repeat`,backgroundSize:"cover"}} className="h-[500px]" key={listing._id}>

               </div>
            </SwiperSlide>
          ))
        }
       </Swiper>
      {/* listingresult for sales and rent  */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10 ">
          {
            offerListings && offerListings.length > 0 && (
              <div>
                <div className="flex justify-between py-7">
                   <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
                   <Link to={'/search?offer=true'} className="text-sm text-blue-800 font-bold hover:underline">View All</Link>
                </div>
                <div className="flex flex-wrap gap-3 justify-around ">
                  {
                    offerListings.map((listing) =>(
                      <ListingItem listing={listing} key={listing._id} />
                    ))
                  }
                </div>
              </div>
            )
          }
             {
            offerListings && offerListings.length > 0 && (
              <div>
                <div className="flex justify-between py-7">
                   <h2 className="text-2xl font-semibold text-slate-600">On Sale</h2>
                   <Link to={'/search?type=sale'} className="text-sm text-blue-800 font-bold hover:underline">View All</Link>
                </div>
                <div className="flex flex-wrap gap-3 justify-around ">
                  {
                    saleListings.map((listing) =>(
                      <ListingItem listing={listing} key={listing._id} />
                    ))
                  }
                </div>
              </div>
            )
          }
             {
            offerListings && offerListings.length > 0 && (
              <div>
                <div className="flex justify-between py-7">
                   <h2 className="text-2xl font-semibold text-slate-600">On Rent</h2>
                   <Link to={'/search?type=rent'} className="text-sm text-blue-800 font-bold hover:underline">View All</Link>
                </div>
                <div className="flex flex-wrap gap-3 justify-around ">
                  {
                    rentListings.map((listing) =>(
                      <ListingItem listing={listing} key={listing._id} />
                    ))
                  }
                </div>
              </div>
            )
          }
      </div>
    </div>
  );
};

export default Home;
