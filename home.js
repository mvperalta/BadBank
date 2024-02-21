function Home() {
    const ctx = React.useContext(UserContext);
    let current_user = ctx.current_user;
    return (
      <div className="container text-center">
        <div className="col col-10 col-sm-9 col-md-8 col-lg-9 col-xl-8 my-auto mx-auto">
          <Card
            title={`Welcome to Bad Bank!`}
            text="Create an account today and start saving!"
            txtcolor="black"
            body={
              (<img
                src="bank.png"
                className="img-fluid"
                alt="Responsive image" />)
            }
          />
        </div>
      </div>
    );
  }