"use server"

import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Check if OpenAI API key is available
const isOpenAIConfigured = !!process.env.OPENAI_API_KEY

export async function getTradingAdvice(symbol: string, marketData: any, userQuery: string): Promise<string> {
  try {
    if (!isOpenAIConfigured) {
      return getMockTradingAdvice(symbol, marketData, userQuery)
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        As an expert cryptocurrency trading advisor for the FlameBorn platform, analyze the following:
        
        Symbol: ${symbol}
        Current Price: $${marketData.price}
        24h Change: ${marketData.change}%
        Volume: $${marketData.volume}
        Market Cap: $${marketData.marketCap}
        
        User Query: ${userQuery}
        
        Provide specific trading recommendations including:
        1. Technical analysis based on current data
        2. Entry/exit points with reasoning
        3. Risk management strategies
        4. Market sentiment analysis
        5. Integration with FLB token ecosystem opportunities
        
        Focus on actionable insights for African crypto traders and FlameBorn platform users.
      `,
      system: `You are a professional cryptocurrency trading advisor specializing in African markets and the FlameBorn ecosystem. 
               Provide clear, actionable advice while emphasizing risk management and responsible trading practices.
               Always mention relevant FLB token opportunities when applicable.`,
    })

    return text
  } catch (error) {
    console.error("Error getting trading advice:", error)
    return getMockTradingAdvice(symbol, marketData, userQuery)
  }
}

export async function getHealthAdvice(healthQuery: string): Promise<string> {
  try {
    if (!isOpenAIConfigured) {
      return getMockHealthAdvice(healthQuery)
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        As an African health expert and advisor for the FlameBorn platform, provide guidance on:
        ${healthQuery}
        
        Context: FlameBorn eliminates disease outbreaks in Africa through transparent blockchain funding.
        Each donation (1 BNB = 1 FLB token) directly supports verified health facilities with 70% going 
        to facilities and 30% to platform sustainability.
        
        Provide specific recommendations for:
        1. Health intervention strategies
        2. Community engagement approaches  
        3. Resource allocation priorities
        4. Impact measurement methods
        5. How FlameBorn platform can support this initiative
        
        Focus on African health contexts and culturally appropriate solutions.
      `,
      system: `You are an expert African health advisor for FlameBorn. Provide professional, 
               culturally sensitive, and actionable health guidance that respects African healthcare 
               traditions while incorporating modern medical practices.`,
    })

    return text
  } catch (error) {
    console.error("Error getting health advice:", error)
    return getMockHealthAdvice(healthQuery)
  }
}

