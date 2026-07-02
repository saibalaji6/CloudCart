import heroImage from "../assets/hero.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div>
          <h1>Welcome to CloudCart</h1>
          <p>Your one-stop online shopping platform</p>

          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>

        <img src={heroImage} alt="CloudCart shopping" />
      </div>
    </div>
  );
}

export default Home;