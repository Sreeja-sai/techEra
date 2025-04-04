import {Link} from 'react-router-dom'

// import {ListItem, LogoImage, CourseName} from './StyledComponents'

import './index.css'

const EachCourse = props => {
  const {courseItem} = props
  const {id, name, logoUrl} = courseItem
  return (
    <Link to={`/courses/${id}`}>
      <li className="listItem">
        <img alt={name} src={logoUrl} />
        <p className="courseName">{name}</p>
      </li>
    </Link>
  )
}

export default EachCourse
