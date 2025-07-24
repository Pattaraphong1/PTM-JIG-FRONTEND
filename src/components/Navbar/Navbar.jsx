import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from './../../config/config';
import axios from 'axios';
import IframeSignIn from './../IframeSignIn/IframeSignIn';


function Navbar() {

  // S signin ===========================
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [adminShow, setAdminShow] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await axios.get(config.apiCentralizedSignInPath + "/user/readtoken", config.headers());
                //console.log("res.data.result=", res.data.result);
                if (res.data.result) {
                    setUser(res.data.result);
                    setShow(true);

                    //console.log("user.arbac.app0", user.arbac.app0);
                    if(user.arbac.app0 == 9){
                        setAdminShow(true);
                    }else{
                        setAdminShow(false);
                    }

                    //window.location.reload();
                }
                else {
                    setShow(false);
                }
            } catch (e) {
                //console.log("Error fetchData", e.message);
            }
        }
        fetchData();
    }, [show]);

    const ucwords = (str) => {
        if(str === undefined || str === ""){
            return "";
        }
        return str.toLowerCase().replace(/\b\w/g, (char) => {
            return char.toUpperCase();
        });
    }

    // E signin ===========================

    const MAIN_DOMAIN_LOGOUT_URL = config.centralizedLogOutPath;
    // Main Origin  สำหรับตรวจสอบ postMessage
    const MAIN_DOMAIN_ORIGIN = config.centralizedPath;
    const [logoutStatus, setLogoutStatus] = useState('');

    const signOutHandler = () => {

        setLogoutStatus('Trying to logout from primary domain...');

        // 1. สร้าง iframe ที่ซ่อนไว้
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none'; // ซ่อน iframe
        iframe.src = MAIN_DOMAIN_LOGOUT_URL; // ชี้ไปที่ React Route บน www.example.com

        // 2. เพิ่ม iframe เข้าไปใน DOM
        document.body.appendChild(iframe);

        // 3. Optional: Clean up iframe
        iframe.onload = () => {
            console.log('iframe โหลดสำเร็จสำหรับ Logout โดเมนหลัก');
            setTimeout(() => {
                document.body.removeChild(iframe);
                console.log('iframe ถูกลบออกจาก DOM');
            }, 200);
            
        };

        iframe.onerror = () => {
            console.error('โหลด iframe สำหรับ Logout โดเมนหลักล้มเหลว');
            setLogoutStatus('Unable to initiate logout from primary domain');
            document.body.removeChild(iframe);
        };

         console.log("AAAA");
         useNavigate('/'); // Redirects to the root path         

    }

    useEffect(() => {
        // Event listener สำหรับข้อความจาก iframe (main domain)
        const handleMessage = (event) => {

            // สำคัญ: ตรวจสอบ Origin ของข้อความเพื่อความปลอดภัย!
            if (event.origin === MAIN_DOMAIN_ORIGIN) {
                if (event.data === 'sso_logged_out_from_main_domain') {
                    console.log('ยืนยัน: Token ของโดเมนหลักถูกลบแล้ว.');
                    setLogoutStatus('Logout from primary domain successfully!');

                    // delete token from this domain
                    localStorage.removeItem('uid');
                    window.location.reload();
                    //console.log('UID : ' + uid)

                } else if (event.data === 'sso_logout_error_from_main_domain') {
                    console.error('ข้อผิดพลาด: Logout จากโดเมนหลักล้มเหลว.');
                    setLogoutStatus('An error occurred while logging out of the primary domain.');
                }
            } else {
                console.warn('ได้รับข้อความจาก Origin ที่ไม่รู้จัก:', event.origin);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    // E LogOut iFrame ============================

  return (
    <>
    {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-dark">
        {/* Left navbar links */}
       

        {/* Left navbar links */}
            
         <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    {/* <Link to="/" className="nav-link">Home</Link> */}
                </li>
          
          </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
            
                {/*S sign in Menu======================*/}
                {logoutStatus}

                
                <li className="nav-item dropdown">
                    <div>
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                            {!show ?
                                (<> <i className="fas fa-user-alt"></i> Account </>)
                                : (<>
                                    <img src="data:image/png;base64,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" 
                                    className="img-circle elevation-2" width="25px" alt="User Image" />
                                    &nbsp; {ucwords(user.firstname)}
                                </>)}
                        </a>
                        <ul className="dropdown-menu">
                            {!show ? (
                                <li className="nav-item d-none d-sm-inline-block">
                                    <span className="dropdown-item" style={{ cursor: 'pointer' }}
                                        onClick={() => setShowSignInModal(true)}  >
                                        <i className="fas fa-user-alt"></i> Sign In
                                       
                                    </span>                                  
                                </li>
                            ) : (
                                <li><span className="dropdown-item" style={{ cursor: 'pointer' }}
                                    onClick={signOutHandler} >
                                    <i className="fas fa-user-times"></i> Sign Out
                                </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </li>
               
                {adminShow ? (
                    <li className="nav-item dropdown">
                        <div>
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item d-none d-sm-inline-block">
                                    <Link to="/config" className="nav-link">SSO Config</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to="/employeeupload" className="dropdown-item" >EMP Upload</Link></li>

                            </ul>
                        </div>
                    </li>
                ) : (<></>)
                } 

                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
            
                
            </ul>
      </nav>
      {/* /.navbar */}
   
   <IframeSignIn isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </>
  )
}

export default Navbar
