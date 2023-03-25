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
    const thirdScroll = useRef(null)
    const fourthScroll = useRef(null)
    const fiveScroll = useRef(null)

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
        const newTime = Number(progressBar.current.value) + 10;
        const maxValue = progressBar.current.max;
        const currentTime = newTime > maxValue ? maxValue : newTime;
        progressBar.current.value = currentTime;
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
                newBgColors[index] = "#D0DAF6";
            } else {
                newBgColors[index] = "transparent";
            }

            if (audioPlayer.current.currentTime >= 78 && audioPlayer.current.currentTime < 79) {
                console.log("scrolling 1")
                scrollDown(firstScroll)
            }
        });
        setBgColors(newBgColors);
    };


    const scrollDown = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
        });
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
                                    <span id={"c_" + i} style={{ background: bgColors[i] }} key={i} className="player-text" >
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
        </div >

    );
}

export default Player;