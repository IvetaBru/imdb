import { Link } from 'react-router';
import styled from 'styled-components';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import XIcon from '@mui/icons-material/X';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LaunchIcon from '@mui/icons-material/Launch';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import CopyrightIcon from '@mui/icons-material/Copyright';

const StyledFooter = styled.footer`
  footer{
    height: ;
  }
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
  gap: 2px;
  font-size: medium;
}
.Tekstas{
  display: flex;
  gap: 30px;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-top: 20px;
}
.Launch {
  font-size: 16px; 
  color: white;
}
.Launch2 {
  font-size: 25px;
  color: #00aaff;
}
.Amazon{
  display: flex;
  /* justify-content: content; */
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 10px;
}
.Amazon img {
  width: 50px;
  height: auto;
}
.AmazonImg{
  filter: brightness(0) invert(1);
}
.Copyr .icon-white{
  color: white;
}
.Copyr {
  display: flex;
  justify-content: center; 
  align-items: center;       
  color: white;
  text-align: center;
  padding: 10px;
}
.Copyr a, .Copyr .icon-white {
  color: white;
  text-decoration: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
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
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Side Index<Link><LaunchIcon className='Launch'/></Link>
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >IMDbPro<Link><LaunchIcon className='Launch'/></Link>
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Box Office Mojo<Link><LaunchIcon className='Launch'/></Link>
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >License IMDb Data<Link><LaunchIcon className='Launch'/></Link>
        </a>
        </section>
        <section className='Tekstas'>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Press Room
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Advertising<Link><LaunchIcon className='Launch'/></Link>
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Jobs<Link><LaunchIcon className='Launch'/></Link>
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Conditions of Use
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        >Privacy Policy
        </a>
        <a href="https://help.imdb.com/imdb" 
        target="_blank" 
        ><Link><RuleFolderIcon className='Launch2'/></Link>Your Ads Privacy Choices
        </a>
        </section>
        <section className='Amazon'>
          <h4>an</h4>
        <img className='AmazonImg' src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/02_amazon_logo_RGB_SQUID._TTW_.png"></img>
        <h4>company</h4>
        </section>
        <section className='Copyr'>
        <Link><CopyrightIcon className="icon-white"/>1990-2025 by IMDb.com, Inc.</Link>
        </section>
       </StyledFooter>
     );
}
 
export default Footer;