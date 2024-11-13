const axios = require('axios');
const { Telegraf } = require('telegraf');

const {
    TELEGRAM_TOKEN,
    CHANNEL_ID,
    BITQUERY_API_KEY,
    BITQUERY_AUTH_TOKEN,
    POLLING_TIME,
    MODE,
    QUERY_BASE_URL,
    HEADERS,
    DemoMessage,
    GetTokenInfo_Query,
    GetSymbolName_Query,
    GetLatestTrades_Query,
    GetNewTokenMintAddress_Query,
    GetCreationTime_Query,
    GetTopTokenHolders_Query,
    GetLatestLiquidityForPool_Query
} = require('./constants')

const bot = new Telegraf(TELEGRAM_TOKEN);


async function sendMessageToChannel(message) {
    try {
        await bot.telegram.sendMessage(CHANNEL_ID, message);
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}

async function Run_Query(query) {
    try {
        const response = await axios.post(QUERY_BASE_URL, {
            query: query,
        }, {
            headers: HEADERS,
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching new tokens:', error.message);
        return null;
    }
}

async function GetSymbolName(mintAddress) {
    const response = await Run_Query(GetSymbolName_Query(mintAddress));
    console.log('response', response)
    const Currency = response.Solana.DEXTradeByTokens[0]?.Trade.Currency;
    console.log('Currency', Currency)
    return {
        Symbol: Currency?.Symbol,
        Name: Currency?.Name
    };
}

async function GetBondingCurve(mintAddress) {
    const response = await Run_Query(GetLatestLiquidityForPool_Query(mintAddress));

    console.log("====>", response);
    return response;
}

async function MonitorPumpFun() {

    try {
        // const GetNewTokenMintAddress_Response = await Run_Query(GetNewTokenMintAddress_Query);

        // if (GetNewTokenMintAddress_Response) {
        //     const instructions = GetNewTokenMintAddress_Response.Solana.Instructions;
        //     for (const instruction of instructions) {
        //         const accounts = instruction.Instruction.Accounts;
        //         for (const account of accounts) {
        //             const tokenInfo = account.Token;
        //             const mint = tokenInfo.Mint;
        //             const owner = tokenInfo.Owner;
        //             const programId = tokenInfo.ProgramId;
        //             if (mint && owner && programId) {
        //                 const message = `New Token Created!\nMint: ${mint}\nOwner: ${owner}\nProgram ID: ${programId}`;






        //                 await sendMessageToChannel(message);
        //             }
        //         }
        //     }
        // }

    } catch (error) {
        console.error('Error fetching new tokens:', error.message);
    }
}

async function MonitorPumpFun_Test() {
    await GetSymbolName('3fWKfD1Z3je4MndqrWJRg2Wit28thmnA12eDEvpKpump');
    // await GetBondingCurve('3fWKfD1Z3je4MndqrWJRg2Wit28thmnA12eDEvpKpump');
}


bot.command('demo', (ctx) => {
    ctx.reply(DemoMessage, { parse_mode: 'HTML' });
});

bot.launch()
    .then(() => console.log('Bot started'))
    .catch(err => console.error('Bot launch error:', err));

async function main() {
    if (MODE == 'development') {
        MonitorPumpFun_Test();
    }
    else if (MODE == 'product') {
        setInterval(MonitorPumpFun, POLLING_TIME); // Poll every x seconds
    }
}

main();