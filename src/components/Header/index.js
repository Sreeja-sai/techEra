import {Link} from 'react-router-dom'

// import {HeaderContainer, HeaderImage} from './StyledComponents'

import './index.css'

const Header = () => (
  <div className="headerContainer">
    <Link to="/">
      <img
        className="headerImage"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </Link>
  </div>
)

export default Header
