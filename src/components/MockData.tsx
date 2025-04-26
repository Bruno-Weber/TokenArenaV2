
// Mock transactions for the activity feed
export const mockTransactions = [
  {
    hash: "0x1234...5678",
    from: "0xabcd...ef01",
    to: "0x2345...6789",
    amount: "10",
    status: "success",
    type: "transfer",
    token: "PSG",
    timestamp: new Date().getTime() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    hash: "0x2345...6789",
    from: "0x3456...7890",
    to: "0x4567...8901",
    amount: "25",
    status: "pending",
    type: "stake",
    token: "JUV",
    timestamp: new Date().getTime() - 1000 * 60 * 15, // 15 minutes ago
  },
  {
    hash: "0x3456...7890",
    from: "0x5678...9012",
    to: "0x6789...0123",
    amount: "5",
    status: "success",
    type: "vote",
    token: "BAR",
    timestamp: new Date().getTime() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    hash: "0x4567...8901",
    from: "0x7890...1234",
    to: "0x8901...2345",
    amount: "50",
    status: "success",
    type: "transfer",
    token: "ATM",
    timestamp: new Date().getTime() - 1000 * 60 * 45, // 45 minutes ago
  },
  {
    hash: "0x5678...9012",
    from: "0x9012...3456",
    to: "0x0123...4567",
    amount: "15",
    status: "failed",
    type: "mint",
    token: "MAN",
    timestamp: new Date().getTime() - 1000 * 60 * 60, // 1 hour ago
  }
];
