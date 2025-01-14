import{
    CustomDiscordClient,
    ticketsupport,
    //ModuleNames,
    ModuleNamesToID,
    api,
    ModuleActive
} from './../../index'
import { MessageEmbed } from 'discord.js'

export function interaction(bot: CustomDiscordClient) {
        bot.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            if (interaction.commandName === 'aio-help') {
              const helpembed = new MessageEmbed()
                      .setColor('#0099ff')
                      .setTitle('AIO-Bot')
                      .setURL('https://aio.ionic-host.de')
                      .setAuthor({ name:'AIO-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://aio.ionic-host.de'})
                      .setDescription('Hilfe Liste')
                      .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                      .addFields(
                          { name: 'Webinterface:', value: 'https://alicia.ionic-host.de' },
                          { name: '\u200B', value: '\u200B' },
                          { name: 'warn', value: 'Warn User bei Eingestellten Warns erfolgt ein ban oder mute', inline: true },
                          { name: 'ban', value: 'Bannt einen User vom Discord', inline: true },
                          { name: 'mute', value: 'Mute einen User in Text Channels', inline: true },
                          { name: 'timeout <Time>', value: 'Timeoute einen User dieser kann keinen Channel mehr joinen oder in diesen schreiben', inline: true },
                          { name: 'invite <Time>', value: 'Erstelle einen Invite Link', inline: true },
                          { name: 'clearchat', value: 'Löscht alle Nachrichten in einem Channel (nur bei nachrichten bis 14Tagen möglich)', inline: true },
                          { name: 'kick', value: 'Kickt den User vom Discord', inline: true },
                      )
                      .setTimestamp()
                      .setFooter({text:'AIO-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                  await interaction.reply({embeds: [helpembed]})
            } else if (interaction.commandName === 'clearchat'){
                if (interaction.guildId){
                    api.getModules(interaction.guildId).then((response: any) =>{
                        if (ModuleActive(response.data, ModuleNamesToID.Chatclear)){
                            api.getModule(interaction.guildId as string, "chatclear").then(async (responseroles: any) =>{
                                const roles = responseroles.data[0].roleid
                                if (roles.includes(roles)){
                                  const channel = await bot.getChannelFromCache(interaction.channelId)
                                  const valueInter = interaction.options.data[0]
                                  console.log("Interaction Value before IF", valueInter)
                                  if (channel && valueInter && valueInter.value && Number(valueInter.value)){
                                      console.log("Interaction Value in IF", valueInter.value)
                                      channel.bulkDelete(valueInter.value as number, true) //_hoistedOptions[0].value
                                  }
      
                                  const member = interaction.member
                                  if(member){
                                    const cleared = new MessageEmbed()  
                                      .setColor('#0099ff')
                                      .setTitle('AIO-Bot')
                                      .setURL('https://aio.ionic-host.de')
                                      .setAuthor({ name:'AIO-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://aio.ionic-host.de'})
                                      .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                                      .addFields(
                                          { name: 'Channel wurde Bereinigt von:', value:  member.user.username} 
                                      )
                                      .setTimestamp()
                                      .setFooter({text:'AIO-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                          
                                  interaction.reply({embeds: [cleared]})
                                }
                              }
                            })
                        }
                    })
                }
            } else if (interaction.commandName === 'ticketsupport'){
                if (interaction.options.getSubcommand() === 'create'){
                    //ticketsupport.create()
                } else if (interaction.options.getSubcommand() === 'add'){
                    //ticketsupport.add()
                }else if (interaction.options.getSubcommand() === 'remove'){
                    //ticketsupport.remove()
                } else if (interaction.options.getSubcommand() === 'close'){
                    //ticketsupport.close()
                } else if (interaction.options.getSubcommand() === 'archive'){
                    //ticketsupport.archive()
                } else if (interaction.options.getSubcommand() === 'delete'){
                    ticketsupport.delete(bot, interaction.channelId)
                }
            }
          });
    }