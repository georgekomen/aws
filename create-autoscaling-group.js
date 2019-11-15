const AWS = require('aws-sdk')

AWS.config.update({ region: 'ap-southeast-1' })

const autoScaling = new AWS.AutoScaling()
const asgName = 'komen-asg'
const lcName = 'komenLC'
const policyName = 'komen-policy'
const tgArn = 'arn:aws:elasticloadbalancing:ap-southeast-1:102247403028:targetgroup/komen-tg/aa77d00b0023d9e6'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then(console.log)

function createAutoScalingGroup(asgName, lcName) {
    const params = {
        AutoScalingGroupName: asgName,
        AvailabilityZones: [
            'ap-southeast-1a',
            'ap-southeast-1b'
        ],
        TargetGroupARNs: [
            tgArn
        ],
        LaunchConfigurationName: lcName,
        MaxSize: 2,
        MinSize: 1
    }

    return new Promise((resolve, reject) => {
        autoScaling.createAutoScalingGroup(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createASGPolicy(asgName, policyName) {
    const params = {
        AdjustmentType: 'ChangeInCapacity',
        AutoScalingGroupNameGroupName: asgName,
        PolicyName: policyName,
        PolicyType: 'TargetTrackingScaling',
        TargetTrackingConfiguration: {
            TargetValue: 5,
            PredefinedMetricSpecification: {
                PredefinedMetricType: 'ASGAverageCPUUtilization'
            }
        }
    }

    return new Promise((resolve, reject) => {
        autoScaling.putScalingPolicy(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}