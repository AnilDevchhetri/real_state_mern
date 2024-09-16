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