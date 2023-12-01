import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCollection } from "../../action";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "../../component/Button";
import { AiOutlineArrowDown } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { PiTagBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Input } from "../../component/Input";

const Home = ({ addToCollection }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [istagShown, setIsTagShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch=()=>    {
    const query = searchQuery.toLowerCase();
    const filtered = images.filter((image) =>
        image.tags.some((tag) => tag.toLowerCase().includes(query))
    );
    setImages(filtered);
};
  
  


  const handleAddToCollection = (image) => {
    console.log("Adding to collection:", image);
    addToCollection(image);
  };

  const handleClick = () => {
    setIsShown((current) => !current);
  };
  const handletagClick = () => {
    setIsTagShown((current) => !current);
  };
  const handleSizeChange = (imageId, newSize) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === imageId) {
          return {
            ...image,
            size: newSize,
          };
        }
        return image;
      });
    });
  };

  const handleDelete = (id) => {
    const deletimg = images.filter((item) => item.id !== id);
    setImages(deletimg);
  };
  const handleTagDelete = (imageId, tag) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === imageId) {
          const updatedTags = image.tags.filter((t) => t !== tag);
          return {
            ...image,
            tags: updatedTags,
          };
        }
        return image;
      });
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handletag1Click = (imageId, tag) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === imageId) {
          const updatedTags = image.tags.includes(tag)
            ? image.tags.filter((t) => t !== tag)
            : [...image.tags, tag];
          return {
            ...image,
            tags: updatedTags,
          };
        }
        return image;
      });
    });
  };

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      )
      .then((response) => {
        
       
        const imagesWithSize = response.data.map((image) => ({
          ...image,
          size: "original",
          tags: [],
        }));
        setImages(imagesWithSize);
      });
  };

  return (
    <>
      <>
        <section>
          <div
            className="z-10 fixed  w-full bg-black  sm:bg-opacity-50 bg-opacity-50 absolute px-5"
            style={{ height: "513px" }}
          >
            <div className="py-[35px] px-[15px] border-opacity-60 rounded-[8px]">
              <Button variant="primary" size="large">
                <div className="relative">
                  <input
                    className="absolute inset-0 z-[0] opacity-0 w-full"
                    type="file"
                    name="Images"
                    id="Images"
                    onChange={handleImage}
                  />
                  <label htmlFor="Images" className="text-white h-[50px]">
                    Upload Image
                  </label>
                </div>
              </Button>
            </div>
            <div className="flex items-center justify-center pt-32">
              <Input
                type="search"
                placeholder="Search"
                varient={"Primary"}
                aria-label="Search"
                aria-describedby="button-addon1"
                value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               
              />
              <button
                className="bg-[#b39359]  py-2 px-3  mb-3  text-white"
                onClick={handleSearch}
              >
                search
              </button>
          
            </div>
          </div>

          <img
            className=" lg:w-full sm:w-full relative"
            style={{ height: "513px" }}
            src="Images/bg-cat.jpg"
            alt="banner"
          ></img>
        </section>

        <div className="container mx-auto px-2 pt-14">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              
              {image && (
                <div className="container mx-auto px-2 pt-14">
                  <img src={URL.createObjectURL(image)} alt="Uploaded" />
                </div>
              )}
              {images.map((value, index  ) => {
                return (

                  <>
                  
                    <div
                      key={index}
                      className="px-3 py-3 my-masonry-grid_column"
                    >
                      <div
                        className={`card group ${
                          value.size === "small"
                            ? "small-size"
                            : value.size === "medium"
                            ? "medium-size"
                            : value.size === "large"
                            ? "large-size"
                            : ""
                        }`}
                      >
                        <div class="relative">
                          <img src={value.url} alt="image" />

                          <Button
                            className="absolute  "
                            variant="delbtn"
                            onClick={() => handleDelete(value.id)}
                          >
                            <RiDeleteBin6Line
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Button>
                          <Link to={"/collection"}>
                            {" "}
                            <Button
                              className="absolute  "
                              variant="addbtn"
                              onClick={() => handleAddToCollection(value)}
                            >
                              <GrAdd
                                style={{ width: "20px", height: "20px" }}
                              />
                            </Button>
                          </Link>
                          <Button className="absolute  " variant="dwnbtn">
                            <AiOutlineArrowDown
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Button>

                          <Button
                            className="absolute  "
                            variant="setbtn"
                            onClick={handleClick}
                          >
                            <AiOutlineSetting
                              style={{ width: "20px", height: "20px" }}
                            />
                            {isShown && (
                              <div className="rounded bg-slate-100 absolute z-10 h-24 w-20 top-10 left-0.5">
                                <Button
                                  className={"pt-2"}
                                  variant="setting"
                                  onClick={() =>
                                    handleSizeChange(value.id, "small")
                                  }
                                >
                                  Small
                                </Button>
                                <Button
                                  variant="setting"
                                  onClick={() =>
                                    handleSizeChange(value.id, "medium")
                                  }
                                >
                                  Medium
                                </Button>
                                <Button
                                  variant="setting"
                                  onClick={() =>
                                    handleSizeChange(value.id, "large")
                                  }
                                >
                                  Large
                                </Button>
                              </div>
                            )}
                          </Button>
                          {value.tags &&
                            value.tags.map((tag) => (
                              <>
                                <span
                                  key={tag}
                                  className="ml-3 bg-black bg-opacity-25 px-3 py-2 rounded top-5 "
                                >
                                  {tag}
                                </span>
                                <button
                                  type="button"
                                  class=""
                                  onClick={() => handleTagDelete(value.id, tag)}
                                >
                                  <span class="sr-only">Close menu</span>

                                  <svg
                                    class="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </>
                            ))}
                          <Button
                            className="absolute   "
                            variant="tagbtn"
                            onClick={handletagClick}
                          >
                            <PiTagBold
                              style={{ width: "20px", height: "20px" }}
                            />

                            {istagShown && (
                              <div className="rounded bg-slate-100 absolute z-10  w-20 top-10 left-0.5">
                                <ul className="px-5 py-5">
                                  <li
                                    className=""
                                    onClick={() =>
                                      handletag1Click(value.id, "Happy")
                                    }
                                  >
                                    Happy
                                  </li>
                                  <li
                                    className="pt-5"
                                    onClick={() =>
                                      handletag1Click(value.id, "Angry")
                                    }
                                  >
                                    Angry
                                  </li>
                                  <li
                                    className="pt-5"
                                    onClick={() =>
                                      handletag1Click(value.id, "Sleepy")
                                    }
                                  >
                                    Sleepy
                                  </li>
                                  <li
                                    className="pt-5"
                                    onClick={() =>
                                      handletag1Click(value.id, "Hungry")
                                    }
                                  >
                                    Hungry
                                  </li>
                                  <li
                                    className="pt-5"
                                    onClick={() =>
                                      handletag1Click(value.id, "Cute")
                                    }
                                  >
                                    Cute
                                  </li>
                                </ul>
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </>
    </>
  );
};

const mapDispatchToProps = {
  addToCollection,
};

export default connect(null, mapDispatchToProps)(Home);
