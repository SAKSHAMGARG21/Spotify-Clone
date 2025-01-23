import Basedata from "../config/Basedata"
export const authApis = {
    GoogleAuth: Basedata.BackendUrl+"/user/google?code=",
    SendOtp: Basedata.BackendUrl + "/user/sendotp",
    Signup: Basedata.BackendUrl + "/user/register",
    Login: Basedata.BackendUrl + "/user/login",
    Logout: Basedata.BackendUrl + "/user/logout",
    Profile: Basedata.BackendUrl + "/user/profile",
    CheckToken:Basedata.BackendUrl+"/user/checktoken"
}

export const songApis = {
    CreateSong: Basedata.BackendUrl + "/song/createsong",

    FeaturedSongs: Basedata.BackendUrl + "/song/getfeaturesongs",
    SongById: Basedata.BackendUrl + "/song/getsongsbyid/:songId",
    TopSongs: Basedata.BackendUrl + "/song/gettopSongs",
    SongsByYear: Basedata.BackendUrl + "/song/getsongsbyyear",
    GetAlbum: Basedata.BackendUrl + "/song/getalbum",

    DeleteSongById: Basedata.BackendUrl + "/song/deletesongbyid/:songId",
}

export const playlistApis = {
    CreatePlaylist: Basedata.BackendUrl + "/playlist/createplaylist",

    GetPlaylists: Basedata.BackendUrl + "/playlist/getplaylists",
    UpadtePlaylist: Basedata.BackendUrl + "/playlist/updateplaylist",
    RemoveSongFromPlaylist: Basedata.BackendUrl + "/playlist/removesongfromplaylist",

    DeletePlaylist: Basedata.BackendUrl + "/playlist/deleteplaylist/:playlistId",
}

export const albumApis = {
    CreateAlbum: Basedata.BackendUrl+"/album/createalbum",

    GetAllAlbum: Basedata.BackendUrl+"/album/getallalbums",
    GetAlbumById: Basedata.BackendUrl+"/album/getalbmbyid/:albumId",

    UpdateAlbum: Basedata.BackendUrl+"/album/updatealbum",
    
    DeleteAlbum: Basedata.BackendUrl+"/album/deletealbum/:albumId",
}