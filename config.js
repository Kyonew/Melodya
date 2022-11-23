
module.exports = {
    DEFAULTSETTINGS: {
        prefix: '>',
    },
    opt: {
        DJ: {
            enabled: false, 
            roleName: 'DJ', 
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //Please don't touch
        },
        maxVol: 250, 
        loopMessage: false, 
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', 
                highWaterMark: 1 << 25 
            }
        }
    }
};
