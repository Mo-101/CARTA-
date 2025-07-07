"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Check if OpenAI API key is available
const isOpenAIConfigured = !!process.env.OPENAI_API_KEY

export async function getHealthAdvice(healthQuery: string): Promise<string> {
  try {
    // Check if OpenAI API key is configured
    if (!isOpenAIConfigured) {
      return "OpenAI API key is not configured. Please add the OPENAI_API_KEY environment variable to enable AI-powered health advice."
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        As an African health expert and advisor for the FlameBorn platform, provide guidance on the following health-related query:
        ${healthQuery}
        
        Context: FlameBorn is a blockchain-based initiative that eliminates disease outbreaks in Africa by providing direct, transparent funding to verified health actors. Each donation (1 BNB = 1 FLB token) directly supports health facilities with 70% going to facilities and 30% to platform sustainability.
        
        Provide specific recommendations for:
        1. Health intervention strategies
        2. Community engagement approaches
        3. Resource allocation priorities
        4. Impact measurement methods
        
        Focus on African health contexts and culturally appropriate solutions.
      `,
      system:
        "You are an expert African health advisor for FlameBorn, a sovereign African health currency platform. Provide professional, culturally sensitive, and actionable health guidance that respects African healthcare traditions and modern medical practices.",
    })

    return text
  } catch (error) {
    console.error("Error getting health advice:", error)
    if (error.message?.includes("API key")) {
      return "OpenAI API key is missing or invalid. Please add a valid OPENAI_API_KEY to your environment variables."
    }
    return "Unable to generate health advice at this time. Please try again later."
  }
}

export async function getMockHealthAdvice(healthQuery: string): Promise<string> {
  // Simple keyword-based response system for health queries
  const query = healthQuery.toLowerCase()

  if (query.includes("malaria") || query.includes("mosquito")) {
    return `
MALARIA PREVENTION & TREATMENT STRATEGY

COMMUNITY-BASED APPROACH:
- Distribute insecticide-treated nets (ITNs) to all households
- Implement indoor residual spraying in high-risk areas
- Establish community health worker networks for early detection
- Create awareness campaigns using local languages and cultural practices

HEALTH FACILITY SUPPORT:
- Ensure rapid diagnostic tests (RDTs) are available at all health posts
- Stock artemisinin-based combination therapies (ACTs)
- Train healthcare workers on case management protocols
- Implement referral systems for severe cases

FLAMEBORN IMPACT:
- 1 BNB donation can provide ITNs for 10 families
- Supports community health worker training programs
- Funds diagnostic equipment for rural health facilities
- Enables mobile health units to reach remote communities

MEASUREMENT:
- Track malaria incidence rates in supported communities
- Monitor ITN distribution and usage rates
- Measure reduction in severe malaria cases
- Document community engagement levels
`
  } else if (query.includes("maternal") || query.includes("pregnancy") || query.includes("birth")) {
    return `
MATERNAL HEALTH IMPROVEMENT STRATEGY

PRENATAL CARE ENHANCEMENT:
- Establish mobile antenatal clinics for rural areas
- Train traditional birth attendants in safe delivery practices
- Provide nutritional supplements and education
- Implement early pregnancy detection programs

DELIVERY SUPPORT:
- Upgrade health facility delivery rooms with essential equipment
- Ensure skilled birth attendants are available 24/7
- Create emergency transport systems for complications
- Establish blood banks for emergency transfusions

POSTNATAL CARE:
- Implement newborn screening programs
- Provide breastfeeding support and education
- Monitor maternal and infant health for 6 weeks post-delivery
- Connect mothers with family planning services

FLAMEBORN IMPACT:
- 1 BNB donation supports safe delivery for 5 mothers
- Funds training for traditional birth attendants
- Provides essential medical equipment for delivery rooms
- Supports emergency transport systems

CULTURAL INTEGRATION:
- Work with traditional healers and community elders
- Respect cultural birthing practices while ensuring safety
- Use local languages for health education materials
- Engage women's groups in community mobilization
`
  } else if (query.includes("nutrition") || query.includes("malnutrition") || query.includes("food")) {
    return `
NUTRITION INTERVENTION STRATEGY

COMMUNITY NUTRITION PROGRAMS:
- Establish community gardens for sustainable food production
- Train mothers on proper infant and young child feeding
- Implement school feeding programs with locally sourced foods
- Create nutrition education campaigns using community leaders

CLINICAL NUTRITION SUPPORT:
- Screen children for malnutrition at health facilities
- Provide therapeutic feeding for severely malnourished children
- Supplement micronutrients (Vitamin A, Iron, Zinc)
- Monitor growth and development regularly

FOOD SECURITY INITIATIVES:
- Support local farmers with improved seeds and techniques
- Establish food storage and preservation systems
- Create market linkages for nutritious local foods
- Implement cash transfer programs for vulnerable families

FLAMEBORN IMPACT:
- 1 BNB donation provides therapeutic feeding for 20 malnourished children
- Supports community garden establishment
- Funds nutrition education programs
- Provides micronutrient supplements for 100 children

SUSTAINABILITY:
- Train community health workers in nutrition counseling
- Establish local production of therapeutic foods
- Create income-generating activities around nutrition
- Build partnerships with agricultural extension services
`
  } else if (query.includes("water") || query.includes("sanitation") || query.includes("hygiene")) {
    return `
WATER, SANITATION & HYGIENE (WASH) STRATEGY

WATER ACCESS IMPROVEMENT:
- Drill boreholes and install hand pumps in communities
- Establish water treatment systems for safe drinking water
- Train community members in water system maintenance
- Implement rainwater harvesting systems

SANITATION INFRASTRUCTURE:
- Build improved latrines and waste management systems
- Establish handwashing stations at key locations
- Create community-led total sanitation programs
- Implement solid waste collection and disposal systems

HYGIENE PROMOTION:
- Conduct hygiene education in schools and communities
- Train community health promoters in behavior change
- Use drama, songs, and local media for awareness campaigns
- Establish hygiene clubs in schools and communities

FLAMEBORN IMPACT:
- 1 BNB donation provides clean water access for 50 people
- Funds construction of 5 improved latrines
- Supports hygiene education for 200 community members
- Enables water quality testing and treatment systems

HEALTH OUTCOMES:
- Reduce diarrheal diseases by 40-60%
- Decrease child mortality from preventable diseases
- Improve school attendance, especially for girls
- Enhance overall community health and dignity

COMMUNITY OWNERSHIP:
- Form water user committees for system management
- Train local technicians for maintenance and repairs
- Establish cost-recovery mechanisms for sustainability
- Link with government WASH programs for scale-up
`
  } else if (query.includes("vaccination") || query.includes("immunization") || query.includes("vaccine")) {
    return `
IMMUNIZATION PROGRAM STRATEGY

ROUTINE IMMUNIZATION STRENGTHENING:
- Establish fixed immunization posts in health facilities
- Implement outreach services for remote communities
- Create immunization tracking systems using digital tools
- Train healthcare workers on vaccine administration and safety

COLD CHAIN MANAGEMENT:
- Install solar-powered refrigeration systems
- Train staff on proper vaccine storage and handling
- Implement temperature monitoring systems
- Establish backup power systems for reliability

COMMUNITY MOBILIZATION:
- Engage traditional and religious leaders as champions
- Use community health workers for education and follow-up
- Address vaccine hesitancy through culturally appropriate messaging
- Celebrate immunization achievements in communities

FLAMEBORN IMPACT:
- 1 BNB donation provides full immunization for 25 children
- Funds cold chain equipment for rural health facilities
- Supports community mobilization campaigns
- Enables digital tracking systems for better coverage

DISEASE PREVENTION FOCUS:
- Prioritize high-impact vaccines (measles, polio, DPT)
- Implement catch-up campaigns for missed children
- Integrate with other health services for efficiency
- Monitor disease surveillance for outbreak prevention
`
  } else {
    return `
COMPREHENSIVE AFRICAN HEALTH STRATEGY

COMMUNITY-CENTERED APPROACH:
- Engage traditional healers and community leaders
- Implement culturally appropriate health interventions
- Use local languages for health education and communication
- Build on existing community structures and practices

HEALTH SYSTEM STRENGTHENING:
- Train and support community health workers
- Improve health facility infrastructure and equipment
- Establish referral systems between different levels of care
- Implement quality improvement programs

TECHNOLOGY INTEGRATION:
- Use mobile health (mHealth) solutions for remote monitoring
- Implement digital health records for better tracking
- Leverage telemedicine for specialist consultations
- Use data analytics for evidence-based decision making

FLAMEBORN PLATFORM BENEFITS:
- Transparent funding directly to verified health facilities
- Community governance through FLB token holders
- Real-time impact tracking and reporting
- Sustainable financing model with 70% direct health funding

IMPACT MEASUREMENT:
- Track health outcome indicators in supported communities
- Monitor facility utilization and service quality
- Measure community satisfaction and engagement
- Document cost-effectiveness of interventions

SUSTAINABILITY PRINCIPLES:
- Build local capacity for long-term program management
- Create income-generating activities around health services
- Establish partnerships with government and other stakeholders
- Ensure community ownership and leadership of health programs

For specific health challenges or intervention areas, please provide more details about your particular interest or concern.
`
  }
}
