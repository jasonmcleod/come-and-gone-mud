# Come and Gone

Come and Gone is a MUD. You can connect over telnet `mud.torch.team:4201`, or in a browser [mud.torch.team](http://mud.torch.team/)

Come and Gone was built in ~20 days for the ["Enter the (Multi-User) Dungeon"](https://itch.io/jam/enterthemud) hackathon.

___


## Gameplay / Lore

You awaken from a deep sleep. The machines that have been keeping you asleep for years have ceased to function. You slowly rise to your feet and look around. The area around you is covered in trash. It's not clear what happened here, but there sure is a lot of junk.

Rescue is not out of the question... but is there anyone out there?

You may run into others on their own journey... Will they help you? Do they think you have the answers? Can you trust them? One man's trash is another man's treasure... perhaps they will be interested in trading.

### What do I do?
You will find items as you move around. Sometimes you will find blueprints.

You can dismantle everything except the base component. 

You can build items if you find the blueprints. You'll do better if you have decent tools. You'll get better as you practice.

- Spoilers at the bottom of the document

___


## Development

Most of the extensible bits are file based, and found in the data folder:
- "class" - Classes are currently just a set of default skills
- "command" - What players type in. These are split up by context
- "context" - Nested commands and support for things like "Are you sure?"
- "item" - All items (in one file for ease of loading)
- "landmark" - trees, ponds.. pretty limited as of now
- "structure" - anything that can provide shelter to a player

### Items
Items are procedurally generated based on attribute pools.
 - size: very small, small, large, very large
 - length: very short, short, long, very long
 - voltage: 1.5v, 9v, 12v
 - color: red, green, blue, orange

### Areas
Areas are procedurally generated as soon as anyone moves into an unknown zone. Each area has a chance of including
- items: components, objects, and blueprints
- npcs: some friendly, some not...
- structures: tents, shacks, ect...
- landmarks: trees, pond


# Spoilers
The idea started with a single objective: Build a beacon, and get rescued. As I developed the code (and the idea) more stuff came to mind. What if people build their beacons, but they choose not to leave? With the current content, it will get boring quickly - but my hope is that people will find at least some interest in this idea, and I will add more content such as villages and ship building. Who knows, maybe someone will fork it and submit their own ideas and content :)
