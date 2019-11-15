**EC2**
1.) aws provides a separation btwn the execution environment i.e cpu and the instance file system. File system can be from the following 3 options.
 - instance store volume -> physically connected, just like harddrive. they can't be reused by other instances.
 - elastic block storage (ebs) -> independent networked volumes. Can be reused by other instances and can live on even after terminating the instance.
 - elastic file system (efs) -> same as ebs only that it is scalable in size.

* ebs backed AMI can be stopped without loosing data unlike instance volume backed AMI that can only be restarted or terminated. It cannot be stopped.
* terminated instances cannot be restarted, stopped instances can be restarted
* ebs can boot faster. instance volume is slower to boot because the AMI data must be transfered from s3.

AMI visibility -> either public, explicit(visible to anyone with permissions) or implicit(only visible to you).

**ec2 classes**
Difines how the instance live
1.) on demand instances - scale up and down based on demand
2.) reserved instances - you commit for a period of btwn 1-3 yrs and can get upto 75% dicount
3.) spot instances - you bid on and uses spare, unused ec2 capacity. Its good for data processing or research job only becuase it's availability is not garanteed

* AWS sdk methods follow the pascalCase. Not CamelCase

* AMIs are region specific

* AMIs in the market place come with pre-installed softwares e.g. node

* AMIs are supper important as they can help you scale your instances up and down

* we create an AMI from a running instance, the user data does not persist though but you can introduce this from a launch config

2.) you can interact with aws services through their rest APIs, you however have to sign each request using aws credentials and add it as a query param in each request (multiple hashing levels, creating hmac). Because of the complexity of signing, aws created the aws sdk which is much easier to use.

3.) all services and resources in aws have limits that you should be aware of so that you don't get fixed in a corner. e.g. ec2 have limits on the number of running instances per region, also AMIs are stored as an ebs snapshot which have a limit of 10,000, also note that you pay for every ebs snapshot that you have.

4.) scalability is ability to increase or decrease the size / quantity of a resource in aws. elasticity is the ability of your resources to scale in response to stated criteria often triggered by cloudwatch alarms. Therefore scalability is required by elasticity

5.) launch config is a blueprint for creating an ec2 instance. It contains the AMI, instance type, sg and user data. It is used in conjuction with auto scaling groups

* roles gives instance permissions to talk to other services in aws

6.) elb is an essential resource for any elastic web app establishing a single entry point for web request that can handle any size load. 
- A target group is the destination defined where an elb will send requests into. Target groups are connected to auto scalling groups and ends up to be a group of ec2 instances
- listener facilitates sending requests between the elb port and the target group ports
