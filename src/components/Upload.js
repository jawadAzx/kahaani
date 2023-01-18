import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Upload = () => {
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    return (
        <div className="bottom-container">
            <div className="heading-text mt-3">
                <h2>Upload</h2>
            </div>
            <div className="upload-text-box mb-3">
                <input className="upload-text-input" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="upload-text-box">
                <textarea className="upload-text-input"
                    placeholder="Enter text here"
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className="upload-container mt-3">
                <button className=" selectfile-button">
                    <input
                        onChange={changeHandler}
                        type="file"
                        name="file"
                        id="file"
                    />
                </button>
                {isFilePicked && text != "" ? (
                    <Link to={{
                        pathname: "/sst",
                        state: {
                            title: title,
                            text: text,
                            file: selectedFile
                        }
                    }}>
                        < button
                            className="btn btn-primary mt-5 mb-5"
                        >
                            Upload
                        </button>
                    </Link>
                ) : (
                    <p className='change-text'>Select an audio file to upload</p>
                )}
            </div>
        </div >
    )
}

export default Upload