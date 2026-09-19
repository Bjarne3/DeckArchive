(function () {
  const TEXT_STORE_KEY = "deckarchive:text-edits:v1";
  const GAME_STORE_KEY = "deckarchive:game-nights:v1";
  const DRAFT_CAPTURE_ENDPOINT = "http://127.0.0.1:4182/drafts";
  const TEXT_EDIT_SEED = {
    "71pih4": {
      original: "Decks, salt, lore, and several questionable life choices.",
      value: "Salt Bois on Tour",
    },
    u5m83l: {
      original:
        "A fantasy-styled archive for the playgroup's Commander decks, complete with Scryfall art, roast text, searchable archetypes, and calculated pod analysis.",
      value:
        "An extremely nerdy waste of time to get a good overview of all decks and Magic Nights. Useful? No. But beautifully set up? Also no. However, it is our heap of salt.",
    },
    "6b2y44": {
      original: "Dromoka",
      value: "Dragonlord Dromoka",
    },
    jw9apj: {
      original:
        "Lifegain commander that tries to win through Aetherflux Reservoir or commander damage. Strong commander and plenty of interaction, but the deck can feel unfocused enough that it does not always become a major threat.",
      value:
        "Lifegain commander that tries to win through Aetherflux Reservoir or commander damage. Has maybe yet to win, but surely is a threat (and a nuisance) at the table.",
    },
    d5v2ls: {
      original:
        "Friendly toughness-matters deck with creatures like 0/6s and 2/10s that attack using toughness thanks to Arcades. Synergistic, linear, a little dull to pilot, but a solid mid-table deck.",
      value:
        "Friendly toughness-matters deck with creatures like 0/6s and 2/10s that attack using toughness thanks to Arcades. Synergistic, linear, a extremely dull to pilot, but a solid mid-table deck.",
    },
    kij9s4: {
      original:
        "This deck looks like it is just doing regular Gruul things until Huub suddenly delivers personal greetings from the sponsor.",
      value:
        "This deck was never viewed as a big threat before, but since recently it is an official Pieter Beater\u2122. An official force to be reckoned with.",
    },
    zvdd92: {
      original:
        "This deck proves Magic is no longer safe from extended universe nonsense: sometimes you just get beaten down by a Turtle with plot armor.",
      value:
        "This deck proves Magic is no longer safe from extended universe nonsense: sometimes you just get beaten to death by a Turtle with plot armor.",
    },
    "1pb5f9b": {
      original: "This deck gains life like it is holy, then removes your board like it is personal.",
      value: "This deck gains life like it is holy but trust me, its master is hellish.",
    },
    "1r6wxi3": {
      original:
        "This deck spends six turns pretending to be slow and reasonable, then drops Mass Land Denial and Jin-Gitaxias like that is normal pod behavior.",
      value:
        "This deck spends six turns pretending to be slow and reasonable, then drops Mass Land Denial and Jin-Gitaxias because frankly, Bjarne's just a dick.",
    },
    "1ir46qd": {
      original:
        "Sultai morph control deck that plays cards face down for free, constantly draws cards, and forces the table to guess what is hiding under every creature. Raffine may be stronger on paper, but Kadena wins surprisingly often.",
      value:
        "Sultai morph control deck that plays cards face down for free, constantly draws cards, and forces the table to guess what is hiding under every creature. Raffine may be stronger on paper, but Kadena's a real bitch to deal with.",
    },
    "1nzbi7": {
      original:
        "Every sentence here is calculated from the deck scores. The sarcasm is automated; the blame remains personal.",
      value: "Every sentence here is calculated from the deck scores. The data is automated; the blame remains personal.",
    },
    "1oj8fzp": {
      original:
        "There is a recurring belief that Huub forgets his lands at home, because somehow the mana base keeps becoming a character in the story.",
      value: "If he remembered to bring his lands, his decks can surprise you when underestimated.",
    },
    z8p6nv: {
      original:
        "If Lenny says he is just setting up, he is probably already three triggers away from making the table regret patience.",
      value:
        "If Lenny says he is just setting up, he is probably already three triggers away from making the table regret showing up.",
    },
    "1ponyz9": {
      original:
        "Joost loves foils, expensive staples, and general value pieces. The pod's standing joke is that if his deck building ever caught up with his card budget, everyone would be in real danger.",
      value:
        "Joost loves foils, expensive staples, and general value pieces; everything is handpicked. The deck may be shiny enough to blind you before it actually kills you. If his deck building ever caught up with his card budget, everyone would be in real danger.",
    },
    "1jea1oq": {
      original: "The deck may be shiny enough to blind you before it actually kills you.",
      value:
        "Partial to a gamble and barely mulligans for love of the game: he's proof that you only need one opening hand.",
    },
    "1ool01a": {
      original:
        "The result is often smart Magic, frustrating Magic, and occasionally the exact reason the rating system needed more granularity.",
      value:
        "The result is often annoyances all around, he's lucky his friends up the degeneracy themselves instead of kicking him out. They've yet tot tell him its part of a Make-A-Wish campaign.",
    },
  };
  const PRIMARY_PLAYERS = ["Lenny", "Joost", "Huub", "Bjarne"];
  const NIGHT_TAGS = [
    "Close finish",
    "Counterspellfest",
    "Sluggish",
    "Salt spike",
    "Big comeback",
    "Politics",
    "Mana issues",
    "Long turns",
    "Combo scare",
    "Guest win",
  ];
  const GAME_NIGHT_SEED = [
    {
      id: "2026-09-20-two-alternate-wins",
      date: "2026-09-20",
      nightWinner: "",
      games: [
        {
          number: 1,
          winner: "Lenny",
          deck: "Pir and Toothy",
          participants: ["Bjarne", "Joost", "Lenny", "Keanu"],
        },
        {
          number: 2,
          winner: "Bjarne",
          deck: "Muldrotha, the Gravetide",
          participants: ["Bjarne", "Joost", "Lenny", "Keanu"],
        },
        {
          number: 3,
          winner: "Joost",
          deck: "Karlov of the Ghost Council",
          participants: ["Bjarne", "Joost", "Lenny", "Keanu"],
        },
      ],
      description:
        `Keanu sat in for Huub, and Lenny opened on the kind of Pir and Toothy start that deck lies awake fantasizing about: several redundant ways to add extra +1/+1 counters, which meant Toothy was enormous almost immediately and drawing genuinely absurd numbers of cards by turn five. Bjarne was on Archelos, Keanu on Hashaton, Joost on Melek, and none of them got anywhere. When Toothy finally ate removal, Lenny cashed it in for a hand of roughly sixty cards—less a hand than a filing cabinet. Twenty-Toed Toad followed, and against that many held answers nothing was getting through: one removal spell got dodged with a flicker, the next got countered, and the Toad attacked straight into its own alternate win condition. Nobody at this table had ever won a game that way before.

Game two put Lenny on Chainer, Nightmare Adept, Bjarne on Muldrotha, Keanu back on Hearthhull, and Joost on Melek again. Bjarne's graveyard started filling early. The first time he milled until he hit a basic land he found one almost instantly despite running only a handful, a result he took as a personal insult. The second attempt went the other way entirely and dumped most of the library into the yard, which is a lovely thing to do directly in front of a Chainer deck. Lenny tutored Etali, Primal Storm into the graveyard, brought it back, and watched one of its attack triggers turn up Bjarne's own Jin-Gitaxias, Core Augur—cast for free, naturally. Etali came back again. Jin-Gitaxias appeared twice. The board became a parade of enormous reanimated things that mostly used to belong to other people. Joost missed land drops and spectated; Keanu spent the game policing the only two players doing anything.

By the late game Bjarne had most of his deck in the graveyard and finally cast Mortal Combat. It got removed before an upkeep could come around, so a turn or two later he simply cast it again. With something like twenty-five or thirty creature cards in the yard, nobody had a second answer. Two games into the night, two alternate win conditions, neither of which its pilot had ever managed to win with before.

Game three—Lenny on Eshki, Bjarne on Witherbloom, Keanu on Hearthhull, Joost on Karlov—started fast, with Eshki putting about twenty damage into Bjarne early, and then stopped making sense entirely. Army of the Damned produced thirteen Zombies. Enduring Vitality turned all thirteen into mana dorks. From there the battlefield simply expanded: creatures everywhere, and Joost quietly gaining life off every single one that entered until he was somewhere near a hundred with a Karlov in the neighborhood of 200/200. Keanu's board wipe should have ended it. Bjarne had Heroic Intervention; Lenny, sitting on three mana, had one too, and chose to counter Bjarne's rather than protect his own board—knowingly torching his side of the table to make sure the Zombies went with it. Nearly everything died. Keanu kept a 21/21, killed Bjarne at fifteen, and then Joost's 200/200 Karlov swung once and removed Lenny. Heads-up, Joost found Platinum Angel, survived behind it, and ground out the win.

Which was generous of the evening, because Joost's night had otherwise been miserable. After two games of doing very little he finally opened game three on Sol Ring into Signet—the dream—and Bjarne answered on the very next turn with an Ouphe shutting off activated abilities of artifacts. The explosive start was neutered on the spot, and it incidentally hosed Keanu too, Hearthhull being an artifact itself. Joost maintains that getting to play his new shiny Sol Ring was the most important event of the evening. He also won the game, which he has mentioned somewhat less.`,
      participants: ["Bjarne", "Joost", "Lenny", "Keanu"],
      tags: ["Combo scare", "Politics", "Mana issues", "Long turns"],
    },
    {
      id: "2026-09-16-grouphug-that-wasnt",
      date: "2026-09-16",
      nightWinner: "Bjarne",
      games: [
        {
          number: 1,
          winner: "Bjarne",
          deck: "Archelos, Lagoon Mystic",
          participants: ["Bjarne", "Joost", "Huub", "Andreas"],
        },
        {
          number: 2,
          winner: "Keanu",
          deck: "Hearthhull, the Worldseed",
          participants: ["Bjarne", "Joost", "Huub", "Keanu"],
        },
      ],
      description:
        `Two games, two debuts, and one piece of table diplomacy that deserves its own entry in the rules. Bjarne brought out Archelos, Lagoon Mystic for the first time and presented it to the pod as a grouphug deck. It was not a grouphug deck. Nobody checked. Andreas sat down with a partner pair whose names have already left the collective memory, got stuck on three lands, and still managed to look genuinely threatening for a while—three lands' worth of threatening, which turned out to be exactly as much as it sounds. Huub ran Meren and spent the game answering everyone else's board without ever quite getting around to building his own, a strategy with an obvious flaw that only becomes apparent around turn ten. Joost debuted Melek, Reforged Researcher, his new Izzet burn deck, and appears to have left his lands at home; he was out early.

That left Bjarne to win a game he had already fumbled. The cards did not come, a misplay cost him the kill on turn six, and the deck then made him sit through another six turns of grinding everyone else out of value before it would let him have it. When it finally happened it happened with 128 Scute Swarms, which is either a triumph of landfall engineering or a compelling argument for reading the table's deck descriptions more carefully.

Game two was Huub's to lose, and he lost it fast. Chishiro on turn two is the kind of opener that answers the question "who should we kill first" before anyone has to ask it, and the commander damage math got alarming quickly enough that the table simply focused him off the board. Joost's Izzet deck went the same way it had in game one. Keanu took Andreas' seat with a heavily upgraded Hearthhull, the Worldseed precon and quietly assembled the actual problem: land triggers ticking Bjarne's life total down two at a time while Bjarne's rats—genuinely strong, genuinely wide—found a recursive fog waiting for them every single combat. Gray Merchant of Asphodel came down and was not enough. Then the spacecraft finished stationing, took to the air, and hit for twenty. Bjarne did not have it. Keanu finished on three life, which is the closest thing to a moral victory available at the end of a night that ended 1–1.`,
      participants: ["Bjarne", "Joost", "Huub", "Andreas", "Keanu"],
      tags: ["Guest win", "Close finish", "Mana issues", "Long turns"],
    },
    {
      id: "2026-08-19-topdecked-hatred",
      date: "2026-08-19",
      nightWinner: "Lenny",
      games: [
        {
          number: 1,
          winner: "Lenny",
          deck: "Teysa Karlov",
          participants: ["Bjarne", "Joost", "Huub", "Lenny"],
        },
        {
          number: 2,
          winner: "Lenny",
          deck: "Eshki",
          participants: ["Bjarne", "Joost", "Huub", "Lenny"],
        },
        {
          number: 3,
          winner: "Bjarne",
          deck: "Muldrotha, the Gravetide",
          participants: ["Bjarne", "Joost", "Huub", "Lenny"],
        },
        {
          number: 4,
          winner: "Huub",
          deck: "Chishiro, the Shattered Blade",
          participants: ["Bjarne", "Joost", "Huub", "Lenny"],
        },
      ],
      description:
        `Huub brought Meren of Clan Nel Toth back out and Bjarne opened on Lord of Pain, while Lenny's Teysa Karlov and Joost's Ruby, Daring Tracker rounded out the table. The game's defining moment was Huub firing off removal despite what everyone had assumed was a standing bondje—an alliance that turned out to be more of a suggestion. It did not stop Lenny, who took the game anyway.

Game two was a slog: Bjarne's Muldrotha ground away, Joost's Council of Four quietly assembled its engine, and Huub's Dragonlord Dromoka missed more land drops than it made turns. Lenny spent the game loudly wondering who the real threat at the table was, apparently unable to recognize himself in the mirror, while somehow also failing to clock how far ahead Joost's board had gotten. None of that self-awareness gap stopped him from winning again.

Game three was the night's centerpiece. Huub, on Meren again, was the first to go down to Joost's Aetherflux Reservoir—a kill Joost would later second-guess, since he had the shot to finish Lenny with the same trigger and let it pass. Bjarne, on Witherbloom, closed out Lenny instead, of all things, with a squirrel carrying forestwalk. That left a four-turn standoff between Joost and Bjarne, decided only when Joost topdecked Hatred at one life and still could not close it out. Bjarne took the game.

Huub closed the night on Chishiro, the Shattered Blade, Flinging Joost outright for the kill. Bjarne was on Raffine, Scheming Seer, Joost brought Jon Irenicus back to the table, and Lenny ran Toph, Hardheaded Student. Nobody at the table had rated Huub's threat assessment highly going in; Chishiro won anyway.`,
      participants: ["Bjarne", "Joost", "Huub", "Lenny"],
      tags: ["Sluggish", "Close finish", "Combo scare"],
    },
    {
      id: "2026-08-12-meren-debut",
      date: "2026-08-12",
      nightWinner: "Flo",
      games: [
        {
          number: 1,
          winner: "Flo",
          deck: "Escape deck",
          participants: ["Bjarne", "Joost", "Huub", "Flo"],
        },
        {
          number: 2,
          winner: "Flo",
          deck: "Escape deck",
          participants: ["Bjarne", "Joost", "Huub", "Flo"],
        },
        {
          number: 3,
          winner: "Joost",
          deck: "Karlov of the Ghost Council",
          participants: ["Bjarne", "Joost", "Huub", "Flo"],
        },
        {
          number: 4,
          winner: "Huub",
          deck: "Chishiro, the Shattered Blade",
          participants: ["Bjarne", "Joost", "Huub", "Flo"],
        },
      ],
      description:
        `Flo sat in for Lenny, and Huub used the night to debut Meren of Clan Nel Toth—fresh off the sleeve and still working out the experience-counter loop. Bjarne opened on Lord of Pain, Joost brought Council of Four, and Flo ran something nobody could reconstruct the next morning. The recap for this one exists only as a garbled voice memo Joost left himself well after the fact, so take the details with the appropriate grain of salt: as best anyone can tell, Flo took it down.

Second game out, Meren was still shaking off new-deck jitters and, by all accounts, did not do much. Bjarne swapped to Witherbloom, the Balancer and reports mostly staying out of the way. Joost's mono-black pile rounded out the table, and the win—per Joost's own recollection, which he rates as a "complete guess"—went to Flo again.

Huub retired Meren for the night in favor of Chishiro, the Shattered Blade, his Gruul Voltron deck, while Bjarne moved into the Muldrotha / Gyruda graveyard pile. Joost's Karlov of the Ghost Council appears to have closed this one out; the memo could only confirm that something of Bjarne's got removed at some point, and that the win was not Bjarne's.

The night closed with Joost on Hakbal of the Surging Soul, Huub back on Chishiro, Flo running a deck that generated mana off combat damage, and Bjarne on Kadena playing the control seat: an early Tatyova and a hyperactive Goldite Selkie turned every combat into a five-to-eight-card refill, and a suitably "fucking overpowered" Cyclonic Rift finally went off late. None of it was enough. Huub closed the night with a second win, Chishiro's commander damage getting there just ahead of Joost's Merfolk.`,
      participants: ["Bjarne", "Joost", "Huub", "Flo"],
      tags: ["Guest win", "Salt spike", "Sluggish"],
    },
    {
      id: "2026-07-28-no-takesies-backsies",
      date: "2026-07-28",
      nightWinner: "Bjarne",
      games: [
        {
          number: 1,
          winner: "Joost",
          deck: "Karlov of the Ghost Council",
          participants: ["Pieter", "Joost", "Huub", "Bjarne"],
        },
        {
          number: 2,
          winner: "Bjarne",
          deck: "Magus Lucea Kane",
          participants: ["Pieter", "Joost", "Huub", "Bjarne"],
        },
        {
          number: 3,
          winner: "Huub",
          deck: "Chishiro, the Shattered Blade",
          participants: ["Pieter", "Joost", "Huub", "Bjarne"],
        },
        {
          number: 4,
          winner: "Bjarne",
          deck: "Witherbloom, the Balancer",
          participants: ["Pieter", "Joost", "Huub", "Bjarne"],
        },
      ],
      description:
        `With Pieter taking Lenny's seat, the opener largely passed Huub and Bjarne by: Emiel had no real win condition in sight, while a badly shuffled Muldrotha deck never got moving. Pieter and Joost fought it out until Joost closed with commander damage and Aetherflux Reservoir.

Game two belonged to Magus Lucea Kane. Bjarne fetched an unreasonable number of lands on turn five and buried the table in X-spell value, with a timely Aetherflux activation from Huub helping remove a deeply unconvinced Pieter.

Huub answered in game three. Chishiro eventually dealt the final commander damage to Joost, the last player standing. Pieter's staxier deck drew the table's attention early, while Bjarne went from a commanding position to eliminating himself by stealing Joost's Vilis, Broker of Blood while Sheoldred was on the battlefield.

For the finale, the table declared no take-backs—and immediately demonstrated why take-backs exist. Bjarne missed a trigger worth roughly ninety life, Huub cast several spells that did considerably less than advertised, and Joost wrestled with his own triggers. Perhaps because he had insisted on the rules, Pieter was removed first. Bjarne eventually stabilized and won with Witherbloom, with Essence Warden doing heroic work to keep him alive.`,
      participants: ["Pieter", "Joost", "Huub", "Bjarne"],
      tags: ["Mana issues", "Salt spike", "Long turns"],
    },
    {
      id: "2026-07-17-magic-con-amsterdam",
      date: "2026-07-17",
      nightWinner: "Lenny",
      games: [
        {
          number: 1,
          winner: "Lenny",
          deck: "Mendicant Core",
          participants: ["Lenny", "Joost", "Huub", "Bjarne"],
        },
        {
          number: 2,
          winner: "Huub",
          deck: "Chishiro, the Shattered Blade",
          participants: ["Lenny", "Joost", "Huub", "Bjarne", "Stijn"],
        },
        {
          number: 3,
          winner: "Lenny",
          deck: "Anikthea",
          participants: ["Lenny", "Joost", "Huub", "Bjarne"],
        },
        {
          number: 4,
          winner: "Joost",
          deck: "Karlov of the Ghost Council",
          participants: ["Lenny", "Joost", "Huub", "Bjarne"],
        },
      ],
      description:
        `The MagicCon opener was defined by Lenny's explosive Mendicant Core start and an alarming amount of artifact production. The table kneecapped him early, but he rebuilt, let everyone underestimate the recovery, and stole back the win.

Stijn joined for game two and quickly turned an Orzhov deck into a Voltron problem for the whole table. While Joost, Lenny, and Bjarne spent too much time fighting one another, Huub quietly built up Chishiro and eventually overpowered Stijn to take the game.

The third game came late in the evening and ended with Lenny's Anikthea enchantment engine outvaluing the table for his second win of the day.

Joost took the finale with Karlov of the Ghost Council once everyone was already a little drunk and a lot less precise. Lenny, on Teysa, tutored for an answer to a Karlov that was ready to deal lethal commander damage—only for the table to discover, to general annoyance, that the deck apparently did not contain the removal spell he needed.`,
      participants: ["Lenny", "Joost", "Huub", "Bjarne", "Stijn"],
      tags: ["Big comeback", "Politics", "Long turns"],
    },
    {
      id: "2026-06-17-first-game-night",
      date: "2026-06-17",
      nightWinner: "",
      games: [
        { number: 1, winner: "Joost", deck: "Jon Irenicus" },
        { number: 2, winner: "Lenny", deck: "Pir and Toothy" },
        { number: 3, winner: "Lenny", deck: "Anikthea" },
        { number: 4, winner: "Bjarne", deck: "Witherbloom" },
        { number: 5, winner: "Joost", deck: "Sheoldred, the Apocalypse" },
      ],
      description:
        `First game of the night was interesting, Jon Irenicus hit the table for the first time and gave hella presents. This was not in favor of Bjarne, who was out turn 5 for doing too much too quick. Pieter and Lenny were battling for the win, but forgot Joost in the process. The one armed bandit took home the first win of the night.

Second game, Lenny played his reshaped Zimone deck again, now helmed by Toothy, Imaginary Friend and Pir, Imaginative Rascal. The value proved too much in the end. Joost made an awful deal, Pieter gave up a good fight, Bjarne was out on turn 6 again. Jon Irenicus was twice removed this time, as it should, and proceeded to do nothing.

Then Anikthea hit the field the third game. Next to him was a Mendicant Core happening that made copies of artifacts, but the enchantment deck showed how copying really worked. Before we knew it, there were too much 7/7 sagas causing havoc, and yet again everybody had to pack it in. Joost's Karlov was a menace, but no match. Bjarne had a 37/37 mana dork and lands for days, could not make an impact once again, and was a easy target.

Frustrated with how it went, Bjarne was set on making Witherbloom work. The tryharding was rewarding in the worst way; an infinite combo turn 4 took the game. The universe heard his plea to be involved in a longer, tense game and rewarded him with a slightly unsatisfying win. Combo got taken out of the deck as a result, but the win was there. Because the "last game" was over so quick, everyone reshuffeled once more.

Out came Raffine from Bjarne's side in order to outvalue the rest, but drawing cards was not an option with Sheoldred on the table. Pointing his resources towards Shelly, he had little to respond to Pieter and Lenny's beating and was out first again. Unsatisfied, he left. The other three battled it out, and the monoblack value pile took the win.`,
      participants: ["Lenny", "Joost", "Bjarne", "Pieter"],
      tags: ["Politics", "Long turns", "Combo scare"],
    },
  ];
  const PARTNER_COMMANDER_DECKS = [
    {
      deckName: "Toothy & Pir",
      commanders: [
        { name: "Toothy, Imaginary Friend", shortName: "Toothy" },
        { name: "Pir, Imaginative Rascal", shortName: "Pir" },
      ],
    },
  ];
  const ARCHIVED_DECKS = [
    {
      owner: "Joost",
      deckName: "Ardenn & Rograkh",
      commander: "Ardenn, Intrepid Archaeologist // Rograkh, Son of Rohgahh",
      colors: ["W", "R"],
      note:
        "Boros partner Voltron: Ardenn moved the equipment pile around for free while Rograkh carried it into combat. Retired once Joost tore the shell down to build a new Boros equipment deck.",
      tags: ["Voltron", "Equipment", "Partners", "Boros"],
      salt: 5,
    },
    {
      owner: "Joost",
      deckName: "Aragorn, the Uniter",
      commander: "Aragorn, the Uniter",
      colors: ["W", "U", "R", "G"],
      note: "Joost's former four-color Voltron build: budget roots, a respectable clock, and enough equipment to make Aragorn a real threat.",
      tags: ["Voltron", "Equipment", "Combat"],
      salt: 5,
    },
    {
      owner: "Joost",
      deckName: "Ashling Flame Dancer",
      commander: "Ashling, Flame Dancer",
      colors: ["R"],
      note: "A retired mono-red spellslinger list that could turn an ordinary-looking board into a lethal burst once Ashling stayed in play.",
      tags: ["Burn", "Spellslinger", "Burst Damage"],
      salt: 6,
    },
    {
      owner: "Joost",
      deckName: "Meren of Clan Nel Toth",
      commander: "Meren of Clan Nel Toth",
      colors: ["B", "G"],
      note: "An old Golgari recursion deck that steadily converted creatures, sacrifice triggers, and the graveyard into an exhausting value engine.",
      tags: ["Graveyard", "Recursion", "Sacrifice"],
      salt: 7,
    },
    {
      owner: "Joost",
      deckName: "Vilis, Broker of Blood",
      commander: "Vilis, Broker of Blood",
      colors: ["B"],
      note: "Mono-black life-as-a-resource excess. Expensive to deploy, frightening once established, and capable of drawing a deeply unreasonable number of cards.",
      tags: ["Mono-black", "Card Draw", "Life as Resource"],
      salt: 8,
    },
    {
      owner: "Joost",
      deckName: "K'rrik, Son of Yawgmoth",
      commander: "K'rrik, Son of Yawgmoth",
      colors: ["B"],
      note: "A retired mono-black engine that treated life as mana and sensible pacing as optional.",
      tags: ["Mono-black", "Life as Resource", "Combo"],
      salt: 9,
    },
    {
      owner: "Joost",
      deckName: "Animar, Soul of Elements",
      commander: "Animar, Soul of Elements",
      colors: ["U", "R", "G"],
      note: "Temur creature-combo value that made every future creature cheaper and every unanswered turn significantly more dangerous.",
      tags: ["Creatures", "Counters", "Combo"],
      salt: 8,
    },
    {
      owner: "Lenny",
      deckName: "Zimone, Paradox Sculptor",
      commander: "Zimone, Paradox Sculptor",
      colors: ["G", "U"],
      note: "The earlier form of Lenny's Simic counters deck, archived after the strategy moved over to Toothy and Pir.",
      tags: ["Counters", "Card Draw", "Simic"],
      salt: 6,
    },
    {
      owner: "Bjarne",
      deckName: "Greta, Sweettooth Scourge",
      commander: "Greta, Sweettooth Scourge",
      colors: ["B", "G"],
      note: "A Food-and-sacrifice deck that ground out value one snack at a time before leaving the active rotation.",
      tags: ["Food", "Sacrifice", "Golgari"],
      salt: 5,
    },
    {
      owner: "Bjarne",
      deckName: "Grolnok, the Omnivore",
      commander: "Grolnok, the Omnivore",
      colors: ["G", "U"],
      note: "A frog-led self-mill deck that turned exile into a second hand and made bookkeeping part of the win condition.",
      tags: ["Self-mill", "Value", "Simic"],
      salt: 7,
    },
  ];
  const PARTNER_IMAGE_CACHE_KEY = "deckarchive:partner-commander-images:v2";

  let editMode = false;
  let observerQueued = false;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function waitForApp(callback) {
    const app = document.querySelector(".app-shell");
    if (app) {
      callback(app);
      return;
    }
    window.setTimeout(() => waitForApp(callback), 60);
  }

  function loadJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function cardImageFromScryfall(card) {
    return (
      card.image_uris?.normal ||
      card.image_uris?.large ||
      card.card_faces?.[0]?.image_uris?.normal ||
      card.card_faces?.[0]?.image_uris?.large ||
      null
    );
  }

  async function loadCommanderImage(name) {
    const cache = loadJson(PARTNER_IMAGE_CACHE_KEY, {});
    if (Object.prototype.hasOwnProperty.call(cache, name)) return cache[name];
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
      );
      if (!response.ok) throw new Error("Scryfall lookup failed");
      const imageUrl = cardImageFromScryfall(await response.json());
      cache[name] = imageUrl;
      saveJson(PARTNER_IMAGE_CACHE_KEY, cache);
      return imageUrl;
    } catch {
      cache[name] = null;
      saveJson(PARTNER_IMAGE_CACHE_KEY, cache);
      return null;
    }
  }

  function textHash(value) {
    let hash = 5381;
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash * 33) ^ value.charCodeAt(index);
    }
    return (hash >>> 0).toString(36);
  }

  function cleanText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function loadTextEdits() {
    return { ...TEXT_EDIT_SEED, ...loadJson(TEXT_STORE_KEY, {}) };
  }

  function saveTextEdit(element) {
    const key = element.dataset.editKey;
    const original = element.dataset.editOriginal;
    if (!key || !original) return;
    const value = cleanText(element.textContent);
    const edits = loadTextEdits();
    if (!value || value === original) {
      delete edits[key];
    } else {
      edits[key] = { original, value };
    }
    saveJson(TEXT_STORE_KEY, edits);
    setEditStatus("Draft saved");
  }

  function isEditableTextElement(element) {
    if (!element || !element.textContent) return false;
    if (
      element.closest(
        ".tab-nav, .site-edit-controls, .partner-commander-stack, .game-night-form, .game-night-actions, .game-night-delete"
      )
    ) {
      return false;
    }
    if (element.matches("button, input, textarea, select, option, svg, canvas")) return false;
    if (element.classList.contains("mana-dot")) return false;
    if (element.querySelector("svg, input, textarea, select, button, canvas")) return false;
    if (element.children.length > 0 && !element.matches("blockquote")) return false;
    return cleanText(element.textContent).length > 1;
  }

  function scanTextElements() {
    return Array.from(
      document.querySelectorAll(
        ".app-shell h1, .app-shell h2, .app-shell h3, .app-shell h4, .app-shell p, .app-shell blockquote, .app-shell strong, .app-shell small, .app-shell span, .app-shell dt, .app-shell dd"
      )
    ).filter(isEditableTextElement);
  }

  function prepareTextElement(element) {
    if (!element.dataset.editOriginal) {
      const original = cleanText(element.textContent);
      element.dataset.editOriginal = original;
      element.dataset.editKey = textHash(original);
    }
  }

  function applyTextEdits() {
    const edits = loadTextEdits();
    scanTextElements().forEach((element) => {
      prepareTextElement(element);
      const edit = edits[element.dataset.editKey];
      if (edit && document.activeElement !== element && cleanText(element.textContent) !== edit.value) {
        element.textContent = edit.value;
      }
    });
  }

  function enableTextEditing() {
    applyTextEdits();
    scanTextElements().forEach((element) => {
      prepareTextElement(element);
      element.contentEditable = "true";
      element.spellcheck = true;
      element.classList.add("is-editable-text");
      element.setAttribute("aria-label", "Editable text");
    });
  }

  function disableTextEditing() {
    scanTextElements().forEach((element) => {
      element.contentEditable = "false";
      element.classList.remove("is-editable-text");
      element.removeAttribute("aria-label");
    });
  }

  function setEditStatus(text) {
    const status = document.querySelector("[data-edit-status]");
    if (status) status.textContent = text;
  }

  function createEditControls() {
    if (document.querySelector(".site-edit-controls")) return;
    const isLocalPreview =
      location.protocol === "file:" || ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
    const controls = document.createElement("div");
    controls.className = "site-edit-controls";
    controls.innerHTML = [
      '<button type="button" class="site-edit-button" data-edit-toggle>Edit</button>',
      isLocalPreview
        ? '<button type="button" class="site-edit-button quiet" data-save-text-drafts hidden>Save text</button>'
        : "",
      '<button type="button" class="site-edit-button quiet" data-edit-reset hidden>Reset drafts</button>',
      '<span class="site-edit-status" data-edit-status hidden>Draft saved</span>',
    ].join("");
    document.body.appendChild(controls);
  }

  function setEditMode(enabled) {
    editMode = enabled;
    document.body.classList.toggle("site-editing", enabled);
    const toggle = document.querySelector("[data-edit-toggle]");
    const reset = document.querySelector("[data-edit-reset]");
    const saveDrafts = document.querySelector("[data-save-text-drafts]");
    const status = document.querySelector("[data-edit-status]");
    if (toggle) toggle.textContent = enabled ? "Done" : "Edit";
    if (reset) reset.hidden = !enabled;
    if (saveDrafts) saveDrafts.hidden = !enabled;
    if (status) status.hidden = !enabled;
    if (enabled) enableTextEditing();
    else disableTextEditing();
  }

  async function saveTextDraftsToCodex() {
    const raw = window.localStorage.getItem(TEXT_STORE_KEY) || "{}";
    const count = Object.keys(loadJson(TEXT_STORE_KEY, {})).length;
    if (!count) {
      setEditStatus("No text drafts found");
      return;
    }
    try {
      const response = await fetch(DRAFT_CAPTURE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          href: location.href,
          capturedAt: new Date().toISOString(),
          key: TEXT_STORE_KEY,
          raw,
        }),
      });
      if (!response.ok) throw new Error("Save failed");
      setEditStatus(`Saved ${count} text drafts`);
    } catch {
      try {
        await navigator.clipboard.writeText(raw);
        setEditStatus("Copied drafts");
      } catch {
        setEditStatus("Could not save drafts");
      }
    }
  }

  function resetTextDrafts() {
    window.localStorage.removeItem(TEXT_STORE_KEY);
    setEditStatus("Drafts reset");
    window.location.reload();
  }

  function partnerDeckForCard(card) {
    const title = cleanText(card.querySelector("h3")?.textContent || "");
    const commander = cleanText(card.querySelector(".commander-line")?.textContent || "");
    return PARTNER_COMMANDER_DECKS.find(
      (deck) =>
        title === deck.deckName ||
        deck.commanders.every((partner) => commander.includes(partner.name))
    );
  }

  function setPartnerVisualState(card, activeIndex) {
    const figures = Array.from(card.querySelectorAll(".partner-commander-art"));
    if (!figures.length) return;
    const nextIndex = (activeIndex + 1) % figures.length;
    figures.forEach((figure, index) => {
      figure.classList.toggle("is-active", index === activeIndex);
      figure.classList.toggle("is-behind", index !== activeIndex);
      figure.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
    });

    const toggle = card.querySelector("[data-partner-toggle]");
    if (toggle) {
      toggle.dataset.partnerActiveIndex = String(activeIndex);
      toggle.textContent = `Show ${figures[nextIndex].dataset.shortName}`;
      toggle.setAttribute("aria-label", `Show ${figures[nextIndex].dataset.fullName} in front`);
    }
  }

  function togglePartnerCommander(button) {
    const card = button.closest(".deck-card");
    if (!card) return;
    const figures = Array.from(card.querySelectorAll(".partner-commander-art"));
    if (figures.length < 2) return;
    const activeIndex = Number(button.dataset.partnerActiveIndex || "0");
    setPartnerVisualState(card, (activeIndex + 1) % figures.length);
  }

  function renderPartnerCommanderStack(card, deck, imageUrls) {
    const artShell = card.querySelector(".deck-art-shell");
    if (!artShell || artShell.querySelector(".partner-commander-stack")) return;

    const usableImages = imageUrls.filter(Boolean);
    if (usableImages.length < 2) return;

    card.classList.add("partner-commander-card");
    const strategy = card.querySelector(".strategy");
    if (strategy) strategy.classList.add("partner-draw-heavy-text");

    const commanderLine = card.querySelector(".commander-line");
    if (commanderLine && !commanderLine.querySelector(".partner-badge")) {
      const badge = document.createElement("span");
      badge.className = "partner-badge";
      badge.textContent = "Partner";
      commanderLine.appendChild(badge);
    }

    const stack = document.createElement("div");
    stack.className = "partner-commander-stack";
    stack.setAttribute("aria-label", `${deck.deckName} partner commander art`);

    deck.commanders.forEach((commander, index) => {
      const figure = document.createElement("figure");
      figure.className = "partner-commander-art";
      figure.dataset.shortName = commander.shortName;
      figure.dataset.fullName = commander.name;

      const image = document.createElement("img");
      image.src = imageUrls[index];
      image.alt = commander.name;
      image.loading = "lazy";

      const caption = document.createElement("figcaption");
      caption.textContent = commander.shortName;

      figure.append(image, caption);
      stack.appendChild(figure);
    });

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "partner-toggle";
    toggle.dataset.partnerToggle = "true";
    stack.appendChild(toggle);

    artShell.appendChild(stack);
    setPartnerVisualState(card, 0);
  }

  function enhancePartnerCommanders() {
    document.querySelectorAll(".deck-card").forEach((card) => {
      if (card.dataset.partnerEnhanced === "true") return;
      const deck = partnerDeckForCard(card);
      if (!deck) return;

      card.dataset.partnerEnhanced = "true";
      Promise.all(deck.commanders.map((commander) => loadCommanderImage(commander.name))).then(
        (imageUrls) => {
          if (!card.isConnected) return;
          renderPartnerCommanderStack(card, deck, imageUrls);
        }
      );
    });
  }

  function scoreTone(score) {
    if (score >= 8) return "danger";
    if (score >= 5) return "medium";
    return "calm";
  }

  function manaDots(colors, label) {
    const names = { W: "White", U: "Blue", B: "Black", R: "Red", G: "Green" };
    return `<div class="mana-row" aria-label="${escapeHtml(label)} colors">${colors
      .map(
        (color) =>
          `<span class="mana-dot mana-${color}" title="${names[color]}">${color}</span>`
      )
      .join("")}</div>`;
  }

  function scoreGrid(scores) {
    const visibleScores = [
      ["Oppressiveness", scores.oppressiveness],
      ["Win Threat", scores.winThreat],
      ["Interaction", scores.interaction],
      ["Table Panic", scores.tablePanic],
      ["Turn Crimes", scores.turnCrimes],
      ["Politics", scores.politics],
      ["Fun to Face", scores.funToFace],
      ["Pod Lore", scores.podLore],
    ].filter(([, score]) => score !== undefined && score !== null);
    return `<div class="score-grid compact">${visibleScores
      .map(
        ([label, score]) => `
          <div class="score-pip ${scoreTone(score)}" title="${escapeHtml(label)} ${score}/10">
            <span>${escapeHtml(label)}</span>
            <strong>${score}/10</strong>
            <div class="mini-meter" aria-hidden="true"><span style="width:${score * 10}%"></span></div>
          </div>`
      )
      .join("")}</div>`;
  }

  function saltRatingLabel(salt) {
    return salt >= 9
      ? "Kill them first"
      : salt >= 7
        ? "Powerful but manageable"
        : salt >= 5
          ? "Respectable menace"
          : "Mostly fine";
  }

  function customDeckCard(deck, archived) {
    const saltLabel = saltRatingLabel(deck.salt);
    const scores = deck.scores || {
      oppressiveness: Math.max(2, deck.salt - 2),
      winThreat: deck.salt,
      funToFace: Math.max(4, 10 - Math.floor(deck.salt / 3)),
      tablePanic: deck.salt,
      turnCrimes: Math.max(2, Math.floor(deck.salt / 2)),
      podLore: Math.max(3, deck.salt - 1),
    };
    return `
      <article class="deck-card ${archived ? "archived-deck-card" : "custom-active-deck"}"
        data-custom-deck="${escapeHtml(deck.deckName)}"
        data-owner="${escapeHtml(deck.owner)}"
        data-salt="${deck.salt}">
        <div class="deck-art-shell">
          <div class="card-fallback">Loading commander art…</div>
          <div class="salt-medallion ${scoreTone(deck.salt)}"><strong>${deck.salt}/10</strong></div>
          ${archived ? '<span class="archive-ribbon">Archived</span>' : ""}
        </div>
        <div class="deck-card-body">
          <div class="deck-card-title-row">
            <div><p class="eyebrow">${escapeHtml(deck.owner)}</p><h3>${escapeHtml(deck.deckName)}</h3></div>
            ${manaDots(deck.colors, deck.deckName)}
          </div>
          <p class="commander-line">${escapeHtml(deck.commander)}</p>
          <p class="strategy">${escapeHtml(deck.note)}</p>
          ${deck.roast ? `<blockquote>${escapeHtml(deck.roast)}</blockquote>` : ""}
          <div class="tag-row">${deck.tags
            .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
            .join("")}</div>
          <div class="salt-strip ${scoreTone(deck.salt)}">
            <span class="salt-strip-icon" aria-hidden="true">⚠</span>
            <span>Salt Rating</span><strong>${escapeHtml(saltLabel)}</strong>
          </div>
          ${archived ? "" : scoreGrid(scores)}
        </div>
      </article>
    `;
  }

  function hydrateCustomCardImages(root) {
    root.querySelectorAll("[data-custom-deck]").forEach((card) => {
      if (card.dataset.imageLoading === "true") return;
      card.dataset.imageLoading = "true";
      const name = cleanText(card.querySelector(".commander-line")?.textContent || "");
      loadCommanderImage(name).then((imageUrl) => {
        if (!imageUrl || !card.isConnected) return;
        const shell = card.querySelector(".deck-art-shell");
        const fallback = shell?.querySelector(".card-fallback");
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = `${name} card art`;
        image.loading = "lazy";
        if (fallback) fallback.replaceWith(image);
        else shell?.prepend(image);
      });
    });
  }

  function updateScoreCard(card, scores) {
    const grid = card.querySelector(".score-grid");
    if (grid) grid.outerHTML = scoreGrid(scores);
  }

  // The native cards render the bundle's own power level and 6-category grid. Rewrite
  // both from NATIVE_DECK_RATINGS every tick — React re-renders these nodes freely, so
  // this must be idempotent and must not depend on reading the card's current values.
  function applyNativeDeckRating(card, rawTitle) {
    const rating = NATIVE_DECK_RATINGS[resolveNativeDeckTitle(rawTitle)];
    if (!rating) return;
    const tone = scoreTone(rating.salt);
    // Every write below is guarded: this runs on a MutationObserver tick, so writing an
    // unchanged value would retrigger the observer and spin.
    const setTone = (node) => {
      if (node.classList.contains(tone)) return;
      node.classList.remove("danger", "medium", "calm");
      node.classList.add(tone);
    };
    const setText = (node, text) => {
      if (node && node.textContent !== text) node.textContent = text;
    };
    const medallion = card.querySelector(".salt-medallion");
    if (medallion) {
      setTone(medallion);
      setText(medallion.querySelector("strong"), `${rating.salt}/10`);
    }
    const strip = card.querySelector(".salt-strip");
    if (strip) {
      setTone(strip);
      setText(strip.querySelector("strong"), saltRatingLabel(rating.salt));
    }
    if (card.dataset.salt !== String(rating.salt)) card.dataset.salt = String(rating.salt);
    // Check the rendered pip count rather than a marker attribute: React reuses the
    // .score-grid node across re-renders, so a data-flag survives while the children
    // underneath it get reverted to the bundle's own 6-category grid.
    const grid = card.querySelector(".score-grid");
    if (grid && grid.querySelectorAll(".score-pip").length !== 8) {
      updateScoreCard(card, rating.scores);
    }
  }

  // "Salt rating" was renamed to "Power level" — the label lives inside the compiled
  // bundle in a dozen places, so the wording is patched in the DOM instead.
  const POWER_LABEL_REPLACEMENTS = [
    [/Salt Rating/g, "Power Level"],
    [/Salt rating/g, "Power level"],
    [/salt rating/g, "power level"],
    [/Saltiest decks/g, "Highest power decks"],
    [/Average salt by owner/g, "Average power by owner"],
    [/High salt but still weirdly fun/g, "High power but still weirdly fun"],
    [/Fun to face vs salt rating/g, "Fun to face vs power level"],
    [/\bsalt (\d)/g, "power $1"],
    [/Avg salt/g, "Avg power"],
    [/Saltiest/g, "Most powerful"],
  ];

  function renamePowerLevelLabels() {
    const scopes = document.querySelectorAll(
      ".salt-strip span, .sort-row label, .sort-row option, .filter-row label, .stats-dashboard h3, .stats-dashboard h4, .stats-dashboard dt, .analysis-list span, .chart-card h3, .chart-card h4, select option, label"
    );
    scopes.forEach((node) => {
      const original = node.textContent;
      let updated = original;
      POWER_LABEL_REPLACEMENTS.forEach(([pattern, replacement]) => {
        updated = updated.replace(pattern, replacement);
      });
      if (updated !== original) node.textContent = updated;
    });
  }

  // The hero panel counts the bundle's own deck list, so it misses the custom decks and
  // still counts the two retired natives that are hidden from the gallery.
  function visibleActiveDeckCount(nativeTotal) {
    return nativeTotal - HIDDEN_NATIVE_DECKS.length + CUSTOM_ACTIVE_DECKS.length;
  }

  function patchHeroDeckCount() {
    const panel = document.querySelector(".hero-stat-panel");
    if (!panel) return;
    const value = panel.querySelector("strong");
    if (!value) return;
    if (!value.dataset.nativeTotal) value.dataset.nativeTotal = value.textContent;
    const nativeTotal = Number(value.dataset.nativeTotal) || 0;
    if (!nativeTotal) return;
    const corrected = String(visibleActiveDeckCount(nativeTotal));
    if (value.textContent !== corrected) value.textContent = corrected;
  }

  // Every rated deck currently in the active rotation, native and custom alike.
  function allRatedDecks() {
    const natives = Object.keys(NATIVE_DECK_RATINGS)
      .filter((name) => !HIDDEN_NATIVE_DECKS.includes(name))
      .map((name) => ({
        deckName: name,
        owner: NATIVE_DECK_RATINGS[name].owner,
        salt: NATIVE_DECK_RATINGS[name].salt,
        fun: NATIVE_DECK_RATINGS[name].scores.funToFace,
        panic: NATIVE_DECK_RATINGS[name].scores.tablePanic,
        threat: NATIVE_DECK_RATINGS[name].scores.winThreat,
      }));
    const customs = CUSTOM_ACTIVE_DECKS.map((deck) => ({
      deckName: deck.deckName,
      owner: deck.owner,
      salt: deck.salt,
      fun: deck.scores.funToFace,
      panic: deck.scores.tablePanic,
      threat: deck.scores.winThreat,
    }));
    return natives.concat(customs);
  }

  function average(values) {
    if (!values.length) return 0;
    const total = values.reduce((sum, value) => sum + value, 0);
    return Math.round((total / values.length) * 10) / 10;
  }

  function ratingsByOwner() {
    const byOwner = {};
    allRatedDecks().forEach((deck) => {
      if (!byOwner[deck.owner]) byOwner[deck.owner] = [];
      byOwner[deck.owner].push(deck);
    });
    return byOwner;
  }

  // The per-owner summary cards count only the bundle's own decks and use its original
  // power numbers, so they disagree with the cards once the overrides are applied.
  function patchOwnerSummaryCards() {
    const byOwner = ratingsByOwner();
    document.querySelectorAll(".summary-card").forEach((card) => {
      const owner = cleanText(card.querySelector(".eyebrow")?.textContent || "");
      const decks = byOwner[owner];
      if (!decks || !decks.length) return;
      const heading = card.querySelector("h3");
      const headingText = `${decks.length} ${decks.length === 1 ? "deck" : "decks"}`;
      if (heading && heading.textContent !== headingText) heading.textContent = headingText;
      const values = [
        average(decks.map((deck) => deck.salt)),
        average(decks.map((deck) => deck.fun)),
        average(decks.map((deck) => deck.threat)),
      ];
      card.querySelectorAll("dl > div").forEach((row, index) => {
        if (values[index] === undefined) return;
        const value = row.querySelector("dd");
        const text = `${values[index]}/10`;
        if (value && value.textContent !== text) value.textContent = text;
      });
    });
  }

  // Three of the analyst notes are generated sentences quoting the bundle's own numbers.
  // Rewrite them from the override table so they can't contradict the deck cards.
  function patchStatsNarrative() {
    const byOwner = ratingsByOwner();
    const ownerAverages = Object.keys(byOwner)
      .map((owner) => ({ owner, avg: average(byOwner[owner].map((deck) => deck.salt)) }))
      .sort((a, b) => b.avg - a.avg);
    const decks = allRatedDecks().slice().sort((a, b) => b.salt - a.salt || b.panic - a.panic);
    const top = decks[0];
    const weirdlyFun = decks
      .filter((deck) => deck.salt >= 7 && deck.fun >= 6)
      .slice(0, 3)
      .map((deck) => deck.deckName);
    if (!ownerAverages.length || !top) return;
    document.querySelectorAll(".stats-dashboard p, .stats-dashboard li").forEach((node) => {
      const text = node.textContent;
      let updated = null;
      if (/highest average (salt|power) rating/i.test(text)) {
        updated = `${ownerAverages[0].owner}'s decks have the highest average power rating (${ownerAverages[0].avg}/10), which is probably a governance issue.`;
      } else if (/is the (saltiest|most powerful) deck in the archive/i.test(text)) {
        const tagline = text.includes(": ") ? text.slice(text.indexOf(": ") + 2) : "";
        updated = `${top.deckName} is the most powerful deck in the archive at ${top.salt}/10${
          tagline ? `: ${tagline}` : "."
        }`;
      } else if (/can coexist/i.test(text) && weirdlyFun.length === 3) {
        updated = `${weirdlyFun.join(", ")} prove that high power and decent fun can coexist, which is either balance or denial.`;
      }
      if (updated && node.textContent !== updated) node.textContent = updated;
    });
  }

  // The bundle builds its four "analysis list" callouts independently, so a deck that
  // satisfies two of them (Witherbloom, Magus) gets printed twice. Rebuild all four from
  // the override table instead, assigning each deck to exactly one list.
  const ANALYSIS_LIST_SPECS = [
    {
      heading: "Probably kill on sight",
      match: (deck) => deck.salt >= 8.5,
      sort: (a, b) => b.salt - a.salt || b.panic - a.panic,
    },
    {
      heading: "High power, low fun",
      match: (deck) => deck.salt >= 7 && deck.fun <= 5,
      sort: (a, b) => b.salt - a.salt || a.fun - b.fun,
    },
    {
      heading: "High power but still weirdly fun",
      match: (deck) => deck.salt >= 7 && deck.fun >= 6,
      sort: (a, b) => b.salt - a.salt || b.fun - a.fun,
    },
    {
      heading: "Chill-looking but dangerous",
      match: (deck) => deck.fun >= 6 && deck.panic >= 6,
      sort: (a, b) => b.panic - a.panic || b.fun - a.fun,
    },
  ];

  function analysisListHeading(node) {
    const heading = node.querySelector("h4");
    return heading ? cleanText(heading.textContent) : "";
  }

  function rebuildAnalysisLists() {
    const nodes = Array.from(document.querySelectorAll(".analysis-list"));
    if (!nodes.length) return;
    const pool = allRatedDecks();
    const used = new Set();
    ANALYSIS_LIST_SPECS.forEach((spec) => {
      const picks = pool
        .filter((deck) => !used.has(deck.deckName) && spec.match(deck))
        .sort(spec.sort)
        .slice(0, 4);
      picks.forEach((deck) => used.add(deck.deckName));
      const target = nodes.find((node) => {
        const heading = analysisListHeading(node);
        return heading === spec.heading || heading === spec.heading.replace("power", "salt");
      });
      if (!target) return;
      const list = target.querySelector("ul");
      if (!list) return;
      const html = picks
        .map(
          (deck) =>
            `<li><strong>${escapeHtml(deck.deckName)}</strong><span>${escapeHtml(
              `${deck.owner} - power ${deck.salt}/10, fun ${deck.fun}/10, panic ${deck.panic}/10`
            )}</span></li>`
        )
        .join("");
      if (list.innerHTML !== html) list.innerHTML = html;
    });
  }

  // Runs on every observer tick regardless of which tab is open, since the gallery-only
  // work in enhanceActiveDecks bails out when the deck grid isn't mounted.
  function enhanceGlobalChrome() {
    patchHeroDeckCount();
    patchOwnerSummaryCards();
    rebuildAnalysisLists();
    patchStatsNarrative();
    renamePowerLevelLabels();
  }

  const CUSTOM_SCORE_KEY_ALIASES = {
    tablePanicLevel: "tablePanic",
    turnLengthCrimes: "turnCrimes",
  };

  const SCORE_FIELD_LABELS = {
    oppressiveness: "Oppressiveness",
    winThreat: "Win Threat",
    interaction: "Interaction",
    tablePanicLevel: "Table Panic",
    turnLengthCrimes: "Turn Crimes",
    politics: "Politics",
    funToFace: "Fun to Face",
    podLore: "Pod Lore",
  };

  // Native decks live in the compiled React bundle and cannot be edited at source.
  // This table is the hand-maintained override applied over each native card on every
  // gallery tick: the power level (formerly "salt") plus the full 8-category score set.
  // Keys must match the card's <h3> text exactly.
  const NATIVE_DECK_RATINGS = {
    "Emiel the Blessed": { owner: "Huub", salt: 3, scores: { oppressiveness: 3, winThreat: 2, interaction: 4, tablePanic: 2, turnCrimes: 2, politics: 3, funToFace: 8, podLore: 7 } },
    "Dragonlord Dromoka": { owner: "Huub", salt: 4, scores: { oppressiveness: 5, winThreat: 4, interaction: 3, tablePanic: 4, turnCrimes: 2, politics: 2, funToFace: 8, podLore: 3 } },
    "Arcades": { owner: "Bjarne", salt: 4, scores: { oppressiveness: 2, winThreat: 5, interaction: 3, tablePanic: 2, turnCrimes: 2, politics: 4, funToFace: 4, podLore: 3 } },
    "Auntie Ool": { owner: "Lenny", salt: 5, scores: { oppressiveness: 5, winThreat: 4, interaction: 4, tablePanic: 2, turnCrimes: 2, politics: 5, funToFace: 8, podLore: 2 } },
    "Chishiro, the Shattered Blade": { owner: "Huub", salt: 7, scores: { oppressiveness: 2, winThreat: 6, interaction: 2, tablePanic: 6, turnCrimes: 3, politics: 2, funToFace: 8, podLore: 8 } },
    "5 Color Turtles Precon": { owner: "Huub", salt: 5, scores: { oppressiveness: 3, winThreat: 6, interaction: 4, tablePanic: 4, turnCrimes: 7, politics: 3, funToFace: 6, podLore: 6 } },
    "Lord of Pain": { owner: "Bjarne", salt: 6, scores: { oppressiveness: 6, winThreat: 2, interaction: 3, tablePanic: 4, turnCrimes: 2, politics: 3, funToFace: 5, podLore: 6 } },
    "Jon Irenicus": { owner: "Joost", salt: 5, scores: { oppressiveness: 6, winThreat: 2, interaction: 6, tablePanic: 4, turnCrimes: 1, politics: 7, funToFace: 9, podLore: 4 } },
    "Toph": { owner: "Lenny", salt: 5.5, scores: { oppressiveness: 2, winThreat: 6.5, interaction: 4, tablePanic: 6, turnCrimes: 9, politics: 4, funToFace: 2, podLore: 8 } },
    "Council of Four": { owner: "Joost", salt: 6.5, scores: { oppressiveness: 7, winThreat: 5.5, interaction: 6, tablePanic: 6, turnCrimes: 5, politics: 8, funToFace: 4, podLore: 4 } },
    "Marrow-Gnawer": { owner: "Bjarne", salt: 7, scores: { oppressiveness: 3, winThreat: 7, interaction: 2, tablePanic: 6, turnCrimes: 5, politics: 3, funToFace: 7, podLore: 8 } },
    "Eshki, Temur's Roar": { owner: "Lenny", salt: 6, scores: { oppressiveness: 4, winThreat: 6, interaction: 4, tablePanic: 6, turnCrimes: 2, politics: 3, funToFace: 5, podLore: 6 } },
    "Toothy & Pir": { owner: "Lenny", salt: 8, scores: { oppressiveness: 2, winThreat: 7, interaction: 7, tablePanic: 7, turnCrimes: 4, politics: 5, funToFace: 8, podLore: 6 } },
    "Magus Lucea Kane": { owner: "Bjarne", salt: 7, scores: { oppressiveness: 4, winThreat: 9, interaction: 4, tablePanic: 6, turnCrimes: 4, politics: 3, funToFace: 6, podLore: 4 } },
    "Witherbloom, the Balancer": { owner: "Bjarne", salt: 8, scores: { oppressiveness: 3, winThreat: 8, interaction: 6, tablePanic: 8, turnCrimes: 4, politics: 4, funToFace: 6, podLore: 3 } },
    "Joost's Mono-Black Deck": { owner: "Joost", salt: 7.5, scores: { oppressiveness: 6.5, winThreat: 8, interaction: 6, tablePanic: 7.5, turnCrimes: 2, politics: 4, funToFace: 7, podLore: 8 } },
    "Teysa Karlov": { owner: "Lenny", salt: 8, scores: { oppressiveness: 4, winThreat: 9, interaction: 5, tablePanic: 9, turnCrimes: 7, politics: 4, funToFace: 5, podLore: 9 } },
    "Mendicant Core": { owner: "Lenny", salt: 7, scores: { oppressiveness: 4, winThreat: 7, interaction: 4, tablePanic: 6, turnCrimes: 7, politics: 3, funToFace: 5, podLore: 4 } },
    "Karlov of the Ghost Council": { owner: "Joost", salt: 9, scores: { oppressiveness: 9, winThreat: 8, interaction: 6, tablePanic: 8, turnCrimes: 2, politics: 5, funToFace: 5, podLore: 8 } },
    "Muldrotha / Gyruda": { owner: "Bjarne", salt: 8.5, scores: { oppressiveness: 8, winThreat: 8, interaction: 7, tablePanic: 8, turnCrimes: 4, politics: 3, funToFace: 3, podLore: 4 } },
    "Anikthea": { owner: "Lenny", salt: 8.5, scores: { oppressiveness: 4, winThreat: 9, interaction: 5, tablePanic: 8, turnCrimes: 9, politics: 3, funToFace: 5, podLore: 4 } },
    "Raffine, Scheming Seer": { owner: "Bjarne", salt: 8, scores: { oppressiveness: 10, winThreat: 9, interaction: 8, tablePanic: 10, turnCrimes: 9, politics: 4, funToFace: 2, podLore: 6 } },
    "Obeka, Splitter of Seconds": { owner: "Bjarne", salt: 8, scores: { oppressiveness: 7, winThreat: 8, interaction: 6, tablePanic: 10, turnCrimes: 10, politics: 2, funToFace: 2, podLore: 10 } },
    "Kadena, Slinking Sorcerer": { owner: "Bjarne", salt: 9, scores: { oppressiveness: 10, winThreat: 10, interaction: 6, tablePanic: 10, turnCrimes: 8, politics: 3, funToFace: 5, podLore: 10 } },
  };

  // Native cards that must not appear in the active gallery at all (their decks are
  // retired and live in ARCHIVED_DECKS instead). React re-adds these nodes on every
  // render, so they are hidden with .is-archived-source rather than removed.
  const HIDDEN_NATIVE_DECKS = ["Ashling Flame Dancer", "Aragorn, the Uniter"];

  // Some native card titles are themselves rewritten at runtime by TEXT_EDIT_SEED
  // ("Dromoka" -> "Dragonlord Dromoka"), and that rewrite races with React re-renders,
  // so a card's <h3> can read either spelling on any given tick. Resolve both.
  const NATIVE_TITLE_ALIASES = Object.values(TEXT_EDIT_SEED).reduce((aliases, entry) => {
    if (entry && entry.original && entry.value && NATIVE_DECK_RATINGS[entry.value]) {
      aliases[cleanText(entry.original)] = entry.value;
    }
    return aliases;
  }, {});

  function resolveNativeDeckTitle(title) {
    if (NATIVE_DECK_RATINGS[title]) return title;
    return NATIVE_TITLE_ALIASES[title] || title;
  }

  const CUSTOM_ACTIVE_DECKS = [
    {
      owner: "Lenny",
      deckName: "Chainer, Nightmare Adept",
      commander: "Chainer, Nightmare Adept",
      colors: ["B", "R"],
      note:
        "Rakdos graveyard abuse: discard a land, cast a creature straight out of the yard, hand it haste, attack with it. Crucially it does not care whose graveyard is filling up, which makes it a natural predator of anyone self-milling at the same table. Debuted 20 September against a Muldrotha deck that had just put most of its library in the bin, with predictable results.",
      roast:
        "Lenny doesn't need to fill his own graveyard when Bjarne is right there volunteering.",
      tags: ["Graveyard", "Reanimator", "Rakdos", "Haste"],
      salt: 6.5,
      scores: {
        oppressiveness: 7,
        winThreat: 7,
        interaction: 5,
        tablePanic: 7,
        turnCrimes: 6,
        politics: 4,
        funToFace: 5,
        podLore: 7,
      },
    },
    {
      owner: "Bjarne",
      deckName: "Archelos, Lagoon Mystic",
      commander: "Archelos, Lagoon Mystic",
      colors: ["B", "G", "U"],
      note:
        "Sultai landfall value deck that turns extra land drops into an engine and then into an army. Archelos' tapped/untapped symmetry break is the quiet part; the loud part is a board of Scute Swarms that doubles every time a land hits the battlefield. Debuted 16 September and marketed to the pod, with a completely straight face, as a grouphug deck.",
      roast:
        "Bjarne called it grouphug. The pod believed him. The pod then watched 128 Scute Swarms arrive.",
      tags: ["Landfall", "Sultai", "Tokens", "Value"],
      salt: 7,
      scores: {
        oppressiveness: 6,
        winThreat: 8,
        interaction: 4,
        tablePanic: 7,
        turnCrimes: 8,
        politics: 8,
        funToFace: 5,
        podLore: 9,
      },
    },
    {
      owner: "Joost",
      deckName: "Melek, Reforged Researcher",
      commander: "Melek, Reforged Researcher",
      colors: ["U", "R"],
      note:
        "Joost's new Izzet burn shell: cheap spells, copied spells, and a Weird Detective doing forensic work on everyone's life total. High ceiling on paper, currently undermined by a mana base that has twice now failed to produce enough lands to find out what the ceiling actually is.",
      roast:
        "Two games, two early exits. The investigation into where Joost's lands went remains open.",
      tags: ["Izzet", "Burn", "Spellslinger", "Copy"],
      salt: 6,
      scores: {
        oppressiveness: 5,
        winThreat: 6,
        interaction: 7,
        tablePanic: 5,
        turnCrimes: 5,
        politics: 3,
        funToFace: 6,
        podLore: 4,
      },
    },
    {
      owner: "Huub",
      deckName: "Meren of Clan Nel Toth",
      commander: "Meren of Clan Nel Toth",
      colors: ["B", "G"],
      note:
        "Golgari graveyard-value deck built around Meren's experience-counter engine: creatures obligingly die, come back at end step, and repeat the process while the graveyard fills up with things nobody asked to see twice. Debuted 12 August and still finding its legs—the loop is there, but it has not yet strung together a real closing threat.",
      roast:
        "Every creature on Huub's side has died at least once, and most of them are getting used to it.",
      tags: ["Graveyard", "Reanimator", "Golgari", "Value"],
      salt: 6,
      scores: {
        oppressiveness: 4,
        winThreat: 6,
        interaction: 7,
        tablePanic: 5,
        turnCrimes: 3,
        politics: 4,
        funToFace: 8,
        podLore: 2,
      },
    },
    {
      owner: "Joost",
      deckName: "Hakbal of the Surging Soul",
      commander: "Hakbal of the Surging Soul",
      colors: ["G", "U"],
      note:
        "A heavily upgraded Merfolk precon with excellent synergy and a very high ceiling. It is not oppressive, but leaving it alone lets the board become frighteningly large very quickly—and all that explore bookkeeping can make the turns run long.",
      roast:
        "Fun to face right up until every Merfolk explores and Joost begins a small administrative procedure.",
      tags: ["Merfolk", "Counters", "Explore", "Precon Upgrade"],
      salt: 7,
      scores: {
        oppressiveness: 4,
        winThreat: 8,
        interaction: 3,
        tablePanic: 8,
        turnCrimes: 8,
        politics: 4,
        funToFace: 8,
        podLore: 6,
      },
    },
  ];

  function customScoreValue(deck, key) {
    if (!deck.scores) return undefined;
    const aliasedKey = CUSTOM_SCORE_KEY_ALIASES[key] || key;
    return deck.scores[aliasedKey];
  }

  function customDeckMatchesFilters(deck, filters) {
    if (!filters) return true;
    const haystack = [
      deck.deckName,
      deck.commander,
      deck.owner,
      deck.note,
      deck.roast,
      saltRatingLabel(deck.salt),
      ...(deck.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (filters.query && !haystack.includes(filters.query.toLowerCase().trim())) return false;
    if (filters.owner !== "all" && deck.owner !== filters.owner) return false;
    if (filters.tag !== "all" && !(deck.tags || []).includes(filters.tag)) return false;
    if (deck.salt < filters.saltMin || deck.salt > filters.saltMax) return false;
    if (filters.scoreKey !== "any") {
      const value = customScoreValue(deck, filters.scoreKey);
      if (value === undefined || value === null || value < filters.scoreMin || value > filters.scoreMax) {
        return false;
      }
    }
    return true;
  }

  function readGalleryControls() {
    const panel = document.querySelector(".controls-panel");
    if (!panel) return null;
    const selects = Array.from(panel.querySelectorAll("select"));
    const numberInputs = Array.from(panel.querySelectorAll('input[type="number"]'));
    const [ownerSelect, tagSelect, scoreKeySelect] = selects;
    const [saltMinInput, saltMaxInput, scoreMinInput, scoreMaxInput] = numberInputs;
    return {
      query: panel.querySelector('input[type="search"]')?.value || "",
      owner: ownerSelect ? ownerSelect.value : "all",
      tag: tagSelect ? tagSelect.value : "all",
      saltMin: saltMinInput ? Number(saltMinInput.value) : 1,
      saltMax: saltMaxInput ? Number(saltMaxInput.value) : 10,
      scoreKey: scoreKeySelect ? scoreKeySelect.value : "any",
      scoreMin: scoreMinInput ? Number(scoreMinInput.value) : 1,
      scoreMax: scoreMaxInput ? Number(scoreMaxInput.value) : 10,
    };
  }

  function readGallerySort() {
    const select = document.querySelector(".sort-row select");
    return select ? select.value : "saltRating-asc";
  }

  function nativeCardSortValue(card, sortField) {
    if (sortField === "deckName") return cleanText(card.querySelector("h3")?.textContent || "");
    if (sortField === "owner") return cleanText(card.querySelector(".eyebrow")?.textContent || "");
    if (sortField === "commander") return cleanText(card.querySelector(".commander-line")?.textContent || "");
    if (sortField === "saltRating") {
      const value = parseFloat(card.querySelector(".salt-medallion strong")?.textContent || "");
      return Number.isNaN(value) ? null : value;
    }
    const label = SCORE_FIELD_LABELS[sortField];
    if (!label) return null;
    const pip = Array.from(card.querySelectorAll(".score-pip")).find(
      (item) => cleanText(item.querySelector("span")?.textContent || "") === label
    );
    if (!pip) return null;
    const value = parseFloat(pip.querySelector("strong")?.textContent || "");
    return Number.isNaN(value) ? null : value;
  }

  function customDeckSortValue(deck, sortField) {
    if (sortField === "deckName") return deck.deckName;
    if (sortField === "owner") return deck.owner;
    if (sortField === "commander") return deck.commander;
    if (sortField === "saltRating") return deck.salt;
    return customScoreValue(deck, sortField);
  }

  function placeCustomDeckCard(gallery, deck) {
    const filters = readGalleryControls();
    const existing = Array.from(gallery.querySelectorAll("[data-custom-deck]")).find(
      (card) => card.getAttribute("data-custom-deck") === deck.deckName
    );

    if (!customDeckMatchesFilters(deck, filters)) {
      if (existing) existing.remove();
      return;
    }

    const [sortField, direction] = readGallerySort().split("-");
    const nativeCards = Array.from(gallery.querySelectorAll(".deck-card:not([data-custom-deck])"));
    let insertBeforeNode = null;
    const ourValue = customDeckSortValue(deck, sortField);
    if (ourValue !== undefined && ourValue !== null && nativeCards.length) {
      insertBeforeNode =
        nativeCards.find((card) => {
          const nativeValue = nativeCardSortValue(card, sortField);
          if (nativeValue === null || nativeValue === undefined) return false;
          const cmp =
            typeof ourValue === "string" ? ourValue.localeCompare(nativeValue) : ourValue - nativeValue;
          return direction === "desc" ? cmp > 0 : cmp < 0;
        }) || null;
    }

    if (existing) {
      if (insertBeforeNode) {
        if (existing.nextSibling !== insertBeforeNode) gallery.insertBefore(existing, insertBeforeNode);
      } else if (existing !== gallery.lastElementChild) {
        gallery.appendChild(existing);
      }
      return;
    }

    const template = document.createElement("template");
    template.innerHTML = customDeckCard(deck, false).trim();
    const node = template.content.firstElementChild;
    if (!node) return;
    if (insertBeforeNode) gallery.insertBefore(node, insertBeforeNode);
    else gallery.appendChild(node);
  }

  function patchGalleryVisibleCount(gallery) {
    const countParagraph = document.querySelector(".sort-row p");
    const strongs = countParagraph ? countParagraph.querySelectorAll("strong") : [];
    if (strongs.length !== 2) return;
    if (!strongs[1].dataset.nativeTotal) strongs[1].dataset.nativeTotal = strongs[1].textContent;
    const nativeTotal = Number(strongs[1].dataset.nativeTotal) || 0;
    const nativeShown = gallery.querySelectorAll(
      ".deck-card:not([data-custom-deck]):not(.is-archived-source)"
    ).length;
    const customShown = gallery.querySelectorAll("[data-custom-deck]").length;
    strongs[0].textContent = String(nativeShown + customShown);
    strongs[1].textContent = String(visibleActiveDeckCount(nativeTotal));
  }

  function enhanceActiveDecks() {
    const gallery = document.querySelector('[aria-label="Commander deck gallery"]');
    if (!gallery) return;

    gallery.querySelectorAll(".deck-card:not([data-custom-deck])").forEach((card) => {
      const title = resolveNativeDeckTitle(cleanText(card.querySelector("h3")?.textContent || ""));
      if (HIDDEN_NATIVE_DECKS.includes(title)) card.classList.add("is-archived-source");
      applyNativeDeckRating(card, title);
      if (title === "Witherbloom, the Balancer" && card.dataset.commanderArtFixed !== "true") {
        card.dataset.commanderArtFixed = "true";
        const commander = card.querySelector(".commander-line");
        if (commander) commander.textContent = "Witherbloom, the Balancer";
        loadCommanderImage("Witherbloom, the Balancer").then((imageUrl) => {
          const image = card.querySelector(".deck-art-shell > img");
          if (imageUrl && image && card.isConnected) {
            image.src = imageUrl;
            image.alt = "Witherbloom, the Balancer card art";
          }
        });
      }
    });

    CUSTOM_ACTIVE_DECKS.forEach((deck) => placeCustomDeckCard(gallery, deck));
    patchGalleryVisibleCount(gallery);
    hydrateCustomCardImages(gallery);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    if (!value) return "Undated";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function normalizeGameNightEntry(entry) {
    return {
      ...entry,
      id: String(entry.id || `${entry.date || "undated"}-${textHash(JSON.stringify(entry))}`),
      date: String(entry.date || "").trim(),
      nightWinner: String(entry.nightWinner || "").trim(),
      games: Array.isArray(entry.games) ? entry.games : [],
      description: String(entry.description || "").trim(),
      participants: Array.isArray(entry.participants) ? entry.participants.map(String) : [],
      tags: Array.isArray(entry.tags) ? entry.tags.map(String) : [],
    };
  }

  function gameNightSignature(entry) {
    const games = Array.isArray(entry.games)
      ? entry.games
          .map((game) =>
            [
              String(game.number || "").trim(),
              cleanText(String(game.winner || "")),
              cleanText(String(game.deck || game.winningDeck || "")),
            ].join(":")
          )
          .join("|")
      : "";
    return [entry.date || "", games].join("::");
  }

  function loadGameNights() {
    const merged = [];
    const seenIndexes = new Map();
    GAME_NIGHT_SEED.concat(loadJson(GAME_STORE_KEY, []))
      .map(normalizeGameNightEntry)
      .forEach((entry) => {
        const signature = gameNightSignature(entry);
        if (seenIndexes.has(signature)) return;
        seenIndexes.set(signature, merged.length);
        merged.push(entry);
      });
    return merged;
  }

  function saveGameNights(entries) {
    saveJson(GAME_STORE_KEY, entries);
  }

  function tally(values) {
    return values.reduce((counts, value) => {
      if (!value) return counts;
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }

  function topCount(counts) {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!entries.length) return null;
    const topValue = entries[0][1];
    const leaders = entries.filter(([, count]) => count === topValue).map(([name]) => name);
    return [leaders.join(" / "), topValue];
  }

  function entryGames(entry) {
    if (Array.isArray(entry.games) && entry.games.length) {
      return entry.games
        .map((game, index) => ({
          number: game.number || index + 1,
          winner: String(game.winner || "").trim(),
          deck: String(game.deck || game.winningDeck || "").trim(),
          participants: Array.isArray(game.participants) ? game.participants.map(String) : null,
        }))
        .filter((game) => game.winner || game.deck);
    }
    if (entry.winner || entry.winningDeck) {
      return [
        {
          number: 1,
          winner: String(entry.winner || "").trim(),
          deck: String(entry.winningDeck || "").trim(),
        },
      ];
    }
    return [];
  }

  function inferNightWinner(games) {
    const counts = tally(games.map((game) => game.winner));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!sorted.length) return "";
    if (games.length === 1) return sorted[0][0];
    if (sorted[0][1] > 1 && sorted[0][1] > (sorted[1]?.[1] || 0)) return sorted[0][0];
    return "";
  }

  function gamesPlayedBy(entries, name) {
    return entries.reduce(
      (total, entry) =>
        total +
        entryGames(entry).filter((game) =>
          game.participants
            ? game.participants.includes(name)
            : (entry.participants || []).includes(name)
        ).length,
      0
    );
  }

  function nightWinner(entry) {
    return String(entry.nightWinner || "").trim() || inferNightWinner(entryGames(entry));
  }

  function uniqueGuestNames(entries) {
    const names = new Set();
    entries.forEach((entry) => {
      (entry.participants || []).forEach((name) => {
        if (!PRIMARY_PLAYERS.includes(name)) names.add(name);
      });
      entryGames(entry).forEach((game) => {
        if (game.winner && !PRIMARY_PLAYERS.includes(game.winner)) names.add(game.winner);
      });
      const overall = nightWinner(entry);
      if (overall && !PRIMARY_PLAYERS.includes(overall)) names.add(overall);
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }

  function renderNightDescription(description) {
    const paragraphs = String(description || "No table notes yet.")
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    return `<div class="game-night-description">${paragraphs
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("")}</div>`;
  }

  function renderGameStats(entries) {
    const allGames = entries.flatMap(entryGames);
    const gameWinnerCounts = tally(allGames.map((game) => game.winner));
    const nightWinnerCounts = tally(entries.map(nightWinner));
    const deckCounts = tally(allGames.map((game) => game.deck));
    const tagCounts = tally(entries.flatMap((entry) => entry.tags || []));
    const topNightWinner = topCount(nightWinnerCounts);
    const topGameWinner = topCount(gameWinnerCounts);
    const topDeck = topCount(deckCounts);
    const topTag = topCount(tagCounts);
    const guestGameWins = allGames.filter((game) => game.winner && !PRIMARY_PLAYERS.includes(game.winner)).length;
    const statCards = [
      ["Nights logged", entries.length || "0", "Weekly records"],
      ["Games logged", allGames.length || "0", "Individual games"],
      ["Night leader", topNightWinner ? `${topNightWinner[0]} (${topNightWinner[1]})` : "Open table", "Evening wins"],
      ["Game leader", topGameWinner ? `${topGameWinner[0]} (${topGameWinner[1]})` : "No games yet", "Game wins"],
      ["Deck to beat", topDeck ? `${topDeck[0]} (${topDeck[1]})` : "No deck yet", "Winning decks"],
      ["Table weather", topTag ? `${topTag[0]} (${topTag[1]})` : "Uncharted", "Recurring vibe"],
      ["Guest game wins", guestGameWins, "Off-roster victories"],
      ["Counterspellfests", tagCounts.Counterspellfest || 0, "Blue-table warnings"],
    ];

    const playerNames = PRIMARY_PLAYERS.concat(uniqueGuestNames(entries));
    const playerRows = playerNames
      .map((name) => {
        const played = entries.filter((entry) => (entry.participants || []).includes(name)).length;
        const gamesPlayed = gamesPlayedBy(entries, name);
        const gameWins = gameWinnerCounts[name] || 0;
        const nightWins = nightWinnerCounts[name] || 0;
        const rate = gamesPlayed ? `${Math.round((gameWins / gamesPlayed) * 100)}%` : "0%";
        return `<tr><td>${escapeHtml(name)}</td><td>${played}</td><td>${gameWins}</td><td>${nightWins}</td><td>${rate}</td></tr>`;
      })
      .join("");

    const deckRows =
      Object.entries(deckCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([deck, wins]) => {
          const pilots = Array.from(
            new Set(allGames.filter((game) => game.deck === deck).map((game) => game.winner).filter(Boolean))
          ).join(" / ");
          const share = allGames.length ? `${Math.round((wins / allGames.length) * 100)}%` : "0%";
          return `<tr><td>${escapeHtml(deck)}</td><td>${wins}</td><td>${share}</td><td>${escapeHtml(pilots || "Unknown")}</td></tr>`;
        })
        .join("") ||
      '<tr><td colspan="4">No winning decks logged yet.</td></tr>';

    const winShareRows =
      playerNames
        .map((name) => {
          const gamesPlayed = gamesPlayedBy(entries, name);
          const gameWins = gameWinnerCounts[name] || 0;
          const percentage = gamesPlayed ? Math.round((gameWins / gamesPlayed) * 100) : 0;
          return { name, gameWins, percentage };
        })
        .filter((row) => row.gameWins || row.percentage)
        .sort((a, b) => b.gameWins - a.gameWins || b.percentage - a.percentage || a.name.localeCompare(b.name))
        .map(
          (row) => `
            <div class="game-night-win-bar">
              <span>${escapeHtml(row.name)}</span>
              <div><i style="width: ${row.percentage}%"></i></div>
              <strong>${row.gameWins} (${row.percentage}%)</strong>
            </div>
          `
        )
        .join("") || '<p class="game-night-muted">No player win share yet.</p>';

    const tagRows =
      Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([tag, count]) => `<span>${escapeHtml(tag)} <strong>${count}</strong></span>`)
        .join("") || '<span>Awaiting notable events <strong>0</strong></span>';

    return `
      <section class="game-night-stat-grid">
        ${statCards
          .map(
            ([label, value, detail]) => `
              <article class="game-night-stat">
                <p>${escapeHtml(label)}</p>
                <strong>${escapeHtml(value)}</strong>
                <span>${escapeHtml(detail)}</span>
              </article>
            `
          )
          .join("")}
      </section>
      <section class="game-night-two-column">
        <article class="game-night-card">
          <p class="eyebrow">Player tracker</p>
          <h3>Primaries and guests</h3>
          <table class="game-night-table">
            <thead><tr><th>Player</th><th>Nights</th><th>Game wins</th><th>Night wins</th><th>Rate</th></tr></thead>
            <tbody>${playerRows}</tbody>
          </table>
        </article>
        <article class="game-night-card">
          <p class="eyebrow">Noticeable table texture</p>
          <h3>Vibe tags</h3>
          <div class="game-night-tag-cloud">${tagRows}</div>
        </article>
      </section>
      <section class="game-night-two-column">
        <article class="game-night-card">
          <p class="eyebrow">Deck scoreboard</p>
          <h3>Winning deck spread</h3>
          <table class="game-night-table">
            <thead><tr><th>Deck</th><th>Wins</th><th>Share</th><th>Pilot</th></tr></thead>
            <tbody>${deckRows}</tbody>
          </table>
        </article>
        <article class="game-night-card">
          <p class="eyebrow">Game win share</p>
          <h3>Who is actually closing</h3>
          <div class="game-night-win-bars">${winShareRows}</div>
        </article>
      </section>
    `;
  }

  function renderEntryList(entries) {
    if (!entries.length) {
      return `
        <section class="empty-state game-night-empty">
          <h3>No game nights logged yet</h3>
          <p>The first weekly record will appear here after it is added.</p>
        </section>
      `;
    }

    return `
      <section class="game-night-list" aria-label="Logged Magic nights">
        ${entries
          .map((entry) => {
            const games = entryGames(entry);
            const overall = nightWinner(entry);
            const gameRows = games
              .map(
                (game) => `
                  <li>
                    <span>Game ${escapeHtml(game.number)}</span>
                    <strong>${escapeHtml(game.winner || "Unknown winner")}</strong>
                    <em>${escapeHtml(game.deck || "Unknown deck")}</em>
                  </li>
                `
              )
              .join("");
            return `
              <article class="game-night-entry">
                <div>
                  <p class="eyebrow">${escapeHtml(formatDate(entry.date))}</p>
                  <h3>${escapeHtml(overall || "No clear night winner")}</h3>
                  <strong>${games.length} ${games.length === 1 ? "game" : "games"} logged</strong>
                </div>
                ${renderNightDescription(entry.description)}
                <ol class="game-night-games-list">${gameRows}</ol>
                <div class="game-night-meta">
                  <span>Players: ${escapeHtml((entry.participants || []).join(" / ") || "Unlisted")}</span>
                  <span>Tags: ${escapeHtml((entry.tags || []).join(" / ") || "None")}</span>
                </div>
                <button type="button" class="game-night-delete" data-delete-log="${escapeHtml(entry.id)}">Delete</button>
              </article>
            `;
          })
          .join("")}
      </section>
    `;
  }

  function gameResultRow(number) {
    return `
      <div class="game-night-game-row">
        <span>Game ${number}</span>
        <label>Winner
          <input type="text" name="gameWinner" list="game-night-player-names" placeholder="Player name">
        </label>
        <label>Deck
          <input type="text" name="gameDeck" placeholder="Winning deck">
        </label>
      </div>
    `;
  }

  function gameNightForm(entries) {
    const knownGuests = uniqueGuestNames(entries);
    const datalistNames = PRIMARY_PLAYERS.concat(knownGuests)
      .map((name) => `<option value="${escapeHtml(name)}"></option>`)
      .join("");
    const primaryCheckboxes = PRIMARY_PLAYERS.map(
      (name) => `
        <label class="checkbox-row">
          <input type="checkbox" name="player-${escapeHtml(name)}" checked>
          <span>${escapeHtml(name)}</span>
        </label>
      `
    ).join("");
    const tagCheckboxes = NIGHT_TAGS.map(
      (tag) => `
        <label class="checkbox-row compact">
          <input type="checkbox" name="night-tag" value="${escapeHtml(tag)}">
          <span>${escapeHtml(tag)}</span>
        </label>
      `
    ).join("");

    return `
      <section class="game-night-card">
        <form class="game-night-form">
          <div class="game-night-form-grid">
            <label>Date
              <input type="date" name="date" value="${today()}" required>
            </label>
            <label>Night winner
              <input type="text" name="nightWinner" list="game-night-player-names" placeholder="Overall winner, if any">
            </label>
          </div>
          <datalist id="game-night-player-names">${datalistNames}</datalist>
          <label>Night notes
            <textarea name="description" placeholder="Short story of how the night went"></textarea>
          </label>
          <div class="game-night-fieldset">
            <p class="eyebrow">Game results</p>
            <div class="game-night-games">
              ${[1, 2, 3].map(gameResultRow).join("")}
            </div>
            <button type="button" class="icon-button quiet" data-add-game>Add game</button>
          </div>
          <div class="game-night-fieldset">
            <p class="eyebrow">Players present</p>
            <div class="game-night-check-grid">${primaryCheckboxes}</div>
            <label>Guests
              <input type="text" name="guests" placeholder="Guest names, separated by commas">
            </label>
          </div>
          <div class="game-night-fieldset">
            <p class="eyebrow">Notable events</p>
            <div class="game-night-check-grid tags">${tagCheckboxes}</div>
          </div>
          <div class="game-night-actions">
            <button type="submit" class="icon-button">Add night</button>
            <span data-game-night-status></span>
          </div>
        </form>
      </section>
    `;
  }

  function renderGameNightPanel() {
    const container = document.querySelector(".tab-content");
    if (!container) return;
    let panel = document.querySelector(".game-night-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "game-night-panel";
      container.appendChild(panel);
    }
    const entries = loadGameNights().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    panel.innerHTML = `
      <section class="section-heading">
        <p class="eyebrow">Game Night Log</p>
        <h2>Weekly battle records</h2>
        <p>Wins, decks, guests, and table weather for future Magic nights.</p>
      </section>
      ${gameNightForm(entries)}
      ${renderEntryList(entries)}
      ${renderGameStats(entries)}
    `;
    if (editMode) enableTextEditing();
  }

  function showGameNightTab() {
    const nav = document.querySelector(".tab-nav");
    const container = document.querySelector(".tab-content");
    if (!nav || !container) return;
    nav.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
    const button = nav.querySelector("[data-game-night-tab]");
    if (button) button.classList.add("active");
    container.classList.remove("archive-mode");
    container.classList.add("game-night-mode");
    renderGameNightPanel();
  }

  function hideGameNightTab() {
    const container = document.querySelector(".tab-content");
    const button = document.querySelector("[data-game-night-tab]");
    if (button) button.classList.remove("active");
    if (container) container.classList.remove("game-night-mode");
  }

  function renderArchivePanel() {
    const container = document.querySelector(".tab-content");
    if (!container) return;
    let panel = container.querySelector(".archive-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "archive-panel";
      container.appendChild(panel);
    }
    panel.innerHTML = `
      <section class="section-heading">
        <p class="eyebrow">Retired Deck Registry</p>
        <h2>Archived decks</h2>
        <p>Former commanders kept on record after leaving the active rotation.</p>
      </section>
      <section class="archive-summary" aria-label="Archive summary">
        <strong>${ARCHIVED_DECKS.length}</strong>
        <span>retired decks across ${new Set(ARCHIVED_DECKS.map((deck) => deck.owner)).size} players</span>
      </section>
      <section class="deck-grid archive-grid" aria-label="Archived commander deck gallery">
        ${ARCHIVED_DECKS.map((deck) => customDeckCard(deck, true)).join("")}
      </section>
    `;
    hydrateCustomCardImages(panel);
    if (editMode) enableTextEditing();
  }

  function showArchiveTab() {
    const nav = document.querySelector(".tab-nav");
    const container = document.querySelector(".tab-content");
    if (!nav || !container) return;
    nav.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
    const button = nav.querySelector("[data-archive-tab]");
    if (button) button.classList.add("active");
    container.classList.remove("game-night-mode");
    container.classList.add("archive-mode");
    renderArchivePanel();
  }

  function hideArchiveTab() {
    const container = document.querySelector(".tab-content");
    const button = document.querySelector("[data-archive-tab]");
    if (button) button.classList.remove("active");
    if (container) container.classList.remove("archive-mode");
  }

  function ensureGameNightTab() {
    const nav = document.querySelector(".tab-nav");
    if (!nav || nav.querySelector("[data-game-night-tab]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.gameNightTab = "true";
    button.textContent = "Game Night Log";
    const firstButton = nav.querySelector("button");
    if (firstButton && firstButton.nextSibling) {
      nav.insertBefore(button, firstButton.nextSibling);
    } else {
      nav.appendChild(button);
    }
  }

  function ensureArchiveTab() {
    const nav = document.querySelector(".tab-nav");
    if (!nav || nav.querySelector("[data-archive-tab]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.archiveTab = "true";
    button.textContent = "Archived";
    const statisticsButton = Array.from(nav.querySelectorAll("button")).find((item) =>
      cleanText(item.textContent).includes("Statistics")
    );
    if (statisticsButton) nav.insertBefore(button, statisticsButton);
    else nav.appendChild(button);
  }

  function handleGameNightSubmit(event) {
    const form = event.target.closest(".game-night-form");
    if (!form) return;
    event.preventDefault();
    const formData = new FormData(form);
    const date = String(formData.get("date") || "").trim();
    const submittedNightWinner = String(formData.get("nightWinner") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const winners = formData.getAll("gameWinner").map((value) => String(value).trim());
    const decks = formData.getAll("gameDeck").map((value) => String(value).trim());
    const games = winners
      .map((winner, index) => ({
        number: index + 1,
        winner,
        deck: decks[index] || "",
      }))
      .filter((game) => game.winner || game.deck);
    const guests = String(formData.get("guests") || "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    const participants = PRIMARY_PLAYERS.filter((name) => formData.get(`player-${name}`)).concat(guests);
    const tags = formData.getAll("night-tag").map(String);
    const actualNightWinner = submittedNightWinner || inferNightWinner(games);
    games.forEach((game) => {
      if (game.winner && !participants.includes(game.winner)) participants.push(game.winner);
    });
    if (actualNightWinner && !participants.includes(actualNightWinner)) participants.push(actualNightWinner);
    const status = form.querySelector("[data-game-night-status]");
    const incompleteGame = games.some((game) => !game.winner || !game.deck);
    if (!date || !games.length || incompleteGame) {
      if (status) status.textContent = "Date and complete game results are needed.";
      return;
    }
    const entries = loadGameNights();
    entries.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date,
      nightWinner: actualNightWinner,
      games,
      description,
      participants,
      tags,
    });
    saveGameNights(entries);
    renderGameNightPanel();
  }

  function deleteGameNight(id) {
    if (!window.confirm("Delete this local game-night entry?")) return;
    saveGameNights(loadGameNights().filter((entry) => entry.id !== id));
    renderGameNightPanel();
  }

  function addGameRow(form) {
    const list = form.querySelector(".game-night-games");
    if (!list) return;
    const nextNumber = list.querySelectorAll(".game-night-game-row").length + 1;
    list.insertAdjacentHTML("beforeend", gameResultRow(nextNumber));
  }

  function installListeners() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.matches("[data-edit-toggle]")) {
        setEditMode(!editMode);
        return;
      }
      if (target.matches("[data-edit-reset]")) {
        resetTextDrafts();
        return;
      }
      if (target.matches("[data-save-text-drafts]")) {
        saveTextDraftsToCodex();
        return;
      }
      if (target.matches("[data-partner-toggle]")) {
        togglePartnerCommander(target);
        return;
      }
      if (target.matches("[data-game-night-tab]")) {
        showGameNightTab();
        return;
      }
      if (target.matches("[data-archive-tab]")) {
        showArchiveTab();
        return;
      }
      if (target.matches("[data-delete-log]")) {
        deleteGameNight(target.getAttribute("data-delete-log"));
        return;
      }
      if (target.matches("[data-add-game]")) {
        const form = target.closest(".game-night-form");
        if (form) addGameRow(form);
        return;
      }
      if (
        target.closest(".tab-nav button") &&
        !target.closest("[data-game-night-tab]") &&
        !target.closest("[data-archive-tab]")
      ) {
        hideGameNightTab();
        hideArchiveTab();
      }
    });

    document.addEventListener("submit", handleGameNightSubmit);
    document.addEventListener("input", (event) => {
      const target = event.target;
      if (editMode && target instanceof HTMLElement && target.classList.contains("is-editable-text")) {
        saveTextEdit(target);
      }
    });
    document.addEventListener("paste", (event) => {
      const target = event.target;
      if (!editMode || !(target instanceof HTMLElement) || !target.classList.contains("is-editable-text")) return;
      event.preventDefault();
      const text = event.clipboardData ? event.clipboardData.getData("text/plain") : "";
      document.execCommand("insertText", false, text);
    });
  }

  function observeApp(app) {
    const observer = new MutationObserver(() => {
      if (observerQueued) return;
      observerQueued = true;
      window.setTimeout(() => {
        observerQueued = false;
        ensureGameNightTab();
        ensureArchiveTab();
        enhanceActiveDecks();
        enhanceGlobalChrome();
        enhancePartnerCommanders();
        applyTextEdits();
        if (editMode) enableTextEditing();
      }, 40);
    });
    observer.observe(app, { childList: true, subtree: true });
  }

  ready(() => {
    waitForApp((app) => {
      createEditControls();
      ensureGameNightTab();
      ensureArchiveTab();
      enhanceActiveDecks();
      enhanceGlobalChrome();
      enhancePartnerCommanders();
      applyTextEdits();
      installListeners();
      observeApp(app);
    });
  });
})();
