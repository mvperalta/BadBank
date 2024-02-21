function Deposit() {
    const ctx = React.useContext(UserContext);
    let current_user = ctx.current_user;
  
    const [showP, setShowP] = React.useState(true);
    const [statusP, setStatusP] = React.useState("");
  
    const chooseShowP = (showP) => {
      setShowP(showP);
    };
    const chooseStatusP = (statusP) => {
      setStatusP(statusP);
    };
  
    return (
      <div className="container-big">
        <div className="container-left">
          <div className="row subcontainer" id="subcontainer03">
            <div className="col col-8 col-sm-7 col-md-6 col-lg-7 col-xl-6 my-auto mx-auto">
              <Card
                bgcolor="light"
                txtcolor="black"
                header="Deposit Funds"
                headercolor="#ffa07a"
                headerBackground="gray"
                body={
                  showP ? (
                    <BankForm
                      chooseStatusP={chooseStatusP}
                      statusP={statusP}
                      balance={`$ ${current_user[1]}`}
                      deposit="deposit"
                      buttonDeposit="Deposit"
                      chooseShowP={chooseShowP}
                    />
                  ) : (
                    <BankForm
                      message="Deposit Successful!"
                      buttonAddD="I would like to make another deposit"
                      chooseShowP={chooseShowP}
                    />
                  )
                }
              ></Card>
            </div>
          </div>
        </div>
        <div className="container-right" id="container-right03"></div>
      </div>
    );
  }