import React, { useEffect, useState, Fragment } from "react"

function ListUser ({location}) {
	const [course, setCourse] = useState(null)
	useEffect(() => {
		console.log('ListUser', location);
		setCourse(location.state ? location.state.course: null)
	}, [])

	const showCourse = () => {
		return(
			<Fragment>
			<h1>{course.name}</h1>
			<table>
				<tr>
					<thead>
						teachers
					</thead>
				</tr>
				{
					course.people.teachers.map(teacher => {
					return(<tr key={teacher.profile.id}>
						<tbody>
							{teacher.profile.name.givenName}
						</tbody>
					</tr>)
					})
				}	
			</table>
			<table>
				<tr>
					<thead>
						Students
					</thead>
				</tr>
				{
					course.people.students.map(student => {
					return(<tr key={student.profile.id}>
						<tbody>
							{student.profile.name.givenName}
						</tbody>
					</tr>)
					})
				}	
			</table>
			</Fragment>
		)
	}
	
	return (
		<Fragment>
			{
				course!==null ? showCourse() : <p>No Data</p>
			}
		</Fragment>
	)
}

export default ListUser
