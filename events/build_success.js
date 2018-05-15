const Client = require('../classes/Client');
module.exports = (events) => {
    events.on('build_success', (client, build) => {
        if(build.name === 'compass') {
            client.log('You should be able to tell where you are now!');    
        }

        if(build.name === 'distress terminal') {
            setTimeout(() => {
                client.log('You take a deep breath and turn on your distress terminal...');    
                client.log('You wait patiently for someone to hear your call');    
                setTimeout(() => {
                    client.log('Your signal is detected by a nearby ship');    
                    client.log('Help is on the way!');    

                    client.log('');
                    client.log('██╗  ██╗███████╗██╗     ██████╗     ██╗███████╗     ██████╗ ███╗   ██╗');
                    client.log('██║  ██║██╔════╝██║     ██╔══██╗    ██║██╔════╝    ██╔═══██╗████╗  ██║');
                    client.log('███████║█████╗  ██║     ██████╔╝    ██║███████╗    ██║   ██║██╔██╗ ██║');
                    client.log('██╔══██║██╔══╝  ██║     ██╔═══╝     ██║╚════██║    ██║   ██║██║╚██╗██║');
                    client.log('██║  ██║███████╗███████╗██║         ██║███████║    ╚██████╔╝██║ ╚████║');
                    client.log('╚═╝  ╚═╝╚══════╝╚══════╝╚═╝         ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═══╝');
                    client.log('                                                                   ');                       
                    client.log('   ████████╗██╗  ██╗███████╗    ██╗    ██╗ █████╗ ██╗   ██╗██╗      '); 
                    client.log('   ╚══██╔══╝██║  ██║██╔════╝    ██║    ██║██╔══██╗╚██╗ ██╔╝██║   ');    
                    client.log('      ██║   ███████║█████╗      ██║ █╗ ██║███████║ ╚████╔╝ ██║       ');
                    client.log('      ██║   ██╔══██║██╔══╝      ██║███╗██║██╔══██║  ╚██╔╝  ╚═╝       ');
                    client.log('      ██║   ██║  ██║███████╗    ╚███╔███╔╝██║  ██║   ██║   ██╗       ');
                    client.log('      ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ');
                    client.log(' ');
                    client.log(' ')
                    client.log(`-- That's it for now! Thanks for playing! --`);    
                    client.log(`   `);    
                }, 5000);
            }, 1000);            
        }

        if(build.name === 'metal detector') {
            client.log('Spotting hidden items should be easier now!');    
        }
    });
};