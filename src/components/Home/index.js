import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EachCourse from '../EachCourse'

// import {
//   LoaderContainer,
//   FailureContainer,
//   FailureImage,
//   FailedHeading,
//   FailedText,
//   RetryBtn,
//   UnorderedList,
//   CourseText,
// } from './StyledComponents'

import './index.css'

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
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failureContainer">
      <img
        className="failureImage"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1 className="failedHeading">Oops! Something Went Wrong</h1>
      <p className="failedText">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retryBtn" onClick={this.getApiFuntion}>
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {coursesList} = this.state
    return (
      <div>
        <h1 className="courseText">Courses</h1>
        <ul className="unorderedList">
          {coursesList.map(eachCourse => (
            <EachCourse key={eachCourse.id} courseItem={eachCourse} />
          ))}
        </ul>
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
