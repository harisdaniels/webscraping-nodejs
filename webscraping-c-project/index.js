const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const getPrice = async () => {
    try {
        const url = "https://coinmarketcap.com/";

        const {data} = await axios({
            method: "GET",
            url : url
        });
        const $ = cheerio.load(data);
        const cssSelector = "#__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";

        
        const tableName = [
            "Rank",
            "Name",
            "Price",
            "24h %",
            "7d %",
            "Market Cap",
            "Volume",
            "Circulating Supply"
        ];
        const coinArray = [];

        $(cssSelector).each((index, element) => {
            let tableIndex = 0;
            const coinObj = {};

            if (index <= 9) {
                $(element).children((indexChild, elementChild) => {
                    let tdElement = $(elementChild).text();

                    if (tableIndex === 1 || tableIndex === 6) {
                        tdElement  = $('p:first-child', $(elementChild).html()).text();
                    } 

                    if (tdElement) {
                        coinObj[tableName[tableIndex]] = tdElement;
                        tableIndex++;
                    }
                });
                console.log(coinObj);
                //coinArray.push(coinObj);
            }
        });     
        //return coinArray;       
    } catch (error) {
        console.error(error);
    }
}
getPrice();
/*
const app = express();


app.get('/api/price-feed', async(req, res) => {
    try {
        const priceFeed = await getPrice();

        return res.status(200).json({
            result : priceFeed,
        });
    } catch (error) {
        return res.status(500).json({
            error : error.toString()
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});
*/