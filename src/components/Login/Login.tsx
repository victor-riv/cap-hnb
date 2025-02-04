import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import { RootState } from "../../store";
import { toast } from "react-toastify";

interface LoginForm {
  email: string;
  password: string;
}

const generateToken = (email: string, password: string): string => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { email, password, iat: Date.now() };
  const encode = (obj: object) => window.btoa(JSON.stringify(obj));
  return `${encode(header)}.${encode(payload)}.dummy-signature`;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!authToken;

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login successful, redirecting to /home...");
      history.replace("/home");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const token = generateToken(formData.email, formData.password);
    const user = { email: formData.email };

    console.log("Logging in:", user);

    dispatch(loginSuccess({ token, user }));

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Logged in successfully!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: ".5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: "100%", padding: ".5rem" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: ".75rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;
