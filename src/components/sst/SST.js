import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link, Redirect } from 'react-router-dom'
import Loader from "react-loader-spinner";


const SST = () => {
    const location = useLocation();
    const { title, text, audio, image } = location.state;

    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState(false);
    const [highlightText, setHighlightText] = useState({});
    const [redirect, setRedirect] = useState(false);
    // function to get highligting text from Google speech to text API server
    //http://localhost:8000/api/getHighlights
    //http://localhost:8000/api/story/postStory
    //https://kahaani-backend.onrender.com/api/getHighlights
    //https://kahaani-backend.onrender.com/api/story/postStory
    const handleUpload = async () => {
        let address = 'https://kahaani-backend.onrender.com/api/getHighlights' // address of the server
        let formData = new FormData();
        formData.append('file', audio);
        for (const value of formData.values()) {
            console.log(value);
          }
        const res = await axios.post(address, formData);
        setLoading(false);
        let data = res.data;
        setHighlightText(data);
    }
    // function to upload the story to firebase
    const handleNext = async () => {
        setLoading(true);
        const uploadStory = () => {
            console.log("UWU")
        }
        let address = 'https://kahaani-backend.onrender.com/api/story/postStory'
        let formData = new FormData();
        formData.append('audio', audio);
        formData.append('image', image);
        formData.append('title', title)
        formData.append('text', JSON.stringify(highlightText))
        // console.log(highlightText)
        // const finData = JSON.stringify(highlightText)
        // let config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'title': title,
        //         'text': finData
        //     }
        // }
        // console.log("S")
        await axios.post(address, formData)
            .then(response => {
                console.log(response.data);
                setDone(true)
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleUpload();
    }, [])
    // if the story is uploaded successfully, redirect to the home page, just for aesthetic reasons
    if (done) {
        setTimeout(() => {
            setRedirect(true);
        }, 5000);
        console.log(highlightText)
        return (
            <div className="container mt-5 mb-5">
                <h1 className="text-center">Story Uploaded Successfully!</h1>
                <div style={{ textAlign: 'center' }}>
                    <h2> You will be redirected to the upload page shortly</h2>
                    <Loader
                        type="RevolvingDot"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
                {redirect ? <Redirect to="/" /> : null}
            </div>
        )
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Generating Highlighted Text</h1>
                <Loader
                    type="RevolvingDot"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        )
    }

    return (
        <div className="bottom-container">
            <div className="heading-text mt-5 mb-5">
                <h2>Check Highlighting</h2>
            </div>
            <div className="sst-container">

                <div className="upload-text-box mb-3">
                    <h3>Original Text</h3>

                    <textarea className="upload-text-input"
                        placeholder="Enter text here"
                        rows={10}
                        disabled
                        value={text}
                    >
                    </textarea>

                </div>
                <container id="subtitles" className="upload-text-box-check ml-2 mb-3">
                    <h3>Highlighted Text</h3>
                    {
                        highlightText.length > 0 ?
                            (
                                highlightText.map((item, i) => {
                                    return (
                                        <span id={"c_" + i} key={i} className="urdu-text-check"
                                            contentEditable="true"
                                            suppressContentEditableWarning={true}
                                            onInput={(e) => {
                                                let text = e.target.innerText;
                                                let newHighlightText = highlightText;
                                                newHighlightText[i].text = text;
                                                setHighlightText(newHighlightText);
                                            }}
                                        >
                                            {" " + item.text}
                                        </span>
                                    )
                                })
                            ) : (
                                <textarea className="upload-text-input"
                                    placeholder="Enter textrttt here"
                                    rows={10}
                                    disabled
                                >
                                </textarea>
                            )

                    }
                </container>

            </div >
            <button className="btn btn-primary mb-3 mt-3" onClick={handleNext}>
                Next
            </button>
        </div >
    )
}

export default SST