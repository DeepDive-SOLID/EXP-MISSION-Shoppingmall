import Header from "../../components/common/Header/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Header />
    </div>
  );
};
export default Dashboard;
