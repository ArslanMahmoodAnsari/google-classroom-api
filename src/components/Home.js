import React, { useEffect, useState, Fragment } from "react"
import axios from 'axios'
import '../App.css'
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

function Home({history}){
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const getCourses = async(token) => {
    setLoading(true)
    const body = {
      code: token
    }
    const res = await axios.post('/api/classroom/courses',body ,config)
    setLoading(false)
    setCourses(res.data.courses)
    localStorage.setItem('courses', JSON.stringify(res.data.courses))
  }

  useEffect(() => {
    let temp = localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : null
    let url = decodeURIComponent(window.location.href)
    const token = url.slice(url.indexOf('=') + 1 ,url.indexOf('&'))
    if(temp){
      setLoading(false)
      setCourses(temp)
    }
    else{
      getCourses(token);
    }
  }, [])
  
  useEffect(() => {
  }, [JSON.stringify(courses)])
  const showCourses = () => {
    return(
      <table className='table'>
        <tr>
          <th>Course</th>
          <th>Teachers</th>
          <th>Students</th>
        </tr>
        {courses.map(course => (
            <tr 
              key={course.id}
              onClick={() =>
                history.push({
                  pathname: '/ListUser',
                  state: { course }
                })}>
              <td>{course.name}</td>
              <td>{course.people ? course.people.teachers.length: 0}</td>
              <td>{course.people ? course.people.students.length: 0}</td>
            </tr>
          ))}
      </table>
    )
  }
  return (
    <Fragment>
      {loading === true ? <p>Loading...!</p> : courses.length > 0 ? showCourses(): <p>No courses Found...!</p>}
    </Fragment>
  )
}
export default Home
