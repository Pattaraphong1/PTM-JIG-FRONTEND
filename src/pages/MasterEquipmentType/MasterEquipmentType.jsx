import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

import { useState, useEffect } from "react";

import styles from "../MasterEquipmentType/MasterEquipmentType.module.css";
// import { Form, Row, Col, Modal, Container, Button } from "react-bootstrap"; // บรรทัดนี้ไม่จำเป็นต้องใช้ Modal, Form, Row, Col, Container, Button จาก react-bootstrap ถ้าใช้ Modal ของ Bootstrap ธรรมดา

// Import Components จาก react-bootstrap ที่จำเป็นต้องใช้
import { Form, Row, Col, Modal, Button } from "react-bootstrap";

function MasterEquipmentType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State สำหรับเก็บค่า Equipment Type Name
  const [equipmentTypeName, setEquipmentTypeName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด submit

    // ตรวจสอบว่า Equipment Type Name ไม่ว่างเปล่า
    if (equipmentTypeName.trim() === "") {
      alert("กรุณาป้อนข้อมูล Equipment Type Name ด้วยค่ะ");
      return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    }

    // Handle form submission logic here
    console.log("Form submitted!");
    console.log("Equipment Type Name:", equipmentTypeName);

    // หลังจาก submit สำเร็จ คุณอาจจะต้องการล้างค่าใน input และปิด Modal
    setEquipmentTypeName(""); // ล้างค่า input
    handleClose(); // ปิด Modal
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Content */}
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Master Equipment Type</h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid"></div>

          <div className={styles.add_masterEquiptType_button}>
            {/* ปุ่ม Add Master Equipment Type - ใช้ react-bootstrap Button */}
            <Button
              variant="info" // กำหนดสีปุ่มตาม Bootstrap (สีฟ้า)
              onClick={handleShow} // เมื่อคลิก ให้เรียก handleShow เพื่อเปิด Modal
            >
              Add Master Equipment Type
            </Button>
          </div>

          {/* Modal - ใช้ React-Bootstrap Modal */}
          <Modal show={show} onHide={handleClose} size="" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>Input Equipment Type</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="equipmentTypeNameInput">
                  <Form.Label column sm="4" className="text-md-end text-start">
                    Equipment Type :<span className="text-danger">**</span>
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Enter Equipment Type Name"
                      value={equipmentTypeName}
                      onChange={(e) => setEquipmentTypeName(e.target.value)}
                      required // เพิ่ม required เพื่อให้ต้องมีการกรอกข้อมูล
                    />
                  </Col>
                </Form.Group>

                <Modal.Footer className="d-flex justify-content-center">
                  <Button variant="secondary" onClick={handleClose} className="me-2">
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          {/*/. container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      <Footer />
    </>
  );
}

export default MasterEquipmentType;