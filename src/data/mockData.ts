import { Opportunity } from '@/types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-msft-aiml',
    title: 'AI/ML Intern',
    company: 'Microsoft',
    companyLogoColor: 'from-blue-600 to-cyan-600',
    companyInitial: 'MS',
    location: 'Hyderabad · Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹75,000 / month + Relocation',
    deadline: 'October 12, 2026',
    source: 'Microsoft Careers Portal',
    sourceUrl: 'https://careers.microsoft.com/us/en/job/1892041/ai-ml-intern',
    postedDaysAgo: 3,
    matchScore: 94,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'Machine Learning', 'SQL', 'Azure', 'PyTorch', 'Data Analysis'],
    matchedSkills: ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'PyTorch'],
    missingSkills: ['Azure'],
    skillGapNotes: 'Azure fundamentals & cloud model deployment (easily bridgeable via MS Learn track)',
    matchBreakdown: {
      skillsMatch: 96,
      experienceMatch: 88,
      educationMatch: 100,
      preferenceMatch: 92,
      careerGoalAlignment: 94,
    },
    aiExplanation:
      "This opportunity strongly matches your Python and machine learning experience. Your previous ML projects align with the role's core responsibilities.",
    whyRecommendedReasons: [
      'Strong Python & PyTorch match (96% overlap with your past project repos)',
      'Undergraduate research experience directly maps to Applied AI team goals',
      'Preferred location (Hyderabad/Hybrid) and Tier-1 institution eligibility verified',
      'High-conversion rate for students with your ML project portfolio',
      'Official verified corporate portal with guaranteed recruiting pipeline'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Hosted on careers.microsoft.com (DNSSEC valid, Microsoft Corp SSL TLS 1.3 certificate)'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Direct HTTPS application endpoint without intermediaries or unauthorized redirects'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Verified corporate entity (CIN/SEC registered, 220,000+ employees, verified Glassdoor profile)'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Cross-verified with Microsoft Workday ATS live feed. Refreshed 2 hours ago'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected & realistic',
        status: 'pass',
        detail: 'Target deadline Oct 12, 2026 aligns with Microsoft University Hiring cohort calendar'
      }
    ],
    description:
      "Join Microsoft's Core AI group to build next-generation machine learning models powering Copilot and Azure AI services. You will collaborate with research scientists and software engineers to optimize neural architectures, fine-tune transformer models, and deploy scalable ML inference pipelines.",
    responsibilities: [
      'Design, implement, and benchmark state-of-the-art machine learning models for natural language and multi-modal tasks.',
      'Process and analyze large-scale structured and unstructured datasets using distributed computing tools.',
      'Collaborate with product and engineering teams to deploy models into production environments with latency budgets.',
      'Document experimental findings and participate in internal technical reviews and patent evaluations.'
    ],
    requirements: [
      'Currently enrolled in B.Tech/M.Tech in Computer Science, AI/Data Science, or related STEM discipline graduating in 2027.',
      'Demonstrated proficiency in Python, PyTorch/TensorFlow, and SQL.',
      'Solid foundations in linear algebra, probability, data structures, and algorithms.',
      'Prior project or research experience in machine learning or data modeling.'
    ],
    benefits: [
      'Competitive monthly stipend of ₹75,000',
      'Executive 1-on-1 mentorship with Principal AI Researchers',
      'Full equipment bundle: Microsoft Surface Laptop Studio + Azure Cloud Credits ($5,000)',
      'Direct pathway for Pre-Placement Offer (PPO) evaluation for full-time graduation cohort'
    ],
    isSaved: true,
    applicationStatus: 'saved'
  },
  {
    id: 'opp-atlassian-de',
    title: 'Data Engineering Intern',
    company: 'Atlassian',
    companyLogoColor: 'from-blue-500 to-indigo-600',
    companyInitial: 'AT',
    location: 'Remote · India',
    workMode: 'Remote',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹70,000 / month',
    deadline: 'October 24, 2026',
    source: 'Atlassian Lever API',
    sourceUrl: 'https://jobs.lever.co/atlassian/de-intern-2026',
    postedDaysAgo: 5,
    matchScore: 89,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'SQL', 'Spark', 'AWS', 'Data Pipelines', 'Snowflake'],
    matchedSkills: ['Python', 'SQL', 'Spark', 'AWS'],
    missingSkills: ['Snowflake'],
    skillGapNotes: 'Snowflake warehouse optimization (syntax parallels standard SQL data warehousing)',
    matchBreakdown: {
      skillsMatch: 92,
      experienceMatch: 86,
      educationMatch: 100,
      preferenceMatch: 95,
      careerGoalAlignment: 90,
    },
    aiExplanation:
      'Strong alignment with your SQL database design and distributed PySpark data analysis coursework. Fits your preference for remote work.',
    whyRecommendedReasons: [
      'PySpark and AWS matches your cloud data projects',
      'Preferred remote work model aligned with your profile settings',
      'Excellent engineering culture with high intern-to-FTE conversion (84%)',
      'Direct verified ATS link with rapid review SLA (< 5 business days)'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Authorized Lever ATS sub-tenant cryptographically verified by Atlassian domain headers'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Secure Lever HTTPS application endpoint without external redirects'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Verified NASDAQ-listed multinational technology corporation'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Validated active job requisition id #ATL-DE-2026-IN'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'Cohort start date scheduled for January 2027'
      }
    ],
    description:
      'Work with Atlassian Analytics Platform team to build reliable, high-throughput batch and streaming ETL data pipelines serving millions of active Jira and Confluence customers worldwide.',
    responsibilities: [
      'Build scalable data ingestion pipelines with PySpark and Airflow.',
      'Optimize complex SQL transformations and ensure data hygiene and lineage.',
      'Partner with Product Managers to build self-serve analytics dashboards.'
    ],
    requirements: [
      'Penultimate year student in Computer Science, Data Science, or related field.',
      'Solid command over Python, SQL, and database concepts.',
      'Familiarity with distributed data processing (Spark/Hadoop) is an advantage.'
    ],
    benefits: [
      '₹70,000 / month stipend + home office setup allowance (₹40,000)',
      'Flexible remote work policy',
      'Comprehensive wellness and learning stipend'
    ],
    isSaved: true,
    applicationStatus: 'saved'
  },
  {
    id: 'opp-novalabs-ml',
    title: 'Machine Learning Intern',
    company: 'NovaLabs AI',
    companyLogoColor: 'from-amber-500 to-orange-600',
    companyInitial: 'NL',
    location: 'Bengaluru · Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    duration: '3 months',
    stipend: '₹35,000 / month',
    deadline: 'November 02, 2026',
    source: 'Third-Party Job Aggregator',
    sourceUrl: 'https://boards.thirdparty-talent.io/novalabs-ml-intern',
    postedDaysAgo: 1,
    matchScore: 81,
    verificationStatus: 'needs_review',
    verificationConfidence: 'MEDIUM',
    skills: ['Python', 'PyTorch', 'ML', 'FastAPI', 'Docker'],
    matchedSkills: ['Python', 'PyTorch', 'ML'],
    missingSkills: ['Docker', 'FastAPI'],
    skillGapNotes: 'Microservices containerization with Docker and API routing',
    matchBreakdown: {
      skillsMatch: 84,
      experienceMatch: 78,
      educationMatch: 95,
      preferenceMatch: 80,
      careerGoalAlignment: 82,
    },
    aiExplanation:
      'Relevant ML role at an early-stage startup matching your PyTorch skills. However, the listing is hosted on an unverified third-party job board and requires manual caution.',
    whyRecommendedReasons: [
      'Matches your core PyTorch & Python skill stack',
      'Early stage founding team allows high direct ownership',
      'Fast interview turnaround typically under 10 days'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Company website found',
        status: 'pass',
        detail: 'Startup domain novalabs-ai.io verified with active landing page'
      },
      {
        id: 'chk-appurl',
        label: 'Third-party application URL',
        status: 'warning',
        detail: 'Posting uses a generic third-party talent form rather than an official ATS domain'
      },
      {
        id: 'chk-company',
        label: 'Limited company information',
        status: 'warning',
        detail: 'Seed funded in 2025; team size < 15; limited verified employee presence on LinkedIn'
      },
      {
        id: 'chk-active',
        label: 'Listing found & active',
        status: 'pass',
        detail: 'Job listing posted 24 hours ago'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'Rolling applications until Nov 02, 2026'
      }
    ],
    description:
      'NovaLabs is an early-stage venture building autonomous agent evaluation benchmarks. We are seeking an ML intern to assist in dataset curation and fine-tuning open-source LLMs.',
    responsibilities: [
      'Build evaluation pipelines for conversational AI agents.',
      'Fine-tune Llama 3 models using LoRA and HuggingFace Transformers.',
      'Deploy benchmark endpoints using FastAPI.'
    ],
    requirements: [
      'Comfortable with PyTorch, HuggingFace, and Python scripting.',
      'Demonstrated eagerness to work in a high-speed startup environment.'
    ],
    benefits: [
      'Direct mentorship from ex-Google Research founders',
      '₹35,000 monthly stipend',
      'Potential equity grant for high-performing interns'
    ],
    isSaved: false,
    applicationStatus: 'none'
  },
  {
    id: 'opp-adobe-cv',
    title: 'Computer Vision Research Intern',
    company: 'Adobe',
    companyLogoColor: 'from-red-600 to-rose-700',
    companyInitial: 'AD',
    location: 'Noida · Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹80,000 / month',
    deadline: 'October 30, 2026',
    source: 'Adobe University Talent Portal',
    sourceUrl: 'https://adobe.wd5.myworkdayjobs.com/university-jobs/cv-intern',
    postedDaysAgo: 4,
    matchScore: 91,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning', 'OpenCV', 'C++'],
    matchedSkills: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision'],
    missingSkills: ['C++', 'OpenCV'],
    skillGapNotes: 'C++ inference optimization and OpenCV image manipulation pipelines',
    matchBreakdown: {
      skillsMatch: 94,
      experienceMatch: 90,
      educationMatch: 100,
      preferenceMatch: 88,
      careerGoalAlignment: 95,
    },
    aiExplanation:
      'Exceptional alignment with your deep learning projects and academic research interest in generative imagery and visual model architectures.',
    whyRecommendedReasons: [
      'Direct match for your published computer vision research coursework',
      'Industry-leading generative AI team (Firefly group)',
      'Verified Workday corporate career platform with high prestige rating'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Hosted on official Adobe Workday platform (adobe.wd5.myworkdayjobs.com)'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Encrypted Workday job portal with valid cryptographic certificate'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Adobe Inc. (S&P 500, verified entity in India, 30,000+ employees)'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Live requisition actively accepting applications'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'October 30, 2026 cohort deadline'
      }
    ],
    description:
      'Collaborate with Adobe Research scientists to push boundaries in generative image generation, neural editing, and 3D scene reconstruction for Adobe Creative Cloud applications.',
    responsibilities: [
      'Develop novel vision algorithms for generative media and neural representations.',
      'Publish research findings in top-tier conferences (CVPR, ICCV, ECCV).',
      'Prototype interactive visual editing tools using Python and PyTorch.'
    ],
    requirements: [
      'B.Tech, M.Tech, or MS student in Computer Science or related fields graduating in 2027.',
      'Strong research background in deep learning, CNNs, or Diffusion models.',
      'Strong programming proficiency in Python and PyTorch.'
    ],
    benefits: [
      '₹80,000 monthly stipend',
      'Conference travel funding for accepted workshop/main conference papers',
      'Complimentary Adobe Creative Cloud All-Apps subscription'
    ],
    isSaved: false,
    applicationStatus: 'applied',
    appliedDate: '2026-09-18'
  },
  {
    id: 'opp-stripe-be',
    title: 'Software Engineer Intern (Backend)',
    company: 'Stripe',
    companyLogoColor: 'from-violet-600 to-indigo-700',
    companyInitial: 'ST',
    location: 'Remote · Global',
    workMode: 'Remote',
    type: 'Internship',
    duration: '4 months',
    stipend: '$55 / hour',
    deadline: 'November 15, 2026',
    source: 'Stripe Greenhouse API',
    sourceUrl: 'https://boards.greenhouse.io/stripe/jobs/swe-intern-2026',
    postedDaysAgo: 2,
    matchScore: 87,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Go', 'Ruby', 'Distributed Systems', 'SQL', 'APIs', 'Reliability'],
    matchedSkills: ['Go', 'SQL', 'APIs'],
    missingSkills: ['Ruby', 'Distributed Systems'],
    skillGapNotes: 'Ruby syntax and large-scale distributed consensus mechanisms',
    matchBreakdown: {
      skillsMatch: 85,
      experienceMatch: 84,
      educationMatch: 95,
      preferenceMatch: 98,
      careerGoalAlignment: 88,
    },
    aiExplanation:
      'Matches your Go and backend API experience. Stripe offers an industry benchmark remote engineering culture with world-class API standards.',
    whyRecommendedReasons: [
      'Strong Go and SQL match for backend infrastructure',
      'Top-tier global remote compensation ($55/hr)',
      'Verified Greenhouse enterprise job link with active recruiter tracking'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Greenhouse enterprise portal authenticated with Stripe TLS keys'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Direct applicant intake with strict anti-phishing safeguards'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Stripe, Inc. verified fintech enterprise'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Posting verified active via official Greenhouse webhook'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'Cohort recruitment open until mid-November'
      }
    ],
    description:
      'Build infrastructure that powers global online commerce. Interns at Stripe own production features from day one, touching millions of transactions per second.',
    responsibilities: [
      'Write clean, idiomatic code in Go and Ruby.',
      'Design fault-tolerant payment APIs and webhook delivery engines.',
      'Participate in on-call shadowing and incident retrospectives.'
    ],
    requirements: [
      'Student graduating between Dec 2026 and Summer 2027.',
      'Proficiency in any modern backend language (Go, Python, Java, or Ruby).',
      'Solid understanding of HTTP, REST, and relational databases.'
    ],
    benefits: [
      '$55/hr compensation ($8,800 / month equivalent)',
      'Comprehensive home office equipment and ergonomic chair allowance',
      'Dedicated mentor and onboarding buddy'
    ],
    isSaved: false,
    applicationStatus: 'applied',
    appliedDate: '2026-09-12'
  },
  {
    id: 'opp-amazon-nlp',
    title: 'Applied Scientist Intern - NLP',
    company: 'Amazon',
    companyLogoColor: 'from-amber-600 to-yellow-600',
    companyInitial: 'AM',
    location: 'Hyderabad · On-site',
    workMode: 'On-site',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹85,000 / month',
    deadline: 'October 18, 2026',
    source: 'Amazon.jobs Direct',
    sourceUrl: 'https://www.amazon.jobs/en/jobs/2819044/applied-scientist-intern',
    postedDaysAgo: 6,
    matchScore: 92,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'NLP', 'PyTorch', 'Transformers', 'Algorithms', 'Deep Learning'],
    matchedSkills: ['Python', 'NLP', 'PyTorch', 'Deep Learning', 'Algorithms'],
    missingSkills: ['Transformers'],
    skillGapNotes: 'Attention mechanisms and self-supervised pre-training pipelines',
    matchBreakdown: {
      skillsMatch: 95,
      experienceMatch: 90,
      educationMatch: 100,
      preferenceMatch: 86,
      careerGoalAlignment: 96,
    },
    aiExplanation:
      'High synergy with your NLP classifier project. Amazon Alexa and Shopping AI teams prioritize candidate research in conversational retrieval and embeddings.',
    whyRecommendedReasons: [
      'NLP and PyTorch portfolio directly aligns with team requirements',
      'Prime location in Hyderabad tech campus with dedicated student labs',
      'Top compensation and established PPO conversion metrics'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Amazon.jobs enterprise domain verified via AWS Route53 records'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Direct internal Amazon hiring portal'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Amazon Development Centre India Pvt Ltd'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Requisition active with scheduled interview loops in October'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'October 18, 2026 cutoff'
      }
    ],
    description:
      'Develop innovative customer-facing conversational interfaces and knowledge graph embeddings using large language models and neural question answering.',
    responsibilities: [
      'Formulate research problems, design experiments, and evaluate model baselines.',
      'Train transformer models across multi-billion token corpora on AWS SageMaker clusters.',
      'Deliver final research presentation to Amazon Science leadership.'
    ],
    requirements: [
      'Enrolled in Master’s or Bachelor’s program in AI, CS, or quantitative science.',
      'Expertise in Python, PyTorch, and NLP library ecosystem (HuggingFace, spaCy).',
      'Demonstrated algorithmic rigor and analytical problem-solving skills.'
    ],
    benefits: [
      '₹85,000 / month stipend + corporate housing / cab transit',
      'AWS Cloud computing quota ($10,000 credits for personal experimentation)',
      'Subsidized meal cards and healthcare coverage'
    ],
    isSaved: true,
    applicationStatus: 'interview',
    appliedDate: '2026-09-08',
    interviewStage: 'Technical Loop 1 (Scheduled Oct 02)'
  },
  {
    id: 'opp-oracle-cloud',
    title: 'Cloud Infrastructure Intern',
    company: 'Oracle',
    companyLogoColor: 'from-red-700 to-orange-700',
    companyInitial: 'OR',
    location: 'Bengaluru · Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹60,000 / month',
    deadline: 'October 28, 2026',
    source: 'Oracle Careers Taleo',
    sourceUrl: 'https://oracle.taleo.net/careersection/cloud-intern',
    postedDaysAgo: 7,
    matchScore: 86,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['AWS', 'Linux', 'Python', 'Networking', 'Kubernetes', 'Cloud'],
    matchedSkills: ['AWS', 'Linux', 'Python', 'Cloud'],
    missingSkills: ['Kubernetes', 'Networking'],
    skillGapNotes: 'K8s pod orchestration and CIDR VPC subnet design',
    matchBreakdown: {
      skillsMatch: 86,
      experienceMatch: 84,
      educationMatch: 100,
      preferenceMatch: 90,
      careerGoalAlignment: 85,
    },
    aiExplanation:
      'Fits your cloud interest and Linux systems foundation. Oracle Cloud Infrastructure (OCI) is aggressively expanding its AI supercluster data centers.',
    whyRecommendedReasons: [
      'Matches your AWS and cloud infrastructure certifications/interests',
      'High growth in AI cluster compute gives interns hands-on hardware access',
      'Pre-placement offer received from initial screening loop'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Oracle Taleo applicant tracking system verified'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Direct HTTPS application system'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Oracle India Private Limited'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Confirmed active requisition'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'October 28, 2026'
      }
    ],
    description:
      'Work alongside OCI core networking and storage teams to deploy automated health diagnostics for high-performance GPU clusters powering enterprise AI.',
    responsibilities: [
      'Write automation scripts in Python to detect network packet anomalies.',
      'Contribute to bare-metal provisioning monitoring tools.',
      'Participate in architecture reviews for resilient cloud subsystems.'
    ],
    requirements: [
      'Degree in Computer Science, Information Technology, or Electronics.',
      'Strong foundations in Operating Systems (Linux) and Computer Networking.',
      'Proficiency in Python and shell scripting.'
    ],
    benefits: [
      '₹60,000 / month stipend',
      'Full-time PPO consideration with competitive campus joining package',
      'Free OCI Cloud Architect certification voucher'
    ],
    isSaved: false,
    applicationStatus: 'offer',
    appliedDate: '2026-08-25',
    interviewStage: 'Offer Extended — Decision due Oct 15'
  },
  {
    id: 'opp-deepmind-genai',
    title: 'Generative AI Research Fellow',
    company: 'Google DeepMind',
    companyLogoColor: 'from-blue-600 to-indigo-800',
    companyInitial: 'DM',
    location: 'London / Remote Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    duration: '6 months',
    stipend: '£4,200 / month (~₹4,50,000)',
    deadline: 'December 01, 2026',
    source: 'Google DeepMind Fellowships',
    sourceUrl: 'https://deepmind.google/fellowships/student-ai-2026',
    postedDaysAgo: 2,
    matchScore: 85,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'JAX', 'Deep Learning', 'PyTorch', 'Reinforcement Learning', 'Transformers'],
    matchedSkills: ['Python', 'Deep Learning', 'PyTorch'],
    missingSkills: ['JAX', 'Reinforcement Learning'],
    skillGapNotes: 'JAX functional array manipulation and RL policy gradients',
    matchBreakdown: {
      skillsMatch: 84,
      experienceMatch: 82,
      educationMatch: 95,
      preferenceMatch: 88,
      careerGoalAlignment: 98,
    },
    aiExplanation:
      'Premier research fellowship matching your ambition in foundational AI modeling. Highly competitive tier for students with strong analytical foundations.',
    whyRecommendedReasons: [
      'World-class mentorship from frontier AI research scientists',
      'Direct hands-on experience on TPU v5p compute clusters',
      'Highest compensation tier in student academic fellowships'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'deepmind.google verified Google corporate subdomain'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Google Careers intake API'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Alphabet Inc. / Google DeepMind UK'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Annual student cohort open'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'December 01, 2026'
      }
    ],
    description:
      'Conduct fundamental research in reasoning, agentic planning, and self-supervised multimodal representation learning alongside DeepMind researchers.',
    responsibilities: [
      'Formulate and run experiments testing new hypothesis in deep representation learning.',
      'Analyze failure modes and design robust reinforcement learning environments.',
      'Contribute to open-source science and technical publications.'
    ],
    requirements: [
      'Enrolled student with proven track record in mathematics, computer science, or physics.',
      'Proficiency in deep learning frameworks (PyTorch or JAX).',
      'Curiosity and passion for artificial general intelligence safety and capabilities.'
    ],
    benefits: [
      '£4,200 monthly stipend + full relocation & housing allowance for London residency',
      'Direct TPU pod computing access',
      'Academic conference presentation sponsorship'
    ],
    isSaved: false,
    applicationStatus: 'none'
  },
  {
    id: 'opp-zomato-mlops',
    title: 'ML Operations Intern',
    company: 'Zomato',
    companyLogoColor: 'from-red-500 to-rose-600',
    companyInitial: 'ZO',
    location: 'Gurugram · On-site',
    workMode: 'On-site',
    type: 'Internship',
    duration: '6 months',
    stipend: '₹50,000 / month',
    deadline: 'November 05, 2026',
    source: 'Zomato Engineering Careers',
    sourceUrl: 'https://zomato.com/careers/mlops-intern-2026',
    postedDaysAgo: 8,
    matchScore: 84,
    verificationStatus: 'verified',
    verificationConfidence: 'HIGH',
    skills: ['Python', 'Docker', 'MLflow', 'FastAPI', 'SQL', 'Kubernetes'],
    matchedSkills: ['Python', 'SQL'],
    missingSkills: ['MLflow', 'Docker', 'Kubernetes'],
    skillGapNotes: 'Model registry pipelines with MLflow and container deployments',
    matchBreakdown: {
      skillsMatch: 82,
      experienceMatch: 83,
      educationMatch: 100,
      preferenceMatch: 85,
      careerGoalAlignment: 88,
    },
    aiExplanation:
      'High-scale production deployment role. Zomato serves millions of real-time restaurant recommendation and delivery dispatch inferences every day.',
    whyRecommendedReasons: [
      'High-velocity consumer internet engineering scale',
      'Great hands-on transition from ML modeling to scalable MLOps',
      'Active campus recruitment pipeline'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Official company domain',
        status: 'pass',
        detail: 'Hosted on official zomato.com careers sub-tier'
      },
      {
        id: 'chk-appurl',
        label: 'Application URL validated',
        status: 'pass',
        detail: 'Direct HTTPS application endpoint'
      },
      {
        id: 'chk-company',
        label: 'Company information matched',
        status: 'pass',
        detail: 'Zomato Limited (Public NSE/BSE listed entity)'
      },
      {
        id: 'chk-active',
        label: 'Posting currently active',
        status: 'pass',
        detail: 'Requisition active'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'November 05, 2026'
      }
    ],
    description:
      'Build and maintain CI/CD pipelines for automated retraining, packaging, and zero-downtime canary deployment of dispatch ETA prediction models.',
    responsibilities: [
      'Monitor model latency and feature drift using Prometheus and Grafana.',
      'Automate dataset versioning and pipeline orchestration.',
      'Collaborate with data scientists to optimize inference serving.'
    ],
    requirements: [
      'Degree in Computer Science or related branch.',
      'Familiarity with Python, Linux systems, and database queries.',
      'Eagerness to learn cloud deployment and containerization.'
    ],
    benefits: [
      '₹50,000 / month stipend',
      'Daily curated cafeteria lunches and snack bar',
      'PPO conversion track based on project impact'
    ],
    isSaved: false,
    applicationStatus: 'none'
  },
  {
    id: 'opp-cybertech-cloud',
    title: 'Junior Cloud Data Analyst',
    company: 'CyberTech Solutions',
    companyLogoColor: 'from-amber-600 to-amber-700',
    companyInitial: 'CT',
    location: 'Pune · On-site',
    workMode: 'On-site',
    type: 'Full-time',
    duration: 'Full-time (Entry Level)',
    stipend: '₹4.5 - 6.0 LPA',
    deadline: 'November 10, 2026',
    source: 'Regional Job Forum',
    sourceUrl: 'https://jobforum-india.org/postings/cybertech-junior-analyst',
    postedDaysAgo: 9,
    matchScore: 73,
    verificationStatus: 'needs_review',
    verificationConfidence: 'MEDIUM',
    skills: ['SQL', 'Excel', 'Python', 'PowerBI', 'AWS'],
    matchedSkills: ['SQL', 'Python', 'AWS'],
    missingSkills: ['Excel', 'PowerBI'],
    skillGapNotes: 'PowerBI DAX formulas and executive spreadsheet reporting',
    matchBreakdown: {
      skillsMatch: 75,
      experienceMatch: 70,
      educationMatch: 95,
      preferenceMatch: 68,
      careerGoalAlignment: 72,
    },
    aiExplanation:
      'Moderate fit. Focuses more heavily on business intelligence reporting rather than advanced machine learning and data engineering.',
    whyRecommendedReasons: [
      'Good baseline SQL and data querying requirements',
      'Entry-level graduate recruitment'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Company website found',
        status: 'pass',
        detail: 'Domain cybertech-solutions.co.in exists with basic web presence'
      },
      {
        id: 'chk-appurl',
        label: 'Third-party application URL',
        status: 'warning',
        detail: 'Directs to generic Google Form for resume submission'
      },
      {
        id: 'chk-company',
        label: 'Limited company information',
        status: 'warning',
        detail: 'Registered MSME; limited financial disclosures; no verified Glassdoor profile'
      },
      {
        id: 'chk-active',
        label: 'Listing found & active',
        status: 'pass',
        detail: 'Active since early September'
      },
      {
        id: 'chk-deadline',
        label: 'Deadline detected',
        status: 'pass',
        detail: 'Rolling cutoff November 10, 2026'
      }
    ],
    description:
      'Junior role responsible for monitoring cloud billing records, formatting weekly stakeholder metrics, and updating customer SQL queries.',
    responsibilities: [
      'Extract data from MySQL databases and create weekly Excel/PowerBI dashboards.',
      'Verify pipeline ingestion integrity and escalate data discrepancies.'
    ],
    requirements: [
      'Graduate in BCA, B.Sc, or B.Tech with familiarity in basic SQL and Excel.',
      'Strong communication and attention to detail.'
    ],
    benefits: [
      '₹4.5 - 6.0 LPA annual package',
      'Standard corporate health insurance'
    ],
    isSaved: false,
    applicationStatus: 'none'
  },
  {
    id: 'opp-cryptoapex-scam',
    title: 'AI Data Entry & Prompt Analyst (Scam Demo)',
    company: 'CryptoApex Global Inc.',
    companyLogoColor: 'from-rose-600 to-red-900',
    companyInitial: 'CA',
    location: 'Remote · Worldwide',
    workMode: 'Remote',
    type: 'Internship',
    duration: 'Flexible / Immediate',
    stipend: '$150 / hour ($12,000 / mo)',
    deadline: 'Immediate — 24 Hours Left',
    source: 'Anonymous Telegram Board',
    sourceUrl: 'https://cryptoapex-careers-direct.online/apply-now-fast',
    postedDaysAgo: 1,
    matchScore: 38,
    verificationStatus: 'suspicious',
    verificationConfidence: 'LOW',
    skills: ['Typing', 'Chatbot', 'Data Entry', 'Crypto', 'Telegram'],
    matchedSkills: ['Chatbot'],
    missingSkills: ['Typing', 'Crypto', 'Telegram', 'Data Entry'],
    skillGapNotes: 'Low-skill tasks inconsistent with your technical background',
    matchBreakdown: {
      skillsMatch: 25,
      experienceMatch: 30,
      educationMatch: 60,
      preferenceMatch: 50,
      careerGoalAlignment: 20,
    },
    aiExplanation:
      'CRITICAL WARNING: This posting shows multiple high-risk scam indicators including an unverified newly-registered domain, request for upfront equipment security deposit, and unrealistic $150/hr salary.',
    whyRecommendedReasons: [
      'FLAGGED BY PATHBRIDGE TRUST ENGINE FOR SAFETY REVIEW',
      'Demonstrates automated scam and phishing protection capabilities'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Suspicious domain registration',
        status: 'fail',
        detail: 'Domain registered 4 days ago via privacy proxy; high risk registrar known for phishing'
      },
      {
        id: 'chk-appurl',
        label: 'Unsafe redirect & Telegram link',
        status: 'fail',
        detail: 'Requires candidates to connect to an anonymous @recruiter_apex Telegram bot'
      },
      {
        id: 'chk-company',
        label: 'Missing corporate records',
        status: 'fail',
        detail: 'No corporate registration found in any international business registry. Stolen stock photos used'
      },
      {
        id: 'chk-active',
        label: 'Payment request detected',
        status: 'fail',
        detail: 'Form mentions refundable $75 cryptocurrency or UPI equipment onboarding deposit'
      },
      {
        id: 'chk-deadline',
        label: 'Unrealistic compensation claim',
        status: 'fail',
        detail: '$150/hr for non-technical data entry is an established fraudulent lure pattern'
      }
    ],
    description:
      'WARNING: This is a synthetic high-risk sample generated for the PathBridge 2.0 Trust & Verification demonstration to showcase how the verification engine prevents student fraud.',
    responsibilities: [
      'FLAGGED: Copy-pasting AI prompts into unverified software.',
      'FLAGGED: Communicating exclusively via untraceable Telegram handles.'
    ],
    requirements: [
      'No formal degree required.',
      'Immediate availability and willingness to pay equipment deposit.'
    ],
    benefits: [
      'UNREALISTIC: Claimed $150/hour with immediate daily payouts'
    ],
    suspiciousWarning:
      'PathBridge Trust Engine has blocked automatic application. Do NOT transfer money, provide crypto addresses, or submit government ID documents to this entity.',
    isSaved: false,
    applicationStatus: 'none'
  },
  {
    id: 'opp-quickhire-scam',
    title: 'High Pay Remote AI Assistant (Scam Demo)',
    company: 'QuickHire Ventures Ltd',
    companyLogoColor: 'from-red-800 to-rose-950',
    companyInitial: 'QH',
    location: 'Remote · Anywhere',
    workMode: 'Remote',
    type: 'Part-time',
    duration: '2 hours/day',
    stipend: '₹45,000 / week',
    deadline: 'Hurry! 3 Slots Left',
    source: 'Unsolicited WhatsApp / SMS',
    sourceUrl: 'https://quickhire-jobs-portal-auth.biz/start',
    postedDaysAgo: 1,
    matchScore: 29,
    verificationStatus: 'suspicious',
    verificationConfidence: 'LOW',
    skills: ['Mobile App', 'Likes', 'Review', 'Part Time'],
    matchedSkills: [],
    missingSkills: ['Mobile App', 'Review'],
    skillGapNotes: 'No technical relevance to engineering profile',
    matchBreakdown: {
      skillsMatch: 15,
      experienceMatch: 20,
      educationMatch: 50,
      preferenceMatch: 40,
      careerGoalAlignment: 12,
    },
    aiExplanation:
      'SUSPICIOUS OPPORTUNITY: Characteristic task-based pay scam targeting college students. Unregistered business domain, high-pressure urgency tactics, and upfront training fees detected.',
    whyRecommendedReasons: [
      'FLAGGED: Verification benchmark for scam detection engine',
      'Zero alignment with student career objectives'
    ],
    verificationChecks: [
      {
        id: 'chk-domain',
        label: 'Flagged .biz domain',
        status: 'fail',
        detail: 'Domain registered last week; zero corporate footprint or SSL authenticity'
      },
      {
        id: 'chk-appurl',
        label: 'Phishing signature matched',
        status: 'fail',
        detail: 'URL matches known Google Play task-scam phishing templates'
      },
      {
        id: 'chk-company',
        label: 'Company records non-existent',
        status: 'fail',
        detail: 'No corporate entity, no physical address, spoofed GSTIN/CIN'
      },
      {
        id: 'chk-active',
        label: 'Upfront training fee detected',
        status: 'fail',
        detail: 'Demands ₹2,499 for AI Assistant certification portal access'
      },
      {
        id: 'chk-deadline',
        label: 'Manipulative urgency tactics',
        status: 'fail',
        detail: 'Artificial 3 slots left countdown timer detected on page'
      }
    ],
    description:
      'High-risk fraudulent opportunity demonstration. PathBridge automatically flags suspicious postings to protect student privacy and financial security.',
    responsibilities: [
      'FLAGGED: Rating random mobile applications and submitting screenshots.'
    ],
    requirements: [
      'Smartphone and UPI account.'
    ],
    benefits: [
      'FRAUDULENT PROMISE: ₹45,000/week for 2 hours daily work'
    ],
    suspiciousWarning:
      'DO NOT APPLY: PathBridge has identified this listing as an advance-fee fraud scheme.',
    isSaved: false,
    applicationStatus: 'none'
  }
];
