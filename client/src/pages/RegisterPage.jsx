import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const initialUserInfo = {
  fullName: "",
  displayName: "",
  username: "",
  email: "",
  password: "",
  repeat_password: "",
};

const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const { fullName, displayName, username, email, password, repeat_password } =
    userInfo;
  const { registerUser, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  // If tokens exist, send a user to home
  useEffect(() => {
    if (authTokens) navigate("/");
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "full_name":
        return setUserInfo((prev) => ({ ...prev, fullName: value }));
      case "display_name":
        return setUserInfo((prev) => ({ ...prev, displayName: value }));
      case "username":
        return setUserInfo((prev) => ({ ...prev, username: value }));
      case "email":
        return setUserInfo((prev) => ({ ...prev, email: value }));
      case "password":
        return setUserInfo((prev) => ({ ...prev, password: value }));
      case "confirm_password":
        return setUserInfo((prev) => ({ ...prev, repeat_password: value }));
      default:
        return "this input name doesn't exist";
    }
  };

  return (
    <div>
      <br />
      <p>Full Name | Display Name </p>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="full_name"
          placeholder="full name"
          value={fullName}
          onChange={onChange}></input>
        <input
          type="text"
          name="display_name"
          placeholder="display name"
          value={displayName}
          onChange={onChange}></input>
        <p> Username | Email</p>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={onChange}></input>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={onChange}></input>
        <p> Password </p>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChange}></input>
        <p> Confirm Password </p>
        <input
          type="password"
          name="confirm_password"
          placeholder="confirm password"
          value={repeat_password}
          onChange={onChange}></input>
        <br />
        <button type="sumbit">Register</button>
      </form>
      <br />
      <button type="button" onClick={() => setUserInfo(initialUserInfo)}>
        Clear
      </button>
    </div>
  );
};

export default RegisterPage;
