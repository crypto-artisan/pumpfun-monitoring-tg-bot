const DemoMessage = (Symbol, MintAddress, Volume, MarketCap, BondingCurve, Buyers, Sellers, TopHoldersHold, TotalHolders, TotalSnipers, UniqueMakers_5, TotalMaker_1k, TotalMaker_250) => `
GOTTA BE QUICKER THAN THAT BUDDY | $${Symbol} | #${Symbol} 🚀
<a href="https://pump.fun/">Pump.fun <b>progress</b></a>: ▓▓▓▓▓▓▓ ${BondingCurve}%

⏰ Open: 9m
CA: <code>${MintAddress}</code>

📊 Volume: ${Volume}$
🏦 MKT CAP: ${MarketCap}$

📈 Txns Buy: ${Buyers} | 📉 Txns Sell: ${Sellers}

Top 10 holders hold: ${TopHoldersHold}%
Total holders: ${TotalHolders}

👨‍💻 Dev hold: ${DevHold}%
├ Dev sniped: ${IsSniped}
├ Dev: 6Vg..rpk Buy: 440.26$ | Sell: 453.41$

🎯 Total snipers: ${TotalSnipers}
🆔 Unique Makers in first 3 minutes: ${UniqueMakers_5}

🤑 Total Maker Buy > 1k$: ${TotalMaker_1k}
💰 Total Maker Buy > 250$: ${TotalMaker_250}
`;

module.exports = { DemoMessage }