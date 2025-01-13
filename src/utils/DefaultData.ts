const stories = [
  {
    id: 0,
    language: 'german',
    level: 'A1',
    description:
      'Marta, Katzenfreundin, hat viele Katzenbilder und ihre Mieze Miau.  Die kleine graue Katze mit blauen Augen liebt Spiele und Fisch.\n',
    title: 'Marta liebt Katzen\n',
    words: [
      {
        id: 0,
        word: 'Marta',
        known: 0,
      },
      {
        id: 1,
        word: 'liebt',
        known: 0,
      },
      {
        id: 2,
        word: 'Katzen.',
        known: 0,
      },
      {
        id: 4,
        word: 'Sie',
        known: 0,
      },
      {
        id: 5,
        word: 'hat',
        known: 0,
      },
      {
        id: 6,
        word: 'viele',
        known: 0,
      },
      {
        id: 7,
        word: 'Katzenbilder',
        known: 0,
      },
      {
        id: 8,
        word: 'an',
        known: 0,
      },
      {
        id: 9,
        word: 'ihrer',
        known: 0,
      },
      {
        id: 10,
        word: 'Wand.',
        known: 0,
      },
      {
        id: 12,
        word: 'Eine',
        known: 0,
      },
      {
        id: 13,
        word: 'Katze',
        known: 0,
      },
      {
        id: 14,
        word: 'sitzt',
        known: 0,
      },
      {
        id: 15,
        word: 'auf',
        known: 0,
      },
      {
        id: 16,
        word: 'ihrem',
        known: 0,
      },
      {
        id: 17,
        word: 'Schreibtisch.',
        known: 0,
      },
      {
        id: 4,
        word: 'Sie',
        known: 0,
      },
      {
        id: 20,
        word: 'heißt',
        known: 0,
      },
      {
        id: 21,
        word: 'Miau.',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 24,
        word: 'ist',
        known: 0,
      },
      {
        id: 25,
        word: 'eine',
        known: 0,
      },
      {
        id: 26,
        word: 'kleine,',
        known: 0,
      },
      {
        id: 27,
        word: 'graue',
        known: 0,
      },
      {
        id: 28,
        word: 'Katze.',
        known: 0,
      },
      {
        id: 4,
        word: 'Sie',
        known: 0,
      },
      {
        id: 5,
        word: 'hat',
        known: 0,
      },
      {
        id: 32,
        word: 'große',
        known: 0,
      },
      {
        id: 33,
        word: 'blaue',
        known: 0,
      },
      {
        id: 34,
        word: 'Augen.',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 37,
        word: 'mag',
        known: 0,
      },
      {
        id: 38,
        word: 'es,',
        known: 0,
      },
      {
        id: 39,
        word: 'wenn',
        known: 0,
      },
      {
        id: 0,
        word: 'Marta',
        known: 0,
      },
      {
        id: 41,
        word: 'ihr',
        known: 0,
      },
      {
        id: 42,
        word: 'spielt.',
        known: 0,
      },
      {
        id: 4,
        word: 'Sie',
        known: 0,
      },
      {
        id: 45,
        word: 'wirft',
        known: 0,
      },
      {
        id: 46,
        word: 'einen',
        known: 0,
      },
      {
        id: 47,
        word: 'kleinen',
        known: 0,
      },
      {
        id: 48,
        word: 'Ball.',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 51,
        word: 'jagt',
        known: 0,
      },
      {
        id: 52,
        word: 'den',
        known: 0,
      },
      {
        id: 48,
        word: 'Ball.',
        known: 0,
      },
      {
        id: 55,
        word: 'Dann',
        known: 0,
      },
      {
        id: 56,
        word: 'schläft',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 15,
        word: 'auf',
        known: 0,
      },
      {
        id: 59,
        word: 'dem',
        known: 0,
      },
      {
        id: 60,
        word: 'Sofa.',
        known: 0,
      },
      {
        id: 0,
        word: 'Marta',
        known: 0,
      },
      {
        id: 63,
        word: 'gibt',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 65,
        word: 'jeden',
        known: 0,
      },
      {
        id: 66,
        word: 'Tag',
        known: 0,
      },
      {
        id: 67,
        word: 'etwas',
        known: 0,
      },
      {
        id: 68,
        word: 'zu',
        known: 0,
      },
      {
        id: 69,
        word: 'essen.',
        known: 0,
      },
      {
        id: 71,
        word: 'Ein',
        known: 0,
      },
      {
        id: 72,
        word: 'bisschen',
        known: 0,
      },
      {
        id: 73,
        word: 'Fisch.',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 76,
        word: 'isst',
        known: 0,
      },
      {
        id: 77,
        word: 'es',
        known: 0,
      },
      {
        id: 78,
        word: 'gerne.',
        known: 0,
      },
      {
        id: 23,
        word: 'Miau',
        known: 0,
      },
      {
        id: 24,
        word: 'ist',
        known: 0,
      },
      {
        id: 25,
        word: 'eine',
        known: 0,
      },
      {
        id: 83,
        word: 'sehr',
        known: 0,
      },
      {
        id: 84,
        word: 'glückliche',
        known: 0,
      },
      {
        id: 28,
        word: 'Katze.',
        known: 0,
      },
      {
        id: 0,
        word: 'Marta',
        known: 0,
      },
      {
        id: 24,
        word: 'ist',
        known: 0,
      },
      {
        id: 25,
        word: 'eine',
        known: 0,
      },
      {
        id: 83,
        word: 'sehr',
        known: 0,
      },
      {
        id: 84,
        word: 'glückliche',
        known: 0,
      },
      {
        id: 92,
        word: 'Person,',
        known: 0,
      },
      {
        id: 93,
        word: 'weil',
        known: 0,
      },
      {
        id: 94,
        word: 'sie',
        known: 0,
      },
      {
        id: 25,
        word: 'eine',
        known: 0,
      },
      {
        id: 96,
        word: 'so',
        known: 0,
      },
      {
        id: 97,
        word: 'liebenswerte',
        known: 0,
      },
      {
        id: 13,
        word: 'Katze',
        known: 0,
      },
      {
        id: 99,
        word: 'hat.',
        known: 0,
      },
    ],
    wordAmount: 0,
    wordKnownAmount: 0,
  },
  {
    id: 1,
    language: 'english',
    level: 'A1',
    description:
      'Tomasz, a puppy lover, smiles at a cute brown puppy, and they share a happy moment.\n',
    title: 'Tomasz likes puppies\n',
    words: [
      {
        id: 0,
        word: 'Tomasz',
        known: 0,
      },
      {
        id: 1,
        word: 'likes',
        known: 0,
      },
      {
        id: 2,
        word: 'puppies.',
        known: 0,
      },
      {
        id: 4,
        word: 'He',
        known: 0,
      },
      {
        id: 5,
        word: 'loves',
        known: 0,
      },
      {
        id: 6,
        word: 'puppies',
        known: 0,
      },
      {
        id: 7,
        word: 'very',
        known: 0,
      },
      {
        id: 8,
        word: 'much.',
        known: 0,
      },
      {
        id: 4,
        word: 'He',
        known: 0,
      },
      {
        id: 11,
        word: 'sees',
        known: 0,
      },
      {
        id: 12,
        word: 'a',
        known: 0,
      },
      {
        id: 13,
        word: 'puppy.',
        known: 0,
      },
      {
        id: 15,
        word: 'It',
        known: 0,
      },
      {
        id: 16,
        word: 'is',
        known: 0,
      },
      {
        id: 17,
        word: 'small.',
        known: 0,
      },
      {
        id: 15,
        word: 'It',
        known: 0,
      },
      {
        id: 16,
        word: 'is',
        known: 0,
      },
      {
        id: 21,
        word: 'brown.',
        known: 0,
      },
      {
        id: 23,
        word: 'The',
        known: 0,
      },
      {
        id: 24,
        word: 'puppy',
        known: 0,
      },
      {
        id: 16,
        word: 'is',
        known: 0,
      },
      {
        id: 26,
        word: 'cute.',
        known: 0,
      },
      {
        id: 0,
        word: 'Tomasz',
        known: 0,
      },
      {
        id: 29,
        word: 'smiles.',
        known: 0,
      },
      {
        id: 4,
        word: 'He',
        known: 0,
      },
      {
        id: 32,
        word: 'wants',
        known: 0,
      },
      {
        id: 33,
        word: 'to',
        known: 0,
      },
      {
        id: 34,
        word: 'touch',
        known: 0,
      },
      {
        id: 35,
        word: 'the',
        known: 0,
      },
      {
        id: 13,
        word: 'puppy.',
        known: 0,
      },
      {
        id: 4,
        word: 'He',
        known: 0,
      },
      {
        id: 39,
        word: 'says,',
        known: 0,
      },
      {
        id: 40,
        word: '"Puppy!',
        known: 0,
      },
      {
        id: 42,
        word: 'Nice',
        known: 0,
      },
      {
        id: 43,
        word: 'puppy!"',
        known: 0,
      },
      {
        id: 23,
        word: 'The',
        known: 0,
      },
      {
        id: 24,
        word: 'puppy',
        known: 0,
      },
      {
        id: 47,
        word: 'wags',
        known: 0,
      },
      {
        id: 48,
        word: 'its',
        known: 0,
      },
      {
        id: 49,
        word: 'tail.',
        known: 0,
      },
      {
        id: 15,
        word: 'It',
        known: 0,
      },
      {
        id: 52,
        word: 'looks',
        known: 0,
      },
      {
        id: 53,
        word: 'at',
        known: 0,
      },
      {
        id: 54,
        word: 'Tomasz.',
        known: 0,
      },
      {
        id: 0,
        word: 'Tomasz',
        known: 0,
      },
      {
        id: 16,
        word: 'is',
        known: 0,
      },
      {
        id: 58,
        word: 'happy.',
        known: 0,
      },
      {
        id: 23,
        word: 'The',
        known: 0,
      },
      {
        id: 24,
        word: 'puppy',
        known: 0,
      },
      {
        id: 16,
        word: 'is',
        known: 0,
      },
      {
        id: 58,
        word: 'happy.',
        known: 0,
      },
    ],
    wordAmount: 0,
    wordKnownAmount: 0,
  },
];

function GetStories() {
  return stories;
}

export default GetStories;
