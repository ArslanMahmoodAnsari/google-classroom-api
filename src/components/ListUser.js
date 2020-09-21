import React, { useEffect, useState, Fragment } from "react"
import '../App.css'

function ListUser ({location}) {
	const [course, setCourse] = useState(null)
	useEffect(() => {
		console.log('ListUser', location);
		setCourse(location.state ? location.state.course: null)
	}, [])

	const showCourse = () => {
		return(
			<Fragment>
				<h1 className='UserListHeader'>{course.name}</h1>
				<div className='TabularData'>
					<table className='TableList'>
							<thead className='TableListHeader'>
								<tr>
										<th>Teachers</th>
								</tr>
							</thead>
						{course.people.teachers.map(teacher => {
							return(
								<tbody key={teacher.profile.id}>
									<tr>
										<td>	{teacher.profile.name.givenName}</td>
									</tr>
								</tbody>
							)
							})}	
					</table>
					<table className='TableList'>
						<thead className='TableListHeader'>
								<tr>
										<th>Students</th>
								</tr>
							</thead>
						{course.people.students.map(student => {
							return(
								<tbody key={student.profile.id}>
								<tr>
									<td>	{student.profile.name.givenName}</td>
								</tr>
							</tbody>)
							})}	
					</table>
				</div>
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
