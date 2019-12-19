const AWS = require('aws-sdk')

AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2()

createImage('i-0a73303d087eccdb4', 'komen-image')
.then(()=> console.log('complete'))

function createImage(seedInstanceId, imageName) {
    const params = {
        InstanceId: seedInstanceId,
        Name: imageName
    }

    return new Promise((resolve, reject) => {
        ec2.createImage(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}