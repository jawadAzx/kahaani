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

    // getLibraryData().then((data) => {
    //   console.log(data);
    //   setLibrary(data);
    // });
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


    //Addding Dummy Data

    // const namesList = ["Michael", "Christopher", "Jessica", "Matthew", "Ashley", "Jennifer", "Joshua", "Amanda", "Daniel", "David", "James", "Robert", "John", "Joseph", "Andrew", "Ryan", "Brandon", "Jason", "Justin", "Sarah", "William", "Jonathan", "Stephanie", "Brian", "Nicole", "Nicholas", "Anthony", "Heather", "Eric", "Elizabeth", "Adam", "Megan", "Melissa", "Kevin", "Steven", "Thomas", "Timothy", "Christina", "Kyle", "Rachel", "Laura", "Lauren", "Amber", "Brittany", "Danielle", "Richard", "Kimberly", "Jeffrey", "Amy", "Crystal", "Michelle", "Tiffany", "Jeremy", "Benjamin", "Mark", "Emily", "Aaron", "Charles", "Rebecca", "Jacob", "Stephen", "Patrick", "Sean", "Erin", "Zachary", "Jamie", "Kelly", "Samantha", "Nathan", "Sara", "Dustin", "Paul", "Angela", "Tyler", "Scott", "Katherine", "Andrea", "Gregory", "Erica", "Mary", "Travis", "Lisa", "Kenneth", "Bryan", "Lindsey", "Kristen", "Jose", "Alexander", "Jesse", "Katie", "Lindsay", "Shannon", "Vanessa", "Courtney", "Christine", "Alicia", "Cody", "Allison", "Bradley", "Samuel"];

    // const genre = ["action", "comdey", "crime", "drama", "horror"];
    // const grade = ["Grade Five", "Grade Six", "Grade Seven", "Grade Eight"]
    // const subject = ["Physics", "Maths", "English", "Computer Science", "Urdu", "Geography", "History"]

    // let promiseList = [];

    // for (let i = 0; i < 10; i++) {
    //   const docData = {
    //     audio: "audioLink",
    //     author: namesList[Math.floor(Math.random() * namesList.length)],
    //     genre: genre[Math.floor(Math.random() * genre.length)],
    //     grade: grade[Math.floor(Math.random() * grade.length)],
    //     image: "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
    //     subject: subject[Math.floor(Math.random() * subject.length)],
    //     summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur sapien purus, non varius erat euismod vel. Ut tristique finibus lectus. Curabitur mattis iaculis ipsum faucibus tempus. Nam mollis sem erat, sit amet fringilla dolor malesuada sed. Sed quis facilisis lectus, non elementum purus. Maecenas non mi commodo, lobortis augue ac, blandit neque. Integer eleifend varius augue, vel volutpat dui euismod ac. Donec sagittis eu eros quis cursus. Suspendisse faucibus mi eu urna interdum, eu malesuada dolor maximus. Praesent tincidunt venenatis eros non feugiat.",
    //     title: "some Tilte",
    //   };

    //   promiseList.push(addDoc(collection(db, "Library"), docData))
    // }

    // Promise.all(promiseList)
    //   .then(() => console.log("Added Data Successfully"))

  }, []);


  return (
    <div className="bg-white">

      {library &&
        library.map((story, index) => {
          { console.log(story) }
          return (
            <div key={index} className="container mt-3">
              <h2 className="heading-text mt-3">{story.genre}</h2>
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
                      <h1 className="sub-heading-text mt-3">
                        {story.title}
                      </h1>
                    </div>
                  </Link>


                </div>
              </div>
            </div>
          );
        })}
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