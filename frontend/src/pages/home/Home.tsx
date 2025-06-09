import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p onClick={() => navigate("/dashboard")}>Go to Dashboard</p>
    </div>
  );
};
export default Home;
