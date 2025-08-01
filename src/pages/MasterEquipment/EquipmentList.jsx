import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import Swal from "sweetalert2";

import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { addThaiFont } from "./../../../public/fonts/THSarabunNew";

export default function ProductsDemo() {
  const toast = useRef(null);
  const dt = useRef(null);

  // 1. กำหนด state สำหรับเก็บข้อมูลที่จะแสดงใน DataTable
  const [equipment, setEquipment] = useState([]); // เปลี่ยนชื่อ state ให้สื่อความหมายมากขึ้น
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับการโหลดข้อมูล
  const [globalFilterValue, setGlobalFilterValue] = useState(""); // สำหรับการค้นหา
  const [showLoadingDialog, setShowLoadingDialog] = useState(false); // เพิ่ม state ใหม่

  // 2. ใช้ useEffect เพื่อดึงข้อมูลจาก API
  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        setLoading(true); // ตั้งค่า loading เป็น true ก่อนเริ่มดึงข้อมูล
        const response = await axios.get(
          "http://localhost:3000/api/allMasterEquipment"
        );
        // ข้อมูลที่ได้จาก API จะอยู่ใน response.data
        setEquipment(response.data); // นำข้อมูลทั้งหมดที่ได้ไปเก็บใน state 'equipment'
        //console.log("Data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "ไม่สามารถโหลดข้อมูล Master Equipment ได้",
          life: 3000,
        });
      } finally {
        setLoading(false); // ตั้งค่า loading เป็น false เมื่อดึงข้อมูลเสร็จสิ้น (ไม่ว่าจะสำเร็จหรือล้มเหลว)
      }
    };

    fetchEquipmentData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // const leftToolbarTemplate = () => {
  //     return (
  //         <div className="flex flex-wrap gap-2">
  //             <Button label="New" icon="pi pi-plus" severity="success"  />
  //             <Button label="Delete" icon="pi pi-trash" severity="danger" />
  //         </div>
  //     );
  // };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="CSV"
          icon="pi pi-file-excel"
          className="p-button-info"
          onClick={exportCSV}
        />
        <Button
          label="PDF"
          icon="pi pi-file-pdf"
          className="p-button-danger"
          onClick={exportPDF}
        />
      </div>
    );
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงในช่องค้นหา
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    // ใน PrimeReact DataTable คุณสามารถตั้งค่า globalFilter ตรงๆ ใน DataTable component ได้เลย
    // ไม่จำเป็นต้องกรองข้อมูลใน state โดยตรงถ้าใช้ props นี้
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">List Master Equipment</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  const imageBodyTemplate = () => {
    return (
      <img
        src={`/dist/img/No_images.png`}
        alt={"No-Image.png"}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const exportCSV = () => {
    //console.log("Export CSV");
    dt.current.exportCSV();
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "ส่งออกข้อมูล CSV สำเร็จ",
      life: 3000,
    });
  };

  // **** ฟังก์ชัน Export PDF ****
  const exportPDF = () => {
    //console.log("เข้า Funtion export PDF");

    //setShowLoadingDialog(true); // เริ่มกระบวนการ, แสดง Dialog

    // 1. แสดง Loading dialog
    Swal.fire({
      title: "กำลังสร้างไฟล์ PDF...",
      text: "โปรดรอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // 2. ใช้ setTimeout เพื่อให้เบราว์เซอร์แสดง loading dialog ก่อนเริ่มสร้าง PDF
    setTimeout(() => {
      try {
        // สร้างอ็อบเจ็กต์ jsPDF
        const doc = new jsPDF("l", "mm", "a4");

        addThaiFont(doc);
        doc.setFont("THSarabunNew"); // ตั้งค่าฟอนต์ที่ต้องการ
        doc.setFontSize(8); // ลดขนาดฟอนต์ให้เล็กลงเพื่อความเรียบร้อย

        // 1. กำหนดหัวตารางจากคอลัมน์ใน DataTable
        const columns = [
          { field: "running_no", header: "No." },
          { field: "equipment_id", header: "Code" },
          { field: "jig_name", header: "Jig Name" },
          { field: "jig_number", header: "Jig Number" },
          { field: "maker", header: "Maker" },
          { field: "suffix_no", header: "Suffix No" },
          { field: "serial_no", header: "Serial No" },
          { field: "asset_no", header: "Asset No" },
          { field: "type", header: "Type" },
          { field: "respond", header: "Respond" },
          { field: "section", header: "Section" },
          // { field: 'control_no', header: 'Control No' },
          // { field: 'application_model', header: 'Application Model' },
          // { field: 'entry_date', header: 'Entry Date' },
          // { field: 'issue_date', header: 'Issue Date' },
          // { field: 'calibration_date', header: 'Calibration Date' },
          // { field: 'next_calibration_date', header: 'Next Calibration Date' },
          { field: "location", header: "Location" },
          { field: "shelf", header: "Shelf" },
          { field: "floor", header: "Floor" },
          // { field: 'calibration_control', header: 'Calibration Control' },
          // { field: 'remark', header: 'Remark' },
          { field: "status", header: "Status" },
        ];

        // สร้างอาร์เรย์สำหรับ head (หัวตาราง) และ body (เนื้อหา)
        const head = [columns.map((col) => col.header)];

        // const body = equipment.map(item =>
        //     columns.map(col => item[col.field])
        // );

        const body = equipment.map((item, index) => {
          // สร้างอาร์เรย์สำหรับแต่ละแถว
          return [
            index + 1, // Running Number
            item.equipment_id,
            item.jig_name,
            item.jig_number,
            item.maker,
            item.suffix_no,
            item.serial_no,
            item.asset_no,
            item.type,
            item.respond,
            item.section,
            item.location,
            item.shelf,
            item.floor,
            item.status,
          ];
        });

        // 2. ตั้งค่าและสร้างตาราง PDF
        // doc.autoTable({
        autoTable(doc, {
          head: head,
          body: body,
          theme: "striped", // สามารถเปลี่ยน theme ได้ตามต้องการ (striped, grid, plain)
          startY: 10, // ตำแหน่งเริ่มต้นของตาราง
          headStyles: {
            fillColor: [22, 160, 133],
            font: "THSarabunNew", // ใช้ฟอนต์ภาษาไทยสำหรับหัวตาราง
            fontSize: 8,
          },
          bodyStyles: {
            font: "THSarabunNew", // ใช้ฟอนต์ภาษาไทยสำหรับเนื้อหา
            fontSize: 8,
            minCellHeight: 6, // กำหนดความสูงขั้นต่ำของเซลล์
          },
          columnStyles: {
            0: { cellWidth: 10 }, // คอลัมน์ที่ 0 (No.) กว้าง 10mm
            // 1: { cellWidth: 30 }, // คอลัมน์ที่ 1 (Code) กว้าง 30mm
            // 2: { cellWidth: 45 }, // คอลัมน์ที่ 2 (Jig Name) กว้าง 45mm
            3: { cellWidth: 20 }, // คอลัมน์ที่ 3 (Jig Number) กว้าง 35mm
            // // ... กำหนดความกว้างสำหรับคอลัมน์อื่นๆ ตามความเหมาะสม
            4: { cellWidth: 15 },
            5: { cellWidth: 15 },
            // 6: { cellWidth: 20 },
            // 7: { cellWidth: 20 },
            8: { cellWidth: 15 },
            9: { cellWidth: 15 },
            //10: { cellWidth: 20 },
            //11: { cellWidth: 20 },
          },
        });

        // 3. บันทึกไฟล์ PDF
        doc.save("equipment_list.pdf");

        // 5. ปิด Loading dialog เมื่อสร้างไฟล์เสร็จสิ้น
        Swal.close();
        //setShowLoadingDialog(false); // สิ้นสุดกระบวนการ, ปิด Dialog

        // 4. แสดง Toast แจ้งเตือน
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "ส่งออกข้อมูลเป็น PDF สำเร็จ",
          life: 3000,
        });
      } catch (error) {
        Swal.close();
        console.error("Error during PDF export:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "เกิดข้อผิดพลาดในการสร้างไฟล์ PDF",
          life: 3000,
        });
      }
    }, 100);
  };

  return (
    <div>
      <Toast ref={toast} />

      {/* Dialog สำหรับแสดงสถานะการโหลด */}
      <Dialog
        header="กำลังส่งออกไฟล์ PDF..."
        visible={showLoadingDialog}
        modal
        onHide={() => setShowLoadingDialog(false)} // ป้องกันไม่ให้ปิดเอง
        closable={false} // ปิดปุ่ม X
      >
        <div className="flex justify-content-center align-items-center">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="4"
          />
          <h4 className="ml-3">โปรดรอสักครู่</h4>
        </div>
      </Dialog>

      <div className="card">
        {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
        <Toolbar className="mb-4" left={rightToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={equipment} // 3. ส่งข้อมูลจาก state 'equipment' ไปให้ DataTable
          loading={loading} // 4. แสดงสถานะการโหลด
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} equipments"
          header={header}
          globalFilter={globalFilterValue} // 5. เพิ่ม globalFilter สำหรับการค้นหา
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          {/* 6. ตรวจสอบ field prop ให้ตรงกับชื่อ key ของข้อมูลที่มาจาก API */}
          <Column
            field="equipment_id"
            header="Code"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="photo"
            header="Photo"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="jig_name"
            header="Jig Name"
            sortable
            style={{ minWidth: "18rem" }}
          ></Column>
          <Column
            field="jig_number"
            header="Jig Number"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="maker"
            header="Maker"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="suffix_no"
            header="Suffix No"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="serial_no"
            header="Serial No"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="asset_no"
            header="Asset No"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="respond"
            header="Respond"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="section"
            header="Section"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="control_no"
            header="Control No"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="application_model"
            header="Application Model"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="entry_date"
            header="Entry Date"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="issue_date"
            header="Issue Date"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="calibration_date"
            header="Calibration Date"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="next_calibration_date"
            header="Next Calibration Date"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="shelf"
            header="Shelf"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="floor"
            header="Floor"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="location"
            header="Location"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="calibration_control"
            header="Calibration Control"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="remark"
            header="Remark"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
