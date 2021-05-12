const TelegramBotApi = require('node-telegram-bot-api')

const token ='1837552262:AAH_tUfJPTOuhoCwaDVZveIJPjA54sxPlzI'

const bot = new TelegramBotApi(token, {polling:true})

    bot.on('message', msg =>{
        const text = msg.text;
        const msgid = msg.chat.id;
        const user = msg.from.first_name;
bot.sendMessage(msgid, `${user}: Сказал ${text}` )


console.log(msg)
    })