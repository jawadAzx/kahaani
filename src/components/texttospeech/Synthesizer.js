import React, { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import Footer from "../footer/Footer";
import './synthesizer.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Synthesizer() {
    const [text, setText] = useState("");
    const [get, setGet] = useState(false);
    const [synthesize, setSynthesize] = useState(false);
    const [audioStorage, setAudioStorage] = useState(null);
    const [characterCount, setCharacterCount] = useState(0);
    const handleChange = (e) =>{
        setText(e.target.value)
        setCharacterCount(e.target.value.length)
    }
    const playAudio = async (id) => {
        setGet(false)
        setSynthesize(true)
        const url = "https://api.kahaani.fun/synthesize"
        const body = {
            // add quotation marks to text 
            "text" : `"${text}"`
        }
        
        // make get fetch request
        fetch( url, {
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
            <div className="d-flex justify-content-center">
                <h1 className="text-black mt-3 heading">Text to Speech Converter</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="main mb-3">
                <div class='charcount'>{characterCount}</div>
                        <textarea
                            type="text"
                            onChange = {handleChange}
                            className="form-control1 rounded1 wideInput"
                            maxLength= "10000"
                            placeholder="اردو میں لکھیں"
                            value={text}
                        />
                    
                    <div className="bottom-container">
                        <button className="btn mb-3 listen" onClick={playAudio}>Listen to the audio file</button>
                        {get ? <audio className="audio-set" controls>
                            <source src={audioStorage} type="audio/wav" />
                        </audio> : <div>
                            {
                                synthesize ? <div style={{ textAlign: 'center' }}>
                                    <h1>LOADING</h1>
                                    <Loader
                                        type="RevolvingDot"
                                        color="#4ac890"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                                    : null
                            }
                        </div>}
                    </div>
                </div>
            </div>
            <Footer isLibrary={false} isSynthesizer={true}/>
        </div>
    );
}
export default Synthesizer;
