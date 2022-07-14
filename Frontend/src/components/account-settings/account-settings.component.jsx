import Image1 from "./../../assets/img.svg";

import "./account-settings.styles.css";

const AccSet = () => {
  let defaultForm = new FormData();

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (var key of defaultForm.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const response = await fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/user/edit`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: defaultForm,
      }
    );
    console.log(response);

    if (response.status === 200) {
      alert("User Updated Sucessfully!");
    } else {
      alert("User Updation Failed");
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();

    console.log(event.target.files[0].name);

    defaultForm.append("avatar", event.target.files[0].name);
  };
  const handleBioChange = (event) => {
    event.preventDefault();

    console.log("bio", event.target.value);
    defaultForm.append("bio", event.target.value);
  };
  const handleNameChange = (event) => {
    event.preventDefault();

    console.log("name", event.target.value);
    defaultForm.append("name", event.target.value);
  };

  return (
    <form
      className="form-account"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="heading-primary">Your Account Settings</div>

      <div className="pic-cha">
        <img className="prof-pic mar-r" src={Image1} alt="profile pic" />
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
        value={defaultForm.get("name")}
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
