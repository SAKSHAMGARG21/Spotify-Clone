import React from 'react'
import SectionGridSkeleton from '../skeletons/SectionGridSkeleton'

function SectionGrid({ title, songs, isLoading }) {

  if (isLoading) return (<SectionGridSkeleton />);
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
        <button variant='link' className='text-sm text-zinc-400 hover:text-white'>
          Show all
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {songs.map((song) => (
          <div
            key={song._id}
            className='bg-zinc-400/20 p-4 text-left rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
          >
            <div className='relative mb-4'>
              <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                <img
                  src={song.songImg}
                  alt={song.songName}
                  className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
                />
              </div>
              {/* <PlayButton song={song} /> */}
            </div>
            <h3 className='font-medium mb-2 truncate'>{song.songName}</h3>
            <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid