import React, { useState, useEffect, useRef } from "react";
import libraryLogo from "../assets/images/library-logo.svg"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import audioSource from "../assets/audio/taimoor.wav"
import microScope from "../assets/images/microscope-line-art.png"


/*
Code taken from: https://www.codepunker.com/blog/sync-audio-with-text-using-javascript
*/

function Player(props) {
  const audioPlayer = useRef(null);
  const firstScroll = useRef(null)
  const secondScroll = useRef(null)

  const title = "خوردبینی جاندار";

  /**
   * type 0 = regular string
   * type 1 = word with definition (English Urdu both)
   * type 2 = word with definiton and image
   * type 3 = word with definition and video
   */

  const syncData = [
    {end:"1.5",start:"0.0",text:"خوردبینی جاندار",type:3},
    {end:"2.6",start:"1.5",text:"ایسے جاندار ہیں",type:0},
    {end:"4.4",start:"2.6",text:"جن کو ہم آنکھ سے نہیں دیکھ سکتے-",type:0},
    {end:"6.0",start:"4.4",text:"انکو صرف",type:0},
    {end: "6.6", start: "6.0", text: "خوردبین", type:2},
    {end:"8.2",start:"6.6",text:"کی مدد سے ہی دیکھا جا سکتا ہے -",type:0},
    {end:"11.3",start:"8.2",text:"خوردبین ایک خاص قسم کا آلہ ہے",type:0},
    {end:"12.8",start:"11.3",text:"جو بہت چھوٹی چیزوں کا",type:0},
    {end: "13.1", start: "12.8", text: "عکس", type:1},
    {end:"14.6",start:"13.1",text:"بہت بڑا کر دیتا ہے-",type:0},
    {end:"16.8",start:"14.6",text:"اس کی وجہ سے ہم ان کو صاف",type:0},
    {end:"18.1",start:"16.8",text:"اور واضح دیکھ سکتے ہیں -",type:0},
    {end:"20.4",start:"18.1",text:"اگرچہ ہم ان کو آنکھ کی",type:0},
    {end:"22.2",start:"20.4",text:"مدد سے نہیں دیکھ سکتے لیکن",type:0},
    {end:"24.4",start:"22.2",text:"یہ ہمارے ارد گرد ہر طرف موجود ہے-",type:0},
    {end:"28.1",start:"24.4",text:"بیشتر خوردبینی جاندار یک خلوی ہیں",type:0},
    {end:"30.6",start:"28.1",text:"مگر بعض کثیر خلوی بھی ہوتے ہیں-",type:0}
    /* ... and so on ... full json is in the demo */
  ];
  // console.log(JSON.stringify(syncData));

  // State storing the background colors of each subtitle text
  const [bgColors, setBgColors] = useState(new Array(syncData.length).fill("transparent"));

  const handleTimeChange = () => {
    let newBgColors = [...bgColors];
    syncData.forEach(function (element, index) {
      if (audioPlayer.current.currentTime >= element.start && audioPlayer.current.currentTime <= element.end) {
        // console.log(audioPlayer.current.currentTime);
        newBgColors[index] = "yellow";
      } else {
        newBgColors[index] = "transparent";
      }
      if(audioPlayer.current.currentTime >= 11.3 && audioPlayer.current.currentTime < 12.8) {
        scrollDown(firstScroll)
      }
      if(audioPlayer.current.currentTime >= 20.4 && audioPlayer.current.currentTime < 22.2) {
        scrollDown(secondScroll)
      }
    });
    setBgColors(newBgColors);
  };
  

  /**
   * Making the API request for the story
   */
  useEffect(() => {
    fetch("/api/library/" + props.match.params.id)
      .then((response) => {
        if (response.status > 400) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        //
        // Add code here to set data recieved from backend
        // ...
        console.log(data);
      });
  }, []);

  const scrollDown = (ref) => {
    ref.current?.scrollIntoView(({ behavior: "smooth", block: "end", inline: "nearest"}))
  }

  return (
    <div className="height-100 player-bg">
      <div className="d-flex justify-content-center">
        <h1 className="text-gray heading-text mt-2 story-title">{title}</h1>
      </div>
      <div className="text-box centered mt-3">
        <div className="p-3 urdu-text">
          <container id="subtitles" className="urdu-text">
            {syncData.map((data, i) => {
              if (data.type == 0) {
                if (data.start == '22.2') {
                  return (
                    <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text" ref={firstScroll}>
                      {" " + data.text}
                    </span>
                  )
                }
                if (data.start == '28.1') {
                  return (
                    <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text" ref={secondScroll}>
                      {" " + data.text}
                    </span>
                  )
                }
                return (
                  <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
                    {" " + data.text}
                  </span>
                )
              }
              if (data.type == 1) {return (
                <Popup trigger={<button  class="popup-button">
                  <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
                      {" " + data.text}
                    </span>
                </button>} modal>
                  <h4 className="urdu-text" >عکس : Reflection</h4>
                </Popup>
              )}
              if (data.type == 2) {return (
                <Popup trigger={<button class="popup-button">
                  <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
                      {" " + data.text}
                    </span>
                </button>} modal>
                  <h4 style={{textAlign: "center"}}>Microscope: (noun) magnifier of the image of small objects.</h4>
                  <h4 className="urdu-text" style={{textAlign: "center"}}>خوردبین: (اسم) جو چھوٹی چیزوں کو کئی گنا بڑا کر کے دکھاتا ہے</h4>
                  <br/>
                  <div className='popup-image'>
                    <img src={microScope} width={350} height={350}/>
                  </div>
                </Popup>
              )}
              if (data.type == 3) {return (
                <Popup trigger={<button  class="popup-button">
                  <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
                      {" " + data.text}
                    </span>
                </button>} modal>
                    <h3 className="urdu-text" style={{textAlign: "center"}}>خوردبینی جاندار</h3>
                    <h4 className="urdu-text" style={{textAlign: "center"}}>ایک جاندار جو صرف خوردبین کے ذریعے دیکھا جا سکتا ہے۔</h4>
                    <br/>
                    <div className='popup-image'>
                    <iframe width={350} height={350} src={'https://www.youtube.com/embed/aPmPep2r6uo'} />
                  </div>
                </Popup>
              )}
            })}
          </container>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <audio
          className="mt-4 rounded bg-black player-attributes"
          id="audiofile"
          ref={audioPlayer}
          src={audioSource}
          onTimeUpdate={handleTimeChange}
          controls
        ></audio>
      </div>
    </div>
  );
}

export default Player;