const AWS = require('aws-sdk')

AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2()

function listInstances() {
    return new Promise((resolve, reject) => {
        ec2.describeInstances({}, (err, data) => {
            if (err) reject(err)
            else {
                resolve(data.Reservations.reduce((cum, res) => {
                    return cum.concat(res.Instances)
                }, []))
            } 
        })
    })
}

function terminateInstance(instanceId) {
    const params = {
        InstanceIds: [
            instanceId
        ]
    }

    return new Promise((resolve, reject) => {
        ec2.terminateInstances(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

listInstances()
.then(console.log)

terminateInstance('i-08bd6947d8c3c97f4')
.then(console.log)