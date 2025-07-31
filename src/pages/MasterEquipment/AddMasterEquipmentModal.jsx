import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // สำหรับส่ง HTTP Requests

const AddMasterEquipmentModal = ({ show, handleClose, handleSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    equipment_id: '',
    jig_name: '',
    jig_number: '',
    marker: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/api/addMasterEquipment', formData);
      console.log('Server response:', response.data);
      setSuccess(true);
      // รีเซ็ตฟอร์มหลังจากส่งสำเร็จ
      setFormData({
        equipment_id: '',
        jig_name: '',
        jig_number: '',
        marker: '',
      });
      // แจ้ง Component แม่ว่าส่งสำเร็จ เพื่อให้ปิด Modal หรือทำอย่างอื่น
      if (handleSubmitSuccess) {
        handleSubmitSuccess();
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลค่ะ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่ม Master Equipment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEquipmentId">
            <Form.Label>Equipment ID</Form.Label>
            <Form.Control
              type="text"
              name="equipment_id"
              value={formData.equipment_id}
              onChange={handleChange}
              placeholder="กรอก Equipment ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJigName">
            <Form.Label>Jig Name</Form.Label>
            <Form.Control
              type="text"
              name="jig_name"
              value={formData.jig_name}
              onChange={handleChange}
              placeholder="กรอก Jig Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJigNumber">
            <Form.Label>Jig Number</Form.Label>
            <Form.Control
              type="text"
              name="jig_number"
              value={formData.jig_number}
              onChange={handleChange}
              placeholder="กรอก Jig Number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMarker">
            <Form.Label>Marker</Form.Label>
            <Form.Control
              type="text"
              name="marker"
              value={formData.marker}
              onChange={handleChange}
              placeholder="กรอก Marker"
              required
            />
          </Form.Group>

          {error && <p className="text-danger mt-3">{error}</p>}
          {success && <p className="text-success mt-3">บันทึกข้อมูลสำเร็จแล้วค่ะ!</p>}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              ยกเลิก
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'กำลังส่งข้อมูล...' : 'บันทึก'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMasterEquipmentModal;