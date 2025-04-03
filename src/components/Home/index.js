import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EachCourse from '../EachCourse'

import {
  LoaderContainer,
  FailureContainer,
  FailureImage,
  FailedHeading,
  FailedText,
  RetryBtn,
  UnorderedList,
  CourseText,
} from './StyledComponents'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, coursesList: []}

  componentDidMount() {
    this.getApiFuntion()
  }

  getApiFuntion = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      const {courses} = data
      const updatedData = courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({coursesList: updatedData, apiStatus: apiConstants.success})
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
    const {coursesList} = this.state
    return (
      <div>
        <CourseText>Courses</CourseText>
        <UnorderedList>
          {coursesList.map(eachCourse => (
            <EachCourse key={eachCourse.id} courseItem={eachCourse} />
          ))}
        </UnorderedList>
      </div>
    )
  }

  apiStatusResult = status => {
    switch (status) {
      case apiConstants.inProgress:
        return this.inProgressView()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div>
        <Header />
        <div>{this.apiStatusResult(apiStatus)}</div>
      </div>
    )
  }
}

export default Home
