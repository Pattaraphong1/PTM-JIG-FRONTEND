import React from "react";
import { useState, useEffect } from "react";
import { detectBrowser, loadTreeview } from './../../Utility';


function Sidebar() {
  // load adminLTE treeview=======
    useEffect(() => { 
        if(detectBrowser() == "Microsoft Edge")
        {
            loadTreeview();
        }
    }, []);

    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);    // show menu if have permission
    const uid = localStorage.getItem('uid');

    //console.log(uid);

  return (
    <>

      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          <img
            src="dist/img/PTMJigLogo2.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          {/* <span className="brand-text font-weight-light">PTM JIG (ASSY)</span> */}
          <span className="brand-text font-weight-light">PTM JIG (ASSY)</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="/" className="nav-link">
                  {/* <i className="nav-icon fas fa-tachometer-alt" /> */}
                  <i className="nav-icon fas fa-tools"></i>
                  <p>
                    Master
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./../MasterEquipment" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Master Equipment</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./../MasterEquipmentType" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Master Equipment Type</p>
                    </a>
                  </li>                 
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
    </>
  );
}


export default Sidebar
