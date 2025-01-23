import React, { useEffect } from 'react'
import Topbar from '../components/Topbar'
import axios from 'axios';
import { songApis } from '../services/apis'
import { useSelector } from 'react-redux';
function Home() {
  const { token,user } = useSelector((state) => state.auth);
  const getSongs = async () => {
    try {
      const res = await axios.get(songApis.FeaturedSongs);
      // console.log(res);
      return;
    } catch (error) {
      console.log("Error in fetching songs", error);
    }
  }
  useEffect(() => {
    const fetchSongs = async () => {
      await getSongs();
    };
    fetchSongs();
  }, []);
  return (
    <div>
      <Topbar />
      <div>
        <h1>Home Page</h1>
      </div>

      <div>
        {token}
      </div>
      <div>
        {user}
      </div>
    </div>
  )
}

export default Home