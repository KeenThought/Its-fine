/**
 * Curated Scripture oracles mapped to the six first principles (Hebrews 6:1-2).
 */

const FIRST_PRINCIPLES = [
  {
    id: 'repentance',
    name: 'Repentance from Dead Works',
    description: 'Turn from what cannot save you and walk in new life.',
    order: 1,
  },
  {
    id: 'faith',
    name: 'Faith toward God',
    description: 'Trust the living God who hears, guides, and keeps you.',
    order: 2,
  },
  {
    id: 'baptisms',
    name: 'The Doctrine of Baptisms',
    description: 'Die to the old self and rise cleansed into covenant with God.',
    order: 3,
  },
  {
    id: 'laying-on-of-hands',
    name: 'Laying on of Hands',
    description: 'Receive blessing, commissioning, and the Spirit\'s touch through the body of Christ.',
    order: 4,
  },
  {
    id: 'resurrection',
    name: 'Resurrection of the Dead',
    description: 'Hope beyond the grave — Christ risen, and we with Him.',
    order: 5,
  },
  {
    id: 'eternal-judgment',
    name: 'Eternal Judgment',
    description: 'Live today in light of eternity; God is just and merciful.',
    order: 6,
  },
];

const ORACLES = [
  {
    reference: 'Isaiah 41:10',
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    principleId: 'faith',
    reflection: 'The God who speaks is near. You are not carrying this alone.',
  },
  {
    reference: 'Psalm 23:1',
    text: 'The LORD is my shepherd; I shall not want.',
    principleId: 'faith',
    reflection: 'Provision begins with presence. Rest in the Shepherd who leads you.',
  },
  {
    reference: 'Philippians 4:6-7',
    text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    principleId: 'faith',
    reflection: 'Bring what weighs on you to God. His peace guards what anxiety tries to steal.',
  },
  {
    reference: 'Jeremiah 29:11',
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    principleId: 'faith',
    reflection: 'Your future is held in a mind that thinks peace toward you, not harm.',
  },
  {
    reference: 'Acts 3:19',
    text: 'Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord.',
    principleId: 'repentance',
    reflection: 'Turning toward God opens the door to refreshment you cannot manufacture yourself.',
  },
  {
    reference: '1 John 1:9',
    text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    principleId: 'repentance',
    reflection: 'Confession is not condemnation — it is the path to cleansing and freedom.',
  },
  {
    reference: 'Romans 6:4',
    text: 'Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.',
    principleId: 'baptisms',
    reflection: 'What is buried stays buried. You are called to walk in newness today.',
  },
  {
    reference: 'Galatians 3:27',
    text: 'For as many of you as have been baptized into Christ have put on Christ.',
    principleId: 'baptisms',
    reflection: 'You belong to Christ. Let that identity clothe every step you take.',
  },
  {
    reference: 'Numbers 27:18',
    text: 'Take thee Joshua the son of Nun, a man in whom is the spirit, and lay thine hand upon him.',
    principleId: 'laying-on-of-hands',
    reflection: 'God commissions through community. Receive the blessing meant for this season.',
  },
  {
    reference: 'Acts 8:17',
    text: 'Then laid they their hands on them, and they received the Holy Ghost.',
    principleId: 'laying-on-of-hands',
    reflection: 'The Spirit\'s power is given for the journey ahead. You are not empty-handed.',
  },
  {
    reference: '1 Corinthians 15:20',
    text: 'But now is Christ risen from the dead, and become the firstfruits of them that slept.',
    principleId: 'resurrection',
    reflection: 'Death did not have the final word on Christ — and it will not on you.',
  },
  {
    reference: 'John 11:25',
    text: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.',
    principleId: 'resurrection',
    reflection: 'Life is not merely extended — it is restored by the One who is Life itself.',
  },
  {
    reference: 'Hebrews 9:27',
    text: 'And as it is appointed unto men once to die, but after this the judgment.',
    principleId: 'eternal-judgment',
    reflection: 'Live with eternity in view. Today\'s choices echo into forever.',
  },
  {
    reference: '2 Corinthians 5:10',
    text: 'For we must all appear before the judgment seat of Christ; that every one may receive the things done in his body, according to that he hath done, whether it be good or bad.',
    principleId: 'eternal-judgment',
    reflection: 'Walk wisely. What you do in the body matters — and mercy meets the repentant heart.',
  },
  {
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    principleId: 'faith',
    reflection: 'Release the need to figure it all out. Acknowledge Him, and paths open.',
  },
  {
    reference: 'Psalm 46:10',
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    principleId: 'faith',
    reflection: 'Stillness is not weakness. In the pause, God declares who He is.',
  },
  {
    reference: 'Romans 8:28',
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    principleId: 'faith',
    reflection: 'What feels scattered may still be woven. God works even what you cannot see.',
  },
  {
    reference: 'Matthew 11:28',
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    principleId: 'repentance',
    reflection: 'Lay down what you were never meant to carry alone. Rest is an invitation, not a reward.',
  },
  {
    reference: 'Lamentations 3:22-23',
    text: 'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    principleId: 'faith',
    reflection: 'Mercy met you this morning before you earned it. That is the oracle of grace.',
  },
  {
    reference: 'Joshua 1:9',
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    principleId: 'faith',
    reflection: 'Courage is not the absence of fear — it is walking with God through it.',
  },
];

function getPrincipleById(id) {
  return FIRST_PRINCIPLES.find((p) => p.id === id) ?? FIRST_PRINCIPLES[1];
}

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDailyOracle(date = new Date()) {
  const dayIndex = getDayOfYear(date);
  const oracle = ORACLES[dayIndex % ORACLES.length];
  const principle = getPrincipleById(oracle.principleId);
  const principleIndex = (dayIndex % 6);

  return {
    type: 'daily',
    date: date.toISOString().slice(0, 10),
    dayOfYear: dayIndex,
    oracle,
    principle: FIRST_PRINCIPLES[principleIndex],
    firstPrinciples: FIRST_PRINCIPLES,
    journeyDay: (dayIndex % 6) + 1,
    journeyTotal: 6,
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getConsultOracle(question) {
  const normalized = question.trim().toLowerCase();
  const index = hashString(normalized || 'oracle') % ORACLES.length;
  const oracle = ORACLES[index];
  const principle = getPrincipleById(oracle.principleId);

  return {
    type: 'consult',
    question: question.trim(),
    oracle,
    principle,
    closing: 'Go in peace. The word has been spoken.',
  };
}

module.exports = {
  FIRST_PRINCIPLES,
  ORACLES,
  getDailyOracle,
  getConsultOracle,
  getPrincipleById,
};
