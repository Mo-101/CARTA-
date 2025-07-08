// Browser-safe market data utilities
export interface MarketData {
  symbol: string
  price: string
  priceChange: string
  priceChangePercent: string
  volume: string
  high: string
  low: string
}

export interface KlineData {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
}

// Mock data for development
const mockMarketData: MarketData[] = [
  {
    symbol: "BTCUSDT",
    price: "43250.50",
    priceChange: "1250.30",
    priceChangePercent: "2.98",
    volume: "28456.789",
    high: "43890.00",
    low: "41200.00",
  },
  {
    symbol: "ETHUSDT",
    price: "2650.75",
    priceChange: "-45.20",
    priceChangePercent: "-1.68",
    volume: "156789.234",
    high: "2720.00",
    low: "2580.00",
  },
  {
    symbol: "BNBUSDT",
    price: "315.80",
    priceChange: "8.90",
    priceChangePercent: "2.90",
    volume: "45678.123",
    high: "320.50",
    low: "305.20",
  },
]

export async function getMarketData(symbols?: string[]): Promise<MarketData[]> {
  try {
    // In production, this would call the actual Binance API
    // For now, return mock data
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    if (symbols) {
      return mockMarketData.filter((data) => symbols.includes(data.symbol))
    }

    return mockMarketData
  } catch (error) {
    console.error("Error fetching market data:", error)
    throw new Error("Failed to fetch market data")
  }
}

export async function getKlineData(symbol: string, interval = "1h", limit = 100): Promise<KlineData[]> {
  try {
    // Mock kline data generation
    const now = Date.now()
    const intervalMs = getIntervalMs(interval)
    const klines: KlineData[] = []

    let basePrice = 43000 // Starting price

    for (let i = limit - 1; i >= 0; i--) {
      const openTime = now - i * intervalMs
      const closeTime = openTime + intervalMs - 1

      // Generate realistic price movement
      const volatility = 0.02 // 2% volatility
      const change = (Math.random() - 0.5) * volatility
      const open = basePrice
      const close = open * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.01)
      const low = Math.min(open, close) * (1 - Math.random() * 0.01)
      const volume = (Math.random() * 1000 + 100).toFixed(3)

      klines.push({
        openTime,
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume,
        closeTime,
      })

      basePrice = close
    }

    return klines
  } catch (error) {
    console.error("Error fetching kline data:", error)
    throw new Error("Failed to fetch kline data")
  }
}

function getIntervalMs(interval: string): number {
  const intervals: Record<string, number> = {
    "1m": 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "4h": 4 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
  }

  return intervals[interval] || intervals["1h"]
}

export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? Number.parseFloat(price) : price
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

export function formatVolume(volume: string | number): string {
  const num = typeof volume === "string" ? Number.parseFloat(volume) : volume

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }

  return num.toFixed(2)
}

export function calculatePriceChange(
  current: number,
  previous: number,
): {
  change: number
  changePercent: number
} {
  const change = current - previous
  const changePercent = (change / previous) * 100

  return {
    change: Number.parseFloat(change.toFixed(2)),
    changePercent: Number.parseFloat(changePercent.toFixed(2)),
  }
}
