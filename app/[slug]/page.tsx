"use client";
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Shield, Users, FileText, Award, Phone, Mail, Globe, CheckCircle, ArrowRight, Zap, Star } from 'lucide-react';

// Reusable component structure for different slugs
const SlugPageData = {
  'posh-compliance-initiation': {
    title: "POSH Compliance Initiation",
    subtitle: "India's Next-Generation Workplace Safety Platform",
    description: "Revolutionary POSH compliance solutions powered by AI-driven insights and international standards",
    sections: [
      {
        id: "about",
        title: "Advanced POSH Compliance Ecosystem",
        icon: Shield,
        content: {
          description: "URE POSH leverages cutting-edge technology and legal expertise to deliver comprehensive Prevention of Sexual Harassment compliance solutions. Our platform integrates AI-powered risk assessment, blockchain-based record keeping, and real-time compliance monitoring.",
          features: [
            "AI-driven policy customization and optimization",
            "Blockchain-secured compliance documentation", 
            "Real-time dashboard with compliance metrics",
            "Automated Internal Committee formation and training",
            "Predictive analytics for workplace safety",
            "IoT-enabled incident reporting systems"
          ]
        }
      },
      {
        id: "importance",
        title: "Strategic Compliance Imperatives",
        icon: Award,
        content: {
          description: "In today's hyper-connected business environment, POSH compliance isn't just legal requirement—it's a competitive advantage that drives sustainable growth and stakeholder confidence.",
          features: [
            "Mandatory compliance under POSH Act 2013 for organizations with 10+ employees",
            "Advanced risk mitigation through predictive compliance modeling",
            "ESG alignment for global investor confidence and funding readiness",
            "Enhanced employer branding through certified safe workplace practices",
            "Integration with Industry 4.0 workplace safety standards"
          ]
        }
      },
      {
        id: "services",
        title: "Comprehensive Service Portfolio",
        icon: Zap,
        content: {
          services: [
            {
              name: "Intelligent Policy Architecture",
              description: "AI-powered policy drafting aligned with POSH Act 2013, Supreme Court precedents, and international guidelines (ILO, UN Women). Custom policy generation based on industry-specific risk profiles."
            },
            {
              name: "Digital IC Constitution & Training",
              description: "Streamlined Internal Committee formation with automated external member sourcing. VR-enabled training modules for IC members with real-time competency assessment."
            },
            {
              name: "Immersive Employee Education", 
              description: "Gamified learning experiences with case study simulations. Multi-language support with cultural sensitivity integration. Microlearning modules optimized for mobile consumption."
            },
            {
              name: "Leadership Excellence Programs",
              description: "Executive dashboards for compliance monitoring. Board-level governance reporting with ESG integration. Strategic consultation for global compliance alignment."
            },
            {
              name: "Automated Investigation Support",
              description: "AI-assisted inquiry process management. Confidential digital evidence collection and analysis. Automated report generation with legal recommendation engine."
            },
            {
              name: "Smart Compliance Reporting",
              description: "Automated annual filing preparation and submission. Real-time compliance status monitoring. Predictive alerts for upcoming regulatory requirements."
            },
            {
              name: "Continuous Audit & Certification",
              description: "Blockchain-verified compliance certificates. ESG reporting integration for investor due diligence. Continuous monitoring with automated corrective action recommendations."
            }
          ]
        }
      }
    ],
    faqs: [
      {
        question: "How does AI enhance traditional POSH compliance?",
        answer: "Our AI platform analyzes workplace data patterns, predicts potential risk areas, customizes policies based on industry benchmarks, and provides real-time compliance insights. This proactive approach prevents incidents rather than just responding to them."
      },
      {
        question: "What makes blockchain integration essential for POSH compliance?", 
        answer: "Blockchain ensures tamper-proof record keeping, maintains confidentiality through encryption, provides immutable audit trails, and enables secure multi-party verification of compliance activities without compromising sensitive information."
      },
      {
        question: "How does the platform handle multi-location enterprises?",
        answer: "Our cloud-based platform provides centralized compliance management across multiple locations, automated local regulatory adaptation, unified reporting dashboards, and location-specific risk assessment capabilities."
      }
    ]
  },
  'external-members-renowned-ngo': {
    title: "POSH Committee and External NGO Members: India, UK, and US Compliance Guide",
    subtitle: "Building Safe and Inclusive Workplaces",
    description: "Partner with experienced NGO professionals to create effective POSH Committees and harassment prevention frameworks that ensure compliance and foster trust.",
    sections: [
      {
        id: "about",
        title: "What is a POSH Committee?",
        icon: Shield,
        content: {
          description: "A POSH Committee, also known as the Internal Committee (IC), is a specialized team that helps organizations prevent and address workplace sexual harassment. Having an effective POSH Committee is crucial not only for legal compliance but also for building a truly safe and inclusive environment.",
          features: [
            "Specialized team for preventing workplace sexual harassment",
            "Required for organizations with 10+ employees under POSH Act 2013",
            "Includes mandatory external member from respected NGO",
            "Ensures fair investigations and unbiased decisions",
            "Builds trust and credibility in the workplace"
          ]
        }
      },
      {
        id: "structure",
        title: "POSH Committee Structure in India: The Power of External Members",
        icon: Users,
        content: {
          description: "Under India's POSH Act, 2013, every company with 10 or more employees is required to establish an Internal Committee to address complaints of sexual harassment. A unique feature of this law is the mandatory inclusion of an external member, a representative from a respected NGO or a professional with experience in women's issues.",
          features: [
            "Neutrality & Objectivity: External members provide an unbiased voice, ensuring fair investigations and decisions",
            "Credibility: Their presence reassures employees that the process is trustworthy and professional",
            "Expertise: NGO professionals bring deep experience in gender issues, legal requirements, and trauma-sensitive care"
          ]
        }
      },
      {
        id: "ngos",
        title: "Renowned NGOs for External IC Members",
        icon: Award,
        content: {
          description: "Well-known NGOs whose members serve as external IC members include organizations with proven expertise in gender equality and workplace safety:",
          services: [
            {
              name: "WCRT",
              description: "Women's Centre for Research and Training - Leading organization in women's empowerment and workplace safety advocacy."
            },
            {
              name: "Breakthrough India",
              description: "Human rights organization working on gender equality and prevention of violence against women."
            },
            {
              name: "Jagori",
              description: "Women's training and resource organization focusing on gender justice and women's rights."
            },
            {
              name: "Majlis Legal Centre",
              description: "Legal resource group specializing in women's rights and gender-based violence prevention."
            },
            {
              name: "CSR India",
              description: "Corporate social responsibility organization with expertise in workplace compliance and ethics."
            },
            {
              name: "SAKSHI",
              description: "Human rights organization working on legal literacy and gender justice initiatives."
            }
          ]
        }
      },
      {
        id: "international",
        title: "POSH & Harassment Committees: UK and US Standards",
        icon: Globe,
        content: {
          description: "While the UK and US do not have a law identical to India's POSH Act, workplace harassment and gender equality are taken very seriously. Companies are encouraged to form harassment committees or ethics boards to deal with complaints, and it's considered best practice to involve external advisors for impartiality.",
          services: [
            {
              name: "UK Approach",
              description: "Businesses may invite external HR professionals or NGO representatives—such as those from the Equality and Human Rights Commission or Women's Aid—to ensure transparency and fairness in investigations."
            },
            {
              name: "US Practice",
              description: "US firms often include external legal experts or NGO specialists like those from the National Women's Law Center (NWLC) or RAINN to bring unbiased perspectives in sensitive cases."
            }
          ]
        }
      },
      {
        id: "benefits",
        title: "Benefits of Involving External NGO Members",
        icon: CheckCircle,
        content: {
          description: "Including external NGO members in your harassment committee brings multiple strategic advantages:",
          features: [
            "Unbiased investigation and resolution",
            "Up-to-date knowledge of local and global laws",
            "Enhanced employee trust and confidence",
            "Public demonstration of ethical leadership",
            "Specialized expertise in trauma-sensitive handling",
            "Access to best practices from other organizations",
            "Credible third-party validation of processes"
          ]
        }
      },
      {
        id: "ureposh-help",
        title: "How UREPosh Can Help",
        icon: Zap,
        content: {
          description: "Our network includes leading NGO professionals and compliance specialists ready to serve as external POSH Committee members for organizations in India and as external advisors for companies in the UK and US.",
          features: [
            "Select qualified external IC members",
            "Stay audit-ready and compliant with the latest laws",
            "Foster a culture of respect, trust, and safety",
            "Connect with pre-vetted NGO professionals",
            "Provide ongoing training and support",
            "Ensure committee effectiveness and legal compliance"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Who can be an external member of the POSH Committee in India?",
        answer: "An external member of the POSH Committee in India is typically a person who is not an employee of the organization and brings relevant expertise in areas such as legal matters, gender sensitivity, or workplace harassment prevention. This individual can be a lawyer, a gender sensitivity trainer, a psychologist, or a representative from an NGO working on women's rights. The external member is appointed to ensure impartiality, objectivity, and specialized knowledge in handling sensitive complaints related to sexual harassment and must meet the qualifications outlined under the POSH Act to effectively support the Internal Committee."
      },
      {
        question: "Why should my company have an external NGO member on the harassment committee?",
        answer: "Having an external NGO member on the harassment committee is important because it brings unbiased, specialized expertise in handling cases of sexual harassment and gender issues. An NGO representative can provide an objective perspective, ensure transparency, and help create a safe and supportive environment for complainants. Their involvement also demonstrates the company's commitment to upholding gender sensitivity and compliance with legal requirements under the POSH Act, thereby enhancing trust and credibility in the organization's efforts to prevent and address workplace harassment."
      },
      {
        question: "What is the international standard for workplace harassment investigations?",
        answer: "The international standard for workplace harassment investigations emphasizes fairness, confidentiality, thoroughness, and impartiality. Investigations should be conducted promptly and objectively, ensuring that all parties involved are given an equal opportunity to present their case. Investigators must gather evidence diligently, maintain confidentiality to protect the privacy of all parties, and avoid biases. The process should be transparent, with clear communication about the steps involved, and outcomes should be based on factual findings. Additionally, organizations are encouraged to follow established best practices and legal frameworks to ensure a safe and respectful work environment, aligned with international human rights standards."
      },
      {
        question: "How do I appoint an external expert for my company's committee?",
        answer: "To appoint an external expert for your company's committee, identify the specific expertise needed and research reputable professionals or organizations with relevant experience. Verify their credentials and define their roles and responsibilities clearly. Then, formalize the appointment through a written agreement outlining scope, confidentiality, and terms of engagement. Seek approval from senior management or the board as required, and onboard the expert by introducing them to the committee and providing necessary information. This process ensures a transparent and effective appointment aligned with organizational standards."
      }
    ]
  },
  'ngo': {
    title: "POSH Committee and External NGO Members: India, UK, and US Compliance Guide",
    subtitle: "Building Safe and Inclusive Workplaces",
    description: "Partner with experienced NGO professionals to create effective POSH Committees and harassment prevention frameworks that ensure compliance and foster trust.",
    sections: [
      {
        id: "about",
        title: "What is a POSH Committee?",
        icon: Shield,
        content: {
          description: "A POSH Committee, also known as the Internal Committee (IC), is a specialized team that helps organizations prevent and address workplace sexual harassment. Having an effective POSH Committee is crucial not only for legal compliance but also for building a truly safe and inclusive environment.",
          features: [
            "Specialized team for preventing workplace sexual harassment",
            "Required for organizations with 10+ employees under POSH Act 2013",
            "Includes mandatory external member from respected NGO",
            "Ensures fair investigations and unbiased decisions",
            "Builds trust and credibility in the workplace"
          ]
        }
      },
      {
        id: "structure",
        title: "POSH Committee Structure in India: The Power of External Members",
        icon: Users,
        content: {
          description: "Under India's POSH Act, 2013, every company with 10 or more employees is required to establish an Internal Committee to address complaints of sexual harassment. A unique feature of this law is the mandatory inclusion of an external member, a representative from a respected NGO or a professional with experience in women's issues.",
          features: [
            "Neutrality & Objectivity: External members provide an unbiased voice, ensuring fair investigations and decisions",
            "Credibility: Their presence reassures employees that the process is trustworthy and professional",
            "Expertise: NGO professionals bring deep experience in gender issues, legal requirements, and trauma-sensitive care"
          ]
        }
      },
      {
        id: "ngos",
        title: "Renowned NGOs for External IC Members",
        icon: Award,
        content: {
          description: "Well-known NGOs whose members serve as external IC members include organizations with proven expertise in gender equality and workplace safety:",
          services: [
            {
              name: "WCRT",
              description: "Women's Centre for Research and Training - Leading organization in women's empowerment and workplace safety advocacy."
            },
            {
              name: "Breakthrough India",
              description: "Human rights organization working on gender equality and prevention of violence against women."
            },
            {
              name: "Jagori",
              description: "Women's training and resource organization focusing on gender justice and women's rights."
            },
            {
              name: "Majlis Legal Centre",
              description: "Legal resource group specializing in women's rights and gender-based violence prevention."
            },
            {
              name: "CSR India",
              description: "Corporate social responsibility organization with expertise in workplace compliance and ethics."
            },
            {
              name: "SAKSHI",
              description: "Human rights organization working on legal literacy and gender justice initiatives."
            }
          ]
        }
      },
      {
        id: "international",
        title: "POSH & Harassment Committees: UK and US Standards",
        icon: Globe,
        content: {
          description: "While the UK and US do not have a law identical to India's POSH Act, workplace harassment and gender equality are taken very seriously. Companies are encouraged to form harassment committees or ethics boards to deal with complaints, and it's considered best practice to involve external advisors for impartiality.",
          services: [
            {
              name: "UK Approach",
              description: "Businesses may invite external HR professionals or NGO representatives—such as those from the Equality and Human Rights Commission or Women's Aid—to ensure transparency and fairness in investigations."
            },
            {
              name: "US Practice",
              description: "US firms often include external legal experts or NGO specialists like those from the National Women's Law Center (NWLC) or RAINN to bring unbiased perspectives in sensitive cases."
            }
          ]
        }
      },
      {
        id: "ureposh-help",
        title: "How UREPosh Can Help",
        icon: Zap,
        content: {
          description: "Our network includes leading NGO professionals and compliance specialists ready to serve as external POSH Committee members for organizations in India and as external advisors for companies in the UK and US.",
          features: [
            "Select qualified external IC members",
            "Stay audit-ready and compliant with the latest laws",
            "Foster a culture of respect, trust, and safety",
            "Unbiased investigation and resolution",
            "Up-to-date knowledge of local and global laws",
            "Enhanced employee trust and confidence",
            "Public demonstration of ethical leadership"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Who can be an external member of the POSH Committee in India?",
        answer: "An external member of the POSH Committee in India is typically a person who is not an employee of the organization and brings relevant expertise in areas such as legal matters, gender sensitivity, or workplace harassment prevention. This individual can be a lawyer, a gender sensitivity trainer, a psychologist, or a representative from an NGO working on women's rights. The external member is appointed to ensure impartiality, objectivity, and specialized knowledge in handling sensitive complaints related to sexual harassment and must meet the qualifications outlined under the POSH Act to effectively support the Internal Committee."
      },
      {
        question: "Why should my company have an external NGO member on the harassment committee?",
        answer: "Having an external NGO member on the harassment committee is important because it brings unbiased, specialized expertise in handling cases of sexual harassment and gender issues. An NGO representative can provide an objective perspective, ensure transparency, and help create a safe and supportive environment for complainants. Their involvement also demonstrates the company's commitment to upholding gender sensitivity and compliance with legal requirements under the POSH Act, thereby enhancing trust and credibility in the organization's efforts to prevent and address workplace harassment."
      },
      {
        question: "What is the international standard for workplace harassment investigations?",
        answer: "The international standard for workplace harassment investigations emphasizes fairness, confidentiality, thoroughness, and impartiality. Investigations should be conducted promptly and objectively, ensuring that all parties involved are given an equal opportunity to present their case. Investigators must gather evidence diligently, maintain confidentiality to protect the privacy of all parties, and avoid biases. The process should be transparent, with clear communication about the steps involved, and outcomes should be based on factual findings. Additionally, organizations are encouraged to follow established best practices and legal frameworks to ensure a safe and respectful work environment, aligned with international human rights standards."
      },
      {
        question: "How do I appoint an external expert for my company's committee?",
        answer: "To appoint an external expert for your company's committee, identify the specific expertise needed and research reputable professionals or organizations with relevant experience. Verify their credentials and define their roles and responsibilities clearly. Then, formalize the appointment through a written agreement outlining scope, confidentiality, and terms of engagement. Seek approval from senior management or the board as required, and onboard the expert by introducing them to the committee and providing necessary information. This process ensures a transparent and effective appointment aligned with organizational standards."
      }
    ]
  },
  'compliant-redressal': {
    title: "POSH-Compliant Redressal: India, UK & US Workplace Compliance Guide",
    subtitle: "Building Safe, Legally Compliant Workplaces",
    description: "URE POSH provides POSH-compliant workplace harassment redressal services in India, UK, and US. We offer IC setup, policy drafting, training, investigations, and compliance audits.",
    sections: [
      {
        id: "what-is-posh",
        title: "What Does POSH-Compliant Redressal Mean?",
        icon: Shield,
        content: {
          description: "POSH-compliant redressal means having a legally aligned, transparent, and fair system for preventing and addressing workplace sexual harassment. It is not just a legal mandate—it signals that your company values:",
          features: [
            "Employee safety",
            "Workplace dignity", 
            "Equality of opportunity",
            "Global compliance readiness"
          ]
        }
      },
      {
        id: "india-compliance",
        title: "India: POSH-Compliant Redressal Process",
        icon: FileText,
        content: {
          description: "The Prevention of Sexual Harassment (POSH) Act, 2013 makes it mandatory for organizations with 10+ employees to establish a compliance framework.",
          services: [
            {
              name: "Policy",
              description: "Draft & circulate a written POSH policy"
            },
            {
              name: "Internal Committee (IC)",
              description: "Formed with a Presiding Officer, employees, and one external NGO/legal expert"
            },
            {
              name: "Training",
              description: "Regular awareness for employees & IC members"
            },
            {
              name: "Reporting",
              description: "Confidential complaint reporting channels"
            },
            {
              name: "Investigation",
              description: "Impartial inquiries completed within 90 days"
            },
            {
              name: "Recordkeeping",
              description: "Registers, reports, and annual filings under Section 21"
            }
          ]
        }
      },
      {
        id: "uk-compliance",
        title: "UK: Workplace Harassment & Equality Compliance",
        icon: Award,
        content: {
          description: "The Equality Act 2010 requires employers to provide a workplace free from harassment and discrimination.",
          services: [
            {
              name: "Clear Anti-Harassment Policy",
              description: "With grievance procedure"
            },
            {
              name: "Equality & Diversity Training",
              description: "For employees & managers"
            },
            {
              name: "Grievance Redressal Mechanisms",
              description: "Internal panels or external advisors"
            },
            {
              name: "External Advisors",
              description: "NGOs, HR, or legal experts in complex cases"
            },
            {
              name: "Documentation & Transparency",
              description: "Investigation reports and actions taken"
            }
          ]
        }
      },
      {
        id: "us-compliance", 
        title: "US: Workplace Harassment Redressal & Compliance",
        icon: Globe,
        content: {
          description: "In the US, sexual harassment is prohibited under Title VII of the Civil Rights Act of 1964, enforced by the Equal Employment Opportunity Commission (EEOC).",
          services: [
            {
              name: "Anti-Harassment Policy",
              description: "Acknowledged by all staff"
            },
            {
              name: "Complaint Process",
              description: "Confidential reporting and escalation"
            },
            {
              name: "Prompt Investigation",
              description: "Impartial, time-bound inquiries"
            },
            {
              name: "Mandatory Training",
              description: "In many states (e.g., California, New York)"
            },
            {
              name: "External Investigators",
              description: "For objectivity in sensitive cases"
            },
            {
              name: "Documentation",
              description: "Maintain records for litigation defense & audits"
            }
          ]
        }
      },
      {
        id: "why-choose-ureposh",
        title: "Why Choose URE POSH for POSH & Harassment Compliance?",
        icon: Zap,
        content: {
          description: "URE POSH = Your Global Partner for Safe, Compliant Workplaces.",
          features: [
            "End-to-End POSH Compliance (India) – Policy drafting, IC setup, training, reporting",
            "Global Alignment (UK & US) – Policies tailored to Equality Act 2010 & EEOC standards",
            "Training & Awareness Programs – for employees, managers, and IC",
            "Neutral Investigations – with external NGO/legal experts",
            "Audit-Ready Recordkeeping – compliant with ESG & investor due diligence"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is POSH-compliant redressal?",
        answer: "It is a structured grievance-handling process aligned with POSH Act 2013 in India, Equality Act 2010 in the UK, and Title VII in the US. It ensures complaints are addressed in a fair, timely, confidential, and documented manner."
      },
      {
        question: "How do you set up a POSH Internal Committee (IC) in India?",
        answer: "Presiding Officer: Senior woman employee. At least two employees with credibility or legal knowledge. One external member (NGO/social worker/legal expert). At least 50% women representation. Formal notification and training are mandatory."
      },
      {
        question: "What timelines must be followed under POSH Act, 2013?",
        answer: "Complaint filing: within 3 months of incident (extendable). IC inquiry: completed within 90 days. Report submission: within 10 days of inquiry. Employer action: within 60 days of report."
      },
      {
        question: "How are UK companies legally bound to address harassment?",
        answer: "Under the Equality Act 2010, failure to prevent harassment can lead to claims in Employment Tribunals. Employers must show they took 'reasonable steps' like training, policies, and swift investigations."
      },
      {
        question: "What are EEOC's expectations in the US?",
        answer: "Employers must: Adopt zero-tolerance policies. Conduct prompt, impartial investigations. Provide remedies & corrective action. Prevent retaliation against complainants."
      },
      {
        question: "What is the role of external members in IC/HR panels?",
        answer: "They bring neutrality, expertise, and credibility, preventing internal bias. In India, external members are legally mandatory. In the UK/US, external advisors are a best practice for complex or high-stakes cases."
      },
      {
        question: "How is confidentiality maintained across jurisdictions?",
        answer: "India – Section 16 of POSH Act prohibits disclosure. UK – Confidentiality agreements & GDPR compliance. US – Non-retaliation policies + attorney-client privilege in legal reviews."
      },
      {
        question: "What records must be maintained for compliance?",
        answer: "Complaint registers. IC meeting minutes. Training attendance logs. Annual reports filed with local authorities (India). Documentation for tribunal/EEOC defense (UK/US)."
      },
      {
        question: "How do global companies align POSH compliance across India, UK, and US offices?",
        answer: "By adopting a global anti-harassment policy framework with localized addendums for each jurisdiction's legal requirements, supported by cross-border compliance audits."
      },
      {
        question: "Can online training fulfill POSH/EEOC requirements?",
        answer: "Yes, but it must be interactive, certified, and documented. Many regulators require annual refreshers and state-specific training (US: California, New York)."
      },
      {
        question: "What corrective actions can employers take after inquiry?",
        answer: "Warning or reprimand. Salary deduction or promotion freeze. Transfer or termination. Counseling and workplace environment changes."
      },
      {
        question: "How does POSH compliance align with ESG reporting?",
        answer: "Investors and regulators increasingly demand Social Governance metrics. POSH compliance demonstrates: Commitment to human rights & equality. Mitigation of reputational and litigation risks. Strengthened ESG scores for global investment readiness."
      }
    ]
  },
  'posh-workplace-harassment-compliance-reporting': {
    title: "POSH & Workplace Harassment Compliance Reporting",
    subtitle: "India's Leading Workplace Safety Compliance Company",
    description: "URE POSH offers POSH compliance reporting, harassment investigations, global policy alignment, and ESG-ready certifications for corporates in India, UK, and US.",
    sections: [
      {
        id: "about-ureposh",
        title: "About URE POSH",
        icon: Shield,
        content: {
          description: "At URE POSH, we enable organizations to move beyond compliance into global workplace excellence. We specialize in POSH Act, 2013 compliance in India, Equality Act compliance in the UK, and EEOC/Title VII compliance in the US.",
          features: [
            "Policy drafting & compliance reporting",
            "Internal Committee (IC) constitution & training",
            "Awareness & prevention workshops",
            "Annual filings with regulators",
            "Audit-ready documentation for ESG & investors",
            "Legally compliant, culturally inclusive, and globally respected workplaces"
          ]
        }
      },
      {
        id: "why-compliance-matters",
        title: "Why POSH & Harassment Compliance Reporting Matters",
        icon: Award,
        content: {
          description: "Compliance reporting is not just a legal requirement—it's a strategic business imperative:",
          services: [
            {
              name: "Legal Mandate",
              description: "India's POSH Act 2013, UK's Equality Act 2010, and US Title VII (EEOC enforcement) make harassment reporting mandatory"
            },
            {
              name: "Reputation Shield",
              description: "Non-compliance can trigger public scandals, tribunal cases, and investor withdrawals"
            },
            {
              name: "Employee Trust",
              description: "Transparent reporting strengthens employee loyalty and reduces attrition"
            },
            {
              name: "Global ESG Standards",
              description: "Investors and boards now demand compliance certification for funding and governance"
            }
          ]
        }
      },
      {
        id: "services-overview",
        title: "Our Services in POSH & Harassment Compliance Reporting",
        icon: FileText,
        content: {
          description: "Comprehensive compliance services across multiple jurisdictions:",
          services: [
            {
              name: "POSH Annual Reporting (India)",
              description: "Draft & file Annual Reports under Section 21 of POSH Act with the District Officer. Maintain IC complaint registers & resolutions. Submit Board/CSR compliance updates."
            },
            {
              name: "Internal Committee (IC) Compliance",
              description: "Ensure IC is duly constituted with external NGO/legal expert. Conduct quarterly IC meetings with records. Train IC members on timelines, confidentiality, and inquiry protocols."
            },
            {
              name: "Global Policy Alignment",
              description: "Align policies with Equality Act 2010 (UK). Integrate EEOC & state-specific laws (US). Draft multi-jurisdictional harassment policies for global firms."
            },
            {
              name: "Workplace Harassment Reporting Frameworks",
              description: "Build confidential reporting channels (digital/anonymous portals). Design case escalation protocols. Assist in drafting investigation reports & disciplinary recommendations."
            },
            {
              name: "ESG & Investor Compliance",
              description: "Prepare audit-ready DEI & POSH compliance reports for investors. Integrate with CSR disclosures & sustainability reports. Issue Compliance Certificates for due diligence."
            },
            {
              name: "Independent Investigations & Advisory",
              description: "External support for sensitive or high-stakes harassment cases. Draft legally defensible inquiry reports. Ensure neutrality & fairness in grievance redressal."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of Partnering with URE POSH",
        icon: Zap,
        content: {
          description: "Transform your workplace compliance from burden to competitive advantage:",
          features: [
            "Zero Legal Risk – 100% compliance under Indian, UK, and US laws",
            "Audit-Ready Documentation – for regulators, boards, and investors",
            "Global Governance Alignment – ESG, CSR, and UN Women's Guidelines",
            "Neutral Investigations – unbiased external expertise",
            "Enhanced Employer Brand – trusted by employees & investors alike"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is POSH compliance reporting?",
        answer: "It refers to mandatory documentation and filing of harassment-related data, including complaints received, inquiries conducted, actions taken, and preventive steps, as required under POSH Act, 2013 in India and equivalent global laws."
      },
      {
        question: "What must be included in the POSH Annual Report in India?",
        answer: "Number of complaints received. Number of cases disposed of. Cases pending more than 90 days. Workshops/trainings conducted. IC meetings held."
      },
      {
        question: "Who must the Annual POSH Report be filed with?",
        answer: "With the District Officer (appointed under Section 5 of POSH Act) and simultaneously shared with the Company Board or CSR committee."
      },
      {
        question: "What are penalties for non-reporting under POSH Act, 2013?",
        answer: "Fine up to ₹50,000. License cancellation/withdrawal for repeated violations. Civil & criminal liability for employers and directors."
      },
      {
        question: "How is harassment reporting handled in the UK?",
        answer: "Under the Equality Act 2010, employers must show evidence of reasonable steps (policies, training, grievance handling). Reports are typically reviewed internally and may be escalated to Employment Tribunals."
      },
      {
        question: "How do US companies report workplace harassment cases?",
        answer: "Complaints are documented internally and may be escalated to the EEOC. Employers must maintain detailed records of complaints, investigations, and corrective actions to defend against lawsuits."
      },
      {
        question: "What is the role of confidentiality in compliance reporting?",
        answer: "India: Section 16 of POSH Act mandates confidentiality. UK: GDPR compliance applies. US: Confidentiality agreements + anti-retaliation protections."
      },
      {
        question: "What records must companies maintain for compliance audits?",
        answer: "Complaint registers. IC meeting minutes. Training records. Annual filings. Case outcome documentation."
      },
      {
        question: "How does POSH compliance connect with ESG reporting?",
        answer: "Investors now demand social governance metrics. POSH compliance demonstrates: Commitment to human rights. Risk mitigation of litigation. Strengthened sustainability & ESG scores."
      },
      {
        question: "Can global companies adopt a single harassment policy?",
        answer: "Yes—with global framework policies plus localized annexures for India, UK, and US to meet jurisdictional requirements."
      },
      {
        question: "Are digital reporting tools acceptable?",
        answer: "Yes. POSH Act allows digital complaint filing. In the US/UK, many firms use anonymous hotlines or whistleblower portals—but records must be secure & auditable."
      },
      {
        question: "How does URE POSH ensure international compliance readiness?",
        answer: "By integrating: POSH Act, 2013 (India), Equality Act 2010 (UK), Title VII & EEOC Guidelines (US), UN Women's Empowerment Principles & ILO standards."
      }
    ]
  },
  'posh-workplace-harassment-audits': {
    title: "Safe Workplace Audit – URE POSH",
    subtitle: "POSH & Harassment Compliance Certification",
    description: "URE POSH offers Safe Workplace Audits aligned with the POSH Act, Equality Act (UK), and EEOC (US). We assess policies, training, IC effectiveness, disclosures, and reporting to certify harassment-free, globally compliant workplaces.",
    sections: [
      {
        id: "about-audits",
        title: "About URE POSH Safe Workplace Audits",
        icon: Shield,
        content: {
          description: "At URE POSH, we believe compliance is more than a policy—it's proof of commitment to safety, equality, and global governance. Our Safe Workplace Audit is a 360° compliance assessment that benchmarks your organization against:",
          features: [
            "Indian POSH Act, 2013",
            "UK Equality Act, 2010 (ACAS standards)",
            "US EEOC & Title VII requirements",
            "UN Women's Empowerment Principles & ILO conventions",
            "ESG (Environmental, Social, Governance) global standards",
            "Legal compliance, audit-ready, and investor-trusted certification"
          ]
        }
      },
      {
        id: "why-audits-matter",
        title: "Why Safe Workplace Audits Matter",
        icon: Award,
        content: {
          description: "Safe workplace audits are essential for comprehensive organizational protection:",
          features: [
            "Legal Requirement – POSH compliance in India, EEO/Equality compliance in UK & US",
            "Risk Mitigation – Prevent fines, litigation, and reputational loss",
            "Investor Confidence – ESG/CSR reports demand proof of safe workplace practices",
            "Employee Trust – Builds transparency, safety, and retention",
            "Global Standardization – Unified compliance across multi-country operations"
          ]
        }
      },
      {
        id: "audit-services",
        title: "Our Safe Workplace Audit Services",
        icon: FileText,
        content: {
          description: "Comprehensive audit services covering all aspects of workplace safety compliance:",
          services: [
            {
              name: "Policy & Document Review",
              description: "POSH policy (India), Anti-harassment policy (UK/US). Disclosures, posters, HR manuals, handbooks. Verification of policy updates & legal alignment."
            },
            {
              name: "Internal Committee (IC) Assessment",
              description: "Constitution as per POSH Act, 2013. External member appointment & compliance. Meeting frequency, records, and resolutions."
            },
            {
              name: "Training & Awareness Audit",
              description: "Employee sensitization records. IC training sessions. Leadership accountability programs."
            },
            {
              name: "Reporting & Recordkeeping",
              description: "Annual POSH report filing under Section 21 (India). EEOC recordkeeping compliance (US). UK grievance documentation requirements."
            },
            {
              name: "Workplace Disclosure Check",
              description: "Posters displayed at conspicuous locations. Digital policy disclosures via intranet/HRMS. Multilingual availability."
            },
            {
              name: "Complaint Redressal Audit",
              description: "Complaint registers & timelines. Inquiry procedures & confidentiality adherence. Implementation of disciplinary measures."
            },
            {
              name: "ESG & Investor-Readiness Certification",
              description: "Audit-ready reports for investors, boards, and CSR disclosures. Integration with sustainability & governance frameworks. Certification issued by URE POSH."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Audit",
        icon: Zap,
        content: {
          description: "Transform your compliance posture with comprehensive audit benefits:",
          features: [
            "100% Compliance Proof – Prevents penalties & ensures audit readiness",
            "Global Policy Alignment – India, UK, US standards integrated",
            "Stronger Governance – ESG & CSR-ready reports",
            "Legal Risk Mitigation – Prevents harassment claims escalating to courts",
            "Reputation Shield – Trusted employer brand for employees & investors"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is a Safe Workplace Audit?",
        answer: "It is an independent, structured review of an organization's POSH compliance, harassment policies, IC effectiveness, disclosures, and reporting practices, benchmarked against legal and global standards."
      },
      {
        question: "Is a Safe Workplace Audit mandatory in India?",
        answer: "While not expressly mandated, the POSH Act, 2013 requires employers to maintain policies, IC records, and reports. An audit ensures full compliance and avoids penalties during inspections."
      },
      {
        question: "What are the key components of the audit?",
        answer: "Policy & IC compliance. Training & awareness sessions. Annual reports & filings. Recordkeeping & documentation. Grievance redressal effectiveness."
      },
      {
        question: "Who conducts the Safe Workplace Audit?",
        answer: "At URE POSH, audits are led by a team of lawyers, compliance experts, HR specialists, and external POSH trainers with global expertise."
      },
      {
        question: "What happens if non-compliance is found?",
        answer: "We provide: Compliance gap report. Corrective action plan. Updated policies, IC restructuring, and training."
      },
      {
        question: "What are the penalties for non-compliance in India?",
        answer: "Fine up to ₹50,000. License cancellation for repeat offenses. Civil & criminal liability for directors/employers."
      },
      {
        question: "How are Safe Workplace Audits different in UK & US?",
        answer: "UK: Equality Act compliance, Employment Tribunal risk mitigation, ACAS alignment. US: EEOC reporting, Title VII compliance, mandatory training in some states."
      },
      {
        question: "How often should audits be conducted?",
        answer: "Minimum: Annual audit. Best practice: Bi-annual or quarterly reviews in large corporations."
      },
      {
        question: "What records must companies maintain for compliance?",
        answer: "Complaint registers. Inquiry proceedings. IC meeting minutes. Training attendance records. Annual POSH reports (India)."
      },
      {
        question: "Can digital tools be used in audits?",
        answer: "Yes. We use digital complaint portals, HRMS integration, and AI-powered compliance dashboards to track records and flag risks."
      },
      {
        question: "How does this audit support ESG & CSR reporting?",
        answer: "A Safe Workplace Audit strengthens Social Governance metrics, demonstrates human rights compliance, and improves investor ratings."
      },
      {
        question: "Does URE POSH issue compliance certificates?",
        answer: "Yes. After the audit, we issue a Safe Workplace Compliance Certificate that can be showcased in investor presentations, ESG reports, and corporate disclosures."
      }
    ]
  },
  'respectful-workplace-training-compliance': {
    title: "Workplace Respect Training – URE POSH",
    subtitle: "Harassment Prevention & Compliance",
    description: "URE POSH offers Workplace Respect & Harassment Prevention Training aligned with the POSH Act (India), Equality Act (UK), and EEOC (US). Build respectful, inclusive, and globally compliant workplaces with certified training programs.",
    sections: [
      {
        id: "about-training",
        title: "About URE POSH Workplace Respect Training",
        icon: Users,
        content: {
          description: "At URE POSH, we believe that a safe workplace begins with respect. Policies and audits alone are not enough—behaviors must change. Our Workplace Respect Training programs help employees, managers, and leaders:",
          features: [
            "Understand the boundaries of professional conduct",
            "Recognize unconscious bias, microaggressions, and harassment",
            "Learn the global legal framework (India, UK, US)",
            "Build a culture of dignity, inclusivity, and accountability",
            "Interactive, scenario-based, and legally compliant programs",
            "Designed for both in-person and digital learning formats"
          ]
        }
      },
      {
        id: "why-training-matters",
        title: "Why Workplace Respect Training Matters",
        icon: Shield,
        content: {
          description: "Without training, compliance is incomplete—companies face legal penalties, litigation costs, and reputational damage.",
          services: [
            {
              name: "India – POSH Act, 2013",
              description: "Mandates regular awareness & sensitization"
            },
            {
              name: "UK – Equality Act, 2010",
              description: "ACAS guidelines require training to prevent Employment Tribunal claims"
            },
            {
              name: "US – EEOC & State Laws",
              description: "States like California, New York mandate annual harassment prevention training"
            },
            {
              name: "Global ESG Standards",
              description: "Investors and boards expect DEI & workplace respect metrics"
            }
          ]
        }
      },
      {
        id: "training-modules",
        title: "Our Training Modules",
        icon: FileText,
        content: {
          description: "Comprehensive training programs covering all aspects of workplace respect and compliance:",
          services: [
            {
              name: "Foundations of Workplace Respect",
              description: "Principles of dignity & inclusion. Legal overview: POSH Act, Equality Act, EEOC laws. Rights & responsibilities of employees."
            },
            {
              name: "Recognizing Harassment & Discrimination",
              description: "Quid pro quo & hostile work environment. Subtle bias, bullying, microaggressions. Protected characteristics (gender, race, age, religion, disability, sexual orientation)."
            },
            {
              name: "Role of Managers & Leadership",
              description: "Duty of care and accountability. Handling complaints without retaliation. Role modeling respectful behavior."
            },
            {
              name: "Complaint Redressal & Reporting",
              description: "How to raise concerns safely. Role of Internal Committee (India), grievance panels (UK), HR/EEOC (US). Confidentiality obligations."
            },
            {
              name: "Global Best Practices",
              description: "Case studies from India, UK, and US. Cross-cultural communication. ESG-linked respect programs."
            },
            {
              name: "Interactive Workshops & E-Learning",
              description: "Role-plays and simulations. Quizzes & certifications. Digital learning dashboards for large organizations."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Training",
        icon: Zap,
        content: {
          description: "Transform your workplace culture with comprehensive training benefits:",
          features: [
            "100% Legal Compliance – POSH Act, Equality Act, EEOC",
            "Improved Workplace Culture – safer, more inclusive, more productive",
            "Reduced Litigation Risk – employees trained to prevent and report respectfully",
            "Stronger Employer Brand – trusted by employees, investors, and clients",
            "Certification – training completion certificates for compliance audits"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is Workplace Respect Training legally mandatory?",
        answer: "India: Yes, POSH Act, 2013 mandates regular awareness. UK: Equality Act, 2010 expects 'reasonable steps' including training. US: EEOC recommends it; many states (e.g., CA, NY) mandate annual sessions."
      },
      {
        question: "What is included in respect training?",
        answer: "Understanding harassment & discrimination. Respectful communication. Bystander intervention. Complaint handling."
      },
      {
        question: "Who must attend the training?",
        answer: "All employees (staff, contractual, interns). Managers & leadership (with advanced modules). IC members (India) must undergo specialized POSH training."
      },
      {
        question: "How often should training be conducted?",
        answer: "India: At least once a year. US: Annually in mandated states. UK: Regular refreshers; best practice = annual or biennial."
      },
      {
        question: "Can online training fulfill legal requirements?",
        answer: "Yes, provided it is interactive, trackable, and certified. India, UK, and US regulators accept e-learning if documentation is maintained."
      },
      {
        question: "What proof of compliance is needed?",
        answer: "Training attendance logs. Certificates issued. Annual compliance report updates."
      },
      {
        question: "How is confidentiality handled during training discussions?",
        answer: "Trainers ensure safe, non-judgmental environments, with anonymized case studies and no recording of personal disclosures."
      },
      {
        question: "What are consequences of not providing training?",
        answer: "India: Penalties under POSH Act (₹50,000 fine, license cancellation). UK: Tribunal penalties, compensation to victims. US: EEOC lawsuits, multimillion-dollar settlements."
      },
      {
        question: "Can global companies adopt a single training framework?",
        answer: "Yes—with a core global curriculum + jurisdiction-specific modules for India, UK, US laws."
      },
      {
        question: "What role do managers play in respect training?",
        answer: "Managers are first responders—trained to recognize, de-escalate, and report harassment without bias or retaliation."
      },
      {
        question: "How is training effectiveness measured?",
        answer: "Pre/post training assessments. Complaint trend monitoring. Employee feedback surveys."
      },
      {
        question: "Does URE POSH provide certification?",
        answer: "Yes, we issue Workplace Respect Training Certificates recognized for legal audits, ESG reports, and investor governance checks."
      }
    ]
  },
  'training-internal-committees-workplace-panels': {
    title: "Internal Committees (IC) Training – URE POSH",
    subtitle: "POSH Act Compliance Training",
    description: "URE POSH provides Internal Committee (IC) training programs aligned with India's POSH Act, UK's Equality Act, and US EEOC standards. We empower IC members to conduct fair, confidential, and compliant workplace harassment inquiries with global best practices.",
    sections: [
      {
        id: "about-ic-training",
        title: "About URE POSH Internal Committee Training",
        icon: Users,
        content: {
          description: "Every company with 10+ employees in India must form an Internal Committee (IC) under the POSH Act, 2013 to handle workplace harassment complaints. However, compliance does not stop at constitution—the committee must be trained to function legally, ethically, and effectively.",
          features: [
            "Understand their legal responsibilities under POSH Act",
            "Conduct fair, unbiased, and confidential inquiries",
            "Draft legally defensible inquiry reports",
            "Align practices with UK Equality Act (2010) grievance mechanisms & US EEOC complaint procedures",
            "Strengthen governance, ESG compliance, and investor trust"
          ]
        }
      },
      {
        id: "why-ic-training-critical",
        title: "Why Internal Committee Training is Critical",
        icon: Shield,
        content: {
          description: "Proper IC training is essential for legal compliance and organizational protection:",
          services: [
            {
              name: "Legal Mandate (India)",
              description: "Section 4 of POSH Act requires IC formation + ongoing training"
            },
            {
              name: "Employer Liability",
              description: "Poorly trained ICs risk biased inquiries, legal challenges, and penalties"
            },
            {
              name: "Global Governance",
              description: "MNCs require consistent standards across India, UK, and US offices"
            },
            {
              name: "Employee Confidence",
              description: "A trained IC inspires trust, transparency, and reporting"
            },
            {
              name: "Investor & ESG Compliance",
              description: "Auditable, trained ICs are part of governance scorecards"
            }
          ]
        }
      },
      {
        id: "training-modules",
        title: "Our Internal Committee Training Modules",
        icon: FileText,
        content: {
          description: "Comprehensive training programs covering all aspects of IC operations:",
          services: [
            {
              name: "Legal Frameworks",
              description: "India: POSH Act, 2013 + Rules, 2013. UK: Equality Act, 2010 & ACAS grievance codes. US: EEOC procedures under Title VII."
            },
            {
              name: "Roles & Responsibilities of IC Members",
              description: "Presiding Officer (senior woman employee). Employee members. External NGO/Legal expert. Reporting & accountability to employer/District Officer."
            },
            {
              name: "Complaint Handling Process",
              description: "Receiving written & digital complaints. Timelines (90 days inquiry, 10 days report, 60 days action). Confidentiality & anti-retaliation obligations."
            },
            {
              name: "Conducting Inquiries",
              description: "Framing issues & notice to respondent. Evidence gathering, witness examination. Principles of natural justice. Handling false or malicious complaints."
            },
            {
              name: "Drafting Inquiry Reports",
              description: "Report structure: findings, recommendations, corrective action. Legal language & compliance proof. Filing reports with employer & District Officer."
            },
            {
              name: "Global Best Practices",
              description: "UK grievance panels & mediation processes. US independent investigations & EEOC cooperation. Cross-border alignment for MNCs."
            },
            {
              name: "ESG & Governance Linkage",
              description: "IC performance as a governance KPI. Integration with CSR & sustainability reporting. Audit-readiness for investor due diligence."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH IC Training",
        icon: Zap,
        content: {
          description: "Transform your IC into a professional, compliant, and effective body:",
          features: [
            "100% Legal Compliance – India, UK, US standards covered",
            "Professional Inquiry Skills – unbiased, fair, confidential handling",
            "Audit-Ready Documentation – inquiry records, reports, filings",
            "Global Policy Alignment – for MNCs with multi-country offices",
            "Certification – completion certificate for IC members, recognized in compliance audits"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is IC training legally mandatory in India?",
        answer: "Yes. While the POSH Act does not prescribe a training frequency, Section 19(c) obligates employers to organize workshops and programs for IC members and employees."
      },
      {
        question: "Who must be part of an Internal Committee (IC)?",
        answer: "Presiding Officer: Senior woman employee. At least 2 employee members with social credibility or legal knowledge. 1 external member from an NGO/legal/social work background. At least 50% women representation."
      },
      {
        question: "What are the legal timelines ICs must follow?",
        answer: "Inquiry completion: 90 days. Report submission: 10 days post-inquiry. Employer action: 60 days from report."
      },
      {
        question: "What happens if IC members are untrained?",
        answer: "Risk of biased inquiries. Invalidation of reports in court. Employer liability for non-compliance fines."
      },
      {
        question: "What are the penalties for IC non-compliance in India?",
        answer: "Fine up to ₹50,000. Repeat violations: business license cancellation."
      },
      {
        question: "How is IC training handled in UK/US offices of Indian companies?",
        answer: "UK: Training under Equality Act + ACAS grievance standards. US: EEOC investigation standards + state laws (California, New York)."
      },
      {
        question: "Can IC members from different branches be combined?",
        answer: "Yes, if workplaces are small, cluster ICs can be formed as per POSH Rules, but each IC must cover designated locations and employees."
      },
      {
        question: "Can external members be replaced?",
        answer: "Yes, but every IC must have one external NGO/legal expert at all times. Their details must be disclosed in posters & policies."
      },
      {
        question: "What records must ICs maintain?",
        answer: "Complaint registers. Inquiry proceedings & witness statements. Final reports. Annual filings under Section 21."
      },
      {
        question: "How is confidentiality ensured during IC inquiries?",
        answer: "India: Section 16 of POSH Act prohibits disclosure. UK: GDPR + confidentiality policies. US: Non-retaliation policies + attorney-client privilege."
      },
      {
        question: "How often should IC training be conducted?",
        answer: "Best practice: annual refreshers + immediate training for new IC members."
      },
      {
        question: "Does URE POSH certify IC members post-training?",
        answer: "Yes. We issue Internal Committee Training Certificates, which can be produced during audits, court inquiries, and investor ESG reviews."
      }
    ]
  },
  'quarterly-mandatory-training': {
    title: "Quarterly Mandatory Training – URE POSH",
    subtitle: "Workplace Harassment & POSH Compliance",
    description: "URE POSH delivers Quarterly Mandatory Training programs aligned with the POSH Act (India), Equality Act (UK), and EEOC (US). Build a harassment-free, compliant, and respectful workplace with recurring awareness and certification.",
    sections: [
      {
        id: "about-quarterly-training",
        title: "About URE POSH Quarterly Training",
        icon: Users,
        content: {
          description: "Workplace compliance is not a one-time exercise—laws and employees demand continuous awareness and sensitization. At URE POSH, we conduct Quarterly Mandatory Training Programs that keep organizations audit-ready, globally compliant, and culturally safe.",
          features: [
            "Aligned with POSH Act, 2013 (India) requirements of periodic awareness",
            "Covers Equality Act, 2010 (UK) and ACAS training guidelines",
            "Meets EEOC & state mandates (US) for harassment prevention refreshers",
            "ESG & CSR integrated for investor confidence",
            "Ensures employees, managers, and Internal Committee (IC) remain updated, trained, and certified"
          ]
        }
      },
      {
        id: "why-quarterly-essential",
        title: "Why Quarterly Training is Essential",
        icon: Shield,
        content: {
          description: "Continuous training is critical for sustained compliance and risk management:",
          services: [
            {
              name: "Legal Compliance",
              description: "POSH Act in India mandates 'regular workshops and awareness.' EEOC & Equality Act recommend periodic refreshers"
            },
            {
              name: "Changing Workforce",
              description: "New hires, interns, and contractors must be trained quarterly"
            },
            {
              name: "Continuous Risk Mitigation",
              description: "Prevents legal liability, tribunal cases, and penalties"
            },
            {
              name: "Audit-Readiness",
              description: "Training logs & certificates serve as compliance proof"
            },
            {
              name: "Global Best Practices",
              description: "ESG/CSR boards demand regular reporting on training initiatives"
            }
          ]
        }
      },
      {
        id: "training-programs",
        title: "Our Quarterly Training Programs",
        icon: FileText,
        content: {
          description: "Comprehensive quarterly training covering all stakeholder groups:",
          services: [
            {
              name: "Employee Awareness Modules",
              description: "Workplace harassment definition & examples. Rights & responsibilities under POSH, Equality Act, EEOC laws. Reporting mechanisms and confidentiality."
            },
            {
              name: "Manager & Leadership Training",
              description: "Duty of care obligations. Preventing retaliation. Handling complaints professionally. Case studies of tribunal/EEOC rulings."
            },
            {
              name: "Internal Committee (IC) Quarterly Refreshers",
              description: "POSH timelines & case handling. Mock inquiries & role-plays. Report writing workshops. Legal precedent updates."
            },
            {
              name: "Global Policy Integration",
              description: "India: POSH compliance updates. UK: Equality Act & ACAS codes. US: EEOC + state-specific (CA, NY) requirements. Cross-border consistency for MNCs."
            },
            {
              name: "Digital & On-Site Formats",
              description: "Quarterly webinars + live workshops. Interactive e-learning modules. AI-powered training dashboards with attendance tracking & certificates."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Quarterly Training",
        icon: Zap,
        content: {
          description: "Transform your compliance approach with continuous learning benefits:",
          features: [
            "100% Legal Compliance – India, UK, US",
            "Reduced Litigation Risk – trained staff = fewer violations",
            "Improved Workplace Culture – trust, safety, inclusion",
            "Audit & ESG-Ready Proof – attendance logs, certificates, reports",
            "Global Standardization – consistent framework across all offices"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is quarterly training legally mandatory?",
        answer: "India: POSH Act requires 'regular workshops.' Quarterly sessions are best practice for compliance. UK: Equality Act expects employers to take 'reasonable steps' (training included). US: EEOC recommends regular training; some states mandate annual refreshers (quarterly ensures readiness)."
      },
      {
        question: "Who must attend quarterly training?",
        answer: "All employees, contractors, interns, leadership, and Internal Committee members."
      },
      {
        question: "What topics are covered?",
        answer: "POSH Act, 2013 provisions. Equality Act, 2010 requirements. EEOC & Title VII obligations. Respect, inclusion, reporting, confidentiality."
      },
      {
        question: "How is attendance tracked?",
        answer: "Through digital LMS dashboards, sign-in sheets, and certification records—maintained for compliance audits."
      },
      {
        question: "Can training be online?",
        answer: "Yes. E-learning + live webinars are legally acceptable if interactive and documented."
      },
      {
        question: "What proof is required for compliance audits?",
        answer: "Training logs. Certificates. Annual compliance report annexures."
      },
      {
        question: "What are penalties for not conducting regular training?",
        answer: "India: ₹50,000 fine, cancellation of business license. UK: Tribunal rulings with financial penalties. US: EEOC lawsuits and settlements."
      },
      {
        question: "How do quarterly trainings help new employees?",
        answer: "Ensures immediate sensitization of new hires, interns, and contractors, preventing compliance gaps."
      },
      {
        question: "Can one session cover all geographies?",
        answer: "Yes—global modules with localized legal annexures (India, UK, US) for jurisdictional compliance."
      },
      {
        question: "How do managers benefit from quarterly sessions?",
        answer: "They are trained as first responders, ensuring complaints are handled legally & respectfully."
      },
      {
        question: "How do investors view quarterly training?",
        answer: "Quarterly training strengthens ESG (Social Governance) scores and helps in due diligence checks."
      },
      {
        question: "Does URE POSH certify quarterly compliance?",
        answer: "Yes. We issue Quarterly Compliance Certificates confirming that the organization is POSH-compliant and globally audit-ready."
      }
    ]
  },
  'managers-level-training': {
    title: "Managers Level Training – URE POSH",
    subtitle: "POSH & Workplace Compliance Programs",
    description: "URE POSH provides Manager-Level Compliance Training aligned with the POSH Act (India), Equality Act (UK), and EEOC (US). Train managers to handle workplace harassment, respect, and compliance obligations with global best practices.",
    sections: [
      {
        id: "about-manager-training",
        title: "About URE POSH Manager-Level Training",
        icon: Users,
        content: {
          description: "Managers are the first line of defense in creating a respectful, safe, and compliant workplace. Their actions directly impact employee trust, organizational culture, and legal liability. At URE POSH, our Manager-Level Training programs equip leaders with the skills, knowledge, and compliance framework needed to:",
          features: [
            "Identify and prevent harassment, bias, and discrimination",
            "Handle complaints fairly, confidentially, and lawfully",
            "Lead with respect and inclusion",
            "Ensure compliance with India's POSH Act, UK's Equality Act, and US EEOC guidelines",
            "Strengthen ESG and governance credibility for investors and boards"
          ]
        }
      },
      {
        id: "why-manager-training-critical",
        title: "Why Manager Training is Critical",
        icon: Shield,
        content: {
          description: "Manager training is essential across all major jurisdictions for legal compliance and risk mitigation:",
          services: [
            {
              name: "India (POSH Act, 2013)",
              description: "Employers must ensure managers are sensitized to workplace harassment prevention and IC cooperation"
            },
            {
              name: "UK (Equality Act, 2010)",
              description: "Employers must take 'reasonable steps' (training managers is key to defense in Employment Tribunals)"
            },
            {
              name: "US (EEOC & State Mandates)",
              description: "Supervisors must undergo harassment prevention training in states like California & New York"
            },
            {
              name: "Global ESG Reporting",
              description: "Boards and investors demand leadership-level accountability in workplace compliance"
            }
          ]
        }
      },
      {
        id: "training-modules",
        title: "Our Manager-Level Training Modules",
        icon: FileText,
        content: {
          description: "Comprehensive training programs specifically designed for management-level responsibilities:",
          services: [
            {
              name: "Legal Frameworks for Managers",
              description: "POSH Act duties of 'Employer' & 'Responsible Officers.' Equality Act, 2010: Preventing liability in UK tribunals. EEOC and Title VII responsibilities in US workplaces."
            },
            {
              name: "Identifying Workplace Misconduct",
              description: "Recognizing harassment, bullying, microaggressions. Understanding protected characteristics. Case studies from courts and tribunals."
            },
            {
              name: "Handling Complaints & Escalations",
              description: "Receiving complaints respectfully. Escalation to Internal Committee (India), HR/grievance panels (UK/US). Confidentiality & non-retaliation best practices."
            },
            {
              name: "Manager as Role Model",
              description: "Leading by example. Building inclusive team culture. Promoting diversity & equal opportunities."
            },
            {
              name: "Reporting & Documentation",
              description: "Maintaining defensible compliance records. IC/HR cooperation. ESG/CSR disclosure reporting."
            },
            {
              name: "Interactive Learning",
              description: "Role-plays on handling sensitive situations. Mock complaint redressal exercises. Leadership self-assessment & certification."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Manager Training",
        icon: Zap,
        content: {
          description: "Transform your management team into compliance champions with specialized training benefits:",
          features: [
            "100% Legal Compliance – India, UK, US standards",
            "Reduced Employer Liability – managers trained to prevent escalations",
            "Improved Culture & Retention – employees trust managers to act fairly",
            "Audit-Ready Records – training certificates & logs",
            "ESG & Investor Alignment – leadership accountability built into governance"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is Manager-Level Training legally required?",
        answer: "Yes. POSH Act (India) mandates regular sensitization. In the UK, tribunals expect manager training. In the US, EEOC & many states mandate supervisor training."
      },
      {
        question: "Who should attend Manager-Level Training?",
        answer: "All line managers, team leaders, HR managers, compliance officers, and department heads."
      },
      {
        question: "What are managers' legal duties under POSH Act?",
        answer: "Prevent harassment. Support IC inquiries. Ensure confidentiality. Implement IC recommendations."
      },
      {
        question: "How does manager training protect companies in UK tribunals?",
        answer: "Training demonstrates 'reasonable steps' under Equality Act, helping employers defend against harassment claims."
      },
      {
        question: "What is the consequence of untrained managers in the US?",
        answer: "EEOC may impose fines, settlements, or mandatory training orders. Courts often hold companies liable if managers ignore or mishandle complaints."
      },
      {
        question: "How often should managers undergo training?",
        answer: "At least annually; quarterly refreshers are recommended for high-risk industries."
      },
      {
        question: "What skills do managers gain?",
        answer: "Complaint handling. Respectful communication. Bias recognition. Legal documentation."
      },
      {
        question: "Can training be conducted online?",
        answer: "Yes. Virtual training is valid if interactive, trackable, and certified."
      },
      {
        question: "What documentation must be kept?",
        answer: "Attendance logs. Training certificates. Policy acknowledgment forms. Case simulation assessments."
      },
      {
        question: "What role do managers play in ESG compliance?",
        answer: "They provide governance accountability, ensuring workplace respect is embedded in corporate reporting."
      },
      {
        question: "Can global MNCs have unified manager training?",
        answer: "Yes—one global framework with localized modules for India, UK, and US compliance."
      },
      {
        question: "Does URE POSH certify managers post-training?",
        answer: "Yes. We issue Manager-Level Training Certificates recognized in legal audits, ESG reviews, and investor due diligence."
      }
    ]
  },
  'well-being-programmes': {
    title: "Employee Well-Being Programmes – URE POSH",
    subtitle: "Workplace Wellness & Compliance",
    description: "URE POSH designs Employee Well-Being Programmes aligned with global MNC standards. Covering mental health, physical wellness, financial well-being, DEI, and compliance, our programmes boost productivity, retention, and ESG scores.",
    sections: [
      {
        id: "about-wellbeing",
        title: "About URE POSH Well-Being Programmes",
        icon: Users,
        content: {
          description: "Employee well-being is not just HR practice—it's a business priority. Top MNCs (Google, Unilever, Deloitte, Microsoft) have proven that structured well-being programmes increase productivity by 20–30%, reduce attrition & absenteeism, strengthen employer brand, and support compliance with global ESG & DEI standards.",
          features: [
            "India – POSH Act obligations (safe workplace environment)",
            "UK – Equality Act & HSE (Health & Safety Executive) guidelines",
            "US – OSHA workplace health regulations + EEOC",
            "Global Standards – WHO Well-Being Framework, UN SDGs, ESG compliance"
          ]
        }
      },
      {
        id: "wellbeing-programmes",
        title: "Our Well-Being Programmes",
        icon: Shield,
        content: {
          description: "Comprehensive well-being initiatives covering all aspects of employee health and wellness:",
          services: [
            {
              name: "Mental Health & Resilience",
              description: "Corporate counselling helplines. Mindfulness & stress management workshops. Mental health first-aid training for managers. Quarterly resilience assessments. Global Example: Deloitte offers mental health champions programme with trained employees as first points of contact."
            },
            {
              name: "Physical Wellness & Fitness",
              description: "Annual health check-ups. Ergonomics training (remote + onsite staff). Subsidized gym/wellness memberships. On-site yoga, Zumba, meditation sessions. Global Example: Google provides on-site gyms, nap pods, and health clinics to reduce burnout."
            },
            {
              name: "Financial Well-Being",
              description: "Financial literacy sessions. Retirement & savings plan awareness. Debt management counselling. Employee stock ownership plan (ESOP) guidance. Global Example: Microsoft runs financial wellness coaching tied to employee benefit programs."
            },
            {
              name: "Diversity, Equity & Inclusion (DEI) Support",
              description: "Training on respect & dignity. Safe-space employee resource groups (ERGs). Celebrating cultural/ethnic diversity events. Policy reviews for inclusivity (gender-neutral leave, equal pay). Global Example: Unilever runs 'Unstereotype' training modules to challenge unconscious bias."
            },
            {
              name: "Work-Life Balance Initiatives",
              description: "Hybrid & flexible work models. Mandatory vacation days. 'No meeting Fridays' or 'mental health days.' Employee assistance programs (EAPs). Global Example: Salesforce offers Wellbeing Reimbursement Program ($100/month for fitness/wellness expenses)."
            },
            {
              name: "Compliance & Safe Workplace Integration",
              description: "Integration with POSH Act obligations in India. Grievance redressal & awareness campaigns. Quarterly compliance reporting. ESG-linked certification for investors."
            }
          ]
        }
      },
      {
        id: "how-programmes-work",
        title: "How Our Programmes Work",
        icon: FileText,
        content: {
          description: "Structured approach to implementing effective well-being programmes:",
          services: [
            {
              name: "Assessment",
              description: "Workplace surveys, audits, and risk mapping"
            },
            {
              name: "Design",
              description: "Tailored well-being programmes aligned with business & legal goals"
            },
            {
              name: "Implementation",
              description: "Workshops, digital platforms, wellness partners"
            },
            {
              name: "Measurement",
              description: "KPIs: absenteeism rate, productivity metrics, retention"
            },
            {
              name: "Reporting",
              description: "Annual compliance & ESG-ready disclosures"
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits for Corporates",
        icon: Zap,
        content: {
          description: "Transform your workplace with comprehensive well-being programme benefits:",
          features: [
            "Legal & Compliance Readiness – POSH, OSHA, HSE, EEOC",
            "Productivity Boost – happier employees = higher output",
            "Employer Brand – attract and retain global talent",
            "ESG & Investor Advantage – measurable governance metrics",
            "Employee Loyalty – lower attrition, stronger culture"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is an employee well-being programme?",
        answer: "A structured set of policies, initiatives, and resources aimed at improving employees' mental, physical, financial, and social health while ensuring compliance with workplace safety and anti-harassment laws."
      },
      {
        question: "Are well-being programmes mandatory?",
        answer: "India: Indirectly mandated under POSH Act (safe workplace obligation). UK: HSE requires employers to manage employee stress & safety. US: OSHA mandates safe workplace standards; many states require mental health initiatives."
      },
      {
        question: "How do well-being programmes impact compliance?",
        answer: "They strengthen compliance with POSH, Equality, and EEOC standards, reduce litigation risks, and improve ESG governance scores."
      },
      {
        question: "What are the core pillars of a well-being programme?",
        answer: "Mental health, physical wellness, financial well-being, diversity/inclusion, and work-life balance."
      },
      {
        question: "How do MNCs integrate well-being into culture?",
        answer: "Through employee resource groups (ERGs), dedicated wellness budgets, and making well-being part of leadership KPIs."
      },
      {
        question: "How is effectiveness measured?",
        answer: "KPIs: employee engagement scores, attrition %, sick days used, productivity uplift, grievance reports."
      },
      {
        question: "How often should well-being programmes be run?",
        answer: "Best practice: Quarterly activities + annual assessments."
      },
      {
        question: "Can SMEs adopt MNC-style programmes?",
        answer: "Yes—scaled versions like virtual counselling, flexible hours, and low-cost awareness sessions."
      },
      {
        question: "What documentation is needed for audits?",
        answer: "Programme policies. Participation logs. Wellness partner contracts. Annual well-being reports."
      },
      {
        question: "How do programmes align with ESG?",
        answer: "Well-being initiatives support the 'S' in ESG (Social Governance) and strengthen investor reporting."
      },
      {
        question: "How does URE POSH customize programmes?",
        answer: "By assessing industry-specific risks (e.g., IT burnout, manufacturing safety, BFSI stress levels) and tailoring solutions."
      },
      {
        question: "Does URE POSH provide certification?",
        answer: "Yes—we issue Well-Being Compliance Certificates for ESG reports, investor due diligence, and CSR disclosures."
      }
    ]
  },
  'code-of-conduct-training': {
    title: "Code of Conduct Training – URE POSH",
    subtitle: "Workplace Compliance & Ethics Programmes",
    description: "URE POSH offers Code of Conduct Training aligned with the POSH Act (India), Equality Act (UK), and EEOC (US). Our programmes build ethical, compliant, and respectful workplaces with global standards and certification.",
    sections: [
      {
        id: "about-coc-training",
        title: "About URE POSH Code of Conduct Training",
        icon: Shield,
        content: {
          description: "The Code of Conduct (CoC) is the backbone of corporate governance and workplace ethics. A well-drafted CoC means little if employees and managers do not understand, internalize, and apply it. At URE POSH, we provide Code of Conduct Training that goes beyond policies—focusing on compliance, ethical behavior, and global governance standards.",
          features: [
            "Covers POSH obligations (India), Equality Act (UK), and EEOC/OSHA (US)",
            "Integrates with anti-bribery, whistleblower, and anti-harassment frameworks",
            "Designed for employees, managers, leadership, and compliance officers",
            "Helps organizations achieve ESG, CSR, and investor governance benchmarks"
          ]
        }
      },
      {
        id: "why-coc-training-matters",
        title: "Why Code of Conduct Training Matters",
        icon: Award,
        content: {
          description: "Without training, a Code of Conduct is just paperwork—not protection. Effective training is essential across all jurisdictions:",
          services: [
            {
              name: "India",
              description: "Under POSH Act 2013 & Companies Act 2013, employers must ensure ethical conduct & safe workplaces"
            },
            {
              name: "UK",
              description: "Equality Act & Bribery Act require training to avoid tribunal and regulatory penalties"
            },
            {
              name: "US",
              description: "EEOC, OSHA, and SEC compliance requires managers/employees to know their obligations"
            },
            {
              name: "Global MNCs",
              description: "Investor due diligence now checks for Code of Conduct implementation & training logs"
            }
          ]
        }
      },
      {
        id: "training-modules",
        title: "Our Code of Conduct Training Modules",
        icon: FileText,
        content: {
          description: "Comprehensive training modules covering all aspects of ethical workplace conduct:",
          services: [
            {
              name: "Introduction to Code of Conduct",
              description: "What CoC means in corporate governance. Legal obligations vs ethical expectations. Case laws & global best practices."
            },
            {
              name: "Compliance & Legal Frameworks",
              description: "India: POSH Act, Companies Act, SEBI guidelines. UK: Equality Act, ACAS codes, Bribery Act. US: EEOC, OSHA, SEC, Sarbanes-Oxley (SOX)."
            },
            {
              name: "Respect, Inclusion & Workplace Behavior",
              description: "Harassment prevention. Anti-discrimination & equal opportunity. Diversity, Equity & Inclusion (DEI)."
            },
            {
              name: "Conflict of Interest & Integrity",
              description: "Identifying conflicts of interest. Whistleblowing & reporting mechanisms. Anti-bribery and corruption (ABC) policies."
            },
            {
              name: "Complaint & Grievance Procedures",
              description: "How to report violations safely. Protection from retaliation. Confidentiality in investigations."
            },
            {
              name: "Leadership & Accountability",
              description: "Manager/leadership responsibilities. Governance reporting obligations. ESG & CSR integration."
            },
            {
              name: "Interactive Training",
              description: "Case simulations. Role-plays on ethical dilemmas. Assessments & certification."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Training",
        icon: Zap,
        content: {
          description: "Transform your organizational culture with comprehensive Code of Conduct training benefits:",
          features: [
            "Global Compliance – aligned with India, UK, and US laws",
            "Reduced Legal Risks – fewer tribunal/EEOC cases",
            "Audit-Ready Certification – for regulators & investors",
            "Improved Culture – builds ethics, trust, respect",
            "ESG & Investor Credibility – strengthens governance reporting"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is Code of Conduct training?",
        answer: "It is a structured programme that educates employees and managers on company values, legal obligations, workplace behavior, and reporting mechanisms to ensure compliance and ethical standards."
      },
      {
        question: "Is Code of Conduct training mandatory?",
        answer: "Yes. Under Indian Companies Act, POSH Act, and UK/US compliance laws, organizations must conduct regular training on ethical behavior and compliance."
      },
      {
        question: "Who should attend Code of Conduct training?",
        answer: "All employees, managers, directors, contractors, and Internal Committee members."
      },
      {
        question: "How often should training be conducted?",
        answer: "Best practice: Quarterly or annual refreshers depending on regulatory environment."
      },
      {
        question: "What legal frameworks are covered?",
        answer: "India: POSH Act, Companies Act, SEBI LODR. UK: Equality Act, Bribery Act, ACAS standards. US: EEOC, OSHA, SEC, Sarbanes-Oxley."
      },
      {
        question: "What topics are included?",
        answer: "Respectful workplace conduct. Anti-discrimination & harassment. Conflict of interest. Whistleblower mechanisms. Anti-bribery/corruption."
      },
      {
        question: "How is compliance measured?",
        answer: "Attendance logs. Certificates issued. Internal audit of policies vs practice."
      },
      {
        question: "What happens if training is not conducted?",
        answer: "India: Penalties under POSH & Companies Act. UK: Tribunal penalties, regulatory fines. US: EEOC/SEC lawsuits, multi-million settlements."
      },
      {
        question: "Can training be conducted online?",
        answer: "Yes, e-learning + webinars are valid if interactive, trackable, and certified."
      },
      {
        question: "How does this align with ESG?",
        answer: "Code of Conduct training strengthens Social & Governance metrics for ESG audits and investor due diligence."
      },
      {
        question: "Does URE POSH provide certifications?",
        answer: "Yes. Certificates are issued to participants, recognized in audits, investor due diligence, and compliance inspections."
      },
      {
        question: "How does this help in litigation defense?",
        answer: "Proof of regular Code of Conduct training is a strong defense for employers in tribunal/court cases, showing 'reasonable steps' were taken."
      }
    ]
  },
  'mental-health-training-counselling': {
    title: "Mental Health Training – URE POSH",
    subtitle: "Workplace Well-Being & Compliance",
    description: "URE POSH provides Mental Health Training aligned with the POSH Act (India), Equality Act (UK), OSHA & EEOC (US). Our programmes equip employees and managers to build psychologically safe workplaces, reduce risks, and improve ESG scores.",
    sections: [
      {
        id: "about-mental-health-training",
        title: "About URE POSH Mental Health Training",
        icon: Users,
        content: {
          description: "At URE POSH, we recognize that mental health is a compliance, governance, and productivity issue, not just a wellness initiative. Global MNCs like Google, Deloitte, and Microsoft have demonstrated that structured mental health programmes reduce attrition, absenteeism, and litigation risks.",
          features: [
            "POSH Act, 2013 (India) – obligation to provide a safe workplace",
            "UK Equality Act, 2010 & HSE standards – preventing stress-related risks",
            "US OSHA & EEOC guidance – safe & non-discriminatory environments",
            "Global ESG & UN SDG frameworks – linking well-being to governance & investor trust"
          ]
        }
      },
      {
        id: "why-mental-health-training-matters",
        title: "Why Mental Health Training Matters",
        icon: Shield,
        content: {
          description: "Mental health training is essential for comprehensive workplace protection and compliance:",
          services: [
            {
              name: "Legal Obligation",
              description: "Employers must ensure a safe workplace (psychological safety is part of it)"
            },
            {
              name: "Risk Mitigation",
              description: "Prevents harassment, stress-related claims, and tribunal/EEOC cases"
            },
            {
              name: "Productivity & Retention",
              description: "Mentally healthy employees are 25–30% more productive"
            },
            {
              name: "ESG/Investor Requirement",
              description: "Boards expect well-being initiatives as part of governance disclosures"
            },
            {
              name: "Reputation Shield",
              description: "Demonstrates a progressive, employee-first culture"
            }
          ]
        }
      },
      {
        id: "training-modules",
        title: "Our Mental Health Training Modules",
        icon: FileText,
        content: {
          description: "Comprehensive mental health training covering all aspects of psychological workplace safety:",
          services: [
            {
              name: "Understanding Workplace Mental Health",
              description: "What is workplace mental health? Common challenges: stress, anxiety, burnout. Legal framework: India (POSH), UK (HSE), US (OSHA)."
            },
            {
              name: "Recognizing Early Warning Signs",
              description: "Spotting behavioral changes. Identifying workplace stressors. Manager responsibilities under compliance laws."
            },
            {
              name: "Creating a Supportive Workplace",
              description: "Respect & inclusion as compliance obligations. Building safe spaces for disclosure. Avoiding stigma and discrimination."
            },
            {
              name: "Harassment, Bullying & Mental Health",
              description: "Intersection of POSH & psychological safety. Handling harassment-related trauma. Case laws & precedents."
            },
            {
              name: "Tools for Managers & IC Members",
              description: "How to respond to distressed employees. Confidentiality in mental health cases. Linking IC inquiries with counseling support."
            },
            {
              name: "Global Best Practices",
              description: "India: Integration with POSH awareness sessions. UK: ACAS 'Stress at Work' codes. US: EEOC & ADA compliance on mental health accommodations. MNC Models: Deloitte's Mental Health Champions, Google's resilience programs."
            },
            {
              name: "Interactive Training",
              description: "Role-play on stress response. Digital well-being quizzes. Self-assessment & resilience-building tools."
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Mental Health Training",
        icon: Zap,
        content: {
          description: "Transform your workplace mental health approach with comprehensive training benefits:",
          features: [
            "100% Legal Compliance – India, UK, US laws",
            "Reduced Legal & Tribunal Risks – defensible governance measures",
            "Improved Productivity – reduced absenteeism & attrition",
            "Audit-Ready Certification – ESG, CSR, and compliance records",
            "Employer Brand Advantage – respected for employee-first culture"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Is mental health training a compliance requirement?",
        answer: "Yes. While not always explicitly mandated, POSH Act (India), Equality Act (UK), and OSHA/EEOC (US) require employers to ensure safe workplaces—including psychological safety."
      },
      {
        question: "Who should attend mental health training?",
        answer: "All employees, line managers, HR teams, and Internal Committee (IC) members."
      },
      {
        question: "How does this connect to POSH compliance?",
        answer: "POSH Act requires a 'safe working environment,' which includes mental well-being. ICs often deal with cases linked to psychological distress."
      },
      {
        question: "What are the risks of not addressing mental health?",
        answer: "Increased absenteeism & turnover. Tribunal/EEOC lawsuits. Reputational loss & reduced ESG scores."
      },
      {
        question: "How does UK law treat workplace stress?",
        answer: "Under HSE guidelines & Equality Act, employers must assess stress risks and make reasonable adjustments for mental health conditions."
      },
      {
        question: "What obligations do US employers have?",
        answer: "Under EEOC & ADA, employers must not discriminate against employees with mental health conditions and must provide reasonable accommodations."
      },
      {
        question: "How often should training be conducted?",
        answer: "Best practice: Quarterly refreshers + mandatory annual certification."
      },
      {
        question: "Can training be conducted online?",
        answer: "Yes. Virtual workshops are compliant if interactive, recorded, and documented."
      },
      {
        question: "What documentation is needed for audits?",
        answer: "Training logs. Certificates of completion. Awareness campaign records."
      },
      {
        question: "How does this align with ESG?",
        answer: "Mental health programs strengthen 'S' in ESG (Social Governance), improving investor ratings."
      },
      {
        question: "Do MNCs run mandatory mental health training?",
        answer: "Yes—Google, Unilever, Microsoft, Deloitte have annual global well-being training modules."
      },
      {
        question: "Does URE POSH certify participants?",
        answer: "Yes. We issue Mental Health Compliance Certificates for audit, investor due diligence, and ESG reports."
      }
    ]
  },
  'diversity-at-work-place': {
    title: "Diversity at Workplace – & Modern Issues | URE POSH",
    subtitle: "Global DEI Consulting & Compliance",
    description: "URE POSH offers Diversity at Workplace consulting aligned with global standards (POSH Act, Equality Act, EEOC). We help organizations address modern DEI issues, implement policies, and achieve compliance across India, UK, and US.",
    sections: [
      {
        id: "about-diversity-consulting",
        title: "About URE POSH Diversity Consulting",
        icon: Users,
        content: {
          description: "At URE POSH, we believe workplace diversity is not just a moral imperative, but a compliance and business requirement. We support organizations in India, the UK, and the US with strategic diversity consulting, helping them:",
          features: [
            "Draft & implement Diversity, Equity, and Inclusion (DEI) policies",
            "Align with legal mandates: POSH Act (India), Equality Act (UK), EEOC & Title VII (US)",
            "Address modern challenges like unconscious bias, generational diversity, and intersectionality",
            "Achieve ESG and CSR-linked diversity metrics for global investors"
          ]
        }
      },
      {
        id: "why-diversity-consulting-matters",
        title: "Why Diversity Consulting Matters",
        icon: Shield,
        content: {
          description: "Diversity consulting is essential for legal compliance, business innovation, and investor confidence:",
          services: [
            {
              name: "India",
              description: "POSH Act + Equal Remuneration Act mandate non-discrimination"
            },
            {
              name: "UK",
              description: "Equality Act, 2010 requires fair treatment across gender, race, disability, age, and religion"
            },
            {
              name: "US",
              description: "EEOC enforces anti-discrimination laws under Title VII, ADA, and ADEA"
            },
            {
              name: "Investors & ESG Standards",
              description: "Global boards demand diversity data in governance reports"
            },
            {
              name: "Talent & Innovation",
              description: "Companies with diverse teams report 19% higher innovation revenue (BCG)"
            }
          ]
        }
      },
      {
        id: "modern-diversity-issues",
        title: "Modern Issues in Workplace Diversity",
        icon: Award,
        content: {
          description: "Contemporary workplace diversity challenges requiring specialized attention:",
          services: [
            {
              name: "Gender Pay Gap & Leadership Representation",
              description: "Women & non-binary employees underrepresented in leadership. Compliance: Equal Pay Act (India/UK/US)."
            },
            {
              name: "Unconscious Bias & Hiring Practices",
              description: "Recruitment algorithms replicating bias. Blind hiring as compliance best practice."
            },
            {
              name: "Generational Diversity (Gen Z to Boomers)",
              description: "Differing work styles causing friction. Cross-generational mentoring as a solution."
            },
            {
              name: "Disability Inclusion & Accessibility",
              description: "ADA (US), Equality Act (UK), RPwD Act (India) mandate accommodations. Gaps in implementation remain."
            },
            {
              name: "LGBTQ+ Inclusion",
              description: "US: EEOC protects sexual orientation/gender identity. India: Supreme Court decriminalized Section 377 but workplace bias persists."
            },
            {
              name: "Cultural & Linguistic Diversity",
              description: "Multilingual communication challenges. Training to reduce miscommunication & prejudice."
            },
            {
              name: "Intersectionality",
              description: "Employees facing multiple layers of discrimination (e.g., race + gender + disability). Global best practice: Intersectional DEI strategies."
            }
          ]
        }
      },
      {
        id: "consulting-approach",
        title: "Our Consulting Approach",
        icon: FileText,
        content: {
          description: "Structured methodology for implementing comprehensive diversity programs:",
          services: [
            {
              name: "Assessment & Audit",
              description: "Workforce demographics, policy review, diversity gap analysis"
            },
            {
              name: "Policy Drafting & Customization",
              description: "DEI frameworks aligned with global + local laws"
            },
            {
              name: "Training & Sensitization",
              description: "Unconscious bias, inclusive leadership, IC training"
            },
            {
              name: "Complaint Handling Support",
              description: "Integration with POSH/EEOC grievance systems"
            },
            {
              name: "Monitoring & Reporting",
              description: "ESG/CSR-linked diversity dashboards, annual reports"
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH Diversity Consulting",
        icon: Zap,
        content: {
          description: "Transform your organizational diversity approach with comprehensive consulting benefits:",
          features: [
            "Legal Compliance – India, UK, US diversity laws",
            "Audit-Ready Documentation – for regulators, boards, investors",
            "Inclusive Culture – better retention, lower attrition",
            "ESG/CSR Metrics – strengthens global governance reports",
            "Reputation Shield – progressive employer brand"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What is workplace diversity?",
        answer: "It means representation of employees across gender, race, age, disability, sexual orientation, religion, and socioeconomic backgrounds."
      },
      {
        question: "Is workplace diversity a compliance requirement?",
        answer: "Yes. India (Equal Remuneration Act, POSH), UK (Equality Act), US (EEOC Title VII) all mandate non-discrimination."
      },
      {
        question: "How do modern MNCs address diversity gaps?",
        answer: "Through structured DEI strategies, employee resource groups (ERGs), diversity councils, and leadership accountability."
      },
      {
        question: "What is intersectionality in workplace diversity?",
        answer: "It refers to employees facing multiple forms of bias simultaneously (e.g., a woman of color with disability). Compliance strategies must recognize these overlaps."
      },
      {
        question: "How is diversity linked with ESG?",
        answer: "Diversity metrics are part of the 'S' in ESG (Social Governance), impacting investor ratings and funding."
      },
      {
        question: "What are penalties for non-compliance?",
        answer: "India: Fines under POSH/Equal Remuneration Acts. UK: Tribunal penalties, unlimited compensation. US: EEOC lawsuits, multi-million-dollar settlements."
      },
      {
        question: "What role do managers play in diversity compliance?",
        answer: "Managers are first responders—they must prevent bias, escalate complaints, and enforce inclusive policies."
      },
      {
        question: "How do we measure diversity progress?",
        answer: "Gender pay gap analysis. Leadership representation ratios. Employee satisfaction surveys. Attrition trends."
      },
      {
        question: "Can SMEs adopt global diversity standards?",
        answer: "Yes. Scaled DEI frameworks with training, audits, and policy updates can be cost-effective."
      },
      {
        question: "How does URE POSH customize diversity consulting?",
        answer: "By aligning policies with local labor laws and embedding them into global governance frameworks."
      },
      {
        question: "Is diversity training mandatory?",
        answer: "While not always explicit, most regulators (POSH in India, ACAS in UK, EEOC in US) expect regular training as 'reasonable steps.'"
      },
      {
        question: "Does URE POSH provide certifications?",
        answer: "Yes—we issue Diversity Compliance Certificates for ESG reporting, audits, and investor due diligence."
      }
    ]
  },
  'lgbtqia-inclusion': {
    title: "LGBTQIA++ Inclusion – URE POSH",
    subtitle: "Workplace Equality & Compliance Consulting",
    description: "URE POSH delivers LGBTQIA++ workplace inclusion consulting aligned with India's POSH & Transgender Rights Act, UK's Equality Act, and US EEOC/Title VII. Build a diverse, inclusive, and compliant workplace culture with global best practices.",
    sections: [
      {
        id: "about-lgbtqia-consulting",
        title: "About URE POSH LGBTQIA++ Consulting",
        icon: Users,
        content: {
          description: "At URE POSH, we help organizations build workplaces where every identity is respected. LGBTQIA++ inclusion is not just a diversity goal but also a compliance, governance, and ESG requirement for global employers.",
          features: [
            "LGBTQIA++ inclusive workplace policies",
            "Training & sensitization programmes for employees & managers",
            "Equal opportunity audits (pay, promotion, benefits)",
            "Support systems & grievance redressal linked with IC/HR panels",
            "Global compliance alignment (India, UK, US frameworks)"
          ]
        }
      },
      {
        id: "why-lgbtqia-inclusion-matters",
        title: "Why LGBTQIA++ Inclusion Matters",
        icon: Shield,
        content: {
          description: "LGBTQIA++ inclusion is essential for legal compliance, talent retention, and business success:",
          services: [
            {
              name: "India",
              description: "Supreme Court recognized LGBTQIA+ rights (Navtej Johar v. Union of India, 2018). Transgender Persons Act, 2019 mandates non-discrimination in employment"
            },
            {
              name: "UK",
              description: "Equality Act, 2010 protects sexual orientation & gender reassignment"
            },
            {
              name: "US",
              description: "Title VII (Civil Rights Act) interpreted by EEOC/Supreme Court to cover sexual orientation & gender identity"
            },
            {
              name: "ESG & Investors",
              description: "Global boards demand measurable DEI metrics, including LGBTQIA++ policies"
            },
            {
              name: "Talent Attraction",
              description: "Inclusive companies see up to 50% higher retention among LGBTQIA+ employees"
            }
          ]
        }
      },
      {
        id: "modern-lgbtqia-issues",
        title: "Modern Issues in LGBTQIA++ Workplace Inclusion",
        icon: Award,
        content: {
          description: "Contemporary challenges requiring specialized attention in LGBTQIA++ workplace inclusion:",
          services: [
            {
              name: "Legal Compliance Gaps",
              description: "Inconsistent enforcement of non-discrimination laws. Lack of transgender-inclusive policies."
            },
            {
              name: "Workplace Discrimination & Bias",
              description: "Hiring discrimination. Lack of representation in leadership roles."
            },
            {
              name: "Benefits & Equal Opportunity",
              description: "Health insurance & parental leave often exclude LGBTQIA++ partners. Unequal pay and promotion opportunities."
            },
            {
              name: "Harassment & Microaggressions",
              description: "Subtle exclusion, jokes, or cultural bias. Fear of retaliation prevents complaints."
            },
            {
              name: "Policy & Infrastructure Gaps",
              description: "Lack of gender-neutral restrooms. Inadequate confidential grievance redressal systems."
            }
          ]
        }
      },
      {
        id: "consulting-approach",
        title: "Our LGBTQIA++ Consulting Approach",
        icon: FileText,
        content: {
          description: "Comprehensive approach to implementing effective LGBTQIA++ inclusion programs:",
          services: [
            {
              name: "Policy Audit & Review",
              description: "Align policies with India's Transgender Rights Act, UK Equality Act, US EEOC guidelines"
            },
            {
              name: "Policy Drafting",
              description: "Gender-neutral leave, equal pay, healthcare benefits, partner inclusion"
            },
            {
              name: "Training & Sensitization",
              description: "Awareness workshops for staff, leadership, IC/HR panels"
            },
            {
              name: "Complaint Redressal Mechanisms",
              description: "Confidential systems integrated with POSH/HR processes"
            },
            {
              name: "Employee Support Systems",
              description: "LGBTQIA++ employee resource groups (ERGs)"
            },
            {
              name: "Global Best Practices",
              description: "Learning from Google, Accenture, IBM, Deloitte inclusion models"
            }
          ]
        }
      },
      {
        id: "key-benefits",
        title: "Key Benefits of URE POSH LGBTQIA++ Inclusion",
        icon: Zap,
        content: {
          description: "Transform your workplace culture with comprehensive LGBTQIA++ inclusion benefits:",
          features: [
            "100% Legal Compliance – India, UK, US frameworks",
            "Audit-Ready Certification – ESG/CSR & investor reporting",
            "Higher Retention & Engagement – inclusive culture = loyalty",
            "Reduced Litigation Risk – prevents discrimination claims",
            "Employer Brand Advantage – progressive, global reputation"
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What does LGBTQIA++ inclusion mean in workplaces?",
        answer: "It refers to ensuring equal opportunity, respect, and non-discrimination for individuals identifying as lesbian, gay, bisexual, transgender, queer, intersex, asexual, and beyond."
      },
      {
        question: "Is LGBTQIA++ workplace inclusion a legal requirement?",
        answer: "Yes. India: Transgender Persons Act, 2019. UK: Equality Act, 2010. US: EEOC enforces Title VII (includes sexual orientation & gender identity)."
      },
      {
        question: "What are common challenges in LGBTQIA++ workplace policies?",
        answer: "Exclusion from benefits, lack of gender-neutral facilities, and absence of anti-discrimination clauses."
      },
      {
        question: "How do MNCs implement LGBTQIA++ strategies?",
        answer: "Through ERGs, leadership accountability, inclusive benefits, and annual diversity audits."
      },
      {
        question: "What role does POSH Act play in LGBTQIA++ protection in India?",
        answer: "While POSH primarily protects women, URE POSH integrates policies to extend safe workplace practices for all genders and identities."
      },
      {
        question: "How does inclusion impact ESG ratings?",
        answer: "LGBTQIA++ policies strengthen social governance metrics, influencing investor decisions and sustainability rankings."
      },
      {
        question: "Are gender-neutral restrooms mandatory?",
        answer: "Not mandatory everywhere, but considered best practice globally (recommended in India, legally expected in UK/US)."
      },
      {
        question: "Can health insurance cover same-sex partners in India?",
        answer: "Yes, many insurers now allow it, but employers must negotiate inclusive benefit packages."
      },
      {
        question: "How do grievance systems support LGBTQIA++ employees?",
        answer: "By ensuring confidentiality, preventing retaliation, and involving trained IC/HR members."
      },
      {
        question: "How often should LGBTQIA++ sensitization training occur?",
        answer: "At least annually, with quarterly refreshers for managers and IC members."
      },
      {
        question: "What documentation is required for audits?",
        answer: "Policies & benefits manuals. Training logs. ERG activity records. Annual DEI compliance reports."
      },
      {
        question: "Does URE POSH provide certifications?",
        answer: "Yes, we issue LGBTQIA++ Inclusion Compliance Certificates, used in ESG/CSR reports and global investor audits."
      }
    ]
  }
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  features,
  services,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  features?: string[];
  services?: { name: string; description: string }[];
}) => (
  <div className="group bg-white rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:scale-[1.02]">
    {/* Simple background element */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-2xl opacity-50"></div>
    
    <div className="relative z-10">
      <div className="flex items-start gap-8">
        {/* Clean icon container */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-700 transition-all duration-300 shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <div className="w-0 h-0.5 bg-pink-600 group-hover:w-24 transition-all duration-500 rounded-full"></div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              {description}
            </p>
          )}
          
          {/* Features list */}
          {features && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-800">Key Features</h4>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start hover:bg-pink-50 rounded-xl p-3 -mx-3 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-gray-800 text-base leading-relaxed font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services list */}
          {services && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-800">Our Services</h4>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="bg-pink-50 rounded-xl p-6 border border-pink-100 hover:border-pink-200 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold text-gray-800 text-lg">
                          {service.name}
                        </h5>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-all duration-300">
    {/* Question Button */}
    <button
      onClick={onClick}
      className="w-full p-6 md:p-8 text-left flex justify-between items-center hover:bg-pink-50 transition-all duration-300"
    >
      <div className="flex-1 pr-6">
        <h4 className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-pink-600 transition-colors duration-300 leading-relaxed">
          {question}
        </h4>
      </div>
      
      {/* Toggle Button */}
      <div className={`w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-md ${
        isOpen 
          ? 'rotate-180 bg-pink-700' 
          : 'hover:bg-pink-700'
      }`}>
        <ChevronDown className="w-5 h-5 text-white" />
      </div>
    </button>
    
    {/* Answer Section */}
    <div className={`transition-all duration-500 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-6 md:px-8 pb-6 md:pb-8">
        <div className="w-full h-px bg-pink-200 mb-6"></div>
        <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function SlugPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Ensure slug is a string (Next.js can return string | string[])
  const slugStr = Array.isArray(slug) ? slug[0] : slug;

  // Handle redirects
  useEffect(() => {
    if (slugStr === 'poster-and-policy-discloser') {
      router.push('/services/poster-and-policy-discloser');
      return;
    }
  }, [slugStr, router]);

  const pageData = SlugPageData[slugStr as keyof typeof SlugPageData];

  // Show loading state for redirects
  if (slugStr === 'poster-and-policy-discloser') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </main>
    );
  }

  if (!pageData) {
    return (
      <main className="min-h-screen bg-white">
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Page: {slug}</h1>
              <p className="text-gray-600">This page is under construction...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.2); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
      {/* Hero Section - Clean Pink & White Professional Design */}
      <section className="relative pt-24 pb-20 bg-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Simple background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Clean badge */}
            <div className="inline-flex items-center gap-4 bg-pink-50 px-8 py-4 rounded-full border border-pink-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-pink-700 font-semibold text-sm md:text-base">Empowering Workplace Rights</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="text-pink-600">
                  {pageData.title}
                </span>
              </h1>
              <div className="flex justify-center">
                <div className="w-24 h-1.5 bg-pink-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="bg-pink-50/80 rounded-2xl p-6 md:p-8 border border-pink-100 shadow-sm">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-medium">
                  <strong className="text-pink-600">{pageData.subtitle}</strong>
                </p>
              </div>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {pageData.description}
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center">
              <button className="group bg-pink-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6" />
                  <span>Start Compliance Journey</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="group border-2 border-pink-600 bg-white text-pink-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                <span>Download Resources</span>
                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections - Same style as About page */}
      <section className="py-12 bg-gradient-to-b from-white to-pink-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="space-y-12">
            {pageData.sections.map((section, index) => (
              <div key={section.id}>
                <FeatureCard 
                  icon={section.icon}
                  title={section.title}
                  description={section.content.description}
                  features={section.content.features}
                  services={section.content.services}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Penalties Section */}
      {slugStr === 'compliant-redressal' && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Legal Penalties for Non-Compliance</h2>
              <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { amount: "₹50,000", desc: "Maximum penalty for first-time violations in India", color: "red" },
                { amount: "License Cancellation", desc: "For repeated non-compliance incidents", color: "orange" },
                { amount: "Reputational Risk", desc: "Public disclosure and brand damage", color: "purple" }
              ].map((penalty, index) => (
                <div key={index} className="bg-red-50 rounded-2xl p-6 border border-red-100 hover:bg-red-100 transition-colors text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                    {penalty.amount}
                  </div>
                  <p className="text-sm text-gray-700">{penalty.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Legal Penalties Section */}
      {slugStr !== 'compliant-redressal' && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Legal Penalties for Non-Compliance</h2>
              <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { amount: "₹50,000", desc: "Maximum penalty for first-time violations", color: "red" },
                { amount: "License Cancellation", desc: "For repeated non-compliance incidents", color: "orange" },
                { amount: "Public Disclosure", desc: "Reputational damage from public filings", color: "purple" }
              ].map((penalty, index) => (
                <div key={index} className="bg-pink-50 rounded-2xl p-6 border border-pink-100 hover:bg-pink-100 transition-colors text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                    {penalty.amount}
                  </div>
                  <p className="text-sm text-gray-700">{penalty.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why Partner with URE POSH?</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Zero Legal Risk", desc: "100% POSH compliance guarantee" },
              { icon: Award, title: "Global Standards", desc: "International benchmarked solutions" },
              { icon: Users, title: "Enhanced Brand", desc: "Stronger employer reputation" },
              { icon: Star, title: "ESG Ready", desc: "Investor-grade compliance reporting" },
              { icon: Zap, title: "AI-Powered", desc: "Next-generation compliance technology" },
              { icon: CheckCircle, title: "Continuous Support", desc: "24/7 compliance monitoring" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-pink-100 hover:bg-pink-50 transition-colors text-center group">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <benefit.icon className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Clean Pink & White Design */}
      <section className="py-20 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-pink-200 mb-8 shadow-sm">
              <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              <span className="text-pink-700 font-semibold text-sm">Client Success Stories</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-pink-600">Transforming Workplaces</span>
              <br />
              <span className="text-gray-800">Across Industries</span>
            </h2>
            
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full mb-6"></div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from organizations that have transformed their workplace culture with our expert guidance
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                {/* Star Rating */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-pink-600 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full ml-3">Excellent Service</span>
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 mb-8 italic leading-relaxed text-xl font-medium">
                  "Professional and comprehensive workplace compliance solutions. Highly recommended for organizations serious about creating safe work environments."
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    U
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">URE POSH Client</div>
                    <div className="text-gray-600 text-sm font-medium">Verified Customer</div>
                    <div className="text-pink-600 text-sm font-semibold">Workplace Safety Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Call-to-Action Section */}
          <div className="text-center mt-20">
            <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-16 text-white overflow-hidden animate-glow group">
              {/* CTA Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-x-10 -translate-y-10 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/15 rounded-full blur-2xl translate-x-8 translate-y-8 animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                    style={{
                      left: `${15 + i * 10}%`,
                      top: `${20 + (i % 4) * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${4 + i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="relative z-10">
                {/* CTA Badge */}
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold text-sm">Limited Time Offer</span>
                </div>
                
                {/* CTA Heading */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your Workplace?
                </h3>
                
                {/* CTA Subheading */}
                <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of organizations creating safer, more inclusive work environments with our expert guidance and comprehensive solutions.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="group/cta bg-white text-pink-600 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-4 relative overflow-hidden">
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-white opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center group-hover/cta:scale-110 transition-transform duration-300">
                        <Zap className="w-5 h-5 text-white group-hover/cta:animate-pulse" />
                      </div>
                      <span>Start Your Journey</span>
                      <ArrowRight className="w-6 h-6 group-hover/cta:translate-x-2 transition-transform duration-300" />
                    </div>
                    
                    {/* Button Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-pink-300/0 group-hover/cta:border-pink-300/50 transition-all duration-300"></div>
                  </button>
                  
                  <button className="group/cta2 border-2 border-white text-white px-12 py-6 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden">
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-10 h-10 border-2 border-white group-hover/cta2:border-pink-500 rounded-xl flex items-center justify-center group-hover/cta2:scale-110 transition-all duration-300">
                        <FileText className="w-5 h-5 group-hover/cta2:text-pink-600 transition-colors duration-300" />
                      </div>
                      <span>Get Free Consultation</span>
                      <div className="w-3 h-3 bg-white group-hover/cta2:bg-pink-500 rounded-full group-hover/cta2:scale-150 transition-all duration-300"></div>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* CTA Border Animation */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Clean Pink & White */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Contact Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-pink-50 px-6 py-3 rounded-full border border-pink-200 mb-6 shadow-sm">
              <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              <span className="text-pink-700 font-semibold text-sm">Get In Touch</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              <span className="text-pink-600">Ready to Transform</span>
              <br />
              <span className="text-gray-800">Your Workplace?</span>
            </h2>
            
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full mb-4"></div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your compliance journey today with expert guidance and comprehensive solutions
            </p>
          </div>

          {/* Contact Cards */}
          <div className="bg-pink-50/50 rounded-2xl border border-pink-100 p-8 md:p-12 mb-8 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <a 
                href="tel:+919999944807"
                className="group flex flex-col items-center p-6 rounded-xl bg-white hover:bg-pink-50 transition-all duration-300 border border-pink-100 hover:border-pink-200 shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-700 transition-colors duration-300 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800 text-lg">Call Us Directly</h3>
                  <p className="font-semibold text-gray-800 text-xl">+91-99999 44807</p>
                  <p className="text-sm text-gray-600">Available 24/7 for support</p>
                </div>
              </a>
              
              <a 
                href="mailto:ea@ureposh.com"
                className="group flex flex-col items-center p-6 rounded-xl bg-white hover:bg-pink-50 transition-all duration-300 border border-pink-100 hover:border-pink-200 shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-700 transition-colors duration-300 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800 text-lg">Email Us</h3>
                  <p className="font-semibold text-gray-800 text-xl">ea@ureposh.com</p>
                  <p className="text-sm text-gray-600">Get detailed responses</p>
                </div>
              </a>
              
              <a 
                href="https://www.ureposh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl bg-white hover:bg-pink-50 transition-all duration-300 border border-pink-100 hover:border-pink-200 shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-700 transition-colors duration-300 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800 text-lg">Visit Website</h3>
                  <p className="font-semibold text-gray-800 text-xl">www.ureposh.com</p>
                  <p className="text-sm text-gray-600">Explore our platform</p>
                </div>
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="group bg-pink-600 text-white px-12 py-6 rounded-xl font-bold text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-4 mx-auto">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}