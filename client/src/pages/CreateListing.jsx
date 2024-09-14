import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Property
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={50}
            minLength={5}
            required
            id="name"
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            id="description"
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="adress"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex  items-center gap-3">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 outline-none"
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex  items-center gap-3">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 outline-none"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex  items-center gap-3">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                className="p-3 border border-gray-300 outline-none"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">($ / Month)</span>
              </div>
            </div>
            <div className="flex  items-center gap-3">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                className="p-3 border border-gray-300 outline-none"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">Images: 
              <span className="font-normal text-gray-400 ml-2">The first image will be cover image.Max(6)
              </span>
            </p>
            <div className="flex gap-4">
              <input className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
              <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppcase hover:opacity-95 disabled:opacity-85">Create Property</button>
        </div>
        
      </form>
    </main>
  );
};

export default CreateListing;
