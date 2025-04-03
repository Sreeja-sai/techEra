import {Link} from 'react-router-dom'

import {ListItem, LogoImage, CourseName} from './StyledComponents'

const EachCourse = props => {
  const {courseItem} = props
  const {id, name, logoUrl} = courseItem
  return (
    <Link to={`/courses/${id}`}>
      <ListItem>
        <LogoImage src={logoUrl} />
        <CourseName>{name}</CourseName>
      </ListItem>
    </Link>
  )
}

export default EachCourse
