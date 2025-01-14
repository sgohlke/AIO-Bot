export enum ModuleNamesToID{
    Chatclear = 1,
    Giveaway = 2,
    Reactrole = 3,
    Spamfilter = 4,
    Speaksupport = 5,
    Ticketsupport = 6,
    Joinmessage = 7,
    Aiospamfilter = 8,
    Streamer = 9,
}

export enum ModuleNames{
    Chatclear = "chatclear",
    Giveaway = "giveaway",
    Reactrole = "reactrole",
    Spamfilter = "spamfilter",
    Speaksupport = "speaksupport",
    Ticketsupport = "ticketsupport",
    Joinmessage = "joinmessage",
    Aiospamfilter = "aiospamfilter",
    Streamer = "streamer",
}

export function ModuleActive(response: any, module: number){
    for (const key in response){
        if (response[key].mid == module){
            return true;
        }
    }
    return false;
}