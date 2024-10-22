import React, { useState } from "react";
import style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { setUser, LoginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const res = await dispatch(LoginUser({ email, password }));
    // console.log(res.payload);
    if (res) {
      // const { access, refresh } = res.payload.token;
      // const access_token = "";
      // const refresh_token = "";
      // console.log(access, refresh);
      // const first_name = res.payload.user_data.first_name;
      // const last_name = res.payload.user_data.last_name;
      // const user_name = first_name + " " + last_name;
      // const user_id = res.payload.user_data.id;
      // const profile_picture = res.payload.user_data.profile_picture;

      // dispatch(
      //   setUser({
      //     access_token: access,
      //     refresh_token: refresh,
      //     user_name: user_name,
      //     user_id: user_id,
      //     profile_picture: profile_picture,
      //   })
      // );

      navigate("/");
    }

    // Add logic for handling login or form submission here
    // dispatch(setUser)
  };

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
