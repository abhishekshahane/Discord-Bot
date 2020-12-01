const db = require('quick.db')
const Discord = require('discord.js');
const random = require("random");
module.exports = {
  name: "gamble",
  usage: "!gamble [amount > 10]",
  run: async(msg, client)=> {
    let args = msg.content.split(' ')
      let f = {
        description: "Oops, please follow the format for gamble(!gamble [1500 > amount > 10]).",
        color: "#FF0000"//red in hex code
      }
      if (args.length===1 || parseInt(args[1])<11|| parseInt(args[1]) > 1500){
        const embed = new Discord.MessageEmbed()
        .setTitle(f.description)
        .setColor(f.color)
        return msg.channel.send(embed)
      }
      else if(args.length>2){
        const embed = new Discord.MessageEmbed()
        .setTitle(f.description)
        .setColor(f.color)
        return msg.channel.send(embed)
      }
    let msgtodelete = await msg.channel.send(
      {embed: {
      description: "Rolling the dice :game_die:",
      color: "#008000"
    }})
    setTimeout(() => {
      //you can use foreach for this, but i wanted to make this more logical:)
        let diceToRoll = [[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6], [0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]]
        let newArr = []
        for (var i=0;i<diceToRoll.length;i++){
          let curr = diceToRoll[i][random.int(0,6)]
          newArr.push(curr)

        }
        console.log(newArr)
        let Check = random.int(0,6);
        let bool = true
        for (var j=1;j<newArr.length;j++){
          if (newArr[j]!=Check){
            bool=false
            break
          }
          else{
            bool=true
            //same as it was
          }
        }
        if (bool==false){
          //choose a number between the max and min
          let num = random.int(2, parseInt(args[1]))
          db.subtract(`User${msg.author.id}.coins`, num)
          let embed1 = {
            description: `
            ***LOL*** you didn't roll straight dice unfortunately so you lost ${num} coins lol. Here are your stats:
            `,
            color: "#FF0000",
            fields: [
              {
                name: 'You rolled a\n',
                value: `${Check}`
              }

            ]
          }
          msgtodelete.delete()
          msg.channel.send({
            embed: embed1
          })

        }
        else{
          let num = random.int(2, parseInt(args[1]))
          let otherMsga = `Nice ${msg.author.username}! You've won ${num} coins`
        }
    }, 10000)
  }
}
