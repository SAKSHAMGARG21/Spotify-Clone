import React from 'react'
// import googleimg from "../../assets/google.png"
function GoogleBtn({ googleLoginbtn }) {
    return (
        <button onClick={googleLoginbtn} className='flex gap-3 w-full items-center justify-center p-4 rounded-[50px] border border-white bg-transparent hover:bg-[#ffffff30] active:scale-95 transition-all duration-200' >
            <img src='/google.png' alt="google logo" className='h-8' />
            <div>
                Continue with Google
            </div>
        </button>
    )
}

export default GoogleBtn