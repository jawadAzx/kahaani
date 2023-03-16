import React, { useState, useRef, useEffect } from 'react'
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import { GrBackTen } from "react-icons/gr"
import { GrForwardTen } from "react-icons/gr"
import './audioPlayer.css'
import libraryLogo from "../../assets/images/library-logo.svg"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import audioSource from "../../assets/audio/taimoor.wav"
import microScope from "../../assets/images/microscope-line-art.png"
import "./Player.css"
import decor from "./img.png"
import AudioPlayer from "./AudioPlayer";
import Header from "../header/Header";

/*
Code taken from: https://www.codepunker.com/blog/sync-audio-with-text-using-javascript
*/

function Player(props) {
    const firstScroll = useRef(null)
    const secondScroll = useRef(null)

    const { audio, text, title, img } = props.location.state
    // console.log(audio, JSON.parse(text))
    /**
     * type 0 = regular string
     * type 1 = word with definition (English Urdu both)
     * type 2 = word with definiton and image
     * type 3 = word with definition and video
     */

    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backTen = () => {
        progressBar.current.value = Number(progressBar.current.value - 10);
        changeRange();
    }

    const forwardTen = () => {
        console.log(progressBar.current.value)
        progressBar.current.value = Number(progressBar.current.value + 10);
        changeRange();
    }
    const handlePlaybackSpeed = () => {
        let speed = playbackSpeed === 1.0 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : playbackSpeed === 2.0 ? 0.5 : playbackSpeed === 0.5 ? 1.0 : 1.0;
        audioPlayer.current.playbackRate = speed;
        setPlaybackSpeed(speed);

    }

    // // // // // // // // // // // // 
    const syncData = JSON.parse(text);

    // console.log(JSON.stringify(syncData));

    // State storing the background colors of each subtitle text
    const [bgColors, setBgColors] = useState(new Array(syncData.length).fill("transparent"));

    const handleTimeChange = () => {
        let newBgColors = [...bgColors];
        syncData.forEach(function (element, index) {
            if (audioPlayer.current.currentTime >= element.start && audioPlayer.current.currentTime <= element.end) {
                // console.log(audioPlayer.current.currentTime);
                newBgColors[index] = "#D0DAF6";
            } else {
                newBgColors[index] = "transparent";
            }
            /**
            console.log(audioPlayer.current.currentTime, audioPlayer.current.currentTime)
            if (audioPlayer.current.currentTime >= 78 && audioPlayer.current.currentTime < 79) {
                console.log("scrolling 1")
                scrollDown(firstScroll)
            }
            */

        });
        setBgColors(newBgColors);
    };


    const scrollDown = (ref) => {
        ref.current?.scrollIntoView(({ behavior: "auto", block: "end", inline: "nearest" }))
    }


    return (
        <div className="player">
            <Header isLibrary={true} />

            <div className="player-sub-container">
                <div className="player-text-box">
                    <container id="subtitles" className="player-text">
                        {
                            syncData.map((data, i) => {
                                return (
                                    <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="player-text" ref={firstScroll}>
                                        {" " + data.text}
                                    </span>
                                )
                            })
                        }
                    </container>
                </div>
            </div>

            <div className="audio-player-container">
                <div className="audioPlayer">
                    <div className='sm-row'>
                        <audio ref={audioPlayer} src={audio} preload="metadata" onTimeUpdate={handleTimeChange}
                        ></audio>
                        {/*  */}
                        <button className="backward" onClick={backTen}><GrBackTen size={23.53} /></button>
                        <button onClick={togglePlayPause} className="playPause-button">
                            {isPlaying ? <FaPause /> : <FaPlay className="play" />}
                        </button>
                        <button className="forward" onClick={forwardTen}> <GrForwardTen size={23.53} /></button>
                        {/*  */}
                        <button onClick={handlePlaybackSpeed} className="playbackSpeedButton-sm">
                            {playbackSpeed === 1.0 ? "1.0x" : playbackSpeed === 1.5 ? "1.5x" : playbackSpeed === 2.0 ? "2.0x" : playbackSpeed === 0.5 ? "0.5x" : "1.0x"}
                        </button>
                    </div>
                    <div className="play-player">
                        {/* current time */}
                        <div className="currentTime">{calculateTime(currentTime)}</div>
                        {/* progress bar */}
                        <div className="pbx7">
                            <input type="range" className="progressBar-f1" defaultValue="0" ref={progressBar} onChange={changeRange} />
                        </div>
                        {/* duration */}
                        <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                        {/* playback speed */}
                    </div>
                </div >
                < div className="audio-player-img-name-container">
                    <img className="audio-player-img" src={img} />
                    <div className="audio-player-name-container">
                        <h1 className="audio-player-name">{title}</h1>
                    </div>
                </div>

            </div>
        </div>
        // <div className="height-100 player-bg">
        //     <div className="d-flex justify-content-center">
        //         <h1 className="text-gray heading-text mt-2 story-title">{title}</h1>
        //     </div>
        //     <div className="text-box centered mt-3">
        //         <div className="p-3 urdu-text">
        //             <container id="subtitles" className="urdu-text">
        //                 {syncData.map((data, i) => {
        //                     if (data.type == 0) {
        //                         if (data.start == '22.2') {
        //                             return (
        //                                 <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text" ref={firstScroll}>
        //                                     {" " + data.text}
        //                                 </span>
        //                             )
        //                         }
        //                         if (data.start == '28.1') {
        //                             return (
        //                                 <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text" ref={secondScroll}>
        //                                     {" " + data.text}
        //                                 </span>
        //                             )
        //                         }
        //                         return (
        //                             <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
        //                                 {" " + data.text}
        //                             </span>
        //                         )
        //                     }
        //                     if (data.type == 1) {
        //                         return (
        //                             <Popup trigger={<button class="popup-button">
        //                                 <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
        //                                     {" " + data.text}
        //                                 </span>
        //                             </button>} modal>
        //                                 <h4 className="urdu-text" >عکس : Reflection</h4>
        //                             </Popup>
        //                         )
        //                     }
        //                     if (data.type == 2) {
        //                         return (
        //                             <Popup trigger={<button class="popup-button">
        //                                 <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
        //                                     {" " + data.text}
        //                                 </span>
        //                             </button>} modal>
        //                                 <h4 style={{ textAlign: "center" }}>Microscope: (noun) magnifier of the image of small objects.</h4>
        //                                 <h4 className="urdu-text" style={{ textAlign: "center" }}>خوردبین: (اسم) جو چھوٹی چیزوں کو کئی گنا بڑا کر کے دکھاتا ہے</h4>
        //                                 <br />
        //                                 <div className='popup-image'>
        //                                     <img src={microScope} width={350} height={350} />
        //                                 </div>
        //                             </Popup>
        //                         )
        //                     }
        //                     if (data.type == 3) {
        //                         return (
        //                             <Popup trigger={<button class="popup-button">
        //                                 <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="urdu-text">
        //                                     {" " + data.text}
        //                                 </span>
        //                             </button>} modal>
        //                                 <h3 className="urdu-text" style={{ textAlign: "center" }}>خوردبینی جاندار</h3>
        //                                 <h4 className="urdu-text" style={{ textAlign: "center" }}>ایک جاندار جو صرف خوردبین کے ذریعے دیکھا جا سکتا ہے۔</h4>
        //                                 <br />
        //                                 <div className='popup-image'>
        //                                     <iframe width={350} height={350} src={'https://www.youtube.com/embed/aPmPep2r6uo'} />
        //                                 </div>
        //                             </Popup>
        //                         )
        //                     }
        //                 })}
        //             </container>
        //         </div>
        //     </div>
        //     <div className="d-flex justify-content-center">
        //         <audio
        //             className="mt-4 rounded bg-black player-attributes"
        //             id="audiofile"
        //             ref={audioPlayer}
        //             src={audio}
        //             onTimeUpdate={handleTimeChange}
        //             controls
        //         ></audio>
        // <AudioPlayer src={audio} text={text} title={title} onTimeUpdate={handleTimeChange}

        //     </div>
        // </div>
    );
}

export default Player;