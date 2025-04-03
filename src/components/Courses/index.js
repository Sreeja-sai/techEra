import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

// import EachCourse from '../EachCourse'

import {
  LoaderContainer,
  FailureContainer,
  FailedHeading,
  FailedText,
  FailureImage,
  RetryBtn,
} from '../Home/StyledComponents'

import {
  CourseImage,
  CourseName,
  CourseDesc,
  CourseContainer,
} from './StyledComponents'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE,',
}

class Courses extends Component {
  state = {apiStatus: apiConstants.initial, currentCourse: {}}

  componentDidMount() {
    this.getApiFuntion()
  }

  getApiFuntion = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedData = {
        id: courseDetails.id,
        name: courseDetails.name,
        description: courseDetails.description,
        imageUrl: courseDetails.image_url,
      }
      this.setState({
        currentCourse: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  inProgressView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </LoaderContainer>
  )

  failureView = () => (
    <FailureContainer>
      <FailureImage src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png" />
      <FailedHeading>Oops! Something Went Wrong</FailedHeading>
      <FailedText>
        We cannot seem to find the page you are looking for
      </FailedText>
      <RetryBtn onClick={this.getApiFuntion}>Retry</RetryBtn>
    </FailureContainer>
  )

  successView = () => {
    const {currentCourse} = this.state
    const {id, name, imageUrl, description} = currentCourse
    console.log(id)
    return (
      <CourseContainer>
        <CourseImage src={imageUrl} />
        <div>
          <CourseName>{name}</CourseName>
          <CourseDesc>{description}</CourseDesc>
        </div>
      </CourseContainer>
    )
  }

  apiStatusResult = status => {
    switch (status) {
      case apiConstants.inProgress:
        return this.inProgressView()
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, currentCourse} = this.state
    console.log(currentCourse)
    return (
      <div>
        <Header />
        <div>{this.apiStatusResult(apiStatus)}</div>
      </div>
    )
  }
}

export default Courses
