import styled from 'styled-components'

export const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FailureContainer = styled(LoaderContainer)`
  height: 80vh;
  flex-direction: column;
`

export const FailureImage = styled.img`
  height: 300px;
`

export const FailedHeading = styled.h1`
  text-align: center;
`
export const FailedText = styled.p`
  text-align: center;
`

export const RetryBtn = styled.button`
  background-color: #4656a1;
  border: none;
  padding: 10px;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
`
export const UnorderedList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`
export const CourseText = styled.h1`
  margin-left: 50px;
  font-family: Roboto;
`
