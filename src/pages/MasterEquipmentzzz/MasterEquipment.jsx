import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import Select from "react-select";

import styles from "../MasterEquipment/MasterEquipment.module.css";

//import { Form, Row, Col, Modal, Container, Button } from "react-bootstrap";

function MasterEquipment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // console.log("Code :", code.value);

    console.log("Form submitted!");
    //addEquipment();
    handleClose();
  };

  const addEquipment = () => {
    console.log("Add master Equipment");

    Swal.fire({
      title: "Add Master Equipment Success",
      text: "Exam",
      icon: "success",
      confirmButtonText: "Add",
    });
  };

  const sectionOptionsType = [
    { value: "type_jig_assy", label: "Jig Assy" },
    { value: "type_jig_inspection", label: "Jig Inspection" },
    { value: "type_equipment", label: "Equipment" },
    { value: "type_machine", label: "Machine" },
    { value: "type_tool", label: "Tool" },
    { value: "type_unit_master_sample", label: "Unit Master Sample" },
    { value: "type_map_master_software", label: "Map Master Software" },
    { value: "type_circuit_for_ict", label: "Circuit (For ICT)" },
    { value: "type_general", label: "General" },
    { value: "type_diptray", label: "DIP Tray" },
    { value: "type_software", label: "Software" },
    { value: "type_testdisc", label: "Test DISC" },
    { value: "type_connector", label: "Connector" },
    { value: "type_modify", label: "Modify" },
  ];
  const [selectedType, setSelectedType] = useState(null); // เก็บค่าที่เลือกจาก react-select

  const sectionOptions = [
    { value: "respond_assy", label: "ASSY" },
    { value: "respond_smt", label: "SMT" },
    { value: "respond_qa", label: "QA" },
  ];
  const [selectedSection, setSelectedSection] = useState(null); // เก็บค่าที่เลือกจาก react-select

  const sectionLocation = [
    { value: "location_jigfac1", label: "Jig Room FAC1" },
    { value: "location_jigfac2", label: "Jig Room FAC2" },
    { value: "location_spareroom", label: "Spare Room" },
  ];
  const [selectedLocation, setSelectedLocation] = useState(null); // เก็บค่าที่เลือกจาก react-select

  const [selectedCalibrationControl, setSelectedCalibrationControl] =
    useState(null); // เก็บค่าที่เลือกจาก react-select

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Gets YYYY-MM-DD

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Content */}
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col">
                <h1>Master Equipment</h1>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid"></div>
          <div className={styles.add_masterEquipt_button}>
            <button className="btn btn-primary" onClick={handleShow}>
              Add Master Equipment
            </button>
          </div>

          <div className={`modal fade ${show ? "show d-block" : ""}`} id="modal-xl">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Extra Large Modal</h4>
                  <button
                    type="button"
                    className="close"                   
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>One fine body…</p>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"                  
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
              {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
          </div>
          {/* /.modal */}

          {/*/. container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
      {/* End Content */}

      {/* Modal */}

      <Footer />
    </>
  );
}

export default MasterEquipment;
