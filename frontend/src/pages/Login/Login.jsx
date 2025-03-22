import "./Login.css";
import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import Swal from 'sweetalert2'


function Login({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const name = method === "login";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch  {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="all">
        <div class="container" id="container">
          <div class="form-container sign-up"></div>
          <div class="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Log In</h1>
              <span>use your username password</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div class="toggle-container">
            <div class="toggle">
              <div class="toggle-panel toggle-right">
                <h1>Dear Carrier</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
