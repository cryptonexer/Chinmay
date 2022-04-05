import React from 'react'
import './AnimatingStyle.css'
import 'animate.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Animation() {
  return (
    <div className='animate__animated animate__bounceInDown  Black'>
       
       <div className="animate__animated animate__fadeIn animate__delay-1s AnimeBox">
            <h3 className='Clogo'>Cryptonex</h3>
            <br />
            <p>Connecting to BlockChain... </p>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color='inherit' />
            </Box><br />
            <p className='animate__animated animate__fadeIn animate__delay-3s'>Wait for a while to connect...</p>
       </div>
       
       
    </div>
  )
}

export default Animation