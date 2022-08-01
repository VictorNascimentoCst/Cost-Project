import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import style from './Footer.module.css'

function Footer () {
    return (
        <footer className={style.footer}>
       <h1>
        <ul className={style.social_list}>
            <li><FaFacebook/></li>
            <li><FaInstagram/></li>
            <li><FaLinkedin/></li>
        </ul>
       </h1> 
       <p className={style.copy_right}><span>Costs</span> &copy; 2022</p>
       </footer>
    )
}
export default Footer