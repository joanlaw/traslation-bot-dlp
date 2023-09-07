// Importar las librerías necesarias
const Discord = require('discord.js');
const WebSocket = require('ws');
require('dotenv').config();


// Configurar el cliente de Discord con intenciones
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Configurar el servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Escuchar conexiones WebSocket
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Supongamos que el mensaje es el nombre en inglés de la carta
    const cardNameInEnglish = message;
    // Formateamos el comando para Bastion
    const commandForBastion = `<${cardNameInEnglish},en,es>`;
    // Enviamos el comando al canal de Discord donde Bastion está escuchando
    const channel = client.channels.cache.get('1148843539569065985'); // Reemplaza 'ID_DEL_CANAL' con el ID del canal de Discord donde está Bastion
    if (channel) {
      channel.send(commandForBastion);
    } else {
      console.error('El canal de Discord no se encontró. Verifica el ID del canal.');
    }
  });
});

// Iniciar sesión en Discord
client.login(process.env.DISCORD_BOT_TOKEN);
