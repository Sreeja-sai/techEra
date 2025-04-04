// import {NotFoundContainer, NotFoundImage} from './StyledComponents'

import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="notFoundContainer">
      <img
        className="notFoundImage"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      />
      <h1 className="notFoundHead">Page Not Found</h1>
      <p className="notFoundDesc">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
