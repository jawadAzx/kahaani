import React, { useState, useEffect } from "react";
import HorizontalMenu from "../horizontalmenu/HorizontalMenu";
import Player from "../player/Player";
import Summary from "../summary/Summary";
import { Link } from "react-router-dom";
import { getLibraryData } from "../../FirebaseApi";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import axios from "axios"
//import Loader from "react-loader-spinner";

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Library() {
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    axios.get("https://kahaani-backend.onrender.com/api/story/getStories").then(
      response => {
        console.log(response.data.dataItems);
        const dee = response.data.dataItems;
        setLibrary(dee)
      }
    )
      .catch(err => {
        console.log(err)

      })

  }, []);


  return (
    <div className="bg-white">

      {library &&
        Object.keys(library).map((genre, index) => {
          const data = library[genre];
          { console.log(data) }
          return (
            <div key={index} className="container mt-3">
              <h2 className="heading-text mt-6">{genre}</h2>
              <div className="row-flex">
                {data.map((story, index) => {
                  console.log(story)
                  return (
                    <div className="wrapper mt-3">
                      <div key={index} className={`column d-flex flex-column align-items-center p-2 edits`}>
                        <h2 className="heading-text ml-3 subject-headings">{story.title}</h2>

                        <Link key={index} to={{
                          pathname: "/player/:1",
                          state: {
                            audio: story.audio,
                            text: story.text
                          }
                        }}
                        >

                          <div>
                            <img
                              className="card-image"
                              style={{ objectFit: "contain" }}
                              src={story.image}
                              alt="Card images cap"
                            />
                            <h1 className="mt-3 story-subheadings">
                              {story.title}
                            </h1>
                          </div>
                        </Link>


                      </div>
                    </div>
                  )
                })
                }
              </div>
            </div>

          );

        })
      }

      {
        !library &&
        <div style={{ textAlign: 'center' }}>
          <h1>LOADING</h1>

        </div>
      }
    </div >
  );
}
export default Library;
