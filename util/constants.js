const MESSAGES = {
    COMMANDS: {
        MISC: {
            PING: {
            name: "ping",
            aliases: ['speed'],
            category: 'Misc',
            description: "Affiche le ping du bot.",
            cooldown: 5,
            usage: '',
            isUserAdmin: false,
            permissions: false,
            args: false
            }
        },
        CONFIG: {
            SETPREFIX: {
                name: "setprefix",
                aliases: ["prefix"],
                category: 'Configuration',
                description: "Permet de changer le prefix du bot.",
                cooldown: 5,
                usage: '<new prefix>',
                isUserAdmin: false,
                permissions: true,
                args: true
            }
        },
        MUSIQUE: {
            PLAY: {
                name: "play",
                aliases: ["p"],
                category: 'Musique',
                description: "Permet de lancer une musique.",
                cooldown: 1,
                usage: '<nom musique>/<lien musique>',
                isUserAdmin: false,
                permissions: false,
                args: true
            },
            BACK: {
                name: "back",
                aliases: [""],
                category: 'Musique',
                description: "Permet de retourner à la musique précédente.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            CLEAR: {
                name: "clear",
                aliases: ["effacer"],
                category: 'Musique',
                description: "Permet d'effacer la playlist.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            FILTER: {
                name: "filter",
                aliases: ["filtre", "filtres"],
                category: 'Musique',
                description: "Permet d'ajouter des filtres super cools aux musiques.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            LOOP: {
                name: "loop",
                aliases: ["boucle"],
                category: 'Musique',
                description: "Permet d'activer le mode boucle *(répétition)*.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            NOWPLAYING: {
                name: "np",
                aliases: ["nowplaying", "song"],
                category: 'Musique',
                description: "Permet d'afficher la musique en cours et son temps.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            PAUSE: {
                name: "pause",
                aliases: [""],
                category: 'Musique',
                description: "Permet de mettre en pause la musique.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            QUEUE: {
                name: "queue",
                aliases: [""],
                category: 'Musique',
                description: "Permet de voir la liste de lecture.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            RESUME: {
                name: "resume",
                aliases: ["restart"],
                category: 'Musique',
                description: "Permet de relancer une musique en pause.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            SEARCH: {
                name: "search",
                aliases: [""],
                category: 'Musique',
                description: "Permet de chercher une musique.",
                cooldown: 1,
                usage: "<nom musique>",
                isUserAdmin: false,
                permissions: false,
                args: true
            },
            SKIP: {
                name: "skip",
                aliases: ["s"],
                category: 'Musique',
                description: "Permet de passer à la musique suivante.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            STOP: {
                name: "stop",
                aliases: [""],
                category: 'Musique',
                description: "Déconnecte le bot et efface la playlist.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            VOLUME: {
                name: "volume",
                aliases: ["vol"],
                category: 'Musique',
                description: "Permet de changer le volume du bot.",
                cooldown: 1,
                usage: "<new volume>",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            LYRICS: {
                name: "lyrics",
                aliases: ["lyric", 'paroles', 'parole'],
                category: 'Musique',
                description: "Affiche les paroles de la musique en cours.",
                cooldown: 1,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            MENU: {
                name: "menu",
                aliases: ["interface"],
                category: 'Musique',
                description: "Affiche une interface plus simple..",
                cooldown: 5,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            },
            SHUFFLE: {
                name: "shuffle",
                aliases: ["random", 'aleatoire'],
                category: 'Musique',
                description: "Change l'ordre des musiques aléatoirement.",
                cooldown: 5,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            }
        },
        SAVESONG: {
            SAVE: {
                name: "save",
                aliases: ["ss", 'savesong'],
                category: 'Save Songs',
                description: "Enregistre un son ou une playlist pour la retrouver plus facilement !",
                cooldown: 5,
                usage: "",
                isUserAdmin: false,
                permissions: false,
                args: false
            }
        
    }
    }
    
}

exports.MESSAGES = MESSAGES;