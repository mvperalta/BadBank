function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <>
    <h3>All Data in Store</h3>
    <div class="card">
      <div class="card-body">
      <Table
        tableColor="transparent" 
        striped="striped"
        responsive="responsive"
        titles={["Name", "Email", "Password", "Balance"]}
      />
      </div>
    </div>
    </>
  );
}