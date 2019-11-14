**EC2**
1.) aws provides a separation btwn the execution environment i.e cpu and the instance file system. File system can be from the following 3 options.
 - instance store volume -> physically connected, just like harddrive. they can't be reused by other instances.
 - elastic block storage (ebs) -> independent networked volumes. Can be reused by other instances and can live on even after terminating the instance.
 - elastic file system (efs) -> same as ebs only that it is scalable in size.

* ebs backed AMI can be stopped without loosing data unlike instance volume backed AMI that can only be restarted or terminated. It cannot be stopped.
* ebs can boot faster. instance volume is slower to boot because the AMI data must be transfered from s3.

AMI visibility -> either public, explicit(visible to anyone with permissions) or implicit(only visible to you).

**ec2 classes**
Difines how the instance live
1.) on demand instances - scale up and down based on demand
2.) reserved instances - you commit for a period of btwn 1-3 yrs and can get upto 75% dicount
3.) spot instances - you bid on and uses spare, unused ec2 capacity. Its good for data processing or research job only becuase it's availability is not garanteed

* AWS sdk methods follow the pascalCase. Not CamelCase

* AMIs are region specific

2.) you can interact with aws services through their rest APIs, you however have to sign each request using aws credentials and add it as a query param in each request (multiple hashing levels, creating hmac). Because of the complexity of signing, aws created the aws sdk which is much easier to use.