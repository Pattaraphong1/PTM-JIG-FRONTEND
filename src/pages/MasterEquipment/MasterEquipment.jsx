import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios"; // Import axios
import styles from "../MasterEquipment/MasterEquipment.module.css";
import { Form, Row, Col, Modal, Container, Button } from "react-bootstrap";

import DataTable_Exam from "../MasterEquipment/DataTable_Exam";
import EquipmentList from "../MasterEquipment/EquipmentList";

function MasterEquipment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    //  console.log("Code :", code.value);
    //  console.log("Calibration Control :", calibration_control.value);

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

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchEquipmentTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/allMasterEquipmentType"
        );
        const formattedOptions = response.data.map((item) => ({
          value: item.type_id, // Or whatever your API uses for the value
          label: item.type_name, // Or whatever your API uses for the display name
        }));
        setSectionOptionsType(formattedOptions);
        //console.log(formattedOptions);
      } catch (error) {
        console.error("Error fetching equipment types:", error);
        // Swal.fire({
        //   title: "Error",
        //   text: "Failed to load equipment types.",
        //   icon: "error",
        //   confirmButtonText: "Ok",
        // });
      }
    };

    fetchEquipmentTypes();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // State to store API fetched type options
  const [sectionOptionsType, setSectionOptionsType] = useState([]);
  const [selectedType, setSelectedType] = useState(null); // เก็บค่าที่เลือกจาก react-select

  const respondOptions = [
    { value: "respond_assy", label: "ASSY" },
    { value: "respond_smt", label: "SMT" },
    { value: "respond_qa", label: "QA" },
  ];
  const [selectedRespond, setSelectedRespond] = useState(null); // เก็บค่าที่เลือกจาก react-select

  const sectionOptions = [
    { value: "section_prod2", label: "Production 2" },
    { value: "section_prod3", label: "Production 3" },
    { value: "section_prod5", label: "Production 5" },
    { value: "section_me", label: "ME" },
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

  //----------------------------Calibration Control-------------------
  // State สำหรับเก็บค่าของ Calibration Control (YES/NO)
  const [calibrationControl, setCalibrationControl] = useState("NO");

  // State สำหรับเก็บค่าของ Entry Date
  const [entryDate, setEntryDate] = useState("");

  // State สำหรับเก็บค่าของ Issue Date
  const [issueDate, setIssueDate] = useState("");

  // State สำหรับควบคุมว่าช่อง Entry Date ควรถูก Disabled หรือไม่
  const [entryDateDisabled, setEntryDateDisabled] = useState(false);

  // State สำหรับควบคุมว่าช่อง Issue Date ควรถูก Disabled หรือไม่
  const [issueDateDisabled, setIssueDateDisabled] = useState(false);

  // ฟังก์ชันช่วยจัดรูปแบบวันที่เป็น mm/dd/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // useEffect Hook จะทำงานเมื่อ calibrationControl มีการเปลี่ยนแปลง
  useEffect(() => {
    if (calibrationControl === "NO") {
      // เมื่อเลือก "NO"
      setEntryDate("-"); // กำหนดค่าเป็น "-"
      setIssueDate("-"); // กำหนดค่าเป็น "-"
      setEntryDateDisabled(true); // Disable ช่อง Entry Date
      setIssueDateDisabled(true); // Disable ช่อง Issue Date
    } else {
      // เมื่อเลือก "YES"
      const currentDate = new Date();
      setEntryDate(formatDate(currentDate)); // กำหนดเป็นวันที่ปัจจุบัน

      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + 365); // เพิ่ม 30 วัน
      setIssueDate(formatDate(futureDate)); // กำหนดเป็นวันที่ปัจจุบัน + 30 วัน

      setEntryDateDisabled(false); // Enable ช่อง Entry Date
      setIssueDateDisabled(false); // Enable ช่อง Issue Date
    }
  }, [calibrationControl]); // Dependency array: ให้ Effect นี้ทำงานเมื่อ calibrationControl เปลี่ยนแปลง

  // Handler สำหรับการเปลี่ยนแปลงค่าใน dropdown ของ Calibration Control
  const handleCalibrationControlChange = (e) => {
    setCalibrationControl(e.target.value);
  };

  // Handler สำหรับการเปลี่ยนแปลงค่าในช่อง Entry Date (ถ้าไม่ถูก Disabled)
  const handleEntryDateChange = (e) => {
    setEntryDate(e.target.value);
  };

  // Handler สำหรับการเปลี่ยนแปลงค่าในช่อง Issue Date (ถ้าไม่ถูก Disabled)
  const handleIssueDateChange = (e) => {
    setIssueDate(e.target.value);
  };
  //----------------------------End Calibration control---------------

  return (
    <>
      <div className="content">
        <div className="wrapper">
          <Navbar />
          <Sidebar />
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col ml-1">
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
                {/* <Button variant="primary" onClick={addEquipment}>ADD Equipment</Button> */}
                <Button variant="primary" size="lg" onClick={handleShow}>
                  Add Master Equipment
                </Button>
              </div>

              <div className="mt-5 p-1">
                {/* <DataTable_Exam /> */}
                <EquipmentList />
                {/* <AddMasterEquipmentModal/> */}
              </div>

              {/*/. container-fluid */}
            </section>
            {/* /.content */}
          </div>
          {/* /.content-wrapper */}

          {/* Modal */}
          <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>Input Details Equipment</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Code <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Code" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Control No
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control type="text" placeholder="Enter Control No" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Jig Name <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Jig Name" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Application Model
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control
                      type="text"
                      placeholder="Enter Application Model"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Jig Number
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Jig Number" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Entry Date <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control
                      type="date"
                      placeholder="Enter Entry Date"
                      // defaultValue={formattedDate}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Marker
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Marker" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Issue Date <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control type="date" placeholder="Enter Issue Date" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Suffix No
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Suffix No" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Calibration Control{" "}
                      <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    {/* <Form.Control type="text" placeholder="Enter Calibration Control" /> */}
                    <Form.Group controlId="formLocation">
                      {/* <Form.Label>Section</Form.Label> */}
                      <Form.Select
                        value={calibrationControl}
                        onChange={handleCalibrationControlChange}
                        id="calibration_control"
                      >
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Serial No
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Serial No" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Calibration Date <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control
                      // type="date"
                      // placeholder="Enter Calibration Date"
                      type="text" // ใช้ type="text" เพื่อให้สามารถแสดง "-" ได้
                      placeholder="mm/dd/yyyy"
                      value={entryDate}
                      onChange={handleEntryDateChange}
                      disabled={entryDateDisabled} // ควบคุม disabled
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Asset No
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    <Form.Control type="text" placeholder="Enter Asset No" />
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Next Calibration Date{" "}
                      <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control
                      // type="date"
                      // placeholder="Enter Calibration Date"
                      type="text" // ใช้ type="text" เพื่อให้สามารถแสดง "-" ได้
                      placeholder="mm/dd/yyyy"
                      value={issueDate}
                      onChange={handleIssueDateChange}
                      disabled={issueDateDisabled} // ควบคุม disabled
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Type <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    {/* <Form.Control type="text" placeholder="Enter Type" /> */}
                    <Form.Group className="mb-3" controlId="formLocation">
                      {/* <Form.Label>Section</Form.Label> */}
                      <Select
                        options={sectionOptionsType} // Use the state variable for options
                        value={selectedType} // ค่าที่เลือกในปัจจุบัน
                        onChange={setSelectedType} // เมื่อมีการเลือกตัวเลือก
                        placeholder="Select a Type..." // ข้อความ Placeholder
                        isClearable // อนุญาตให้ล้างค่าที่เลือกได้
                        isSearchable // อนุญาตให้ค้นหาได้
                        // Styles เพื่อให้เข้ากับ Bootstrap ได้ดีขึ้น
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#80bdff"
                              : baseStyles.borderColor, // Border color เมื่อ focus
                            boxShadow: state.isFocused
                              ? "0 0 0 0.25rem rgba(0, 123, 255, 0.25)"
                              : "none", // Shadow เมื่อ focus
                            "&:hover": {
                              borderColor: "#80bdff", // Border color on hover
                            },
                          }),
                          menu: (baseStyles, state) => ({
                            ...baseStyles,
                            zIndex: 9999, // ตรวจสอบให้แน่ใจว่า dropdown ไม่ถูกซ่อน
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Shelf
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control type="text" placeholder="Enter Shelf" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Photo
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    {/* <Form.Control type="file" placeholder="Enter Photo" /> */}
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="exampleInputFile"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="exampleInputFile"
                      >
                        Choose file
                      </label>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Floor
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control type="text" placeholder="Enter Floor" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Respond <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    {/* <Form.Control type="text" placeholder="Enter Respond" /> */}
                    <Form.Group controlId="formRespond">
                      {/* <Form.Label>Section</Form.Label> */}
                      <Select
                        options={respondOptions} // ตัวเลือกต่างๆ
                        value={selectedRespond} // ค่าที่เลือกในปัจจุบัน
                        onChange={setSelectedRespond} // เมื่อมีการเลือกตัวเลือก
                        placeholder="Select a Respond..." // ข้อความ Placeholder
                        isClearable // อนุญาตให้ล้างค่าที่เลือกได้
                        isSearchable // อนุญาตให้ค้นหาได้
                        // Styles เพื่อให้เข้ากับ Bootstrap ได้ดีขึ้น
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#80bdff"
                              : baseStyles.borderColor, // Border color เมื่อ focus
                            boxShadow: state.isFocused
                              ? "0 0 0 0.25rem rgba(0, 123, 255, 0.25)"
                              : "none", // Shadow เมื่อ focus
                            "&:hover": {
                              borderColor: "#80bdff", // Border color on hover
                            },
                          }),
                          menu: (baseStyles, state) => ({
                            ...baseStyles,
                            zIndex: 9999, // ตรวจสอบให้แน่ใจว่า dropdown ไม่ถูกซ่อน
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Location
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    {/* <Form.Control type="text" placeholder="Enter Location" /> */}
                    <Form.Group controlId="formLocation">
                      {/* <Form.Label>Section</Form.Label> */}
                      <Select
                        options={sectionLocation} // ตัวเลือกต่างๆ
                        value={selectedLocation} // ค่าที่เลือกในปัจจุบัน
                        onChange={setSelectedLocation} // เมื่อมีการเลือกตัวเลือก
                        placeholder="Select a Location..." // ข้อความ Placeholder
                        isClearable // อนุญาตให้ล้างค่าที่เลือกได้
                        isSearchable // อนุญาตให้ค้นหาได้
                        // Styles เพื่อให้เข้ากับ Bootstrap ได้ดีขึ้น
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#80bdff"
                              : baseStyles.borderColor, // Border color เมื่อ focus
                            boxShadow: state.isFocused
                              ? "0 0 0 0.25rem rgba(0, 123, 255, 0.25)"
                              : "none", // Shadow เมื่อ focus
                            "&:hover": {
                              borderColor: "#80bdff", // Border color on hover
                            },
                          }),
                          menu: (baseStyles, state) => ({
                            ...baseStyles,
                            zIndex: 9999, // ตรวจสอบให้แน่ใจว่า dropdown ไม่ถูกซ่อน
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={2}>
                    {/* Column 1: Label "Code" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Section <span style={{ color: "red" }}>**</span>
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 2: Input for Code */}
                    {/* <Form.Control type="text" placeholder="Enter Respond" /> */}
                    <Form.Group controlId="formRespond">
                      {/* <Form.Label>Section</Form.Label> */}
                      <Select
                        options={sectionOptions} // ตัวเลือกต่างๆ
                        value={selectedSection} // ค่าที่เลือกในปัจจุบัน
                        onChange={setSelectedSection} // เมื่อมีการเลือกตัวเลือก
                        placeholder="Select a Section..." // ข้อความ Placeholder
                        isClearable // อนุญาตให้ล้างค่าที่เลือกได้
                        isSearchable // อนุญาตให้ค้นหาได้
                        // Styles เพื่อให้เข้ากับ Bootstrap ได้ดีขึ้น
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#80bdff"
                              : baseStyles.borderColor, // Border color เมื่อ focus
                            boxShadow: state.isFocused
                              ? "0 0 0 0.25rem rgba(0, 123, 255, 0.25)"
                              : "none", // Shadow เมื่อ focus
                            "&:hover": {
                              borderColor: "#80bdff", // Border color on hover
                            },
                          }),
                          menu: (baseStyles, state) => ({
                            ...baseStyles,
                            zIndex: 9999, // ตรวจสอบให้แน่ใจว่า dropdown ไม่ถูกซ่อน
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={2}>
                    {/* Column 3: Label "Control No" */}
                    <Form.Label className="col-form-label text-md-end text-start">
                      Remark
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    {/* Column 4: Input for Control No */}
                    <Form.Control type="text" placeholder="Enter Remark" />
                  </Col>
                </Row>

                {/* You can add more form rows here if needed */}

                <Modal.Footer className="d-flex justify-content-center">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
          {/* Close Modal */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MasterEquipment;
