/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLocation } from "react";
import React from "react";

import ErrorModal from "../error/error.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GrpSet = (props) => {
  const [name, setName] = useState("");
  let defaultForm = new FormData();
  const [url, setUrl] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  console.log(props.path);
  const grpId = props.path.split("/")[2];
  console.log(grpId);

  useEffect(() => {
    const getProfileDet = async () => {
      const responseGet = await fetch(
        `${process.env.REACT_APP_URL}/groups/${grpId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then(({ group }) => {
          setUrl(group.image);
          setName(group.name);
        });
      setLoading(false);
    };
    getProfileDet();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (var key of defaultForm.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const response = await fetch(
      `${process.env.REACT_APP_URL}/groups/${grpId}/picture`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: defaultForm,
      }
    ).then(setLoading(false));
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
    defaultForm.append("picture", event.target.files[0]);
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
            <div className="heading-primary">Group Settings</div>

            <div className="pic-cha">
              <img className="prof-pic-up mar-r" src={url} alt="grp pic" />
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                id="picture"
              />
            </div>

            <div className="heading-secondary-sm-2 mar-t">{name}</div>

            <button to="/" className="button mar-t">
              Save Changes
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default GrpSet;
