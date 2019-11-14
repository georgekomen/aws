const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'ap-southeast-1' })

const autoScaling = new AWS.AutoScaling()

const lcName = 'komenLC'
const roleName = 'komenRole'
const sgName = 'komen_sg'
const keyName = 'komen-keys'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(console.log)

function createLaunchConfiguration(lcName, profileArn) {
    const params = {
        IamInstanceProfile: profileArn, //associates our ec2 instances with roles to give it permissions
        ImageId: 'ami-01a2f9388de3f2540',
        InstanceType: 't2.micro',
        LaunchConfigurationName: lcName,
        KeyName: keyName,
        SecurityGroups: [
            sgName
        ],
        UserData: 'IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzgueCB8IHN1ZG8gYmFzaCAtCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzCnN1ZG8geXVtIGluc3RhbGwgLXkgZ2l0CmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0CmNkIGhiZmwKbnBtIGkKbnBtIHJ1biBzdGFydAoK'
    }

    return new Promise((resolve, reject) => {
        autoScaling.createLaunchConfiguration(params, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}