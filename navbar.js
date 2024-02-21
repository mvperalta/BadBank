function NavBar() {
  const [activeLink, setActiveLink] = React.useState("Home");
  const ctx = React.useContext(UserContext);
  
  const mystyle = {
    padding: "10px",
    marginLeft: "10px",
    fontFamily: "Arial"
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const handleButtonClick = () => {
    setActiveLink("Home");
  };

  const handleMouseOver = (e, title) => {
    e.target.title = title;
  };

  const handleMouseOut = (e) => {
    e.target.title = "";
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" 
    style={{ backgroundColor: "blue" }}>
      <a 
        className="nav-link disabled" 
        href="#" 
        tabIndex="-1" 
        aria-disabled="true"
        style={{ color: "black", fontSize: "20px" }}
        >
          <strong>BadBank</strong>
        </a>
      <button 
      className="navbar-toggler" 
      type="button" 
      data-toggle="collapse" 
      data-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a 
            className={`nav-link 
            ${activeLink === "Home" ? "active" : ""}`} 
            onClick={() => handleClick("Home")} 
            href="#" 
            title="Go to the Home page"
            style={activeLink === "Home" ? { color: "blue", fontWeight: "bold" } : {}}>Home</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeLink === "CreateAccount" ? "active" : ""}`} onClick={() => handleClick("CreateAccount")} href="#/createaccount/" 
            title="Click here to create an account with us" 
            style={activeLink === "CreateAccount" ? { color: "blue", fontWeight: "bold" } : {}}>Create Account</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeLink === "Deposit" ? "active" : ""}`} onClick={() => handleClick("Deposit")} href="#/deposit/"
            title="Click here to make a deposit"
            style={activeLink === "Deposit" ? { color: "blue", fontWeight: "bold" } : {}}>Deposit</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeLink === "Withdraw" ? "active" : ""}`} onClick={() => handleClick("Withdraw")} href="#/withdraw/"
            title="Click here to make a withdrawal" 
            style={activeLink === "Withdraw" ? { color: "blue", fontWeight: "bold" } : {}}>Withdraw</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeLink === "AllData" ? "active" : ""}`} onClick={() => handleClick("AllData")} href="#/alldata/"
            title="View user data" 
            style={activeLink === "AllData" ? { color: "blue", fontWeight: "bold" } : {}}>All Data</a>
          </li>
        </ul>
      </div>
    </nav>
    );
  }