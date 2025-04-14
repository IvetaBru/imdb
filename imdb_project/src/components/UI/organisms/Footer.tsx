import { Link } from 'react-router';
import styled from 'styled-components';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import XIcon from '@mui/icons-material/X';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LaunchIcon from '@mui/icons-material/Launch';

const StyledFooter = styled.footer`
  
  .Display{
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: white;
    margin-left: 150px;
    margin-right: 150px;
  }
  .Icon{
    width: 360px;
    height: 110px;
    border: 1px solid gray;
    border-radius: 8px;
    text-align: center;
  }
  .Color{
    display: flex;
    gap: 40px;
    padding-left: 30px;
    padding-bottom: 20px;
  }
  .Qrcode{
    width: 360px;
    height: 110px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding-left: 50px;
  }
  .Icon .icon-white {
  color: white;
}
.Qrcode .Qr-white {
  color: white;
  font-size: 80px;
}
.Qrdydis {
  display: flex;
  align-items: center;
  padding-right: 20px;
}
.Tekstas a {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: larger;

}
.Launch {
  font-size: 16px; /* arba 18px – pagal skonį */
  color: white;
}
.Button {
  pointer-events: none;
}
`
const Footer = () => {
    return ( 
       <StyledFooter>
        <section className='Display'>
        <section className='Icon'>
          <div>
          <h1>Follow IMDb on social</h1>
          </div>
          <div className='Color'>
          <Link><AudiotrackIcon className="icon-white"/></Link>
          <Link><InstagramIcon className="icon-white"/></Link>
          <Link><XIcon className="icon-white"/></Link>
          <Link><SmartDisplayIcon className="icon-white"/></Link>
          <Link><FacebookRoundedIcon className="icon-white"/></Link>
          </div>
        </section>
        <section className='Qrcode'>
          <div>
          <h1>Get the IMDb app</h1>
          <h4>For Android and iOS</h4>
          </div>
          <div className='Qrdydis'>
          <Link><QrCode2Icon className="Qr-white" /></Link>
        </div>
        </section>
        </section>
        <section className='Tekstas'>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Help<Link><LaunchIcon className='Launch'/></Link>
        </a>
        </section>
       </StyledFooter>
     );
}
 
export default Footer;