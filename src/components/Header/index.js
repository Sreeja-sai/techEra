import {Link} from 'react-router-dom'

import {HeaderContainer, HeaderImage} from './StyledComponents'

const Header = () => (
  <HeaderContainer>
    <Link to="/">
      <HeaderImage
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </Link>
  </HeaderContainer>
)

export default Header
