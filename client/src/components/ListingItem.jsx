import React from 'react'
import { Link } from 'react-router-dom'
import { MdAddLocation } from "react-icons/md";
const ListingItem = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'>
        <Link to={`/listing/${listing._id}`} className=''>
            <img src={listing.imageUrls[0]} alt="" className='h-[320px] truncate sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
            <div className='p-3 flex flex-col gap-2'>
                <p className='truncate text-lg text-slate-700 font-semibold'>{listing.name}</p>
                <div className='flex gap-1 items-center'>
                    <MdAddLocation className='h-4 w-5 text-blue-700' />
                    <p className='text-sm text-gray-700 truncate'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>$ {listing.offer ? listing.discountPrice.toLocaleString('en-US'): listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
                </p>
                <div  className='text-slate-700 flex gap-3'>
                    <div className='font-bold text-xs'>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Beds`: `${listing.bedrooms} Bed`}
                    </div>
                    <div className='font-bold text-xs'>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Beds`: `${listing.bathrooms} Bed`}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingItem