const AWS = require('aws-sdk')

AWS.config.update({ region: 'ap-southeast-1' })

const s3 = new AWS.S3()

createBucket('komen-s3-2')
.then(console.log)

function createBucket(bucketName) {
    const params = {
        Bucket: bucketName,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3.createBucket(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}