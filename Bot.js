const { AssertionError } = require('assert');
const { exec } = require('child_process');
const { error } = require('console');
const mineflayer = require('mineflayer')
//const mineflayerViewer = require('prismarine-viewer').mineflayer
const wait = require('util').promisify(setTimeout);
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
//const delay = require('delay')
var Vec3 = require('vec3').Vec3;

shift = false

const bot = mineflayer.createBot({
    host: 'ml.chickencraft.nl',
    //port: 56762,
    username: 'DiabloB',
    version: "1.20.1",
    //logErrors: false
})

bot.loadPlugin(pathfinder)
//bot.loadPlugin(require('mineflayer-collectblock').plugin)

async function Delay(time){
    console.log("Waiting 5s");
    await wait(time);
    await bot.waitForTicks(20);}

async function Walkto(x,y,z,d){
    try{
    async function pathfind(){
    await bot.pathfinder.goto(new goals.GoalNear(x, y, z, d))
    }
    await pathfind()
    } catch (e) {console.log(e)}
}

let mcData
bot.once("spawn", () => {
    //mineflayerViewer(bot, { port: 3000 }) // Start the viewing server on port 3000
    mcData = require('minecraft-data')(bot.version)
    bot.chat("/register Diablo")
    bot.chat("/register Diablo Diablo")
    bot.chat("/login Diablo")
    var join = new Vec3(5, 67, 2);
    Delay(5000)
    Walkto(-5, 66, -8, 1)
    Delay(5000)
    console.log(bot.quickBarSlot)
    Delay(5000)
    const window = bot.inventory
  })

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log(message)
  if(message === 'https://discord.chickencraft.nl'){// bot.chat("This Works!") 
    Walkto(4222, 63, 352, 1)
    //Walkto(4224, 63, 347, 1)
    bot.on("goal_reached", () => {
        bot.setQuickBarSlot(1)
        bot.activateEntity(bot.nearestEntity())
    })
  }
})

bot.on('windowOpen', (window) => {
    console.log(window.slots[12])
    try{
    bot.clickWindow(12,0, 0)
    } catch (e) {}
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if(message === 'me] tp'){
        console.log(username,message)
        bot.chat("/tpa "+username)
    }
    if(message === 'me] tp me'){
        console.log(username,message)
        bot.chat("/tpahere "+username)
    }
    if(message === 'me] sethome'){
        console.log(username,message)
        bot.chat("/sethome home")
    }
    // if(message === 'me] gravel'){
    //     const blockType = mcData.blocksByName["gravel"]
    //     blocks = []
    //     const targets = []
        
    //     console.log(targets)
    //     bot.collectBlock.collect(targets)
    // }
    if (message === 'me] exit') {
        console.log(username, message)
        process.exit()
      }
    if (message === 'me] shift') {
        console.log(username, message)
        if (shift === false){bot.setControlState('sneak', true);shift = true}
        else {bot.setControlState('sneak', false);shift = false}
    }
})