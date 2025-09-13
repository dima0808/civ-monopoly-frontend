export const en = {
  nav: {
    rules: 'Rules',
    language: 'Switch Language',
    admin: 'Admin',
    login: 'Login',
  },
  homePage: {
    aboutGame:
      'Introducing "Civ monopoly" — a strategic turn-based game that blends the best elements of Civilization VI with the world of Monopoly! Imagine building your own economic empire, acquiring properties and constructing monopolies while also managing diplomacy and war. In this high-stakes game, members must balance their business ambitions with their military might, as rivals can invade your territories and seize your assets.',
  },
  rulesPage: {
    mainRulesH: 'The basics of the game:',
    mainRulesP1:
      'The game has three interfaces: on the left, members ' +
      'and their characteristics are displayed; in the ' +
      "center, there's the field with all the content; on " +
      'the right, there’s an area where you manage and ' +
      'resolve various matters.',

    mainRulesP2:
      'You can only influence the game during your turn. At ' +
      'the start of your turn, you roll a dice, and an ' +
      'event occurs based on where you land. The turn ' +
      'doesn’t end just with events that are mandatory, ' +
      'such as buying a tile, paying, or skipping. There’s ' +
      'also a management tab where you can make decisions ' +
      'related to diplomacy or your empire, like mortgaging ' +
      'a tile, upgrading a tile, sending an alliance ' +
      'request, or sending a delegation.',

    mainRulesP3:
      'The game has a war mechanic where you need to ' +
      'maintain and grow your army to strengthen your ' +
      'empire. During an attack, it will be harder to win a ' +
      'battle, as there are many modifiers when defending.',

    mainRulesP4:
      'At the beginning of each turn, you also receive ' +
      'gold, and at the end of the turn, depending on the ' +
      'military economy you’ve chosen, a payment will be ' +
      'deducted, which will provide a certain number of ' +
      'troops.',

    mainRulesP5:
      'At the start of each turn, there will be a “roll” ' +
      'button, which rolls two dice. Based on the total ' +
      'number of points rolled, you move that many spaces.',

    mainRulesP6:
      'There are 4 types of victory in the game: military, ' +
      'cultural, scientific, and by points. You need to ' +
      'balance between them to achieve the optimal result.',

    mainRulesP7:
      'There are 5 types of tiles you can land on: a ' +
      'regular one, where the event depends on who owns the ' +
      'tile; barbarian and goody hut, which trigger one of ' +
      'many pre-set positive or negative events; a project ' +
      'tile, where you can choose a project if you have the ' +
      'corresponding district; a black hole that teleports ' +
      'you to a random spot on the map; and a start tile, ' +
      "which doesn't trigger any event but gives you gold " +
      'for completing a lap when you pass through it.',

    mainRulesP8:
      'The game includes choosing a hero, who provides ' +
      'additional content in the form of unique abilities ' +
      'and districts. Leaders add diversity to the gameplay ' +
      'in your sessions.',

    rulesDetailsH: 'Optional details about a game:',

    cell: 'Cell',

    rulesDetailsP1:
      ' To purchase a cell, you need to ' +
      'stand on it, have enough gold, and fulfill any ' +
      'conditions if there are any. If you land on your own ' +
      'cell, no event will occur. If you land on someone ' +
      "else's cell, you'll need to either pay gold or start " +
      "a fight with the leader. Upon landing on an enemy's " +
      'cell, you can choose to fight or attempt to flee ' +
      'with a 50% chance of success.',

    rulesDetailsP2:
      'Cells can have various effects depending on how many ' +
      'upgrades you have. Additionally, cells can be ' +
      'enhanced by the effects of other cells, such as ' +
      'receiving a neighboring bonus, like owning three ' +
      'farms.',

    rulesDetailsP3:
      'You can mortgage cells and their upgrades for half ' +
      'their price. If you mortgage a cell, it will be lost ' +
      'after 5 turns, but you can avoid this by buying it ' +
      'back for 70%. While a cell is mortgaged, it yields ' +
      'no benefits.',

    rulesDetailsP4:
      'Military Camp has a unique payment system for each ' +
      'step. Upon landing on it, the player must pay an ' +
      'amount of gold based on the distance traveled. ' +
      'During war, this changes to the amount of army ' +
      'losses relative to the distance traveled. ' +
      'Additionally, when you land on a military camp, your ' +
      'chance to avoid a battle is reduced to 20% instead ' +
      'of 50%.',

    rulesDetailsP5:
      'To upgrade a cell, you need to meet certain ' +
      'conditions. Typically, this will involve things like ' +
      'waiting for n number of turns, reaching the n-th ' +
      'turn, completing a lap on the map, achieving a ' +
      'certain amount of culture or army, and so on.',

    rulesDetailsP6:
      'There is also a unique district called the ' +
      'Government Plaza, which, in addition to the usual ' +
      'conditions for upgrades, offers a choice of the ' +
      'final building that is specialized for one of the ' +
      'main victory types.',

    war: 'War:',

    rulesDetailsP7:
      ' In general, the primary source of ' +
      'army growth is military spending. You simply choose ' +
      'the policy you want, and at the end of the turn, it ' +
      'deducts gold and grants army strength. This military ' +
      'spending can be boosted by the effects of the ' +
      'military camp and the Alhambra.',

    rulesDetailsP8:
      'When defending, modifiers apply depending on how ' +
      'upgraded the district is, simply providing ' +
      'additional units of strength. After a battle, there ' +
      'will, of course, be losses, depending on how ' +
      'decisively the battle was lost. If the attacker ' +
      'wins, there is an 80% chance that the cell will ' +
      'become neutral (white), and a 20% chance that the ' +
      'attacker will claim it, but the cell will have no ' +
      'buildings inside.',

    rulesDetailsP9:
      'After 5 turns of war, you can make peace, which can ' +
      'be done in the management tab. On their turn, one of ' +
      'the participants in the conflict can propose peace. ' +
      'The offer will be received at the start of the next ' +
      'turn by the other party.',

    union: 'Union:',

    rulesDetailsP10:
      ' On your turn, you can submit an ' +
      'alliance request in the management tab, which will ' +
      'be received by the invited party at the start of ' +
      'their turn. In an alliance, you don’t pay gold to ' +
      "each other when landing on an ally's cell. " +
      'Additionally, you earn extra gold per turn. You can ' +
      'only have one union at a time and you can start ' +
      'forming an union after the 10th turn.',

    goldPerTurn: 'Gold per turn:',

    rulesDetailsP11:
      ' This is the gold you ' +
      'receive at the start of each turn. This value ' +
      'increases depending on how developed your cells are, ' +
      'and additional gold per turn also comes from an ' +
      'alliance. However, this value can even be negative, ' +
      'as it includes expenses, such as for your army or ' +
      'based on the size of your army. You can view ' +
      'detailed income statistics by clicking on the gold ' +
      'per turn icon.',
  },
  authentication: {
    signUp: 'Sign Up',
    signIn: 'Sign in',
    userName: 'User Name',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    alreadyHave: 'Already have an account? Sign In',
    haveNotAccount: "Don't have an account? Sign Up",
  },
  lobby: {
    lobbies: 'Lobbies',
    create: 'Create',
    gameStarted: 'Game started',
    leave: 'leave',
    moveToLobby: 'Move to Lobby',
    dialogCreate: {
      lobbyName: 'Lobby Name:',
      sizeLabel: 'Size (2–6):',
      password: 'Password:',
      create: 'Create',
      join: 'Join',
    },
  },
  admin: {
    serverStatus: 'Server status:',
    id: 'Id',
    nickname: 'Nickname',
    username: 'Username',
    email: 'Email',
    achievements: 'Achv',
    elo: 'Elo',
    matchesPlayed: 'Games',
    matchesWon: 'Wins',
    averagePlacement: 'Average',
    change: 'Change',
    errorOccurred: 'An error occurred',
    modal: {
      deleteAvatar: 'Delete the avatar',
      hisMessages: 'His messages',
      banTime: 'Ban Time',
      banMessage: 'Ban Message',
      banAccount: 'Ban Account',
      deleteAccount: 'Delete Account',
      errorOccurred: 'An error occurred',
      nickname: 'Nickname',
      username: 'Username',
      email: 'E-mail',
      changePassword: 'Change Password',
      elo: 'Elo',
      games: 'Games',
      wins: 'Wins',
      average: 'Average',
      updateProfile: 'Update profile',
      reset: 'Reset',
      close: 'Close',
    },
  },
  errorPages: {
    forbidden: "You don't have permission to access this resource",
    notFound: 'Landing on the wrong page',
  },
  maintenance: {
    tehIssues: "There's might be some technical issues",
    rottedPotatoes: 'Some potatoes have rotted and need to be replaced',
  },
  profile: {
    errorOccurred: 'An error occurred',
    notFoundMessagePrefix: "User with nickname '",
    notFoundMessageSuffix: "' not found",
    privateProfileClass: 'your-profile',
  },
  notification: {
    clearAll: 'Clear All',
  },
  chat: {
    loading: 'Loading...',
    noContacts: 'No contacts',
    findUser: 'Find user',
    noMessages: 'No messages',
    public: 'Public chat',
  },
};
