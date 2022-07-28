/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import "./account-settings.styles.css";

const AccSet = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  let defaultForm = new FormData();
  const [url, setUrl] = useState();

  useEffect(() => {
    const getProfileDet = async () => {
      const responseGet = await fetch(`${process.env.REACT_APP_URL}/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then(({ data }) => setUrl(data.avatar));
    };
    getProfileDet();
  }, []);

  console.log(url);

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
    });
    console.log(response);

    if (response.status === 200) {
      alert("User Updated Sucessfully!");
    } else {
      alert("User Updation Failed");
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

  return (
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

      <label htmlFor="username">Name</label>
      <input
        placeholder="Name"
        type="text"
        onChange={handleNameChange}
        id="username"
      />

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
  );
};

export default AccSet;
