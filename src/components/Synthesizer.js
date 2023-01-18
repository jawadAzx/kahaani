import React, { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Synthesizer() {
    const [text, setText] = useState("");
    const [get, setGet] = useState(false);
    const [synthesize, setSynthesize] = useState(false);
    const [audioStorage, setAudioStorage] = useState(null);

    const playAudio = async (id) => {
        setGet(false)
        setSynthesize(true)
        const url = "http://34.232.173.3/synthesize"
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
        <div className="bg-white">
            <div className="d-flex justify-content-center bg-yellow">
                <h1 className="text-gray heading-text mt-3">Synthesizer</h1>
            </div>
            <div className="d-flex justify-content-center bg-yellow">
                <div className="main mb-3">
                    <div className="form-group has-search rounded">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Enter Urdu text..."
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                    </div>
                    <div className="bottom-container">
                        <button className="btn btn-primary mb-3" onClick={playAudio}>Synthesize</button>


                        {get ? <audio className="audio-set" controls>
                            <source src={audioStorage} type="audio/wav" />
                        </audio> : <div>
                            {
                                synthesize ? <div style={{ textAlign: 'center' }}>
                                    <h1>LOADING</h1>
                                    <Loader
                                        type="RevolvingDot"
                                        color="#00BFFF"
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

        </div>
    );
}
export default Synthesizer;
