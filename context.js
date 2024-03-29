const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;

const UserContext = React.createContext(null);

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }
  function cardHeader() {
    const txt = props.headercolor ? props.headercolor : " ";
    return txt;
  }
  function cardHeader2() {
    const bg = props.headerBackground ? props.headerBackground : " ";
    return bg;
  }
  return (
    <div className={classes()} style={{ maxWidth: "25rem", minWidth: "18rem" }}>
      <div
        className="card-header"
        style={{ background: cardHeader2(), color: cardHeader() }}
      >
        {props.header}
      </div>
      <div className="card-body">
        {props.title && (
          <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {props.title}
          </h5>
        )}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <h5 id="createStatus">{props.status}</h5>}
      </div>
    </div>
  );
}

function Table(props) {
  const ctx = React.useContext(UserContext);
  let usersArray = Object.values(ctx.users);

  function classes() {
    const bg = props.tableColor ? " table-" + props.tableColor : " ";
    const striped = props.striped ? " table-" + props.striped : " ";
    return "table" + bg + striped;
  }

  return (
    <div className="table-responsive">
      <table className={classes()}>
        <thead>
          <tr>
            {props.titles.map((item) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {usersArray.map((item) => {
            return (
              <tr key={item.email}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BankForm(props, { chooseShowP }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [deposit, setDeposit] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      console.log("You must fill out your " + label);
      props.chooseStatusP("You must fill out your " + label);
      setTimeout(() => props.chooseStatusP(""), 3000);
      return false;
    }
    return true;
  }

  function validateFormatEmail(fieldEmail) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (fieldEmail.match(validRegex)) {
      console.log("Valid email address!");
      return true;
    } else {
      console.log("Invalid email address!" + fieldEmail);
      props.chooseStatusP("Invalid format of the email.");
      setTimeout(() => props.chooseStatusP(""), 5000);
      return false;
    }
  }

  function validateLengthPwd(fieldPwd) {
    if (fieldPwd.length < 8) {
      console.log("Password length Error: " + fieldPwd);
      props.chooseStatusP("Your passsword must be at least 8 characters.");
      setTimeout(() => props.chooseStatusP(""), 5000);
      return false;
    }
    return true;
  }

  function validateUniqueEmail(fieldEmail) {
    let usersArray = Object.values(ctx.users);
    console.log(usersArray);

    for (let i in usersArray) {
      console.log("------");
      console.log(usersArray[i]["email"]);
      if (fieldEmail === usersArray[i]["email"]) {
        console.log("Coincidence with " + usersArray[i]["email"]);
        props.chooseStatusP("Email already exists.");
        setTimeout(() => props.chooseStatusP(""), 5000);
        return true;
      } else {
        console.log("No match. Email is new.");
      }
    }
  }

  function handleCreate() {
    console.log("You typed: " + name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (validateUniqueEmail(email)) return;
    if (!validateLengthPwd(password)) return;
    if (!validateFormatEmail(email)) return;
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
    props.chooseShowP(false);

    let usersArray = Object.values(ctx.users);
    let current_user = ctx.current_user;
    let lastName = usersArray[usersArray.length - 1]["name"];
    let lastBalance = usersArray[usersArray.length - 1]["balance"];
    let lastEmail = usersArray[usersArray.length - 1]["email"];
    console.log(usersArray[usersArray.length - 1]["email"]);
    current_user.splice(0, 3, lastName, lastBalance, lastEmail);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    props.chooseShowP(true);
  }

  function validateLogin(fieldEmail, fieldPwd) {
    let usersArray = Object.values(ctx.users);
    console.log(usersArray);

    for (let i in usersArray) {
      console.log("------");
      console.log(usersArray[i]["email"]);
      console.log(usersArray[i]["password"]);
      if (
        fieldEmail === usersArray[i]["email"] &&
        fieldPwd === usersArray[i]["password"]
      ) {
        console.log(
          "Coincidence with " +
            usersArray[i]["email"] +
            " and " +
            usersArray[i]["password"]
        );
        props.chooseShowP(false);
        let current_user = ctx.current_user;
        current_user.splice(
          0,
          3,
          usersArray[i]["name"],
          usersArray[i]["balance"],
          usersArray[i]["email"]
        );
        return true;
      } else {
        console.log("No match");
        props.chooseStatusP("No match. Try again.");
        setTimeout(() => props.chooseStatusP(""), 5000);
      }
    }
  }

  function handleLogin() {
    console.log("Login as " + email, password);
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!validateLogin(email, password)) return;
  }

  function updateUsers() {
    let users = ctx.users;
    let current_user = ctx.current_user;
    for (let i in users) {
      console.log(users[i]["email"]);
      if (current_user[2] === users[i]["email"]) {
        users[i]["balance"] = current_user[1];
        console.log("Updated users data");
        return true;
      }
    }
  }

  function validateBeNumber(money) {

    if (isNaN(money) === false) {
      console.log("Money is a number.");
      return true;
    } else {
      console.log("Money is NOT a number! " + money);
      props.chooseStatusP("Must be a number.");
      setTimeout(() => props.chooseStatusP(""), 5000);
      return false;
    }
  }

  function validateNoNegative(money) {
    if (money == 0) {
      console.log("Money is 0!");
      props.chooseStatusP("Must be higher than 0.");
      setTimeout(() => props.chooseStatusP(""), 5000);
      return true;
    } else if (money <= -0.01) {
      console.log("Money is a negative number! " + money);
      props.chooseStatusP("Must be a positive number.");
      setTimeout(() => props.chooseStatusP(""), 5000);
      return true;
    } else {
      console.log("Money is a positive number.");
    }
  }

  function handleDeposit() {
    console.log("You typed " + deposit);
    if (!validate(deposit, "deposit")) return;
    if (!validateBeNumber(deposit)) return;
    if (validateNoNegative(deposit)) return;
    let current_user = ctx.current_user;
    let newDeposit = current_user[1] + parseFloat(deposit);
    newDeposit = parseFloat(newDeposit.toFixed(2));
    current_user.splice(1, 1, newDeposit);
    console.log(current_user);
    updateUsers();
    props.chooseShowP(false);
  }

  function validateNoExceedLimit(money) {
    let current_user = ctx.current_user;
    let actualBalance = current_user[1];

    if (
      parseFloat(money) < actualBalance ||
      parseFloat(money) === actualBalance
    ) {
      console.log("Money is NOT higher than balance.");
      return true;
    } else {
      console.log("Money is higher than balance! " + money);
      props.chooseStatusP(`Must be less than or equal to $${actualBalance}`);
      setTimeout(() => props.chooseStatusP(""), 6000);
      return false;
    }
  }

  function handleWithdraw() {
    console.log("You typed " + withdraw);
    if (!validate(withdraw, "withdraw")) return;
    if (!validateBeNumber(withdraw)) return;
    if (validateNoNegative(withdraw)) return;
    if (!validateNoExceedLimit(withdraw)) return;
    let current_user = ctx.current_user;
    let newWithdraw = current_user[1] - parseFloat(withdraw);
    newWithdraw = parseFloat(newWithdraw.toFixed(2));
    current_user.splice(1, 1, newWithdraw);
    console.log(current_user);
    updateUsers();
    props.chooseShowP(false);
  }

  function clearFormD() {
    setDeposit("");
    setShow(true);
    props.chooseShowP(true);
  }

  function clearFormW() {
    setWithdraw("");
    setShow(true);
    props.chooseShowP(true);
  }

  return (
    <>
      {props.statusP && (
        <h5 id="createStatus" className="text-danger">
          <strong>{props.statusP}</strong>
        </h5>
      )}
      {props.name && (
        <>
          <label htmlFor={props.name}>Name</label>
          <input
            type="input"
            className="form-control"
            id={props.name}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.email && (
        <>
          <label htmlFor={props.email}>Email</label>
          <input
            type="email"
            className="form-control"
            id={props.email}
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.password && (
        <>
          <label htmlFor={props.password}>Password</label>
          <input
            type="password"
            className="form-control"
            id={props.password}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
        </>
      )}

      {props.message && (
        <>
          <h5>
            <strong>{props.message}</strong>
          </h5>
          <br />
        </>
      )}

      {props.balance && (
        <>
          <p>
            Balance <strong>{props.balance}</strong>
          </p>
        </>
      )}
      {props.deposit && (
        <>
          <label htmlFor={props.deposit}>Deposit Amount</label>
          <input
            type="input"
            className="form-control"
            id={props.deposit}
            placeholder="Deposit Amount"
            value={deposit}
            onChange={(e) => setDeposit(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.withdraw && (
        <>
          <label htmlFor={props.withdraw}>Withdraw Amount</label>
          <input
            type="input"
            className="form-control"
            id={props.withdraw}
            placeholder="Withdraw Amount"
            value={withdraw}
            onChange={(e) => setWithdraw(e.currentTarget.value)}
          />
          <br />
        </>
      )}

      {props.buttonCreate && (
        <>
          <button
            type="submit"
            disabled={!name && !email && !password}
            className="btn btn-secondary"
            onClick={handleCreate}
          >
            {props.buttonCreate}
          </button>
        </>
      )}

      {props.buttonAdd && (
        <>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={clearForm}
          >
            {props.buttonAdd}
          </button>
        </>
      )}

      {props.buttonLogin && (
        <>
          <button
            type="submit"
            disabled={!email && !password}
            className="btn btn-secondary"
            onClick={handleLogin}
          >
            {props.buttonLogin}
          </button>
        </>
      )}
     
      {props.buttonDeposit && (
        <>
          <button
            type="submit"
            disabled={!deposit}
            className="btn btn-secondary"
            onClick={handleDeposit}
          >
            {props.buttonDeposit}
          </button>
        </>
      )}

      {props.buttonAddD && (
        <>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={clearFormD}
          >
            {props.buttonAddD}
          </button>
        </>
      )}

      {props.buttonAddW && (
        <>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={clearFormW}
          >
            {props.buttonAddW}
          </button>
        </>
      )}

      {props.buttonWithdraw && (
        <>
          <button
            type="submit"
            disabled={!withdraw}
            className="btn btn-secondary"
            onClick={handleWithdraw}
          >
            {props.buttonWithdraw}
          </button>
        </>
      )}
    </>
  );
}