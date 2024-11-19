import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='flex px-4  py-3 md:px-[3rem] items-center justify-between border-t border-black/20'>
      <div className=''>
        &copy; | BallonBid
      </div>
      <div className='flex gap-5'>
        <a href="https://github.com/shahiid-10" target='_blank'>
            <FaGithub size={20} className='hover:-translate-y-1 transition-transform duration-300'/>
        </a>
        <a href="https://x.com/shahid__10__" target='_blank'>
            <FaXTwitter size={20} className='hover:-translate-y-1 transition-transform duration-300'/>
        </a>
      </div>
    </footer>
  )
}

export default Footer
