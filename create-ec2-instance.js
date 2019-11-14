const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2()
const sgName = 'komen_sg'
const keyName = 'komen-keys'

// create in order
createSecurityGroup(sgName)
.then(() => {
    return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
    return createInstance(sgName, keyName)
})
.then((data) => {
    console.log('created instance with : ', data)
})

function createSecurityGroup(sgName) {
    const params = {
        Description: sgName,
        GroupName: sgName
    }

    return new Promise((resolve, reject) => {
        ec2.createSecurityGroup(params, (err, data) => {
            if (err) reject(err)
            else {
                const params = {
                    GroupId: data.GroupId,
                    IpPermissions: [
                        {
                            IpProtocol: 'tcp',
                            FromPort: 22,
                            ToPort: 22,
                            IpRanges: [
                                {
                                    CidrIp: '0.0.0.0/0'
                                }
                            ]
                        },
                        {
                            IpProtocol: 'tcp',
                            FromPort: 3000,
                            ToPort: 3000,
                            IpRanges: [
                                {
                                    CidrIp: '0.0.0.0/0'
                                }
                            ]
                        }
                    ]
                }
                ec2.authorizeClientVpnIngress(params, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            }
        })
    })
}