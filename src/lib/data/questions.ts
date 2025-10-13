import { Question, Domain, Difficulty } from "./types";

export const questions: Question[] = [
  // Cloud Concepts - Beginner (5 questions)
  {
    id: "cc-b-001",
    domain: "cloud-concepts",
    difficulty: "beginner",
    question: "What is the primary benefit of cloud computing?",
    options: [
      "Reduced operational overhead",
      "Increased server maintenance",
      "Higher upfront costs",
      "Limited scalability",
    ],
    correctAnswer: 0,
    explanation:
      "Cloud computing reduces operational overhead by eliminating the need to manage physical infrastructure, allowing organizations to focus on their core business.",
    tags: ["cloud-benefits", "operational-overhead"],
  },
  {
    id: "cc-b-002",
    domain: "cloud-concepts",
    difficulty: "beginner",
    question:
      "Which cloud deployment model allows organizations to share infrastructure with other organizations?",
    options: [
      "Private cloud",
      "Public cloud",
      "Hybrid cloud",
      "Community cloud",
    ],
    correctAnswer: 1,
    explanation:
      "Public cloud allows multiple organizations to share the same infrastructure, providing cost efficiency and scalability.",
    tags: ["deployment-models", "public-cloud"],
  },
  {
    id: "cc-b-003",
    domain: "cloud-concepts",
    difficulty: "beginner",
    question:
      'What does "pay-as-you-go" pricing model mean in cloud computing?',
    options: [
      "Pay a fixed monthly fee",
      "Pay only for what you use",
      "Pay upfront for the entire year",
      "Pay based on number of users",
    ],
    correctAnswer: 1,
    explanation:
      "Pay-as-you-go means you only pay for the resources you actually consume, providing cost efficiency and flexibility.",
    tags: ["pricing-models", "pay-as-you-go"],
  },
  {
    id: "cc-b-004",
    domain: "cloud-concepts",
    difficulty: "beginner",
    question:
      "Which characteristic of cloud computing allows resources to be automatically adjusted based on demand?",
    options: [
      "On-demand self-service",
      "Broad network access",
      "Rapid elasticity",
      "Resource pooling",
    ],
    correctAnswer: 2,
    explanation:
      "Rapid elasticity allows cloud resources to be automatically scaled up or down based on demand, providing optimal performance and cost efficiency.",
    tags: ["cloud-characteristics", "elasticity"],
  },
  {
    id: "cc-b-005",
    domain: "cloud-concepts",
    difficulty: "beginner",
    question:
      "What is the main advantage of using AWS over traditional on-premises infrastructure?",
    options: [
      "Higher initial investment",
      "Limited global presence",
      "Faster time to market",
      "More complex management",
    ],
    correctAnswer: 2,
    explanation:
      "AWS enables faster time to market by providing instant access to infrastructure and services without the need for procurement and setup delays.",
    tags: ["aws-benefits", "time-to-market"],
  },

  // Cloud Concepts - Intermediate (10 questions)
  {
    id: "cc-i-001",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "Which AWS service provides a global content delivery network?",
    options: [
      "Amazon S3",
      "Amazon CloudFront",
      "Amazon Route 53",
      "Amazon VPC",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon CloudFront is AWS's global content delivery network (CDN) service that delivers content to users with low latency.",
    tags: ["cloudfront", "cdn", "global-services"],
  },
  {
    id: "cc-i-002",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question:
      "What is the difference between horizontal and vertical scaling in cloud computing?",
    options: [
      "Horizontal scaling adds more servers, vertical scaling increases server capacity",
      "Vertical scaling adds more servers, horizontal scaling increases server capacity",
      "Both terms mean the same thing",
      "Horizontal scaling is for storage, vertical scaling is for compute",
    ],
    correctAnswer: 0,
    explanation:
      "Horizontal scaling (scaling out) adds more servers to handle increased load, while vertical scaling (scaling up) increases the capacity of existing servers.",
    tags: ["scaling", "horizontal-scaling", "vertical-scaling"],
  },
  {
    id: "cc-i-003",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "Which AWS service is best for hosting static websites?",
    options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon Lambda"],
    correctAnswer: 1,
    explanation:
      "Amazon S3 is ideal for hosting static websites as it provides high availability, durability, and cost-effective storage for static content.",
    tags: ["s3", "static-websites", "hosting"],
  },
  {
    id: "cc-i-004",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Availability Zones?",
    options: [
      "To provide different pricing tiers",
      "To isolate resources from each other",
      "To provide fault tolerance and high availability",
      "To organize resources by geographic region",
    ],
    correctAnswer: 2,
    explanation:
      "Availability Zones are physically separate data centers within a region that provide fault tolerance and high availability for applications.",
    tags: ["availability-zones", "high-availability", "fault-tolerance"],
  },
  {
    id: "cc-i-005",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question:
      "Which cloud service model provides the most control over the underlying infrastructure?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Function as a Service (FaaS)",
    ],
    correctAnswer: 2,
    explanation:
      "Infrastructure as a Service (IaaS) provides the most control over the underlying infrastructure, allowing users to manage operating systems, applications, and data.",
    tags: ["service-models", "iaas", "control"],
  },
  {
    id: "cc-i-006",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "What is the primary benefit of using AWS Auto Scaling?",
    options: [
      "Reduced security risks",
      "Automatic cost optimization",
      "Improved application performance",
      "Enhanced data encryption",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Auto Scaling automatically adjusts the number of instances based on demand, ensuring optimal performance while minimizing costs.",
    tags: ["auto-scaling", "cost-optimization", "performance"],
  },
  {
    id: "cc-i-007",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "Which AWS service provides managed database services?",
    options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon CloudFront"],
    correctAnswer: 2,
    explanation:
      "Amazon RDS (Relational Database Service) provides managed database services for various database engines like MySQL, PostgreSQL, and SQL Server.",
    tags: ["rds", "managed-databases", "database-services"],
  },
  {
    id: "cc-i-008",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question:
      "What is the difference between AWS Regions and Availability Zones?",
    options: [
      "Regions are smaller than Availability Zones",
      "Regions contain multiple Availability Zones",
      "Availability Zones are global, Regions are local",
      "They are the same thing with different names",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Regions are geographic areas that contain multiple Availability Zones, which are physically separate data centers within that region.",
    tags: ["regions", "availability-zones", "geography"],
  },
  {
    id: "cc-i-009",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question: "Which AWS service is used for serverless computing?",
    options: ["Amazon EC2", "Amazon Lambda", "Amazon ECS", "Amazon EKS"],
    correctAnswer: 1,
    explanation:
      "Amazon Lambda is AWS's serverless computing service that allows you to run code without provisioning or managing servers.",
    tags: ["lambda", "serverless", "compute"],
  },
  {
    id: "cc-i-010",
    domain: "cloud-concepts",
    difficulty: "intermediate",
    question:
      "What is the primary advantage of using AWS over building your own data center?",
    options: [
      "Lower security",
      "Higher upfront costs",
      "Faster deployment and scalability",
      "More complex management",
    ],
    correctAnswer: 2,
    explanation:
      "AWS provides faster deployment and scalability compared to building your own data center, allowing businesses to respond quickly to changing demands.",
    tags: ["aws-advantages", "deployment", "scalability"],
  },

  // Cloud Concepts - Advanced (5 questions)
  {
    id: "cc-a-001",
    domain: "cloud-concepts",
    difficulty: "advanced",
    question:
      "What is the difference between AWS Well-Architected Framework pillars and how do they relate to cloud economics?",
    options: [
      "They are unrelated to cost optimization",
      "They provide guidance for cost-effective, secure, and reliable architectures",
      "They only focus on security aspects",
      "They are outdated and not relevant",
    ],
    correctAnswer: 1,
    explanation:
      "The AWS Well-Architected Framework provides guidance across five pillars (operational excellence, security, reliability, performance efficiency, and cost optimization) to help build cost-effective, secure, and reliable cloud architectures.",
    tags: ["well-architected", "cost-optimization", "architecture"],
  },
  {
    id: "cc-a-002",
    domain: "cloud-concepts",
    difficulty: "advanced",
    question:
      "How does AWS's global infrastructure support disaster recovery strategies?",
    options: [
      "It only provides local backup solutions",
      "It enables multi-region deployments for business continuity",
      "It limits data replication to single regions",
      "It doesn't support disaster recovery",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's global infrastructure with multiple regions and Availability Zones enables organizations to implement comprehensive disaster recovery strategies with multi-region deployments.",
    tags: ["disaster-recovery", "multi-region", "business-continuity"],
  },
  {
    id: "cc-a-003",
    domain: "cloud-concepts",
    difficulty: "advanced",
    question:
      "What is the significance of AWS's shared responsibility model in cloud security?",
    options: [
      "AWS is responsible for all security aspects",
      "It clearly defines security responsibilities between AWS and customers",
      "It only applies to compliance requirements",
      "It's not relevant for security planning",
    ],
    correctAnswer: 1,
    explanation:
      "The shared responsibility model clearly defines what AWS is responsible for (security of the cloud) versus what customers are responsible for (security in the cloud), enabling proper security planning.",
    tags: ["shared-responsibility", "security-model", "compliance"],
  },
  {
    id: "cc-a-004",
    domain: "cloud-concepts",
    difficulty: "advanced",
    question:
      "How does AWS's pricing model support different business models and use cases?",
    options: [
      "It only offers fixed pricing",
      "It provides multiple pricing options to match different usage patterns",
      "It doesn't consider business model differences",
      "It only supports enterprise customers",
    ],
    correctAnswer: 1,
    explanation:
      "AWS offers multiple pricing models (on-demand, reserved instances, spot instances, savings plans) to support different business models and usage patterns, from startups to enterprises.",
    tags: ["pricing-models", "business-models", "cost-optimization"],
  },
  {
    id: "cc-a-005",
    domain: "cloud-concepts",
    difficulty: "advanced",
    question:
      "What role does AWS's innovation cycle play in competitive advantage for businesses?",
    options: [
      "It has no impact on business competitiveness",
      "It enables businesses to leverage cutting-edge technology without R&D investment",
      "It only benefits large enterprises",
      "It creates vendor lock-in issues",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's rapid innovation cycle allows businesses to leverage cutting-edge technology and services without significant R&D investment, providing competitive advantages through faster time-to-market.",
    tags: ["innovation", "competitive-advantage", "rd-investment"],
  },

  // Security & Compliance - Beginner (8 questions)
  {
    id: "sc-b-001",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "What is the AWS shared responsibility model?",
    options: [
      "AWS is responsible for all security",
      "Customer is responsible for all security",
      "Security responsibilities are shared between AWS and the customer",
      "Security is handled by third-party vendors",
    ],
    correctAnswer: 2,
    explanation:
      "The shared responsibility model divides security responsibilities: AWS is responsible for security OF the cloud (infrastructure), while customers are responsible for security IN the cloud (data, applications, access management).",
    tags: ["shared-responsibility", "security-model"],
  },
  {
    id: "sc-b-002",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "Which AWS service provides identity and access management?",
    options: ["Amazon S3", "AWS IAM", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "AWS IAM (Identity and Access Management) is the service that controls access to AWS resources by managing users, groups, roles, and permissions.",
    tags: ["iam", "identity-management", "access-control"],
  },
  {
    id: "sc-b-003",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "What is the principle of least privilege in AWS security?",
    options: [
      "Give users maximum access to all resources",
      "Give users only the minimum access they need to perform their job",
      "Give all users the same level of access",
      "Access control is not important in AWS",
    ],
    correctAnswer: 1,
    explanation:
      "The principle of least privilege means granting users only the minimum permissions necessary to perform their required tasks, reducing the risk of unauthorized access or accidental damage.",
    tags: ["least-privilege", "access-control", "security-principles"],
  },
  {
    id: "sc-b-004",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "Which AWS service helps protect against DDoS attacks?",
    options: ["Amazon S3", "AWS Shield", "Amazon EC2", "Amazon CloudFront"],
    correctAnswer: 1,
    explanation:
      "AWS Shield is a managed DDoS protection service that safeguards applications running on AWS against distributed denial of service attacks.",
    tags: ["aws-shield", "ddos-protection", "security-services"],
  },
  {
    id: "sc-b-005",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "What is multi-factor authentication (MFA) in AWS?",
    options: [
      "Using multiple AWS accounts",
      "Using multiple passwords",
      "Using an additional authentication factor beyond username and password",
      "Using multiple regions",
    ],
    correctAnswer: 2,
    explanation:
      "Multi-factor authentication (MFA) requires users to provide an additional authentication factor (like a code from a mobile device) beyond their username and password, significantly enhancing security.",
    tags: ["mfa", "multi-factor-authentication", "security-enhancement"],
  },
  {
    id: "sc-b-006",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "Which AWS service provides encryption for data at rest?",
    options: ["AWS IAM", "AWS KMS", "Amazon S3", "Amazon EC2"],
    correctAnswer: 1,
    explanation:
      "AWS KMS (Key Management Service) provides encryption for data at rest by managing encryption keys used to encrypt and decrypt data stored in AWS services.",
    tags: ["kms", "encryption", "data-at-rest"],
  },
  {
    id: "sc-b-007",
    domain: "security-compliance",
    difficulty: "beginner",
    question: "What is the purpose of AWS CloudTrail?",
    options: [
      "To monitor application performance",
      "To track API calls and changes to AWS resources",
      "To manage user access",
      "To encrypt data",
    ],
    correctAnswer: 1,
    explanation:
      "AWS CloudTrail tracks API calls and changes made to AWS resources, providing audit logs for security analysis, compliance, and troubleshooting.",
    tags: ["cloudtrail", "audit-logging", "api-tracking"],
  },
  {
    id: "sc-b-008",
    domain: "security-compliance",
    difficulty: "beginner",
    question:
      "Which AWS service helps ensure compliance with industry standards?",
    options: ["Amazon S3", "AWS Config", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "AWS Config helps ensure compliance by continuously monitoring and recording AWS resource configurations and changes, enabling compliance auditing and governance.",
    tags: ["aws-config", "compliance", "governance"],
  },

  // Security & Compliance - Intermediate (12 questions)
  {
    id: "sc-i-001",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "What is the difference between AWS IAM users and roles?",
    options: [
      "Users are for applications, roles are for people",
      "Users are permanent identities, roles are temporary credentials",
      "There is no difference",
      "Users are free, roles cost money",
    ],
    correctAnswer: 1,
    explanation:
      "IAM users are permanent identities for people or applications, while IAM roles provide temporary credentials that can be assumed by users, applications, or AWS services.",
    tags: ["iam-users", "iam-roles", "temporary-credentials"],
  },
  {
    id: "sc-i-002",
    domain: "security-compliance",
    difficulty: "intermediate",
    question:
      "Which AWS service provides web application firewall capabilities?",
    options: ["AWS Shield", "AWS WAF", "Amazon CloudFront", "AWS IAM"],
    correctAnswer: 1,
    explanation:
      "AWS WAF (Web Application Firewall) protects web applications from common web exploits and attacks by filtering and monitoring HTTP/HTTPS requests.",
    tags: ["aws-waf", "web-application-firewall", "web-security"],
  },
  {
    id: "sc-i-003",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Secrets Manager?",
    options: [
      "To store user passwords",
      "To manage and rotate secrets like database passwords and API keys",
      "To encrypt data at rest",
      "To manage user access",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Secrets Manager helps protect secrets like database passwords, API keys, and other sensitive information by storing them securely and automatically rotating them.",
    tags: ["secrets-manager", "secret-rotation", "credential-management"],
  },
  {
    id: "sc-i-004",
    domain: "security-compliance",
    difficulty: "intermediate",
    question:
      "Which AWS service provides security assessment and recommendations?",
    options: [
      "AWS Config",
      "AWS Trusted Advisor",
      "Amazon GuardDuty",
      "AWS Security Hub",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Trusted Advisor provides security assessment and recommendations to help optimize AWS infrastructure, security, and costs.",
    tags: ["trusted-advisor", "security-assessment", "recommendations"],
  },
  {
    id: "sc-i-005",
    domain: "security-compliance",
    difficulty: "intermediate",
    question:
      "What is the difference between AWS Shield Standard and AWS Shield Advanced?",
    options: [
      "Standard is for small businesses, Advanced is for enterprises",
      "Standard provides basic DDoS protection, Advanced provides enhanced protection with additional features",
      "There is no difference",
      "Standard is free, Advanced costs the same as Standard",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Shield Standard provides basic DDoS protection at no cost, while AWS Shield Advanced offers enhanced protection with additional features like advanced attack diagnostics and DDoS response team support.",
    tags: [
      "aws-shield",
      "ddos-protection",
      "shield-standard",
      "shield-advanced",
    ],
  },
  {
    id: "sc-i-006",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "Which AWS service provides threat detection and monitoring?",
    options: ["AWS CloudTrail", "Amazon GuardDuty", "AWS Config", "AWS IAM"],
    correctAnswer: 1,
    explanation:
      "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior in AWS accounts.",
    tags: ["guardduty", "threat-detection", "security-monitoring"],
  },
  {
    id: "sc-i-007",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Security Hub?",
    options: [
      "To manage user access",
      "To provide a centralized view of security findings across AWS accounts",
      "To encrypt data",
      "To monitor application performance",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Security Hub provides a centralized view of security findings from multiple AWS services and third-party tools, enabling comprehensive security monitoring.",
    tags: ["security-hub", "centralized-security", "security-findings"],
  },
  {
    id: "sc-i-008",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "Which AWS service helps with compliance reporting and auditing?",
    options: ["AWS CloudTrail", "AWS Config", "Amazon GuardDuty", "AWS IAM"],
    correctAnswer: 1,
    explanation:
      "AWS Config helps with compliance reporting and auditing by continuously monitoring and recording AWS resource configurations and changes.",
    tags: ["aws-config", "compliance-reporting", "auditing"],
  },
  {
    id: "sc-i-009",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Certificate Manager?",
    options: [
      "To manage user certificates",
      "To provision, manage, and deploy SSL/TLS certificates",
      "To encrypt data at rest",
      "To manage user access",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Certificate Manager (ACM) helps provision, manage, and deploy SSL/TLS certificates for use with AWS services and internal resources.",
    tags: ["certificate-manager", "ssl-tls", "certificate-management"],
  },
  {
    id: "sc-i-010",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "Which AWS service provides network security and access control?",
    options: ["AWS IAM", "Amazon VPC", "Amazon S3", "Amazon EC2"],
    correctAnswer: 1,
    explanation:
      "Amazon VPC (Virtual Private Cloud) provides network security and access control by creating isolated network environments with configurable security groups and network ACLs.",
    tags: ["vpc", "network-security", "access-control"],
  },
  {
    id: "sc-i-011",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Artifact?",
    options: [
      "To store application artifacts",
      "To provide on-demand access to AWS compliance reports and agreements",
      "To manage user access",
      "To encrypt data",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Artifact provides on-demand access to AWS compliance reports, certifications, and agreements to help customers meet their compliance requirements.",
    tags: ["aws-artifact", "compliance-reports", "certifications"],
  },
  {
    id: "sc-i-012",
    domain: "security-compliance",
    difficulty: "intermediate",
    question: "Which AWS service provides data loss prevention capabilities?",
    options: ["Amazon S3", "Amazon Macie", "AWS IAM", "Amazon GuardDuty"],
    correctAnswer: 1,
    explanation:
      "Amazon Macie provides data loss prevention capabilities by automatically discovering, classifying, and protecting sensitive data in AWS.",
    tags: ["macie", "data-loss-prevention", "data-classification"],
  },

  // Security & Compliance - Advanced (5 questions)
  {
    id: "sc-a-001",
    domain: "security-compliance",
    difficulty: "advanced",
    question:
      "How does AWS's compliance program support organizations with regulatory requirements?",
    options: [
      "It only supports basic security requirements",
      "It provides comprehensive compliance frameworks and certifications for various industries",
      "It doesn't address regulatory requirements",
      "It only applies to US-based organizations",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's compliance program provides comprehensive frameworks and certifications (SOC, PCI DSS, HIPAA, GDPR, etc.) to help organizations meet various regulatory requirements across industries.",
    tags: ["compliance-program", "regulatory-requirements", "certifications"],
  },
  {
    id: "sc-a-002",
    domain: "security-compliance",
    difficulty: "advanced",
    question:
      "What is the significance of AWS's data residency and sovereignty capabilities?",
    options: [
      "They have no impact on data governance",
      "They enable organizations to control where their data is stored and processed",
      "They only apply to large enterprises",
      "They create security vulnerabilities",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's data residency and sovereignty capabilities enable organizations to control where their data is stored and processed, helping meet data governance and regulatory requirements.",
    tags: ["data-residency", "data-sovereignty", "data-governance"],
  },
  {
    id: "sc-a-003",
    domain: "security-compliance",
    difficulty: "advanced",
    question: "How does AWS's zero-trust security model work in practice?",
    options: [
      "It trusts all network traffic by default",
      "It implements continuous verification and least-privilege access principles",
      "It only applies to external threats",
      "It doesn't exist in AWS",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's zero-trust security model implements continuous verification and least-privilege access principles, never trusting and always verifying every access request.",
    tags: ["zero-trust", "continuous-verification", "least-privilege"],
  },
  {
    id: "sc-a-004",
    domain: "security-compliance",
    difficulty: "advanced",
    question:
      "What role does AWS's security automation play in incident response?",
    options: [
      "It has no role in incident response",
      "It enables rapid detection, response, and remediation of security incidents",
      "It only applies to manual processes",
      "It creates security delays",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's security automation enables rapid detection, response, and remediation of security incidents through automated threat detection, response workflows, and remediation actions.",
    tags: ["security-automation", "incident-response", "threat-detection"],
  },
  {
    id: "sc-a-005",
    domain: "security-compliance",
    difficulty: "advanced",
    question:
      "How does AWS's encryption strategy protect data throughout its lifecycle?",
    options: [
      "It only protects data at rest",
      "It provides comprehensive encryption for data at rest, in transit, and in use",
      "It only applies to sensitive data",
      "It creates performance issues",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's encryption strategy provides comprehensive protection for data at rest, in transit, and in use throughout its entire lifecycle, ensuring data security at all stages.",
    tags: ["encryption-strategy", "data-lifecycle", "comprehensive-protection"],
  },

  // Technology & Services - Beginner (10 questions)
  {
    id: "ts-b-001",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon EC2?",
    options: [
      "A database service",
      "A virtual server in the cloud",
      "A storage service",
      "A networking service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud, allowing you to run applications on virtual machines.",
    tags: ["ec2", "virtual-servers", "compute"],
  },
  {
    id: "ts-b-002",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon S3 used for?",
    options: [
      "Running applications",
      "Storing and retrieving data",
      "Managing databases",
      "Networking",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon S3 (Simple Storage Service) is used for storing and retrieving any amount of data at any time from anywhere on the web.",
    tags: ["s3", "storage", "data-retrieval"],
  },
  {
    id: "ts-b-003",
    domain: "technology-services",
    difficulty: "beginner",
    question: "Which AWS service is used for relational databases?",
    options: ["Amazon S3", "Amazon RDS", "Amazon EC2", "Amazon Lambda"],
    correctAnswer: 1,
    explanation:
      "Amazon RDS (Relational Database Service) is used for relational databases, providing managed database services for MySQL, PostgreSQL, SQL Server, and other engines.",
    tags: ["rds", "relational-databases", "managed-databases"],
  },
  {
    id: "ts-b-004",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon Lambda?",
    options: [
      "A database service",
      "A serverless compute service",
      "A storage service",
      "A networking service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon Lambda is a serverless compute service that runs code in response to events without requiring you to provision or manage servers.",
    tags: ["lambda", "serverless", "compute"],
  },
  {
    id: "ts-b-005",
    domain: "technology-services",
    difficulty: "beginner",
    question:
      "Which AWS service provides content delivery network capabilities?",
    options: ["Amazon S3", "Amazon CloudFront", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "Amazon CloudFront is a content delivery network (CDN) service that delivers content to users with low latency and high transfer speeds.",
    tags: ["cloudfront", "cdn", "content-delivery"],
  },
  {
    id: "ts-b-006",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon VPC?",
    options: [
      "A database service",
      "A virtual private cloud for networking",
      "A storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon VPC (Virtual Private Cloud) provides a virtual network environment where you can launch AWS resources in a logically isolated section of the AWS cloud.",
    tags: ["vpc", "virtual-private-cloud", "networking"],
  },
  {
    id: "ts-b-007",
    domain: "technology-services",
    difficulty: "beginner",
    question: "Which AWS service is used for load balancing?",
    options: [
      "Amazon S3",
      "Elastic Load Balancing (ELB)",
      "Amazon EC2",
      "Amazon RDS",
    ],
    correctAnswer: 1,
    explanation:
      "Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as EC2 instances.",
    tags: ["elb", "load-balancing", "traffic-distribution"],
  },
  {
    id: "ts-b-008",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon Route 53?",
    options: [
      "A database service",
      "A DNS and domain name service",
      "A storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon Route 53 is a scalable DNS and domain name service that routes end users to internet applications.",
    tags: ["route53", "dns", "domain-name-service"],
  },
  {
    id: "ts-b-009",
    domain: "technology-services",
    difficulty: "beginner",
    question: "Which AWS service is used for monitoring and observability?",
    options: ["Amazon S3", "Amazon CloudWatch", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "Amazon CloudWatch provides monitoring and observability for AWS resources and applications, collecting and tracking metrics, logs, and events.",
    tags: ["cloudwatch", "monitoring", "observability"],
  },
  {
    id: "ts-b-010",
    domain: "technology-services",
    difficulty: "beginner",
    question: "What is Amazon EBS?",
    options: [
      "A database service",
      "Block storage for EC2 instances",
      "A networking service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon EBS (Elastic Block Store) provides persistent block storage volumes for use with EC2 instances.",
    tags: ["ebs", "block-storage", "persistent-storage"],
  },

  // Technology & Services - Intermediate (15 questions)
  {
    id: "ts-i-001",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is the difference between Amazon S3 and Amazon EBS?",
    options: [
      "S3 is for block storage, EBS is for object storage",
      "S3 is for object storage, EBS is for block storage",
      "They are the same service",
      "S3 is for compute, EBS is for storage",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon S3 is for object storage (files, images, documents), while Amazon EBS is for block storage (databases, file systems) attached to EC2 instances.",
    tags: ["s3", "ebs", "object-storage", "block-storage"],
  },
  {
    id: "ts-i-002",
    domain: "technology-services",
    difficulty: "intermediate",
    question:
      "Which AWS service is best for running containerized applications?",
    options: ["Amazon EC2", "Amazon ECS", "Amazon S3", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "Amazon ECS (Elastic Container Service) is a fully managed container orchestration service that makes it easy to run containerized applications.",
    tags: ["ecs", "containers", "container-orchestration"],
  },
  {
    id: "ts-i-003",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Auto Scaling?",
    options: [
      "To automatically scale storage capacity",
      "To automatically adjust the number of EC2 instances based on demand",
      "To automatically scale database connections",
      "To automatically scale network bandwidth",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Auto Scaling automatically adjusts the number of EC2 instances based on demand to maintain application availability and optimize costs.",
    tags: ["auto-scaling", "ec2-instances", "demand-scaling"],
  },
  {
    id: "ts-i-004",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service provides managed Kubernetes?",
    options: ["Amazon ECS", "Amazon EKS", "Amazon EC2", "Amazon Lambda"],
    correctAnswer: 1,
    explanation:
      "Amazon EKS (Elastic Kubernetes Service) is a managed Kubernetes service that makes it easy to run Kubernetes on AWS.",
    tags: ["eks", "kubernetes", "managed-kubernetes"],
  },
  {
    id: "ts-i-005",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is Amazon DynamoDB?",
    options: [
      "A relational database",
      "A NoSQL database service",
      "A file storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.",
    tags: ["dynamodb", "nosql", "managed-database"],
  },
  {
    id: "ts-i-006",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service is used for message queuing?",
    options: ["Amazon S3", "Amazon SQS", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "Amazon SQS (Simple Queue Service) is a fully managed message queuing service that enables you to decouple and scale microservices.",
    tags: ["sqs", "message-queuing", "microservices"],
  },
  {
    id: "ts-i-007",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is Amazon SNS used for?",
    options: [
      "Storing data",
      "Publishing and subscribing to messages",
      "Running applications",
      "Managing databases",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon SNS (Simple Notification Service) is a fully managed messaging service for both application-to-application and application-to-person communication.",
    tags: ["sns", "notifications", "messaging"],
  },
  {
    id: "ts-i-008",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service provides data warehousing capabilities?",
    options: ["Amazon RDS", "Amazon Redshift", "Amazon DynamoDB", "Amazon S3"],
    correctAnswer: 1,
    explanation:
      "Amazon Redshift is a fully managed data warehouse service that makes it simple and cost-effective to analyze all your data using standard SQL.",
    tags: ["redshift", "data-warehouse", "analytics"],
  },
  {
    id: "ts-i-009",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is Amazon ElastiCache?",
    options: [
      "A database service",
      "An in-memory caching service",
      "A storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon ElastiCache is a fully managed in-memory caching service that improves application performance by retrieving information from fast, managed, in-memory caches.",
    tags: ["elasticache", "caching", "in-memory"],
  },
  {
    id: "ts-i-010",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service is used for data migration?",
    options: [
      "Amazon S3",
      "AWS Database Migration Service (DMS)",
      "Amazon EC2",
      "Amazon RDS",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Database Migration Service (DMS) helps you migrate databases to AWS quickly and securely, with minimal downtime.",
    tags: ["dms", "database-migration", "data-migration"],
  },
  {
    id: "ts-i-011",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is Amazon API Gateway?",
    options: [
      "A database service",
      "A fully managed service for creating, publishing, and managing APIs",
      "A storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs.",
    tags: ["api-gateway", "api-management", "rest-apis"],
  },
  {
    id: "ts-i-012",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service provides serverless data processing?",
    options: ["Amazon EC2", "AWS Glue", "Amazon S3", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development.",
    tags: ["glue", "data-processing", "serverless"],
  },
  {
    id: "ts-i-013",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is Amazon Kinesis used for?",
    options: [
      "Storing data",
      "Processing streaming data in real-time",
      "Running applications",
      "Managing databases",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information.",
    tags: ["kinesis", "streaming-data", "real-time-processing"],
  },
  {
    id: "ts-i-014",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "Which AWS service provides machine learning capabilities?",
    options: ["Amazon S3", "Amazon SageMaker", "Amazon EC2", "Amazon RDS"],
    correctAnswer: 1,
    explanation:
      "Amazon SageMaker is a fully managed machine learning service that provides every developer and data scientist with the ability to build, train, and deploy machine learning models.",
    tags: ["sagemaker", "machine-learning", "ml-models"],
  },
  {
    id: "ts-i-015",
    domain: "technology-services",
    difficulty: "intermediate",
    question: "What is AWS Step Functions?",
    options: [
      "A database service",
      "A serverless orchestration service for workflows",
      "A storage service",
      "A compute service",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Step Functions is a serverless orchestration service that lets you coordinate multiple AWS services into serverless workflows.",
    tags: ["step-functions", "workflow-orchestration", "serverless"],
  },

  // Technology & Services - Advanced (5 questions)
  {
    id: "ts-a-001",
    domain: "technology-services",
    difficulty: "advanced",
    question:
      "How does AWS's serverless architecture enable event-driven computing?",
    options: [
      "It only supports traditional request-response patterns",
      "It enables automatic scaling and execution based on events without server management",
      "It requires manual server provisioning",
      "It doesn't support event-driven patterns",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's serverless architecture (Lambda, API Gateway, EventBridge) enables event-driven computing by automatically executing code in response to events without requiring server management.",
    tags: ["serverless-architecture", "event-driven", "lambda"],
  },
  {
    id: "ts-a-002",
    domain: "technology-services",
    difficulty: "advanced",
    question:
      "What is the significance of AWS's multi-region architecture for global applications?",
    options: [
      "It only provides local benefits",
      "It enables low latency, high availability, and disaster recovery across geographic regions",
      "It creates complexity without benefits",
      "It only applies to large enterprises",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's multi-region architecture enables low latency, high availability, and disaster recovery for global applications by distributing resources across multiple geographic regions.",
    tags: ["multi-region", "global-applications", "disaster-recovery"],
  },
  {
    id: "ts-a-003",
    domain: "technology-services",
    difficulty: "advanced",
    question:
      "How does AWS's data lake architecture support big data analytics?",
    options: [
      "It only supports small datasets",
      "It provides scalable storage and processing for large-scale data analytics",
      "It doesn't support analytics",
      "It only applies to structured data",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's data lake architecture (S3, Glue, Athena, Redshift) provides scalable storage and processing capabilities for large-scale data analytics across structured and unstructured data.",
    tags: ["data-lake", "big-data", "analytics"],
  },
  {
    id: "ts-a-004",
    domain: "technology-services",
    difficulty: "advanced",
    question:
      "What role does AWS's microservices architecture play in application modernization?",
    options: [
      "It has no role in modernization",
      "It enables scalable, maintainable, and independently deployable application components",
      "It only applies to new applications",
      "It creates unnecessary complexity",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's microservices architecture (ECS, EKS, Lambda, API Gateway) enables scalable, maintainable, and independently deployable application components, supporting application modernization.",
    tags: ["microservices", "application-modernization", "scalability"],
  },
  {
    id: "ts-a-005",
    domain: "technology-services",
    difficulty: "advanced",
    question:
      "How does AWS's AI/ML services democratize machine learning for organizations?",
    options: [
      "They only benefit data scientists",
      "They provide pre-built models and tools that make ML accessible to developers and businesses",
      "They don't support machine learning",
      "They only apply to large datasets",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's AI/ML services (SageMaker, Comprehend, Rekognition, etc.) democratize machine learning by providing pre-built models and tools that make ML accessible to developers and businesses without deep ML expertise.",
    tags: ["ai-ml-services", "democratization", "pre-built-models"],
  },

  // Billing & Pricing - Beginner (3 questions)
  {
    id: "bp-b-001",
    domain: "billing-pricing",
    difficulty: "beginner",
    question: "What is the AWS Free Tier?",
    options: [
      "A paid service tier",
      "A limited-time offer for new customers",
      "A set of services that can be used for free within certain limits",
      "A premium service tier",
    ],
    correctAnswer: 2,
    explanation:
      "The AWS Free Tier provides a set of services that can be used for free within certain limits, helping new customers get started with AWS services.",
    tags: ["free-tier", "pricing", "new-customers"],
  },
  {
    id: "bp-b-002",
    domain: "billing-pricing",
    difficulty: "beginner",
    question:
      "What is the difference between On-Demand and Reserved Instances?",
    options: [
      "On-Demand is more expensive, Reserved Instances are cheaper with commitment",
      "Reserved Instances are more expensive, On-Demand is cheaper",
      "There is no difference in pricing",
      "On-Demand is for storage, Reserved Instances are for compute",
    ],
    correctAnswer: 0,
    explanation:
      "On-Demand instances are more expensive but provide flexibility, while Reserved Instances offer significant cost savings in exchange for a commitment to use the instance for a specific term.",
    tags: ["on-demand", "reserved-instances", "pricing-models"],
  },
  {
    id: "bp-b-003",
    domain: "billing-pricing",
    difficulty: "beginner",
    question: "What is AWS Cost Explorer?",
    options: [
      "A service for exploring AWS regions",
      "A tool for analyzing and visualizing AWS costs and usage",
      "A service for exploring AWS services",
      "A tool for exploring AWS documentation",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Cost Explorer is a tool that helps you analyze and visualize your AWS costs and usage over time, enabling better cost management and optimization.",
    tags: ["cost-explorer", "cost-analysis", "cost-visualization"],
  },

  // Billing & Pricing - Intermediate (4 questions)
  {
    id: "bp-i-001",
    domain: "billing-pricing",
    difficulty: "intermediate",
    question: "What are AWS Savings Plans?",
    options: [
      "A way to save money on storage",
      "A flexible pricing model that provides savings in exchange for commitment to consistent usage",
      "A way to save money on networking",
      "A way to save money on security services",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Savings Plans provide significant savings in exchange for a commitment to consistent usage of compute services, offering more flexibility than Reserved Instances.",
    tags: ["savings-plans", "pricing-model", "cost-savings"],
  },
  {
    id: "bp-i-002",
    domain: "billing-pricing",
    difficulty: "intermediate",
    question: "What is the purpose of AWS Budgets?",
    options: [
      "To track AWS service usage",
      "To set custom cost and usage budgets and receive alerts when thresholds are exceeded",
      "To manage AWS resources",
      "To monitor AWS performance",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Budgets allows you to set custom cost and usage budgets and receive alerts when your costs or usage exceed (or are forecasted to exceed) your budgeted amount.",
    tags: ["aws-budgets", "cost-alerts", "budget-management"],
  },
  {
    id: "bp-i-003",
    domain: "billing-pricing",
    difficulty: "intermediate",
    question: "What are Spot Instances?",
    options: [
      "Premium EC2 instances",
      "EC2 instances that can be purchased at a discount when AWS has spare capacity",
      "EC2 instances that are always available",
      "EC2 instances that are only available in certain regions",
    ],
    correctAnswer: 1,
    explanation:
      "Spot Instances are EC2 instances that can be purchased at a significant discount when AWS has spare capacity, but can be interrupted when AWS needs the capacity back.",
    tags: ["spot-instances", "cost-optimization", "spare-capacity"],
  },
  {
    id: "bp-i-004",
    domain: "billing-pricing",
    difficulty: "intermediate",
    question: "What is AWS Trusted Advisor?",
    options: [
      "A security service",
      "A service that provides recommendations to optimize AWS infrastructure, security, and costs",
      "A networking service",
      "A database service",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Trusted Advisor provides recommendations to optimize AWS infrastructure, security, and costs based on AWS best practices.",
    tags: ["trusted-advisor", "optimization", "best-practices"],
  },

  // Billing & Pricing - Advanced (3 questions)
  {
    id: "bp-a-001",
    domain: "billing-pricing",
    difficulty: "advanced",
    question:
      "How does AWS's pricing model support different business models and use cases?",
    options: [
      "It only offers fixed pricing",
      "It provides multiple pricing options to match different usage patterns and business models",
      "It doesn't consider business model differences",
      "It only supports enterprise customers",
    ],
    correctAnswer: 1,
    explanation:
      "AWS provides multiple pricing options (on-demand, reserved, spot, savings plans) to match different usage patterns and business models, from startups to enterprises.",
    tags: ["pricing-model", "business-models", "usage-patterns"],
  },
  {
    id: "bp-a-002",
    domain: "billing-pricing",
    difficulty: "advanced",
    question:
      "What is the significance of AWS's cost optimization strategies for long-term business success?",
    options: [
      "They have no impact on business success",
      "They enable sustainable growth by optimizing costs while maintaining performance and reliability",
      "They only apply to large enterprises",
      "They create performance issues",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's cost optimization strategies enable sustainable business growth by optimizing costs while maintaining performance and reliability, supporting long-term business success.",
    tags: ["cost-optimization", "business-success", "sustainable-growth"],
  },
  {
    id: "bp-a-003",
    domain: "billing-pricing",
    difficulty: "advanced",
    question:
      "How does AWS's pay-as-you-go model impact business agility and innovation?",
    options: [
      "It has no impact on agility",
      "It enables businesses to experiment and innovate without large upfront investments",
      "It only applies to established businesses",
      "It creates financial risks",
    ],
    correctAnswer: 1,
    explanation:
      "AWS's pay-as-you-go model enables businesses to experiment and innovate without large upfront investments, supporting business agility and faster time-to-market.",
    tags: ["pay-as-you-go", "business-agility", "innovation"],
  },
];

export const getQuestionsByDomain = (domain: Domain): Question[] => {
  return questions.filter((q) => q.domain === domain);
};

export const getQuestionsByDifficulty = (
  difficulty: Difficulty
): Question[] => {
  return questions.filter((q) => q.difficulty === difficulty);
};

export const getQuestionsByDomainAndDifficulty = (
  domain: Domain,
  difficulty: Difficulty
): Question[] => {
  return questions.filter(
    (q) => q.domain === domain && q.difficulty === difficulty
  );
};

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find((q) => q.id === id);
};

export const getTotalQuestionsCount = (): number => {
  return questions.length;
};

export const getQuestionsCountByDomain = (): Record<Domain, number> => {
  const counts: Record<Domain, number> = {
    "cloud-concepts": 0,
    "security-compliance": 0,
    "technology-services": 0,
    "billing-pricing": 0,
  };

  questions.forEach((q) => {
    counts[q.domain]++;
  });

  return counts;
};

export const getQuestionsCountByDifficulty = (): Record<Difficulty, number> => {
  const counts: Record<Difficulty, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  questions.forEach((q) => {
    counts[q.difficulty]++;
  });

  return counts;
};
