import app from "./app"

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`meli-challenge-api app listening on port ${port}`)
})