const mongoose = require('mongoose')

mongoose
  .connect(
    `mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/developer_exam`
  )
  .then(() => console.log('Connection Successfully'))
  .catch(err => console.error(err))
