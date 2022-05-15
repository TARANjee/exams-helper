import React from 'react'
import { Link } from "react-router-dom";
import { Container, IconButton, useMediaQuery } from "@mui/material";
import '../index.css'
import './navbar.css'
import { List } from './MenuList';

const Footer = () => {
  const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });

  return (
    <footer>
      <div>
        <a href='https://www.fb.com' target="_blank" rel='noreferrer noopener'>
          <IconButton >
            <img src='./img/fb.png' alt='fb' width='45px' />
          </IconButton>
        </a>
        <a href='https://www.instagram.com' target="_blank" rel='noreferrer noopener'>
          <IconButton>
            <img src='./img/insta.png' alt='insta' width='40px' />
          </IconButton>
        </a>
        <a href='https://www.twitter.com' target="_blank" rel='noreferrer noopener'>
          <IconButton>
            <img src='./img/tweet.png' alt='tweeter' width='40px' />
          </IconButton>
        </a>
      </div>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          {List('footer')}

          <div >
            <li className={matches ? 'link' : 'menuList'}>
              <Link to='/terms' className='link'>Terms</Link>
            </li>
            <li className={matches ? 'link' : 'menuList'}>
              <Link to='/privacypolicy' className='QPaper link'>Privacy Policy</Link>
            </li>
          </div>

        </div>
      </Container>


      <div style={{ backgroundColor: "white", color: 'black' }}>
        <div>
          <img src='./img/SgrruSpaceLogoBottom.png' alt='Logo' width={matches ? '250px' : '150px'} />
        </div>
        Sgrru Space &copy; 2022
      </div>

    </footer>
  )
}

export default Footer