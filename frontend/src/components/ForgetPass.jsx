import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkCodeAPI, checkEmailAPI } from "../utils/fetchFromAPI";

const ForgetPass = () => {
    const [tour, setTour] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const { id } = useParams();

    useEffect(() => {}, []);

    return (
        <div className="p-5 " style={{ minHeight: "100vh" }}>
            <div className="d-flex flex-column justify-content-start align-items-center">
                <form className="row g-3 text-white">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail" className="form-label">
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();

                                let model = {
                                    email,
                                };

                                checkEmailAPI(model)
                                    .then((result) => {
                                        alert(result?.message);
                                        setTour(1);
                                    })
                                    .catch((err) =>
                                        alert(err?.response?.data?.message)
                                    );
                            }}
                        >
                            Send Verification Code
                        </button>
                    </div>

                    {tour >= 1 && (
                        <div className="col-md-12">
                            <div className="">
                                <label htmlFor="code" className="form-label">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    id="code"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            <div className="">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let model = {
                                            code,
                                        };

                                        checkCodeAPI(model)
                                            .then((result) => {
                                                alert(result.message);
                                                setTour(2);
                                            })
                                            .catch((err) =>
                                                alert(err?.response?.data?.message)
                                            );
                                    }}
                                >
                                    Verify Code
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {tour >= 2 && (
                    <form className="row g-3 text-white">
                        <div className="col-md-12">
                            <label htmlFor="newPassword" className="form-label">
                                New Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newPassword"
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>

                        <div className="col-12">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                Set Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgetPass;
