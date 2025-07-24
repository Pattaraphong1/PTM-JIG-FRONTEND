import { useEffect } from "react";
import config from "../../config/config";
import styles from '../IframeSignIn/iframemodal.module.css'



function IframeSignIn({isOpen, onClose}){

    // S signin ===========================
    //const iframeOrigin = 'http://localhost:5173';
    const iframeOrigin = config.centralizedPath;
    const signInUrl = config.centralizedSigninIframePath;
 

    useEffect(() => {

		const handleMessage = (event) => {
			const allowedOrigin = iframeOrigin; // แทนด้วย URL จริง

			if (event.origin !== allowedOrigin) {
				console.warn('An unexpected message from origin:', event.origin);
                // event.origin  is iframe domain or centralized sign-in domain 
				return;
			}

			if (event.data && event.data.type === 'loginSuccess' && event.data.token) {
				const token = event.data.token;
				//console.log('ได้รับ Token จาก iframe:', token);
				localStorage.setItem('uid', token);
                onClose();
                window.location.reload();
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage); // ทำความสะอาด listener เมื่อ component unmount
		};
	}, []);
    // E signin ===========================

    if (!isOpen) {
        return null;
    }


    return (<>
    
        {/* S ======iframe======= */}
        {isOpen && (
            <div className={styles.modal_backdrop}>
                <div className={styles.modal_content}>
                    <iframe className={styles.modal_iframe}
                        src={signInUrl}
                        width="400"
                        height="400"
                        title="Sign In"
                    />
                    <button onClick={onClose} className={styles.close_button}>
                        Close
                    </button>
                </div>
            </div>
        )}
        {/* E ======iframe======= */}

    </>);
}

export default IframeSignIn;



{/* 
    =======how to use==========
import IframeSignIn from "./IframeSignIn";

    const [showSignInModal, setShowSignInModal] = useState(false);


    <IframeSignIn isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} /> 
    
    
*/}