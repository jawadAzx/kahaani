import React, { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import Footer from "../footer/Footer";
import './synthesizer.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AudioPlayer from "./AudioPlayer";
import { TbLoader } from "react-icons/tb";
import Header from "../header/Header";
function Synthesizer() {
    const [text, setText] = useState("");
    const [get, setGet] = useState(false);
    const [synthesize, setSynthesize] = useState(false);
    const [audioStorage, setAudioStorage] = useState(null);
    const [characterCount, setCharacterCount] = useState(0);
    const [buttonText, setButtonText] = useState("Listen to the audio file")
    const [icon, setIcon] = useState("")
    const handleChange = (e) => {
        setText(e.target.value)
        setCharacterCount(e.target.value.length)
    }
    const playAudio = async (id) => {
        setGet(false)
        setSynthesize(true)
        setButtonText("Loading")
        setIcon(<TbLoader size={20} />)
        const url = "https://api.kahaani.fun/synthesize"
        const body = {
            // add quotation marks to text 
            "text": `"${text}"`
        }

        // make get fetch request
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(response => response.blob())
            .then(async blob => {
                let file = new File([blob], "1.wav", {
                    type: "audio/x-wav", lastModified: new Date().getTime()
                });
                // do stuff with `file`
                const url = window.URL.createObjectURL(file)
                setAudioStorage(url)
                setGet(true)
                // setText("");
                setSynthesize(false)

            })
            .catch(err => console.error(err));
    }
    return (
        <div className="maindiv">
            <Header isLibrary={false} />
            <div className="tts-heading">
                <h1 >Text to Speech Converter</h1>
            </div>
            <div className="tts-container">
                <textarea
                    type="text"
                    onChange={handleChange}
                    className="form-control1 rounded1 wideInput"
                    maxLength="10000"
                    placeholder="اردو میں لکھیں"
                    value={text}
                />
                <div className="bottom-container">
                    <div className="charcount"> {characterCount} / 10000 Characters</div>

                    {/* <button className="btn-synth synthesizer mb-3 listen" style={{ background: characterCount < 1 ? "#808080" : '#6485E2' }} onClick={playAudio}>{buttonText} {icon}</button> */}
                    {get ? <AudioPlayer src={audioStorage} /> : <div>
                        {
                            synthesize ? null
                                : null
                        }
                    </div>}
                </div>
            </div>
            <Footer isLibrary={false} isSynthesizer={true} />
        </div>
    );
}
export default Synthesizer;
