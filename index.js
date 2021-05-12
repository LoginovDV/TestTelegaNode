const TelegramBotApi = require('node-telegram-bot-api')
const token ='1837552262:AAH_tUfJPTOuhoCwaDVZveIJPjA54sxPlzI'
const cheerio = require('cheerio');
const axios = require('axios');
const gorodaOption = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'Москва' , callback_data:'moscow'}],
            [{text:'Мыдищи' , callback_data:'mitishi'}],
        ]

    })
}

const startOption = {
    reply_markup: JSON.stringify({
        inline_keyboard:[

            [{text:'Погода' , callback_data:'/pogoda'}]
        ]


    })
}

        const start =() =>{

            const bot = new TelegramBotApi(token, {polling:true})
            bot.on('message', async msg =>{


        bot.setMyCommands ([
            {command: '/start', description:'Старт бота'},
            {command: '/info', description:'Информация'},
            {command: '/pogoda', description:'Узнать прогноз погоды'}
        ])

        const text = msg.text;
        const msgid = msg.chat.id;
        const user = msg.from.first_name;

        if (text==='/start') {
            return bot.sendMessage(msgid, `Добро пожаловать ${user}`,startOption)
        }
        if (text==='/pogoda') {
            return  bot.sendMessage(msgid, `Выберите город`,gorodaOption)

        }


        return bot.sendMessage(msgid,`${user}, Я тебя не понимать 😭`)
})
bot.on('callback_query',async msg=> {
    const data = msg.data;
    const msgid = msg.message.chat.id;

    if (data==='moscow') {
        const getHTML = async (url) => {
            const { data } = await axios.get(url);
            return cheerio.load(data);
          };
          const selector = await getHTML(`https://yandex.ru/pogoda/moscow`);
            selector('.fact').each((i,element) => {
               title = selector(element).find('h1.title').text();
               temp = selector(element).find('div.fact__temp').text();

            });
            return bot.sendMessage(msgid, `${title},${temp}`)
    }
    if (data==='mitishi') {
        const getHTML = async (url) => {
            const { data } = await axios.get(url);
            return cheerio.load(data);
          };
          const selector = await getHTML(`https://yandex.ru/pogoda/10740`);
            selector('.fact').each((i,element) => {
               title = selector(element).find('h1.title').text();
               temp = selector(element).find('div.fact__temp').text();
               img = selector(element).find('img.icon').text();

            });
            return bot.sendMessage(msgid, `${title},${temp}, ${img}`)
    }

    if (data==='/pogoda') {
        return  bot.sendMessage(msgid, `Выберите город`,gorodaOption)
    }


    })
}

start();





