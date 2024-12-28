Backend : Node.js
Frontend : React.js
Database : Mongodb

# Github repo url : https://github.com/srideviav/GVCC_assignment

# To run Backend :

- add .env file in below format 
   `
     DB_URL= 'your db url'
     PORT = 'your port'
     JWT_SECRET = "your secret key"
   `

- npm install to install all the dependencies
- 
- npm run start to run the project
  
# To run Frontend :

- add .env file in below format 
   `
     BASE_URL= 'http://localhost:3003' // backend url
   `

- npm install to install all the dependencies
- 
- npm run start to run the project
  
# Project Overview

  # Backend
   
    - Used Render for backend host 
     url : https://gvcc-assignment.onrender.com

 - Login : 
      API : http://localhost:3003/user/login
      Endpoint : POST
      Example Request : 
      {
        email : "",
        password : "",
      }

 - Register :
      API :  http://localhost:3003/user/register
      Endpoint : POST
      Example Request :
       {
        name : "",
        email : "",
        password : "",
        userType : ""
      }
      
 - get users : 
     API : http://localhost:3003/user/get
     Endpoint : GET 
     Authenticated, login before using get url

  # Frontend 
    -  Deployed in Vercel
         url : https://gvcc-assignment-6y65hraap-srideviavs-projects.vercel.app

    