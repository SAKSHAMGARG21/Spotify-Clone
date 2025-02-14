import React from 'react'
import Loginbtn from './Loginbtn'

function LoginToContinue() {
    return (
        <div className='flex flex-col my-8 items-center justify-center h-full space-y-6'>
            <img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
            <div className='text-center'>
                <h3 className='text-zinc-300 text-lg mb-1 font-bold'>Login to Listen songs</h3>
            </div>

            <Loginbtn></Loginbtn>
        </div>
    )
}

export default LoginToContinue