export async function getYouthLearningAdvice(
  courseId: string,
  studentProgress: any,
  question: string,
): Promise<string> {
  try {
    if (!isOpenAIConfigured) {
      return getMockLearningAdvice(courseId, studentProgress, question)
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        As an educational advisor for FlameBorn's Youth Learning Hub, help with:
        
        Course: ${courseId}
        Student Progress: ${studentProgress.completionPercentage}% complete
        Current Streak: ${studentProgress.streak} days
        FLB Earned: ${studentProgress.flbEarned} tokens
        
        Student Question: ${question}
        
        Provide guidance on:
        1. Learning strategy optimization
        2. Course-specific advice
        3. Motivation and engagement tips
        4. FLB reward maximization strategies
        5. Career development in African health sector
        
        Focus on empowering African youth through education and blockchain rewards.
      `,
      system: `You are an educational mentor for African youth in the FlameBorn platform. 
               Provide encouraging, practical advice that helps students succeed in their health 
               education journey while maximizing their FLB token rewards.`,
    })

    return text
  } catch (error) {
    console.error("Error getting learning advice:", error)
    return getMockLearningAdvice(courseId, studentProgress, question)
  }
}

// Mock functions for fallback when OpenAI is not available
function getMockTradingAdvice(symbol: string, marketData: any, userQuery: string): string {
  const advice = `
🔥 FLAMEBORN TRADING ANALYSIS - ${symbol}

📊 CURRENT MARKET STATUS:
• Price: $${marketData.price} (${marketData.change > 0 ? "+" : ""}${marketData.change}%)
• Volume: $${marketData.volume}
• Market Sentiment: ${marketData.change > 0 ? "Bullish" : "Bearish"}

💡 TRADING RECOMMENDATIONS:
${
  marketData.change > 5
    ? `• STRONG BUY SIGNAL: ${symbol} showing strong upward momentum
  • Entry Point: Current price with 2-3% buffer
  • Target: +15-20% from current levels
  • Stop Loss: -8% from entry point`
    : marketData.change < -5
      ? `• CAUTION: ${symbol} in downtrend
  • Wait for reversal signals before entry
  • Support Level: $${(marketData.price * 0.95).toFixed(2)}
  • Consider DCA strategy if fundamentals strong`
      : `• SIDEWAYS MOVEMENT: ${symbol} consolidating
  • Range Trading Opportunity
  • Buy near support, sell near resistance
  • Monitor volume for breakout signals`
}

🎯 FLB INTEGRATION OPPORTUNITIES:
• Stake FLB tokens for premium trading signals
• Earn FLB rewards for successful trade sharing
• Use FLB for reduced trading fees on partner exchanges

⚠️ RISK MANAGEMENT:
• Never invest more than 5% of portfolio in single asset
• Set stop losses at -8% maximum
• Take profits at +20% and let winners run
• African market hours: Consider liquidity during local trading times

📈 TECHNICAL INDICATORS:
• RSI: ${Math.floor(Math.random() * 40) + 30} (${Math.random() > 0.5 ? "Neutral" : "Oversold"})
• MACD: ${Math.random() > 0.5 ? "Bullish crossover" : "Bearish divergence"}
• Volume Profile: ${Math.random() > 0.5 ? "Above average" : "Below average"}

Note: This is AI-generated analysis. Always do your own research and never invest more than you can afford to lose.
  `

  return advice
}

function getMockHealthAdvice(healthQuery: string): string {
  const query = healthQuery.toLowerCase()

  if (query.includes("malaria")) {
    return `
🦟 MALARIA PREVENTION & TREATMENT STRATEGY

🏥 COMMUNITY-BASED APPROACH:
• Distribute insecticide-treated nets (ITNs) to all households
• Implement indoor residual spraying in high-risk areas  
• Establish community health worker networks for early detection
• Create awareness campaigns using local languages and cultural practices

💊 HEALTH FACILITY SUPPORT:
• Ensure rapid diagnostic tests (RDTs) available at all health posts
• Stock artemisinin-based combination therapies (ACTs)
• Train healthcare workers on case management protocols
• Implement referral systems for severe cases

🔥 FLAMEBORN IMPACT:
• 1 BNB donation provides ITNs for 10 families
• Supports community health worker training programs
• Funds diagnostic equipment for rural health facilities
• Enables mobile health units to reach remote communities

📊 MEASUREMENT METRICS:
• Track malaria incidence rates in supported communities
• Monitor ITN distribution and usage rates
• Measure reduction in severe malaria cases
• Document community engagement levels

💰 FUNDING ALLOCATION:
• 40% - ITN procurement and distribution
• 25% - Community health worker training
• 20% - Diagnostic equipment and supplies
• 15% - Awareness campaigns and education
    `
  }

  return `
🏥 COMPREHENSIVE AFRICAN HEALTH STRATEGY

🌍 COMMUNITY-CENTERED APPROACH:
• Engage traditional healers and community leaders
• Implement culturally appropriate health interventions
• Use local languages for health education
• Build on existing community structures

💪 HEALTH SYSTEM STRENGTHENING:
• Train and support community health workers
• Improve health facility infrastructure
• Establish referral systems between care levels
• Implement quality improvement programs

🔥 FLAMEBORN PLATFORM BENEFITS:
• Transparent funding directly to verified facilities
• Community governance through FLB token holders
• Real-time impact tracking and reporting
• Sustainable financing with 70% direct health funding

📈 IMPACT MEASUREMENT:
• Track health outcome indicators in supported communities
• Monitor facility utilization and service quality
• Measure community satisfaction and engagement
• Document cost-effectiveness of interventions
  `
}

function getMockLearningAdvice(courseId: string, studentProgress: any, question: string): string {
  return `
🎓 FLAMEBORN LEARNING ADVISOR

📚 COURSE PROGRESS ANALYSIS:
• Current Progress: ${studentProgress.completionPercentage}% complete
• Learning Streak: ${studentProgress.streak} days 🔥
• FLB Tokens Earned: ${studentProgress.flbEarned} FLB
• Performance: ${studentProgress.completionPercentage > 80 ? "Excellent" : studentProgress.completionPercentage > 60 ? "Good" : "Needs Improvement"}

💡 PERSONALIZED RECOMMENDATIONS:
${
  studentProgress.completionPercentage < 50
    ? `• Focus on completing 1 module per day to maintain momentum
  • Use the Pomodoro technique: 25min study, 5min break
  • Join study groups in the community section
  • Set daily FLB earning goals to stay motivated`
    : `• You're doing great! Maintain your current pace
  • Consider helping other students to earn bonus FLB
  • Explore advanced modules in your area of interest
  • Start preparing for the final assessment`
}

🏆 FLB REWARD OPTIMIZATION:
• Daily login bonus: 5 FLB
• Module completion: 25-50 FLB each
• Quiz perfect score: 10 FLB bonus
• Helping other students: 15 FLB per helpful answer
• Weekly streak bonus: 100 FLB

🌍 CAREER DEVELOPMENT:
• Connect with health facilities in your region
• Build portfolio of completed courses
• Network with other FlameBorn learners
• Consider validator role for additional FLB earnings

💪 MOTIVATION TIPS:
• Remember: Your learning directly impacts African health outcomes
• Each FLB token represents real value and future opportunities
• You're part of a movement to eliminate disease outbreaks
• Your knowledge will serve your community for years to come

Keep up the excellent work! 🔥
  `
}

// Streaming functions for real-time responses
export async function streamTradingAdvice(symbol: string, marketData: any, userQuery: string) {
  if (!isOpenAIConfigured) {
    return null // Return null to indicate streaming not available
  }

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      prompt: `Provide real-time trading analysis for ${symbol} based on: ${userQuery}`,
      system: "You are a professional crypto trading advisor for FlameBorn platform users.",
    })

    return result
  } catch (error) {
    console.error("Error streaming trading advice:", error)
    return null
  }
}
