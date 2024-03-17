import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI } from "../utils/fetchFromAPI";

const Login = () => {
    const [channelDetail, setChannelDetail] = useState();
    const [videos, setVideos] = useState(null);

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
                        <input className="form-control" id="pass" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                let info = {
                                    email,
                                    password,
                                };

                                loginAPI(info)
                                    .then((result) => {
                                        // console.log(result);
                                        alert("Login successfully");
                                    })
                                    .catch((err) => {
                                        // console.log(err);
                                        alert(err?.response?.data?.message);
                                    });
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
