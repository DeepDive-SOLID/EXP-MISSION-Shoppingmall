import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const Home = () => {
  const navigate = useNavigate();
  const today = formatDate(new Date());

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>오늘 날짜: {today}</p>
      <p
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        Go to Dashboard
      </p>
    </div>
  );
};
export default Home;
