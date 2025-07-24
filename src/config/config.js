const config = {
    // apiPath: "http://localhost:3009",
    // apiCentralizedSignInPath: 'http://localhost:3009',
    // centralizedSigninIframePath: 'http://localhost:5173/signincentral',
    // centralizedPath: 'http://localhost:5173',
    // centralizedLogOutPath: 'http://localhost:5173/sso-logout',


    apiPath: "http://172.28.32.31/api_ptmportal",
    apiCentralizedSignInPath: 'http://172.28.32.31/api_ptmportal',
    centralizedSigninIframePath: 'http://172.28.32.31/signincentral',
    centralizedPath: 'http://172.28.32.31',
    centralizedLogOutPath: 'http://172.28.32.31/sso-logout',

    headers: () => {
        return {
            headers: {
            Authorization: localStorage.getItem("uid")
            }
        }
    }
}

export default config;

