import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Basedata from '../../config/Basedata';
function GoogleAuthWrapper({children}) {
    return (
        <GoogleOAuthProvider clientId={Basedata.GoogleClientId}>
            {children}
        </GoogleOAuthProvider>
      )
}

export default GoogleAuthWrapper;