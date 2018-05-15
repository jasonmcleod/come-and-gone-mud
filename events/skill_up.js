module.exports = (events) => {
    events.on('skill_up', (client, skill, value=1) => {        
        const player = client.player
        if(player.skills[skill] < 100) {
            player.skills[skill] += value;
            client.log(`Skill: ${skill} + ${value} (${player.skills[skill]} / 100)`);
        }        
    });
};