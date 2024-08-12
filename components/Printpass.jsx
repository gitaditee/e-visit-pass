function Printpass(){
    return (
        <>
            <h1 style={{color:"white"}}>Gate Pass Print</h1>
            <div class="row">
  <div class="col">
  <label for="formGroupExampleInput" class="form-label">Gate Pass Number</label>
    <input type="text" class="form-control"  aria-label="First name"/>
  </div>
  <div class="col">
  <label for="formGroupExampleInput" class="form-label">Entry date</label>
    <input type="text" class="form-control"  aria-label="Last name"/>
  </div>
</div>
        </>

    );
}
 export default Printpass;