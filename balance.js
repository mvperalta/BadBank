const Balance = () => {
    let deposit = 0; // state of this transaction
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
  
    let status = `$ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
    const handleSubmit = () => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      event.preventDefault();
      if (newTotal < 0) {
        alert("Unable To Process Transaction: Insufficient Funds");
        return setTotalState(0);
      }
  
      const handleChange = (event) => {
        console.log(`handleChange ${event.target.value}`);
        deposit = Number(event.target.value);
      };
    };
  
    return (
      <form align="left">
        <p className="status" id="total">
          Account Balance {status}
        </p>
      </form>
    );
  };