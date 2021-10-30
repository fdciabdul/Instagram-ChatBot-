const Insta = require('@androz2091/insta.js');
const client = new Insta.Client();
const ytdl = require('ytdl-core');
const axios = require("axios").default;

client.config = require('./config');

client.on('connected', () => {
    console.log(`Client connected with profile ${client.user.username}`);
})

client.on('pendingRequest', chat => {
        chat.approve();
    });

    
client.on('messageCreate', async message => {  

    if(!message.content || message.authorID === client.user.id || !message.content.startsWith(client.config.app.prefix)) return;

    const args = message.content.slice(client.config.app.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    message.markSeen();
     

    if(['play', 'p'].includes(commandName)) {

        const argss = args[0];		
        if(!argss){
			return message.chat.sendMessage(`🛑 | Please send a YouTube link`);
        }
        if(argss.includes('https://youtu.be') || argss.includes('https://www.youtube.com/watch')) {

            const stream = ytdl(argss, { filter: format => format.container === 'mp4' });
            const array = [];
         
            stream
            .on('data', chunk => {
                message.chat.sendMessage('bentarr .. kita convert dulu cokkkk');
                array.push(chunk);
            })
            .on('end', () => {
                message.chat.stopTyping();
                message.chat.sendVoice(Buffer.concat(array));
           
            });
        } else {
            message.chat.sendMessage(`🛑 | Please send a valid YouTube link!`);
        }
    }


})

client.on('messageCreate', async message => {  
    console.log(client.user)
    if (message.author.id === client.user.id) return
    message.markSeen();

    if(message.content.toLowerCase().includes('hi')){ 
        return message.chat.sendMessage('Hi @fdciabdul in here');
    } else
    axios.get(`https://kemanain.com/ayla/?pesan=${encodeURIComponent(message.content)}`)
    .then(res =>{
      message.chat.sendMessage(res.data.jawab);
    })
})
    


client.login(client.config.app.username, client.config.app.password);
