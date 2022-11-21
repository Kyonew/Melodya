const mongoose = require('mongoose');
const { Guild, User } = require("../models/main");

module.exports = client => {
    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));
    };

    client.removeGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));
    };

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        return client.config.DEFAULTSETTINGS;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }

   client.createUser = async member => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
        const createUser = await new User(merged);
        createUser.save().then(m => console.log(`Un utilisateur vient de creer sa playlist -> ${m.id}`));
    };



    client.getUser = async member => {
        const data = await User.findOne({ userID: member.id });
        if (data) return data;
        else return;

    };


    client.updateUser = async (member, settings) => {
        let data = await client.getUser(member);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            console.log(key);
        }
        return data.updateOne(settings);
    };

};