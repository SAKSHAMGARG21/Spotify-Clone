const Basedata = {
    BackendUrl: String(import.meta.env.VITE_BACKEND_URI),
    GoogleClientId:String(import.meta.env.VITE_CLIENT_ID),
    GoogleClientSecret:String(import.meta.env.VITE_CLIENT_SECRET)
}

export default Basedata;