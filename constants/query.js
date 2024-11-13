const GetTokenInfo_Query = (mintAddress) => `
query GetTokenInfo_Query {
  Solana {
    DEXTradeByTokens(
      where: {
        Transaction: { Result: { Success: true } }
        Trade: {
          Currency: {
            MintAddress: { is: "${mintAddress}" }
          }
        }
        Block: { Time: { since: "2024-09-24T08:03:00Z" } }
      }
    ) {
      Trade {
        Currency {
          Name
          MintAddress
          Symbol
        }
        start: PriceInUSD(minimum: Block_Time)
        min5: PriceInUSD(
          minimum: Block_Time
          if: { Block: { Time: { after: "2024-09-24T08:58:00Z" } } }
        )
        end: PriceInUSD(maximum: Block_Time)
        Dex {
          ProtocolName
          ProtocolFamily
          ProgramAddress
        }
        Market {
          MarketAddress
        }
        Side {
          Currency {
            Symbol
            Name
            MintAddress
          }
        }
      }
      makers: count(distinct: Transaction_Signer)
      makers_5min: count(
        distinct: Transaction_Signer
        if: { Block: { Time: { after: "2024-09-24T08:58:00Z" } } }
      )
      buyers: count(
        distinct: Transaction_Signer
        if: { Trade: { Side: { Type: { is: buy } } } }
      )
      buyers_5min: count(
        distinct: Transaction_Signer
        if: {
          Trade: { Side: { Type: { is: buy } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
      sellers: count(
        distinct: Transaction_Signer
        if: { Trade: { Side: { Type: { is: sell } } } }
      )
      sellers_5min: count(
        distinct: Transaction_Signer
        if: {
          Trade: { Side: { Type: { is: sell } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
      trades: count
      trades_5min: count(
        if: { Block: { Time: { after: "2024-09-24T08:58:00Z" } } }
      )
      traded_volume: sum(of: Trade_Side_AmountInUSD)
      traded_volume_5min: sum(
        of: Trade_Side_AmountInUSD
        if: { Block: { Time: { after: "2024-09-24T08:58:00Z" } } }
      )
      buy_volume: sum(
        of: Trade_Side_AmountInUSD
        if: { Trade: { Side: { Type: { is: buy } } } }
      )
      buy_volume_5min: sum(
        of: Trade_Side_AmountInUSD
        if: {
          Trade: { Side: { Type: { is: buy } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
      sell_volume: sum(
        of: Trade_Side_AmountInUSD
        if: { Trade: { Side: { Type: { is: sell } } } }
      )
      sell_volume_5min: sum(
        of: Trade_Side_AmountInUSD
        if: {
          Trade: { Side: { Type: { is: sell } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
      buys: count(if: { Trade: { Side: { Type: { is: buy } } } })
      buys_5min: count(
        if: {
          Trade: { Side: { Type: { is: buy } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
      sells: count(if: { Trade: { Side: { Type: { is: sell } } } })
      sells_5min: count(
        if: {
          Trade: { Side: { Type: { is: sell } } }
          Block: { Time: { after: "2024-09-24T08:58:00Z" } }
        }
      )
    }
  }
}
`

const GetSymbolName_Query = (mintAddress) => `
query GeTSymbolName_Query {
  Solana {
    DEXTradeByTokens(
      limit: { count: 1 }
      orderBy: { descending: Block_Time }
      where: {
        Trade: {
          Currency: {
            MintAddress: { is: "${mintAddress}" }
          }
          Dex: {
            ProgramAddress: {
              is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
            }
          }
        }
        Transaction: { Result: { Success: true } }
      }
    ) {
      Trade {
        Currency {
          Name
          MintAddress
          Symbol
        }
        Amount
        AmountInUSD
        Price
        PriceInUSD
      }
    }
  }
}
`

const GetLatestLiquidityForPool_Query = (mintAddress) => `
query GetLatestLiquidityForPool {
  Solana {
    DEXPools(
      where: {
        Pool: {
          Market: {
            BaseCurrency: {
              MintAddress: {
                is: ${mintAddress}
              }
            }
          }
          Dex: {
            ProgramAddress: {
              is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
            }
          }
        }
      }
      orderBy: { descending: Block_Slot }
      limit: { count: 1 }
    ) {
      Pool {
        Market {
          MarketAddress
          BaseCurrency {
            MintAddress
            Symbol
            Name
          }
          QuoteCurrency {
            MintAddress
            Symbol
            Name
          }
        }
        Dex {
          ProtocolFamily
          ProtocolName
        }
        Quote {
          PostAmount
          PriceInUSD
          PostAmountInUSD
        }
        Base {
          PostAmount
        }
      }
    }
  }
}
`


const GetCreationTime_Query = (mintAddress) => `
query GetCreationTime_Query {
  Solana(network: solana) {
    Instructions(
      where: {Instruction: {Accounts: {includes: {Address: {is: ${mintAddress}}}}, Program: {Name: {is: "pump"}, Method: {is: "create"}}}}
    ) {
      Block{
        Time
      }
      Transaction {
        Signer
        Signature
      }
      Instruction {
        Accounts {
          Address
        }
      }
    }
  }
}
`

const GetLatestTrades_Query = (mintAddress) => `
query GetLatestTrades_Query {
  Solana {
    DEXTradeByTokens(
      orderBy: {descending: Block_Time}
      limit: {count: 50}
      where: {Trade: {Currency: {MintAddress: {is: ${mintAddress}}}, Price: {gt: 0}, Dex: {ProtocolName: {is: "pump"}}}, Transaction: {Result: {Success: true}}}
    ) {
      Block {
        allTime: Time
      }
      Trade {
        Account {
          Address
          Owner
        }
        Side {
          Type
          Account {
            Address
            Owner
          }
        }
        Price
        Amount
        Side {
          AmountInUSD
          Amount
        }
      }
    }
  }
}
`

const GetTopTokenHolders_Query = (mintAddress) => `
query GetTopTokenHolders_Query {
  Solana {
    BalanceUpdates(
      limit: { count: 10 }
      orderBy: { descendingByField: "BalanceUpdate_Holding_maximum" }
      where: {
        BalanceUpdate: {
          Currency: {
            MintAddress: { is: ${mintAddress} }
          }
        }
        Transaction: { Result: { Success: true } }
      }
    ) {
      BalanceUpdate {
        Currency {
          Name
          MintAddress
          Symbol
        }
        Account {
          Address
        }
        Holding: PostBalance(maximum: Block_Slot)
      }
    }
  }
}
`

const GetNewTokenMintAddress_Query = `
query GetNewTokenMintAddress_Query {
  Solana {
    Instructions(
      where: {
        Instruction: {
          Program: { Method: { is: "create" }, Name: { is: "pump" } }
        }
      }
    ) {
      Instruction {
        Accounts {
          Address
          Token {
            Mint
            Owner
            ProgramId
          }
        }
        Program {
          Name
        }
      }
    }
  }
}
`;

module.exports = { 
  GetTokenInfo_Query, 
  GetSymbolName_Query, 
  GetCreationTime_Query, 
  GetLatestTrades_Query,
  GetTopTokenHolders_Query,
  GetNewTokenMintAddress_Query,
  GetLatestLiquidityForPool_Query
};