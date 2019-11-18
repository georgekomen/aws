const AWS = require('aws-sdk')
const helpers = require('./helpers')
AWS.config.update({ region: 'ap-southeast-1' })

const s3 = new AWS.S3()
const bucketName = 'komen-s3-2'

helpers.getPublicFiles()
.then(files => uploadS3Objects(bucketName, files))
.then(console.log)

function uploadS3Objects (bucketName, files) {
    const params = {
        Bucket: bucketName,
        ACL: 'public-read'
    }

    const filePromise = files.map((file) => {
        const newParams = Object.assign({}, params, {
            Body: file.contents,
            Key: file.name,
            ContentType: helpers.getContentType(file.name)
        })

        return new Promise((resolve, reject) => {
            s3.putObject(newParams, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    })

    return Promise.all(filePromise)
}