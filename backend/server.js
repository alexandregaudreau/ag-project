const express = require('express')
const app = express()
const PORT = 5000

app.get('/', (req, res) => {
  res.json({ message: 'Backend fonctionnel' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
