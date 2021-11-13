import "./Footer.css";

import githubIcon from "../../images/githubicon.png";
import linkedinIcon from "../../images/linkedinicon.png";

export default function Footer() {
  return (
    <div>
      <footer className='footer'>
        <p className='footer__copyright'>© 2021 isaWabi</p>
        <ul className='footer__link-zone-right footer__link-list'>
          <li className='footer__link-listitem'>
            <a
              className='footer__icon'
              href='https://github.com/Icuisset/'
              target='_blank'
              rel='noreferrer'>
              <img src={githubIcon} alt='GitHub icon' />
            </a>
          </li>
          <li className='footer__link-listitem'>
            <a
              className='footer__icon'
              href='https://www.linkedin.com/in/isabelle-cuisset/'
              target='_blank'
              rel='noreferrer'>
              <img src={linkedinIcon} alt='LinkedIn icon' />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
