function Spa() {
    return (
      <HashRouter>
        <div>
          <NavBar />
          <UserContext.Provider
            value={{
              users: [
                {
                  name: "Megan",
                  email: "megan@mit.edu",
                  password: "secret",
                  balance: 100,
                },
              ],
              current_user: ["Guest", 0, "email"],
            }}
          >
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }

ReactDOM.createRoot(document.getElementById('root')).render(<Spa />)