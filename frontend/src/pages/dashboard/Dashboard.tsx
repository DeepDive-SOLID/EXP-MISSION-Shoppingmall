import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p onClick={() => navigate("/")}>Go to Home</p>
    </div>
  );
};
export default Dashboard;
