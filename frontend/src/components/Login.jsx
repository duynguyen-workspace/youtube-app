import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";
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
                        <input
                            className="form-control"
                            id="pass"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <Link to={"/forget-password"} className="d-block text-primary">
                            Forget Password
                        </Link>
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
                                        console.log(result);

                                        // Set local storage
                                        localStorage.setItem("LOGIN_USER", result.data)

                                        alert("Login successfully");

                                        window.location.reload()
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
                    <div className="">
                        <ReactFacebookLogin
                            appId="1388206275144645"
                            callback={(res) => {
                                let { name, id } = res

                                let info = {
                                    fullName: name,
                                    id
                                }

                                loginFacebookAPI(info).then((result) => {
                                    console.log(result)

                                    // Set local storage
                                    localStorage.setItem("LOGIN_USER", result.data)

                                    alert(result.message)
                                }).catch(err => {
                                    alert(err?.response?.data?.message)
                                })

                                // console.log("response: ", res)

                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
