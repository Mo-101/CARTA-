"use client"

import { useState } from "react"

interface HealthPartner {
  id: string
  name: string
  type: "government" | "ngo" | "hospital" | "clinic" | "international"
  country: string
  contactPerson: string
  email: string
  phone: string
  status: "contacted" | "responded" | "negotiating" | "partnership" | "declined"
  lastContact: string
  notes: string
  services: string[]
  facilities: number
  population: number
}

interface OutreachTemplate {
  id: string
  name: string
  subject: string
  content: string
  targetType: string[]
}

export function HealthPartnershipOutreach() {
  const [partners, setPartners] = useState<HealthPartner[]>([
    {
      id: "who-africa",
      name: "World Health Organization - Africa Regional Office",
      type: "international",
      country: "Regional",
      contactPerson: "Dr. Matshidiso Moeti",
      email: "afro@who.int",
      phone: "+47 241 39000",
      status: "contacted",
      lastContact: "2024-01-08",
      notes: "Initial outreach sent. Awaiting response from regional director's office.",
      services: ["Policy guidance", "Technical support", "Data sharing", "Capacity building"],
      facilities: 0,
      population: 1200000000
    },
    {
      id: "kenya-moh",
      name: "Kenya Ministry of Health",
      type: "government",
      country: "Kenya",
      contactPerson: "Dr. Susan Nakhumicha",
      email: "ps@health.go.ke",
      phone: "+254 20 2717077",
      status: "responded",
      lastContact: "2024-01-07",
      notes: "Positive initial response. Scheduled follow-up meeting for next week.",
      services: ["Health facility verification", "Data access", "Policy alignment"],
      facilities: 9547,
      population: 54000000
    },
    {
      id: "nigeria-fmoh",
      name: "Federal Ministry of Health Nigeria",
      type: "government", 
      country: "Nigeria",
      contactPerson: "Dr. Osagie Ehanire",
      email: "info@health.gov.ng",
      phone: "+234 9 523 4567",
      status: "negotiating",
      lastContact: "2024-01-06",
      notes: "In discussions about pilot program in 3 states. Very interested in blockchain transparency.",
      services: ["Facility network access", "Impact verification", "Community mobilization"],
      facilities: 23000,
      population: 218000000
    },
    {
      id: "south-africa-doh",
      name: "Department of Health South Africa",
      type: "government",
      country: "South Africa", 
      contactPerson: "Dr. Joe Phaahla",
      email: "minister@health.gov.za",
      phone: "+27 12 395 8000",
      status: "contacted",
      lastContact: "2024-01-08",
      notes: "Proposal submitted through official channels. Awaiting departmental review.",
      services: ["Health system integration", "Data sharing", "Technology adoption"],
      facilities: 4200,
      population: 60000000
    },
    {
      id: "partners-in-health",
      name: "Partners In Health",
      type: "ngo",
      country: "Multi-country",
      contactPerson: "Dr. Paul Farmer Foundation",
      email: "info@pih.org",
      phone: "+1 857 880 5600",
      status: "contacted",
      lastContact: "2024-01-07",
      notes: "Reached out to Africa programs director. Strong alignment with mission.",
      services: ["Community health programs", "Facility support", "Training"],
      facilities: 150,
      population: 2000000
    }
  ])

  const [newPartner, setNewPartner] = useState<Partial<HealthPartner>>({})
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [customMessage, setCustomMessage] = useState("")

  const outreachTemplates: OutreachTemplate[] = [
    {
      id: "government-intro",
      name: "Government Ministry Introduction",
      subject: "Partnership Proposal: FlameBorn Health Impact Platform",
      targetType: ["government"],
      content: `Dear [Contact Person],

I hope this message finds you well. I am writing to introduce FlameBorn, an innovative blockchain-based platform designed to eliminate disease outbreaks across Africa through transparent, direct funding to verified health facilities.

🔥 FLAMEBORN OVERVIEW:
• Blockchain-powered health funding platform
• 1 BNB donation = 1 FLB token with transparent tracking
• 70% of funds go directly to health facilities
• 30% supports platform sustainability and governance
• Real-time impact measurement and reporting

🏥 PARTNERSHIP OPPORTUNITIES:
• Health facility verification and integration
• Real-time health data sharing and analytics
• Community health worker training and support
• Transparent impact measurement and reporting
• Technology transfer and capacity building

🌍 PILOT PROGRAM PROPOSAL:
We would like to propose a pilot program in [Country] focusing on:
• Integration with 50-100 health facilities
• Community health worker training and support
• Real-time disease surveillance and reporting
• Transparent funding allocation and impact tracking

The platform has already gained significant traction with 12,847 users, 6,656 verified health facilities across Africa, and 2.4M FLB tokens distributed for health impact.

I would welcome the opportunity to discuss how FlameBorn can support [Country]'s health objectives and contribute to achieving universal health coverage.

Best regards,
FlameBorn Partnership Team
partnership@flameborn.org`
    },
    {
      id: "ngo-collaboration",
      name: "NGO Collaboration Proposal", 
      subject: "Collaboration Opportunity: Blockchain for Health Impact",
      targetType: ["ngo"],
      content: `Dear [Contact Person],

Greetings from the FlameBorn team! We are reaching out to explore potential collaboration opportunities between our organizations in advancing health outcomes across Africa.

🤝 ABOUT FLAMEBORN:
FlameBorn is a sovereign African health currency platform that uses blockchain technology to provide transparent, direct funding to verified health actors. Our mission aligns closely with your organization's commitment to improving health outcomes in underserved communities.

💡 COLLABORATION OPPORTUNITIES:
• Joint health facility verification and support
• Shared impact measurement and reporting
• Community health worker training
