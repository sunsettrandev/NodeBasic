const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world! from Sunset')
})

app.listen(port, () => {
  console.log(port)
})