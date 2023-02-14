const express = require('express')
const bcrypt = require('bcrypt')
const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
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

  const PORT = process.env.PORT || 19000

  // Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando en el Puerto: ${PORT}`)
  })