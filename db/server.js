const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3001

const dbPath = path.join(__dirname, 'db.json')

app.use(cors()) // ← CORS ДЛЯ ВСЕХ
app.use(express.json())

const readDB = () =>
  JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

app.post('/analytics/users', (req, res) => {
  const db = readDB()
  res.json(db['analytics-users'])
})

app.get('/vuln/cred/1', (req, res) => {
  const db = readDB()
  res.json(db['vuln-cred-1'])
})

app.post('/analytics/hosts', (req, res) => {
  const db = readDB()
  res.json(db['analytics-hosts'])
})

app.post('/vuln', (req, res) => {
  const db = readDB()
  res.json(db['vuln'])
})

app.post('/attack', (req, res) => {
  const db = readDB()
  res.json(db['attack'])
})

app.listen(PORT, () => {
  console.log(`Mock API with CORS on http://localhost:${PORT}`)
})
