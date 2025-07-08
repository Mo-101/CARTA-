"use server"

import { createHmac } from "crypto"

// Server-only trading functions that require crypto module
export async function executeTradeOrder(orderData: {
  symbol: string
  side: "BUY" | "SELL"
  type: "MARKET" | "LIMIT"
  quantity: string
  price?: string
  apiKey: string
  secretKey: string
}) {
  try {
    const timestamp = Date.now()
    const queryString = new URLSearchParams({
      symbol: orderData.symbol,
      side: orderData.side,
      type: orderData.type,
      quantity: orderData.quantity,
      ...(orderData.price && { price: orderData.price }),
      timestamp: timestamp.toString(),
    }).toString()

    const signature = createHmac("sha256", orderData.secretKey).update(queryString).digest("hex")

    const signedQuery = `${queryString}&signature=${signature}`

    // In production, this would make the actual API call to Binance
    console.log("Would execute trade with signed query:", signedQuery)

    // Mock response
    return {
      orderId: Date.now(),
      symbol: orderData.symbol,
      status: "FILLED",
      executedQty: orderData.quantity,
      price: orderData.price || "MARKET",
    }
  } catch (error) {
    console.error("Trade execution error:", error)
    throw new Error("Failed to execute trade")
  }
}

export async function getAccountInfo(apiKey: string, secretKey: string) {
  try {
    const timestamp = Date.now()
    const queryString = `timestamp=${timestamp}`

    const signature = createHmac("sha256", secretKey).update(queryString).digest("hex")

    // Mock account info
    return {
      balances: [
        { asset: "BTC", free: "0.00123456", locked: "0.00000000" },
        { asset: "ETH", free: "1.23456789", locked: "0.00000000" },
        { asset: "USDT", free: "1000.00000000", locked: "0.00000000" },
      ],
    }
  } catch (error) {
    console.error("Account info error:", error)
    throw new Error("Failed to get account info")
  }
}
