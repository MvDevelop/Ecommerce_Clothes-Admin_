
import styles from './Navbar.module.css';

import navlogo from '../assets/logo.png';
// import navprofile from '../assets/nav-profile.svg';
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <>
        <div className={styles.navbar}>
          <div className={styles.nav_logo}>
            <img src={navlogo}/>
            <h2>Clothes <span>Admin Panel</span></h2>
          </div>
            <FaUserCircle className={styles.user_icon}/>
            {/* <img src={navprofile} className={styles.nav_profile}/> */}
        </div>
    </>
  )
}

export default Navbar;
