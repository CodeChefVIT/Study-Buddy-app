/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import React from "react";

import "./account-settings.styles.css";
import ErrorModal from "../error/error.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AccSet = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  let defaultForm = new FormData();
  const [url, setUrl] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileDet = async () => {
      const responseGet = await fetch(`${process.env.REACT_APP_URL}/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then(({ data }) => {
          setUrl(data.avatar);
          setName(data.name);
        });
      setLoading(false);
    };
    getProfileDet();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    defaultForm.append("name", name);
    defaultForm.append("bio", bio);

    for (var key of defaultForm.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const response = await fetch(`${process.env.REACT_APP_URL}/user/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: defaultForm,
    }).then(setLoading(false));
    console.log(response);

    if (response.status === 200) {
      setError({
        message: "Profile Updated Successfully",
      });
    } else {
      setError({
        message: "Profile Updation Failed. Please Try Again",
      });
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    defaultForm.append("avatar", event.target.files[0]);
  };
  const handleBioChange = (event) => {
    event.preventDefault();
    setBio(event.target.value);
  };
  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            paddingBottom: "40vh",
            justifyContent: "center",
            paddingTop: "20vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          {error && (
            <ErrorModal message={error.message} onConfirm={errorHandler} />
          )}
          <form
            className="form-account"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="heading-primary">Your Account Settings</div>

            <div className="pic-cha">
              <img className="prof-pic-up mar-r" src={url} alt="profile pic" />
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                id="avatar"
              />
            </div>

            <div className="heading-secondary-sm-2 mar-t">{name}</div>

            <label htmlFor="bio">Bio</label>
            <input
              placeholder="Bio"
              type="text"
              onChange={handleBioChange}
              id="bio"
            />

            <button to="/" className="button mar-t">
              Save Changes
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default AccSet;
