import React, { useState, useRef, useEffect } from 'react'
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import { GrBackTen } from "react-icons/gr"
import { GrForwardTen } from "react-icons/gr"
import './audioPlayer.css'
function AudioPlayer(props) {
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
        let speed = playbackSpeed === 1.0 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : playbackSpeed === 2.0 ? 0.5 : 1.0;
        audioPlayer.current.playbackRate = speed;
        setPlaybackSpeed(speed);

    }
    console.log(props.src)
    console.log("HE")
    return (
        <div className="audioPlayer-s">
            <div className='sm-row-2'>
                <audio ref={audioPlayer} src={props.src} preload="metadata"></audio>
                <button className="forwardBackward" onClick={backTen}><GrBackTen size={23.53} /></button>
                <button onClick={togglePlayPause} className="playPause">
                    {isPlaying ? <FaPause /> : <FaPlay className="play" />}
                </button>
                <button className="forwardBackward" onClick={forwardTen}> <GrForwardTen size={23.53} /></button>
                <button onClick={handlePlaybackSpeed} className="playbackSpeedButton playbackSpeedButton-f">
                    {playbackSpeed === 1.0 ? "1.0x" : playbackSpeed === 1.5 ? "1.5x" : playbackSpeed === 2.0 ? "2.0x" : playbackSpeed === 0.5 ? "0.5x" : "1.0x"}
                </button>

            </div>
            <div className="play-player-2">
                {/* current time */}
                <div className="currentTime">{calculateTime(currentTime)}</div>
                {/* progress bar */}
                <div>
                    <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
                </div>
                {/* duration */}
                <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                {/* playback speed */}
                <button onClick={handlePlaybackSpeed} className="playbackSpeedButton">
                    {playbackSpeed === 1.0 ? "1.0x" : playbackSpeed === 1.5 ? "1.5x" : playbackSpeed === 2.0 ? "2.0x" : playbackSpeed === 0.5 ? "0.5x" : "1.0x"}
                </button>
            </div>
        </div>

    )
}

export default AudioPlayer 
