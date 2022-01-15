import React from "react";

const Form1 = () => {
  return (
    <div>
      <h1>Edit User Profile</h1>

      <label for="cars">Enter username: </label>
      <input type="text" id="username" name="username" />
      <div />

      <label for="text">Enter Bio: </label>
      <input type="text" id="bio" name="bio" />
      <div />

      <label for="contact">Enter contact info: </label>

      <input type="text" id="contact" name="contact" />

      <div />

      <button onClick={() => {}}>Submit</button>
    </div>
  );
};

export default Form1;
