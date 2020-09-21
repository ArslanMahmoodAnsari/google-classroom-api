const express = require('express');
const { google } = require('googleapis');
const credentials = require('../config/credentials.json');
let router = express.Router();

const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly'
];

const getAuthClient = () => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  return new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )
}

const getNewToken = () => {
  const authClient = getAuthClient()
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

const decodeAuthToken = (token) => {
  return new Promise ((resolve, reject) => {
    let authClient = getAuthClient()
    authClient.getToken(token, (err, token) => {
      if (err) {
        reject(err)
      }
      authClient.setCredentials(token);
      resolve(authClient)
    });
  })
}

const listCourses = (auth) => {
  return new Promise ((resolve, reject) => {
    const classroom = google.classroom({ version: 'v1', auth });
    classroom.courses.list({pageSize: 10}, async (err, response) => {
        if (err) {
          reject(err)
        }
        if(response.data.courses){
          let mappedCourses = await mapCountToCourses(auth, response.data.courses)
          resolve(mappedCourses)
        }
        else{
          resolve([])
        }
      }
    );
  })
}
const mapCountToCourses = (auth, courses) => {
  return new Promise ((resolve, reject)=> {
    try {
      const allPromises = courses.map(async(course) => {
        return await listPeople(auth, course.id)
      });
      Promise.all([...allPromises]).then(values => {
        let temp = [...courses]
        for(let x of values){
          temp.find((y, i) => {
            if( x.teachers[0].courseId === temp[i].id){
              let temp2 = {
                ...temp[i],
                people: x
              }
              temp[i] = temp2
            }
          })
        }
        resolve (temp)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const listPeople = (auth, course_Id) =>{
  return new Promise (async(resolve, reject) => {
    try {
      const classroom = google.classroom({version: 'v1', auth});
      const res1 = await classroom.courses.teachers.list({ courseId: course_Id })
      const res2 = await classroom.courses.students.list({ courseId: course_Id })
      resolve({teachers:res1.data.teachers, students:res2.data.students})
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      reject(error)
    }
  })
}

router.get('/auth', (req, res) => {
  const authUrl = getNewToken();
  return res.send({ authUrl })
});

router.post('/classroom/courses', async (req, res) =>{
  try {
    let authClient = await decodeAuthToken(req.body.code);
    const courses = await listCourses(authClient);
    return res.send({ courses })
  } catch (error) {
    return res.status(500).send(error)  
  }
});

module.exports = router;