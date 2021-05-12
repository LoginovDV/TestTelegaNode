const TelegramBotApi = require('node-telegram-bot-api')

const token ='1837552262:AAH_tUfJPTOuhoCwaDVZveIJPjA54sxPlzI'

const bot = new TelegramBotApi(token, {poolling:true})

    bot.on('message', msg =>{
console.log(msg)
    })