**aws security**
- security in AWS is concerned with:
   - services access
   - software valnerability e.g. os & db engines and updates
   - permissions e.g. IAM

- AWS basic security responsibilities:
   - physical facilities maintenance and security
   - network infrustructure
   - virtualization infrustructure

- Types of services in AWS:
   - infrustructure services (EC2, VPC, EBS) - most security responsibilities on the customer
   - container services (EB, RDS) - aws manages most security concerns
   - abstracted services (SQS, DynamoDB) - aws owns nearly all security concerns

**security terms**
- CIA triad: 
   - confidentiality - securing access e.g. with IAM roles, Network ACLs, SGs
   - Integrity - keeping data from modification/deletion e.g. with backups, verifying with hashing
   - availability - data is available to authorised users, replication in AZs

- AAA
   - Authentication - determine if user is who they say they are
   - Authorization - permissions
   - Accounting - keeping a record of what a user does

**cloud formation**
- infrustructure as code
   - source control
   - less human error
   - simple resource re-creation

- 