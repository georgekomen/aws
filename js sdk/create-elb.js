const AWS  = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'ap-southeast-1' })

const elbv2 = new AWS.ELBv2()
const sgName = 'komen-elb-sg'
const tgName = 'komen-tg'
const elbName = 'komen-elb'
const vpcId = 'vpc-03cabecea6815b14c'
const subnets = [
    'subnet-01c75729028fc4c7b',
    'subnet-04a52c884ced2cdae',
    'subnet-0fe2ef79bef64e15c'
]

helpers.createSecurityGroup(sgName, 80)
.then((sgId) => Promise.all([
    createTargetGroup(tgName),
    createLoadBalancer(elbName, sgId)
]))
.then((results) => {
    const tgArn = results[0].TargetGroups[0].TargetGroupArn
    const lbArn = results[1].LoadBalancers[0].LoadBalancerArn
    console.log('Target group name : ', tgArn)
    return createListener(tgArn, lbArn)
})
.then(console.log)

function createLoadBalancer(elbName, sgId) {
    const params = {
        Name: elbName,
        Subnets: subnets,
        SecurityGroups: [
            sgId
        ]
    }

    return new Promise((resolve, reject) => {
        elbv2.createLoadBalancer(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createTargetGroup(tgName) {
    const params = {
        Name: tgName,
        Port: 3000,
        Protocol: 'HTTP',
        VpcId: vpcId
    }

    return new Promise((resolve, reject) => {
        elbv2.createTargetGroup(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createListener(tgArn, lbArn) {
    const params = {
        DefaultActions:[
            {
                TargetGroupArn: tgArn,
                Type: 'forward'
            }
        ],
        LoadBalancerArn: lbArn,
        Port: 80,
        Protocol: 'HTTP'
    }

    return new Promise((resolve, reject) => {
        elbv2.createListener(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}