import "./Sidebar.css";
function Sidenavbar({selecttab, setselectab}){
    const handleonclick=(tabname)=>{
      setselectab(tabname);
    }
    
    return (
        <>
           <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={{width: "280px"}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none  ">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">e-visitor Pass</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" onClick={()=>{
        console.log("Applied Pass");
        handleonclick("Applied Pass")}}>
        <a href="#" class={`nav-link text-white ${selecttab === 'Applied Pass' && 'active'}`} aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Applied Pass
        </a>
      </li>
      <li onClick={()=>{handleonclick("Apply Pass")}}>
        <a href="#" class={`nav-link text-white ${selecttab === 'Apply Pass' && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
         Apply Pass
        </a>
      </li>
      <li onClick={()=>{handleonclick("Print Visitor Pass")}}>
        <a href="#"  class={`nav-link text-white ${selecttab === 'Print Visitor Pass' && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
          Print Visitor Pass
        </a>
      </li>
      <li onClick={()=>{handleonclick("My Profile")}}>
        <a href="#"  class={`nav-link text-white ${selecttab === 'My Profile' && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
         My Profile
         </a>
     </li>
      
      <li onClick={()=>{handleonclick("Contact Us")}}>
        <a href="#"  class={`nav-link text-white ${selecttab === 'Contact Us' && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
          Contact Us
        </a>
      </li>
    </ul>
    <hr/>
    <div class="dropdown copyright">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <strong > CopyRights @ 2017 Tata Steel Ltd.</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"/></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
    </div>
        </>
    );
}
export default Sidenavbar;