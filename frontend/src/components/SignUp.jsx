import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerAPI } from "../utils/fetchFromAPI";

const SignUp = () => {
    const [channelDetail, setChannelDetail] = useState();
    const [videos, setVideos] = useState(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { id } = useParams();

    useEffect(() => {}, []);

    return (
        <div className="p-5 " style={{ minHeight: "100vh" }}>
            <div className=" d-flex justify-content-center">
                <form className="row g-3 text-white">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Full name
                        </label>
                        <input
                            className="form-control"
                            id="fullName"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Password
                        </label>
                        <input
                            className="form-control"
                            id="pass"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                            //     let full_name =
                            //         document.querySelector("#fullName").value;
                            //     let email =
                            //         document.querySelector("#email").value;
                            //     let pass_word =
                            //         document.querySelector("#pass").value;

                                let info = {
                                    fullName,
                                    email,
                                    password,
                                };

                                registerAPI(info)
                                    .then((result) => {
                                        console.log(result);
                                        alert("Register successfully");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        alert(err?.response?.data?.message);
                                    });
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
