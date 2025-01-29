import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar'
import FeaturedSection from './FeaturedSection'
import { ScrollArea } from '../ui/scroll-area'
import { getSongByYear, gettopRatedSongs } from '@/services/operations/songApi';
import SectionGrid from '../common/SectionGrid';

function AppPage() {
  const [TopSongs, setTopRatedSongs] = useState([]);
  const [YearSongs, setYearSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const getTopRatedSongsData = async () => {
    setLoading(true);
    const songdata = await gettopRatedSongs();
    setLoading(false);
    setTopRatedSongs(songdata);
  };
  const getSongsByYearData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    setLoading(true);
    const songData = await getSongByYear(year);
    setLoading(false);
    setYearSongs(songData);
  }
  useEffect(() => {
    getTopRatedSongsData();
    getSongsByYearData();
  }, [gettopRatedSongs, getSongByYear]);
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
      <Topbar></Topbar>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl text-left sm:text-3xl font-bold mb-6 text-white'>Good afternoon</h1>
          <FeaturedSection />

          <div className='space-y-8'>
            <SectionGrid title='Made For You' songs={TopSongs} isLoading={isLoading} />
            <SectionGrid title='Trending' songs={YearSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default AppPage