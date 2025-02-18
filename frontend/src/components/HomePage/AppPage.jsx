import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar'
import FeaturedSection from './FeaturedSection'
import { ScrollArea } from '../ui/scroll-area'
import { getSongByYear, gettopRatedSongs } from '@/services/operations/songApi';
import SectionGrid from '../common/SectionGrid';
import { usePlayerStore } from '@/services/operations/usePlayerStore';
import { useSelector } from 'react-redux';
import LoginToContinue from '../common/LoginToContinue';

function AppPage() {
  const { user, token } = useSelector(state => state.auth);
  const [TopSongs, setTopRatedSongs] = useState([]);
  const [YearSongs, setYearSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { initializeQueue } = usePlayerStore();
  const getTopRatedSongsData = async () => {
    setLoading(true);
    const songdata = await gettopRatedSongs();
    setTopRatedSongs(songdata);
    setLoading(false);
  };

  const getSongsByYearData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    setLoading(true);
    const songData = await getSongByYear(year);
    setYearSongs(songData);
    setLoading(false);
  }

  {
    user && useEffect(() => {
      getTopRatedSongsData();
      getSongsByYearData();
    }, [gettopRatedSongs, getSongByYear]);
    useEffect(() => {
      if (TopSongs?.length > 0 && YearSongs?.length > 0) {
        const allSongs = [...TopSongs, ...YearSongs];
        initializeQueue(allSongs);
      }
    }, [TopSongs, YearSongs]);
  }


  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
      <Topbar></Topbar>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          {
            user || token ? (
              <div>
                <h1 className='text-2xl text-left sm:text-3xl font-bold mb-6 text-white'>Good afternoon</h1>
                <FeaturedSection />
                <div className='space-y-8'>
                  <SectionGrid title='Made For You' songs={TopSongs} isLoading={isLoading} />
                  <SectionGrid title='Trending' songs={YearSongs} isLoading={isLoading} />
                </div>
              </div>
            ) : (
              <LoginToContinue />
            )
          }
        </div>
      </ScrollArea>
    </main>
  )
}

export default AppPage