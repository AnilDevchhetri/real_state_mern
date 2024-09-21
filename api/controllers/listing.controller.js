import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req,res, next) =>{
      
    try {
        const listing = await  Listing.create(req.body);
        return res.status(201).json(listing);
      } catch (error) {
        next(error)
      }
}

export  const deleteListing = async (req,res,next) =>{
  const listing = await Listing.findById(req.params.id);
  if(!listing){
    return next(errorHandler(404,'Property not found'));
  }
  if(req.user.id !== listing.userRef){return (401,'You can only delete your own propery')}

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Property  Has beendeleted')
  } catch (error) {
    next(error)
  }

}
export const updateListing = async (req,res,next)=>{
  const listing = await Listing.findById(req.params.id);
  if(!listing){return next(errorHandler(404,'Proparty Not Found'))}
  if(req.user.id !== listing.userRef){return next(errorHandler(404,'You can only Update your Own Property')) }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        // for getting new updatedvalues
        {new:true}
    )
    res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
}

export const  getListing = async(req,res,next)=>{
   try {
      const listing = await Listing.findById(req.params.id);
      if(!listing){return next(errorHandler(404,'Property Not Found'))}
      res.status(200).json(listing)
   } catch (error) {
    next(error)
   }
}


export const getListings = async(req, res,next) =>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if(offer === undefined || offer  === 'fasle'){
          offer = {$in: [false,true] }
        }

        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
          furnished = {$in:[false,true]}
        }

        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
          parking = {$in: [false,true]}
        }

        let type = req.query.type;
        if(type === undefined || type === 'all'){
          type = {$in: ['sale','rent']}
        }


        const searchTerm = req.query.searchTerm || '';
        const sort       = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc';
        
        //here $regex is  mongo db default search option 
        // $opttion:'i' mean no mather search text is upper or lower case
        const listings = await Listing.find({
          name: {$regex: searchTerm, $options:'i'},
          offer,
          furnished,
          parking,
          type
        }).sort(
          {[sort]:order}
        ).limit(limit).skip(startIndex)

        return res.status(200).json(listings)








    } catch (error) {
      next(error)
    }
}