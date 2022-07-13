import Image1 from "./../../assets/img.svg";

import "./account-settings.styles.css";
import axios from "axios";

let defaultForm = new FormData();
const AccSet = () => {
  // const resetFormFields = () => {
  //   setFormFields(defaultForm);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(defaultForm);

    const response = await axios
      .patch(
        `https://study-buddy-app-production.up.railway.app/api/v1/user/edit`,
        defaultForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json());
    console.log(response);

    if (response.success) {
      localStorage.setItem("token", response.token);
      alert("User Updated Sucessfully!");
      // resetFormFields();
    } else {
      alert("User Updation Failed");
    }
  };

  const handleFileChange = (event) => {
    console.log(event);

    const { value } = event.target;

    defaultForm.append("avatar", value);
  };
  const handleBioChange = (event) => {
    const { value } = event.target.files[0];

    defaultForm.append("bio", value);
    console.log(defaultForm);
  };
  const handleNameChange = (event) => {
    const { value } = event.target;

    defaultForm.append("name", value);
    console.log(defaultForm);
  };

  return (
    <form className="form-account" onSubmit={handleSubmit}>
      <div className="heading-primary">Your Account Settings</div>

      <div className="pic-cha">
        <img className="prof-pic" src={Image1} alt="profile pic" />
        <input
          // placeholder="Change Profile Picture"
          type="file"
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
