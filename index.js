const express = require('express')
const bcrypt = require('bcrypt')
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDoc, doc, setDoc, getDocs } = require('firebase/firestore')
require("dotenv/config")

//Base de datos
const firebaseConfig = {
    apiKey: "AIzaSyBn-Ti74GjmnVr8xHIaJIn16-rMu3F21cg",
    authDomain: "soyelbasededatos.firebaseapp.com",
    projectId: "soyelbasededatos",
    storageBucket: "soyelbasededatos.appspot.com",
    messagingSenderId: "254917418788",
    appId: "1:254917418788:web:1919ee1284e6d8a0f81db1"
  };

  //Iniciar BD con Firebase
  const firebase = initializeApp(firebaseConfig)
  const db = getFirestore()

  //Inicializar el servidor
  const app = express()

  app.use(express.json())

  //Rutas para las peticiones EndPoint
  //Ruta registro
  app.post('/registro', (req,res) => {
    const {name, lastname, email, password, number} = req.body

    //Validaciones de los datos
    if(name.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if (lastname.length <3){
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if (!email.length) {
      res.json({
        'alert': 'debes escribir tu correo electronico'
      })
    } else if (password.length < 8) {
      res.json({
        'alert': 'password requiere minimo 8 caracters'
      })
    } else if (!Number(number) || number.length < 10) {
      res.json({
        'alert': 'introduce un numero telefonico correcto'
      })
    } else {
      const users = collection(db, 'users')

      //verificar que el correo no exista en la collections
      getDoc(doc(users, email)).then( user =>{
        if(user.exists()) {
          res.json({
            'alert': 'El correo ya existe'
          })
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              req.body.password = hash

              //guardar en la db
              setDoc(doc(users, email), req.body).then( reg => {
                res.json({
                  'alert': 'success',
                  'data': reg
                })
              })
            })
          })
        }
      })
    }
  })

  app.get('/usuarios', (req, res) => {
    const users = collection(db, 'users')
    console.log('usuarios', users)
    res.json({
      'alert': 'success',
      users
    })
  })

  const PORT = process.env.PORT || 19000

  // Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando en el Puerto: ${PORT}`)
  })