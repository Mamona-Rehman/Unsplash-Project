import React from "react";
import { connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const NewCollection = ({ collection }) => {
  return (
    <div>
      <div className=" h-20 bg-slate-100 flex items-center justify-center ">
       
        <h1 className="text-lg">New Collection</h1>
      </div>

      <div className="container mx-auto px-2 pt-14">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
          <Masonry
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
        {collection.map((image, index) => (
            <div  key={index} className="px-3 py-3 my-masonry-grid_column">
          <img  src={image.url} alt={`Image ${index} `} />
          </div>
        ))}
      </Masonry>
      </ResponsiveMasonry>
      </div>
    </div>

    
     
  );
};

const mapStateToProps = (state) => {
  return {
    collection: state.imageReducer.collection,
  };
};
export default connect(mapStateToProps)(NewCollection);
