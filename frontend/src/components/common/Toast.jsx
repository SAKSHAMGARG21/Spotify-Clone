import React from 'react';

import { ToastContainer, toast, Bounce } from 'react-toastify';

export function Toast() {
    const notify = () => toast("Loading completed");

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
}
