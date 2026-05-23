// --- MUSIC THEORY DATA & HELPERS ---

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Keys that traditionally use flats
const FLAT_KEYS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb'];

// Mapping Roman numerals to semitone offsets from the tonic (root) and their chord type
const NUMERAL_MAP = {
  // 1s
  'I': { s: 0, t: '' }, 'I+': { s: 0, t: 'aug' }, 'Imaj7': { s: 0, t: 'maj7' }, 'I7': { s: 0, t: '7' },
  'Isus2': { s: 0, t: 'sus2' }, 'Isus4': { s: 0, t: 'sus4' },
  'i': { s: 0, t: 'm' }, 'i7': { s: 0, t: 'm7' }, 'i+': { s: 0, t: 'aug' },

  // 2s
  'bII': { s: 1, t: '' }, 'bIImaj7': { s: 1, t: 'maj7' },
  'ii': { s: 2, t: 'm' }, 'ii7': { s: 2, t: 'm7' }, 'II': { s: 2, t: '' }, 'II7': { s: 2, t: '7' },
  'ii°': { s: 2, t: 'dim' }, 'ii°7': { s: 2, t: 'm7b5' },

  // 3s
  'bIII': { s: 3, t: '' }, 'bIIImaj7': { s: 3, t: 'maj7' }, 'bIII7': { s: 3, t: '7' },
  'iii': { s: 4, t: 'm' }, 'iii7': { s: 4, t: 'm7' }, 'III': { s: 4, t: '' }, 'III7': { s: 4, t: '7' },

  // 4s
  'IV': { s: 5, t: '' }, 'IVmaj7': { s: 5, t: 'maj7' }, 'IV7': { s: 5, t: '7' },
  'iv': { s: 5, t: 'm' }, 'iv7': { s: 5, t: 'm7' },

  // 5s
  'V': { s: 7, t: '' }, 'V7': { s: 7, t: '7' }, 'Vsus4': { s: 7, t: 'sus4' },
  'v': { s: 7, t: 'm' }, 'v7': { s: 7, t: 'm7' },

  // 6s
  'bVI': { s: 8, t: '' }, 'bVImaj7': { s: 8, t: 'maj7' }, 'bvi': { s: 8, t: 'm' },
  'vi': { s: 9, t: 'm' }, 'vi7': { s: 9, t: 'm7' }, 'VI': { s: 9, t: '' }, 'VI7': { s: 9, t: '7' },

  // 7s
  'bVII': { s: 10, t: '' }, 'bVII7': { s: 10, t: '7' }, 'bVIImaj7': { s: 10, t: 'maj7' },
  'vii°': { s: 11, t: 'dim' }, 'vii°7': { s: 11, t: 'dim7' }, 'VII': { s: 11, t: '' }, 'VII7': { s: 11, t: '7' }
};

// Intervals for different chord types (in semitones from chord root)
const CHORD_INTERVALS = {
  '': [0, 4, 7],         // Major
  'm': [0, 3, 7],        // Minor
  'dim': [0, 3, 6],      // Diminished
  'aug': [0, 4, 8],      // Augmented
  '7': [0, 4, 7, 10],    // Dominant 7th
  'm7': [0, 3, 7, 10],   // Minor 7th
  'maj7': [0, 4, 7, 11], // Major 7th
  'dim7': [0, 3, 6, 9],  // Fully Diminished 7th
  'm7b5': [0, 3, 6, 10], // Half Diminished
  'sus2': [0, 2, 7],     // Suspended 2nd
  'sus4': [0, 5, 7],     // Suspended 4th
};

const ALL_TAGS = [
  'Pop', 'Rock', 'Jazz', 'Classical', 'R&B', 'Anime', 'Lo-Fi', 'EDM',
  'Funk', 'Blues', 'Gospel', 'Indie', 'Sad', 'Uplifting', 'Epic',
  'Nostalgic', 'Dramatic', 'Tense', 'Resolving', 'Cinematic', 'Dark'
];

const PROGRESSIONS_DB = [
  // --- PREVIOUSLY ADDED (30-ish) ---
  { id: 27, scale: 'Major', roman: ['I', 'I+', 'IV', 'iv'], name: 'The Line Cliche', tags: ['Sad', 'Tense', 'Cinematic'], desc: 'The root stays the same while the fifth moves up to an augmented fifth, resolving beautifully to the IV and melting into the minor iv.' },
  { id: 28, scale: 'Major', roman: ['I', 'vi', 'bVI', 'bVII', 'I'], name: 'Triumphant Return / Mario', tags: ['Epic', 'Uplifting', 'Resolving'], desc: 'A heroic, rising progression often found in cinematic resolutions, anime, and video game victory themes.' },
  { id: 1, scale: 'Major', roman: ['I', 'V', 'vi', 'IV'], name: 'The Modern Pop Anthem', tags: ['Pop', 'Rock', 'Uplifting'], desc: 'The most ubiquitous progression in modern music. Highly resolving and energetic.' },
  { id: 2, scale: 'Major', roman: ['ii', 'V', 'I', 'I'], name: 'Jazz Standard (2-5-1)', tags: ['Jazz', 'Resolving'], desc: 'The fundamental building block of jazz music, providing a smooth resolution to the tonic.' },
  { id: 35, scale: 'Major', roman: ['Imaj7', 'vi7', 'ii7', 'V7'], name: 'Lush Jazz Turnaround', tags: ['Jazz', 'Smooth', 'Resolving'], desc: 'A rich 1-6-2-5 turnaround using 7th chords, essential for jazz standards and neo-soul.' },
  { id: 3, scale: 'Major', roman: ['vi', 'IV', 'I', 'V'], name: 'Sensitive Pop', tags: ['Pop', 'Sad', 'Modern'], desc: 'A slightly more melancholic rotation of the standard pop progression, starting on the minor 6th.' },
  { id: 4, scale: 'Minor', roman: ['i', 'bVI', 'bIII', 'bVII'], name: 'Epic Minor Pop', tags: ['Epic', 'Dramatic', 'Pop'], desc: 'Common in film scores and dramatic pop (like Adele or Hans Zimmer).' },
  { id: 5, scale: 'Minor', roman: ['i', 'iv', 'v', 'i'], name: 'Minor Blues/Classical', tags: ['Classical', 'Sad', 'Resolving', 'Blues'], desc: 'A standard minor progression providing a strong, traditional resolution back to the tonic.' },
  { id: 6, scale: 'Major', roman: ['I', 'vi', 'IV', 'V'], name: 'The 50s Doo-Wop', tags: ['Nostalgic', 'Pop', 'R&B'], desc: 'A staple of 1950s rock, doo-wop, and classic soul music.' },
  { id: 7, scale: 'Major', roman: ['I', 'IV', 'iv', 'I'], name: 'Minor Plagal Cadence', tags: ['Sad', 'Nostalgic', 'Resolving'], desc: 'Features the emotional and bittersweet shift of a major IV chord melting into a minor iv chord.' },
  { id: 8, scale: 'Minor', roman: ['i', 'bVII', 'bVI', 'V7'], name: 'Andalusian Cadence', tags: ['Dramatic', 'Tense', 'Classical'], desc: 'A descending progression with a strong, tense pull back to the root. Very common in Flamenco.' },
  { id: 10, scale: 'Major', roman: ['I', 'III7', 'IV', 'iv'], name: 'The Creep', tags: ['Sad', 'Nostalgic', 'Tense'], desc: 'Uses a secondary dominant (III7) pulling to the IV, followed by the emotional minor iv.' },
  { id: 40, scale: 'Major', roman: ['I', 'Imaj7', 'I7', 'IV'], name: 'Descending Root ("Something")', tags: ['Rock', 'Nostalgic', 'Smooth'], desc: 'A beautiful descending line cliche within the I chord that naturally pulls towards the IV.' },
  { id: 17, scale: 'Minor', roman: ['i', 'bVI', 'iv', 'V7'], name: 'Harmonic Minor Drop', tags: ['Classical', 'Dramatic', 'Tense'], desc: 'Uses the major V7 chord from the harmonic minor scale for an intense resolution back to the root.' },
  { id: 24, scale: 'Minor', roman: ['i', 'bII', 'i', 'bII'], name: 'Phrygian Tension', tags: ['Tense', 'Dramatic', 'Epic'], desc: 'Utilizes the flat 2nd for an extremely dark, exotic, and tense atmosphere (The "Jaws" theme effect).' },
  { id: 49, scale: 'Minor', roman: ['i', 'i+', 'bVI', 'V'], name: 'The Spy Theme', tags: ['Cinematic', 'Tense', 'Dark'], desc: 'Classic spy/espionage movie tension using an augmented 1st moving into a dark turnaround.' },
  { id: 31, scale: 'Major', roman: ['I', 'bIII', 'bVI', 'bII'], name: 'Neapolitan Cinematic', tags: ['Cinematic', 'Epic', 'Tense'], desc: 'Intense, unexpected modulations using borrowed chords. Sounds huge and otherworldly.' },
  { id: 9, scale: 'Major', roman: ['I', 'bVII', 'IV', 'I'], name: 'Mixolydian Rock Anthem', tags: ['Rock', 'Energetic', 'Nostalgic'], desc: 'Heavily used in classic rock anthems (e.g., Sweet Home Alabama).' },
  { id: 12, scale: 'Major', roman: ['I', 'bIII', 'IV', 'I'], name: 'Rock n Roll Blues', tags: ['Rock', 'Energetic', 'Blues'], desc: 'Borrows the flat 3rd for a bluesy, hard-rock edge.' },
  { id: 15, scale: 'Major', roman: ['I', 'IV', 'V', 'IV'], name: 'Garage Rock Anthem', tags: ['Rock', 'Energetic', 'Nostalgic'], desc: 'The essential three-chord rock progression. Think "Louie Louie" or "Wild Thing".' },
  { id: 23, scale: 'Major', roman: ['ii', 'IV', 'I', 'V'], name: '90s Alt Rock', tags: ['Rock', 'Pop', 'Nostalgic', 'Indie'], desc: 'Starts on the minor 2nd for a wandering, slightly angsty feel. Think "Wonderwall".' },
  { id: 41, scale: 'Minor', roman: ['i', 'bIII', 'iv', 'VI'], name: 'Grunge / Doom Metal', tags: ['Rock', 'Dark', 'Tense'], desc: 'A heavy, angular minor progression that feels massive and brooding.' },
  { id: 11, scale: 'Minor', roman: ['i', 'bVII', 'v', 'bVI'], name: 'Modern R&B Minor', tags: ['R&B', 'Modern', 'Smooth', 'Lo-Fi'], desc: 'A smooth, looping minor progression often found in modern R&B and lo-fi hip hop.' },
  { id: 16, scale: 'Major', roman: ['IV', 'I', 'V', 'vi'], name: 'Modern Country Pop', tags: ['Pop', 'Uplifting'], desc: 'Starts on the subdominant for a feeling of ongoing motion. Very popular in modern country and pop.' },
  { id: 14, scale: 'Major', roman: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'], name: 'Pachelbel\'s Canon', tags: ['Classical', 'Uplifting', 'Sad'], desc: 'A continuously descending progression that feels both tragic and triumphant.' },
  { id: 18, scale: 'Major', roman: ['I', 'bVII', 'bVI', 'bVII'], name: 'The Hero\'s Journey', tags: ['Epic', 'Rock', 'Uplifting'], desc: 'A triumphant, rising and falling progression heavily used in video games and action movies.' },
  { id: 21, scale: 'Major', roman: ['I', 'vi', 'IV', 'iv'], name: 'Hollywood Romance', tags: ['Sad', 'Nostalgic', 'Resolving', 'Cinematic'], desc: 'The major IV melts into the minor iv, creating a classic cinematic "heartbreak" feel.' },
  { id: 26, scale: 'Minor', roman: ['i', 'bIII', 'bVII', 'IV'], name: 'Dorian Groove', tags: ['Rock', 'Pop', 'Funk'], desc: 'Features the major IV chord in a minor context, creating a cool, funky Dorian vibe.' },
  { id: 30, scale: 'Major', roman: ['IV', 'I', 'IV', 'I'], name: 'Plagal Looping (Amen)', tags: ['Gospel', 'Resolving', 'Uplifting'], desc: 'A continuous, gentle rocking motion back and forth from the IV to the I.' },

  // --- BRAND NEW 50 PROGRESSIONS ---
  { id: 50, scale: 'Major', roman: ['IVmaj7', 'V7', 'iii7', 'vi7'], name: 'Anime Royal Road', tags: ['Anime', 'Pop', 'Uplifting', 'Resolving'], desc: 'The single most common progression in Japanese pop and Anime intros. Highly emotional and driving.' },
  { id: 51, scale: 'Major', roman: ['IVmaj7', 'III7', 'vi7', 'I7'], name: 'Just The Two Of Us', tags: ['R&B', 'Jazz', 'Smooth', 'Lo-Fi'], desc: 'An incredibly famous R&B/Smooth Jazz progression featuring a secondary dominant (III7) and a turnaround (I7).' },
  { id: 52, scale: 'Major', roman: ['ii7', 'V7', 'Imaj7', 'VI7'], name: 'Neo-Soul Turnaround', tags: ['R&B', 'Jazz', 'Smooth', 'Lo-Fi'], desc: 'A lush 2-5-1 that kicks back around using a dominant VI7 chord to push back to the ii7.' },
  { id: 53, scale: 'Minor', roman: ['i7', 'iv7', 'v7', 'i7'], name: 'Smooth Minor Blues', tags: ['Blues', 'Jazz', 'Smooth'], desc: 'A traditional minor blues progression smoothed out by using exclusively minor 7th chords.' },
  { id: 54, scale: 'Major', roman: ['I', 'V', 'vi', 'iii'], name: 'The Journey Begins', tags: ['Cinematic', 'Epic', 'Uplifting'], desc: 'The first half of Pachelbel\'s Canon, often looped in film scores to show a character embarking on a journey.' },
  { id: 55, scale: 'Minor', roman: ['i', 'VI', 'III', 'VII'], name: 'Minor Axis of Awesome', tags: ['Pop', 'EDM', 'Epic'], desc: 'The exact same chords as the ubiquitous Pop Anthem, but starting from the relative minor.' },
  { id: 56, scale: 'Major', roman: ['I', 'IV', 'vi', 'V'], name: 'Pop Punk Variant', tags: ['Rock', 'Pop', 'Energetic', 'Indie'], desc: 'A slightly less resolved rotation of the standard pop progression, highly popular in 2000s Pop Punk.' },
  { id: 57, scale: 'Major', roman: ['vi', 'V', 'IV', 'III7'], name: 'Flamenco Descent in Major', tags: ['Dramatic', 'Tense', 'Classical'], desc: 'Walking down the major scale but ending on a tense secondary dominant III7.' },
  { id: 58, scale: 'Minor', roman: ['i', 'bVII', 'IV', 'IV'], name: 'Dorian Rock Vamp', tags: ['Rock', 'Funk', 'Jam'], desc: 'A classic jam band / funk rock progression utilizing the Dorian major IV chord.' },
  { id: 59, scale: 'Major', roman: ['Imaj7', 'bVIImaj7', 'Imaj7', 'bVIImaj7'], name: 'Dreamy Mixolydian', tags: ['Lo-Fi', 'Smooth', 'Jazz'], desc: 'A floating, ambiguous progression sliding between the tonic and the flat 7 major.' },
  { id: 60, scale: 'Minor', roman: ['i', 'bVI', 'bIII', 'VII'], name: 'Modern EDM Build', tags: ['EDM', 'Pop', 'Energetic'], desc: 'A driving, syncopated minor progression heavily used in Festival House and Trance.' },
  { id: 61, scale: 'Major', roman: ['I', 'Isus4', 'I', 'Isus4'], name: 'Acoustic Strummer', tags: ['Indie', 'Folk', 'Nostalgic'], desc: 'A gentle, rocking back-and-forth using suspended chords. Very common in singer-songwriter tracks.' },
  { id: 62, scale: 'Major', roman: ['bVI', 'bVII', 'I', 'I'], name: 'Heroic Resolution', tags: ['Epic', 'Resolving', 'Cinematic', 'Anime'], desc: 'Climbing up the flat 6 and flat 7 to triumphantly land on the major root. Pure victory.' },
  { id: 63, scale: 'Major', roman: ['IV', 'iv', 'I', 'VI7'], name: 'Ragtime Turnaround', tags: ['Jazz', 'Nostalgic', 'Blues'], desc: 'A bouncy, old-school turnaround featuring the minor plagal cadence into a dominant 6th.' },
  { id: 64, scale: 'Minor', roman: ['i', 'ii°7', 'V7', 'i'], name: 'Classical Minor 2-5-1', tags: ['Classical', 'Jazz', 'Resolving'], desc: 'The definitive minor cadence using a half-diminished 2nd chord and a dominant 5th.' },
  { id: 65, scale: 'Major', roman: ['I', 'bIImaj7', 'I', 'bIImaj7'], name: 'Phrygian Dominant Pop', tags: ['Dark', 'Tense', 'Pop'], desc: 'An exotic, modern pop sound shifting between the root and a major flat 2nd.' },
  { id: 66, scale: 'Minor', roman: ['i', 'v', 'bVI', 'III'], name: 'Cinematic Sadness', tags: ['Cinematic', 'Sad', 'Dramatic'], desc: 'A mournful progression that briefly finds hope in the relative major before cycling back.' },
  { id: 67, scale: 'Major', roman: ['I', 'vi', 'ii', 'V'], name: 'Heart-and-Soul Vamp', tags: ['Pop', 'Nostalgic', 'Jazz'], desc: 'The classic piano duet progression. Innocent, bouncy, and endlessly looping.' },
  { id: 68, scale: 'Major', roman: ['Imaj7', 'IVmaj7', 'iii7', 'vi7'], name: 'Soft Jazz Climb', tags: ['Jazz', 'Lo-Fi', 'Smooth'], desc: 'A gentle, strictly diatonic 7th chord progression that sounds like a sunny afternoon.' },
  { id: 69, scale: 'Major', roman: ['I', 'V', 'vi', 'I7'], name: 'Gospel Push', tags: ['Gospel', 'Uplifting', 'R&B'], desc: 'A standard walk up that uses a dominant I7 to heavily push the listener into the IV chord (not played here).' },
  { id: 70, scale: 'Minor', roman: ['i', 'bVII', 'bVI', 'bVII'], name: 'Aeolian Shuttle', tags: ['Rock', 'EDM', 'Energetic'], desc: 'A driving, relentless back-and-forth heavily used in 80s synth-pop and modern rock.' },
  { id: 71, scale: 'Major', roman: ['IV', 'V', 'iii', 'vi'], name: 'Unresolved Pop', tags: ['Pop', 'EDM', 'Tense'], desc: 'Never plays the root chord, creating a feeling of endless forward momentum.' },
  { id: 72, scale: 'Major', roman: ['I', 'bIII', 'IV', 'bVI'], name: 'Super Mario Staircase', tags: ['Epic', 'Nostalgic', 'Rock'], desc: 'Climbing up through borrowed major chords. Sounds like leveling up.' },
  { id: 73, scale: 'Minor', roman: ['i', 'iv', 'i', 'V7'], name: 'Tango Minor', tags: ['Classical', 'Dramatic', 'Tense'], desc: 'A sharp, alternating progression providing deep rhythmic tension and immediate release.' },
  { id: 74, scale: 'Major', roman: ['vi', 'IV', 'I', 'iii'], name: 'Melancholy Dance', tags: ['EDM', 'Pop', 'Sad'], desc: 'A staple of 2010s EDM and Sad-Pop. Emotional but high-energy.' },
  { id: 75, scale: 'Minor', roman: ['i', 'VII', 'v', 'vi'], name: 'Dark Techno', tags: ['EDM', 'Dark', 'Tense'], desc: 'A brooding, minimal progression used heavily in underground techno and cyberpunk scores.' },
  { id: 76, scale: 'Major', roman: ['I', 'ii', 'IV', 'V'], name: 'Upbeat Folk', tags: ['Folk', 'Indie', 'Uplifting'], desc: 'A skipping, happy progression that builds naturally to the dominant turnaround.' },
  { id: 77, scale: 'Minor', roman: ['i', 'bIII', 'v', 'iv'], name: 'Trip-Hop Groove', tags: ['Lo-Fi', 'Dark', 'Modern'], desc: 'A slinky, mysterious minor progression perfect for a slow drum beat.' },
  { id: 78, scale: 'Major', roman: ['I', 'IV', 'I', 'V'], name: 'Classic Country', tags: ['Blues', 'Rock', 'Uplifting'], desc: 'The bedrock of traditional country and folk music.' },
  { id: 79, scale: 'Minor', roman: ['i', 'bVI', 'IV', 'V'], name: 'Minor with Major IV', tags: ['Cinematic', 'Epic', 'Dark'], desc: 'Using the major IV in a minor key creates a heroic but tragic dissonance.' },
  { id: 80, scale: 'Major', roman: ['Imaj7', 'ii7', 'iii7', 'IVmaj7'], name: 'R&B Diatonic Walkup', tags: ['R&B', 'Smooth', 'Jazz'], desc: 'A smooth, parallel walk up the scale using 7th chords.' },
  { id: 81, scale: 'Major', roman: ['I', 'bIII7', 'IV7', 'V7'], name: 'Dirty Blues Climb', tags: ['Blues', 'Rock', 'Energetic'], desc: 'A heavily syncopated, gritty blues climb using dominant 7ths and a borrowed flat 3.' },
  { id: 82, scale: 'Minor', roman: ['i', 'v', 'iv', 'i'], name: 'Minor Lament', tags: ['Sad', 'Classical', 'Dark'], desc: 'A deeply mournful progression descending through the minor diatonic chords.' },
  { id: 83, scale: 'Major', roman: ['I', 'V', 'ii', 'IV'], name: 'Indie Anthem', tags: ['Indie', 'Rock', 'Nostalgic'], desc: 'A wide-open, shimmering progression favored by 2000s indie rock bands.' },
  { id: 84, scale: 'Minor', roman: ['i', 'bVII', 'v', 'i'], name: 'Folk Metal', tags: ['Rock', 'Epic', 'Dark'], desc: 'A driving, modal progression common in Celtic rock and folk metal.' },
  { id: 85, scale: 'Major', roman: ['I', 'vi', 'bIII', 'bVII'], name: 'Space Rock', tags: ['Rock', 'Cinematic', 'Epic'], desc: 'Starts normal, then abruptly jumps into borrowed flats for a cosmic, floating feel.' },
  { id: 86, scale: 'Major', roman: ['Imaj7', 'vi7', 'II7', 'V7'], name: 'Rhythm Changes (A Section)', tags: ['Jazz', 'Energetic', 'Resolving'], desc: 'The A-section of the famous Gershwin "Rhythm Changes", the foundation of Bebop.' },
  { id: 87, scale: 'Minor', roman: ['i', 'bVI', 'i', 'bVI'], name: 'Gothic Horror', tags: ['Dark', 'Cinematic', 'Tense'], desc: 'Oscillating between the minor root and major flat 6th creates an instant Dracula vibe.' },
  { id: 88, scale: 'Major', roman: ['I', 'Vsus4', 'vi', 'IV'], name: 'Modern Worship', tags: ['Gospel', 'Pop', 'Uplifting'], desc: 'Using a suspended V chord softens the tension, creating an ethereal, floating Pop anthem.' },
  { id: 89, scale: 'Minor', roman: ['i7', 'IIImaj7', 'VImaj7', 'ii°7'], name: 'Jazz Noir', tags: ['Jazz', 'Dark', 'Cinematic'], desc: 'A smoky, complex minor progression perfect for a rainy detective movie.' },
  { id: 90, scale: 'Major', roman: ['I', 'IV', 'bVI', 'bVII'], name: 'The Power Ballad', tags: ['Rock', 'Epic', 'Dramatic'], desc: 'Starts like a normal pop song, then violently shifts into borrowed chords for a massive chorus.' },
  { id: 91, scale: 'Minor', roman: ['i', 'v7', 'IV7', 'bVI7'], name: 'Funky Minor Walk', tags: ['Funk', 'R&B', 'Energetic'], desc: 'A very syncopated, James Brown style minor funk progression using dominant chords.' },
  { id: 92, scale: 'Major', roman: ['Imaj7', 'bIImaj7', 'Imaj7', 'bIImaj7'], name: 'Bossa Nova Float', tags: ['Jazz', 'Smooth', 'Lo-Fi'], desc: 'A gentle, swaying progression heavily utilizing the tritone substitution (bIImaj7).' },
  { id: 93, scale: 'Major', roman: ['I', 'ii', 'I', 'IV'], name: 'Southern Gospel', tags: ['Gospel', 'Uplifting', 'Blues'], desc: 'A rocking, soul-clapping progression that heavily leans on the ii and IV chords.' },
  { id: 94, scale: 'Minor', roman: ['i', 'bVII', 'bVI', 'v'], name: 'Phrygian Descent', tags: ['Dark', 'Classical', 'Epic'], desc: 'A heavy, marching descent down the minor scale, commonly used in metal.' },
  { id: 95, scale: 'Major', roman: ['I', 'Imaj7', 'I7', 'IVmaj7'], name: 'Lush Line Cliche', tags: ['Jazz', 'Pop', 'Romantic'], desc: 'A more complex, jazz-oriented version of the descending root line cliche.' },
  { id: 96, scale: 'Minor', roman: ['i', 'iv', 'VII', 'III'], name: 'Russian Romance', tags: ['Classical', 'Dramatic', 'Sad'], desc: 'A deeply emotional progression that travels through the relative major before returning to the minor.' },
  { id: 97, scale: 'Major', roman: ['IV', 'I', 'V', 'I'], name: 'The Hymnal', tags: ['Classical', 'Resolving', 'Uplifting'], desc: 'The standard cadence for hundreds of traditional hymns and chorales.' },
  { id: 98, scale: 'Major', roman: ['I', 'IV', 'ii', 'V7'], name: 'Motown Bounce', tags: ['R&B', 'Pop', 'Nostalgic'], desc: 'A swinging, upbeat progression that defined the sound of 1960s Detroit.' },
  { id: 99, scale: 'Minor', roman: ['i', 'bIII', 'IV', 'vi°'], name: 'Bluesy Diminished Walk', tags: ['Blues', 'Jazz', 'Dark'], desc: 'A gritty minor progression that uses a diminished chord to add intense passing tension.' },

  // --- EXTENDED 8-CHORD PROGRESSIONS ---
  { id: 100, scale: 'Major', roman: ['I', 'IV', 'vii°', 'iii', 'vi', 'ii', 'V', 'I'], name: 'Diatonic Circle of 5ths', tags: ['Classical', 'Resolving', 'Uplifting'], desc: 'Travels flawlessly through every diatonic chord in the key, providing an incredibly satisfying journey back home.' },
  { id: 101, scale: 'Major', roman: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'ii', 'V'], name: 'Pachelbel\'s Full Journey', tags: ['Classical', 'Uplifting', 'Sad', 'Epic'], desc: 'The complete 8-chord sequence of Pachelbel\'s Canon, blending triumph and melancholy.' },
  { id: 102, scale: 'Major', roman: ['Imaj7', 'vi7', 'ii7', 'V7', 'iii7', 'VI7', 'ii7', 'V7'], name: 'Extended Rhythm Changes', tags: ['Jazz', 'Energetic', 'Resolving'], desc: 'A long, winding bebop classic that twists the standard 2-5-1 into a longer 8-bar loop.' },
  { id: 103, scale: 'Major', roman: ['I', 'iii', 'IV', 'iv', 'I', 'VI7', 'II7', 'V7'], name: 'The Grand Ragtime', tags: ['Jazz', 'Nostalgic', 'Blues'], desc: 'A long, bouncy progression starting with a minor plagal cadence and ending with a chain of dominant 7ths.' },
  { id: 104, scale: 'Minor', roman: ['i', 'v', 'bVI', 'bIII', 'iv', 'i', 'ii°7', 'V7'], name: 'Cinematic Tragedy', tags: ['Cinematic', 'Sad', 'Epic', 'Dramatic'], desc: 'A long, sweeping minor progression that feels like the emotional climax of a dramatic film.' },
  { id: 105, scale: 'Major', roman: ['I', 'V', 'bVII', 'IV', 'I', 'V', 'bVII', 'IV'], name: 'Stadium Rock Extended', tags: ['Rock', 'Energetic', 'Epic'], desc: 'An extended mixolydian vamp that feels massive and driving, perfect for a long guitar solo.' },
  { id: 106, scale: 'Minor', roman: ['i', 'V7', 'bVII', 'IV7', 'bVI', 'bIII', 'iv7', 'V7'], name: 'The "California" Descent', tags: ['Rock', 'Sad', 'Nostalgic'], desc: 'An iconic 8-chord descending progression that weaves between minor and major tonalities beautifully.' },
  { id: 107, scale: 'Minor', roman: ['i', 'i+', 'i7', 'VI7', 'iv', 'iv7', 'V7', 'i'], name: 'Espionage Suite', tags: ['Dark', 'Cinematic', 'Tense', 'Jazz'], desc: 'A slinky, chromatic, long-form progression heavily inspired by classic 1960s spy films.' },
  { id: 108, scale: 'Major', roman: ['I', 'vi', 'IV', 'V', 'I', 'vi', 'IV', 'V'], name: 'Endless Summer', tags: ['Pop', 'Nostalgic', 'R&B'], desc: 'The classic 50s doo-wop progression doubled up for a continuous, swaying loop.' },
  { id: 109, scale: 'Major', roman: ['Imaj7', 'IVmaj7', 'iii7', 'vi7', 'ii7', 'V7', 'Imaj7', 'V7'], name: 'Lush R&B Journey', tags: ['R&B', 'Smooth', 'Lo-Fi', 'Jazz'], desc: 'A gorgeous, 8-chord diatonic sequence built entirely of 7th chords for maximum smoothness.' },
  { id: 110, scale: 'Minor', roman: ['i', 'bVII', 'bVI', 'V7', 'i', 'bVII', 'bVI', 'V7'], name: 'Endless Flamenco', tags: ['Classical', 'Tense', 'Dramatic'], desc: 'The intense Andalusian cadence doubled into a continuous, fiery loop.' }
];

// --- AUDIO ENGINE ---
let audioCtx = null;
let activeNodes = []; // Tracks currently playing oscillators and gains so we can stop them immediately

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playChordTone = (freq, startTime, duration, waveformType = 'triangle') => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.type = waveformType;
  osc.frequency.value = freq;

  // Reduce volume for sharper waves (sawtooth/square) to prevent harshness
  const isSharp = waveformType === 'sawtooth' || waveformType === 'square';
  const maxGain = isSharp ? 0.08 : 0.15;
  const sustainGain = isSharp ? 0.05 : 0.1;

  // Envelope to prevent clicking and sound pleasant
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.05); // Attack
  gain.gain.exponentialRampToValueAtTime(sustainGain, startTime + 0.2); // Decay
  gain.gain.setValueAtTime(sustainGain, startTime + duration - 0.1); // Sustain
  gain.gain.linearRampToValueAtTime(0, startTime + duration); // Release

  osc.start(startTime);
  osc.stop(startTime + duration);

  const nodeRef = { osc, gain };
  activeNodes.push(nodeRef);

  // Clean up the array reference after the sound has finished
  setTimeout(() => {
    const idx = activeNodes.indexOf(nodeRef);
    if (idx > -1) {
      activeNodes.splice(idx, 1);
    }
  }, (duration * 1000) + 1000);
};

const stopAllAudio = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  // Instantly fade out and stop all active nodes to prevent overlap/clicking
  activeNodes.forEach(({ osc, gain }) => {
    try {
      gain.gain.cancelScheduledValues(now);

      // Forcefully set a fast exponential decay to 0 to prevent audio clicking
      const currentValue = gain.gain.value;
      gain.gain.setValueAtTime(currentValue, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.stop(now + 0.05);

      // Fully disconnect the nodes shortly after stopping
      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch(e) {}
      }, 100);

    } catch (e) {
      // Ignore nodes that already stopped naturally
    }
  });
  activeNodes = [];
};

// --- HARMONY LOGIC FOR CHAINING ---
const getBaseNumeral = (num) => num.replace(/[^a-zA-Z]/g, '').toUpperCase();

const isCompatible = (lastProg, nextProg) => {
  // Prefer keeping the same scale (Major vs Minor) to avoid jarring modulations
  if (lastProg.scale !== nextProg.scale) return false;

  const lastChord = lastProg.roman[lastProg.roman.length - 1];
  const nextChord = nextProg.roman[0];

  const lastBase = getBaseNumeral(lastChord);
  const nextBase = getBaseNumeral(nextChord);

  // Basic functional harmony flow heuristic
  const flow = {
    'V': ['I', 'VI'],
    'IV': ['I', 'V', 'II', 'VI'],
    'I': ['IV', 'II', 'VI', 'V', 'III'],
    'II': ['V', 'VII'],
    'VI': ['IV', 'II', 'V'],
    'III': ['VI', 'IV'],
    'VII': ['I', 'III']
  };

  const allowedNext = flow[lastBase] || ['I', 'IV', 'V', 'VI'];
  return allowedNext.includes(nextBase);
};

// --- APP STATE ---
let rootKeyIndex = 0; // 0 = C
let keyType = 'Major';
let activeTags = [];
let playingState = { id: null, activeChordIdx: null };
let isDarkMode = false;
let synthSound = 'triangle';
let chain = [];
let playbackTimers = [];

// --- LOGIC FUNCTIONS ---
const getNoteArray = () => {
    const rootNoteSharp = NOTES_SHARP[rootKeyIndex];
    let keyString = rootNoteSharp;
    if (keyType === 'Minor') {
        keyString = keyString.toLowerCase();
    }

    if (FLAT_KEYS.includes(keyString) || ['D#', 'G#', 'A#'].includes(rootNoteSharp)) {
      return NOTES_FLAT;
    }
    return NOTES_SHARP;
};

const getChordDetails = (numeral) => {
    const currentNotes = getNoteArray();
    const mapping = NUMERAL_MAP[numeral];
    if (!mapping) return { name: '?', type: '', notesMidi: [] };

    const chordRootIndex = (rootKeyIndex + mapping.s) % 12;
    const chordRootName = currentNotes[chordRootIndex];

    let displayType = mapping.t;
    if (displayType === 'm') displayType = 'm';
    else if (displayType === 'maj7') displayType = 'maj7';
    else if (displayType === 'm7') displayType = 'm7';
    else if (displayType === 'dim') displayType = '°';
    else if (displayType === 'dim7') displayType = '°7';
    else if (displayType === 'm7b5') displayType = 'm7b5';
    else if (displayType === 'aug') displayType = '+';

    const chordName = `${chordRootName}${displayType}`;

    const baseMidi = 48 + ((rootKeyIndex + mapping.s) % 12);
    const intervals = CHORD_INTERVALS[mapping.t] || CHORD_INTERVALS[''];
    const notesMidi = intervals.map(interval => baseMidi + interval);

    return { name: chordName, type: mapping.t, notesMidi };
};

const stopPlayback = () => {
    playbackTimers.forEach(clearTimeout);
    playbackTimers = [];
    stopAllAudio();
    playingState = { id: null, activeChordIdx: null };
    renderApp();
};

const handlePlay = (progressionId) => {
    const progression = PROGRESSIONS_DB.find(p => p.id === progressionId);
    if (!progression) return;

    initAudio();
    stopPlayback(); // Kills everything immediately

    playingState = { id: progression.id, activeChordIdx: 0 };
    renderApp();

    const CHORD_DURATION = 1.3; // seconds
    const startTime = audioCtx.currentTime + 0.1;

    progression.roman.forEach((numeral, idx) => {
      const details = getChordDetails(numeral);
      const chordStartTime = startTime + (idx * CHORD_DURATION);

      // Schedule audio
      details.notesMidi.forEach(midiNote => {
        const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
        playChordTone(freq, chordStartTime, CHORD_DURATION, synthSound);
      });

      // Schedule UI updates
      const timerId = setTimeout(() => {
        if (playingState.id === progression.id) {
            playingState.activeChordIdx = idx;
            renderApp();
        }
      }, (chordStartTime - audioCtx.currentTime) * 1000);

      playbackTimers.push(timerId);
    });

    // Reset UI when finished
    const endTimerId = setTimeout(() => {
      playingState = { id: null, activeChordIdx: null };
      renderApp();
    }, (progression.roman.length * CHORD_DURATION * 1000) + 100);

    playbackTimers.push(endTimerId);
};

const handlePlayChain = () => {
    if (chain.length === 0) return;
    initAudio();
    stopPlayback();

    playingState = { id: 'chain', activeChordIdx: 0 };
    renderApp();

    const combinedRoman = chain.flatMap(p => p.roman);
    const CHORD_DURATION = 1.3;
    const startTime = audioCtx.currentTime + 0.1;

    combinedRoman.forEach((numeral, idx) => {
      const details = getChordDetails(numeral);
      const chordStartTime = startTime + (idx * CHORD_DURATION);

      details.notesMidi.forEach(midiNote => {
        const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
        playChordTone(freq, chordStartTime, CHORD_DURATION, synthSound);
      });

      const timerId = setTimeout(() => {
        if (playingState.id === 'chain') {
            playingState.activeChordIdx = idx;
            renderApp();
        }
      }, (chordStartTime - audioCtx.currentTime) * 1000);

      playbackTimers.push(timerId);
    });

    const endTimerId = setTimeout(() => {
      playingState = { id: null, activeChordIdx: null };
      renderApp();
    }, (combinedRoman.length * CHORD_DURATION * 1000) + 100);

    playbackTimers.push(endTimerId);
};

const addToChain = (progId) => {
    const progression = PROGRESSIONS_DB.find(p => p.id === progId);
    if(progression) {
        chain.push(progression);
        renderApp();
    }
};

const removeFromChain = (index) => {
    chain = chain.filter((_, i) => i !== index);
    if (playingState.id === 'chain') stopPlayback();
    renderApp();
};

const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
    } else {
        activeTags.push(tag);
    }
    renderApp();
};

const clearTags = () => {
    activeTags = [];
    renderApp();
};

const setRootKey = (idx) => {
    rootKeyIndex = idx;
    stopPlayback();
    renderApp();
};

const setTonality = (type) => {
    keyType = type;
    renderApp();
};

const changeSynthSound = (sound) => {
    synthSound = sound;
    if (playingState.id) stopPlayback();
    renderApp();
};

const clearChain = () => {
    chain = [];
    stopPlayback();
    renderApp();
};

const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    renderApp();
};
// --- RENDERING FUNCTIONS ---

const renderSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const notesToDisplay = (FLAT_KEYS.includes(NOTES_SHARP[rootKeyIndex]) || ['D#', 'G#', 'A#'].includes(NOTES_SHARP[rootKeyIndex])) ? NOTES_FLAT : NOTES_SHARP;

    let html = `
        <!-- Key Selection -->
        <div class="space-y-4 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
            <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Key & Tonality</h3>

            <div class="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button onclick="setTonality('Major')" class="flex-1 py-2 text-sm font-medium rounded-md transition-colors ${keyType === 'Major' ? 'bg-violet-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Major</button>
                <button onclick="setTonality('Minor')" class="flex-1 py-2 text-sm font-medium rounded-md transition-colors ${keyType === 'Minor' ? 'bg-violet-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Minor</button>
            </div>

            <div class="grid grid-cols-4 gap-2">
    `;

    NOTES_SHARP.forEach((note, idx) => {
        const displayNote = (FLAT_KEYS.includes(note) || ['D#', 'G#', 'A#'].includes(note)) ? NOTES_FLAT[idx] : note;
        const activeClass = rootKeyIndex === idx ? 'bg-violet-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white';
        html += `<button onclick="setRootKey(${idx})" class="py-2 rounded-md text-sm font-medium transition-all ${activeClass}">${displayNote}</button>`;
    });

    html += `
            </div>
        </div>

        <!-- Synth Sound Selection -->
        <div class="space-y-4 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
            <div class="flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4 text-slate-500 dark:text-slate-400"></i>
                <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Synth Sound</h3>
            </div>
            <div class="grid grid-cols-2 gap-2">
    `;

    const sounds = [
        { id: 'triangle', label: 'Mellow' },
        { id: 'sawtooth', label: 'Sharp' },
        { id: 'square', label: 'Retro' },
        { id: 'sine', label: 'Pure' }
    ];

    sounds.forEach(snd => {
        const activeClass = synthSound === snd.id ? 'bg-violet-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white';
        html += `<button onclick="changeSynthSound('${snd.id}')" class="py-2 rounded-md text-sm font-medium transition-all ${activeClass}">${snd.label}</button>`;
    });

    html += `
            </div>
        </div>

        <!-- Filter Tags -->
        <div class="space-y-4 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <i data-lucide="filter" class="w-4 h-4 text-slate-500 dark:text-slate-400"></i>
                    <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mood & Genre</h3>
                </div>
                ${activeTags.length > 0 ? `<button onclick="clearTags()" class="text-xs text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 transition-colors">Clear All</button>` : ''}
            </div>
            <div class="flex flex-wrap gap-2">
    `;

    ALL_TAGS.forEach(tag => {
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'bg-violet-100 border-violet-500 text-violet-700 dark:bg-violet-500/20 dark:border-violet-500 dark:text-violet-300 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500';
        html += `
            <button onclick="toggleTag('${tag}')" class="px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${activeClass}">
                ${isActive ? `<i data-lucide="check" class="w-3 h-3"></i>` : ''}
                ${tag}
            </button>
        `;
    });

    html += `
            </div>
        </div>
    `;

    sidebar.innerHTML = html;
};

const renderChain = () => {
    const chainControls = document.getElementById('chain-controls');
    const chainContainer = document.getElementById('chain-container');

    if (chain.length > 0) {
        chainControls.innerHTML = `
            <button onclick="clearChain()" class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Clear All</button>
            <button onclick="${playingState.id === 'chain' ? 'stopPlayback()' : 'handlePlayChain()'}" class="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                ${playingState.id === 'chain' ? '<i data-lucide="square" class="w-4 h-4 fill-current"></i> Stop' : '<i data-lucide="play" class="w-4 h-4 fill-current"></i> Play Chain'}
            </button>
        `;

        let html = '<div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-stretch">';
        chain.forEach((prog, idx) => {
            const priorChords = chain.slice(0, idx).reduce((acc, curr) => acc + curr.roman.length, 0);
            const isThisBlockPlaying = playingState.id === 'chain' &&
                                       playingState.activeChordIdx >= priorChords &&
                                       playingState.activeChordIdx < priorChords + prog.roman.length;

            const blockClass = isThisBlockPlaying ? 'border-violet-500 bg-violet-50 dark:bg-slate-800 shadow-md' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50';
            const titleClass = isThisBlockPlaying ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200';

            html += `
                <div class="flex-shrink-0 flex flex-col min-w-[200px] p-4 rounded-xl border transition-all ${blockClass}">
                    <div class="flex items-start justify-between mb-2">
                        <span class="text-sm font-bold truncate pr-2 ${titleClass}">${prog.name}</span>
                        <button onclick="removeFromChain(${idx})" class="text-slate-400 hover:text-red-500 transition-colors p-1 -mr-1"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
                    </div>
                    <div class="flex gap-1.5 text-xs font-mono mt-auto">
            `;

            prog.roman.forEach((num, rIdx) => {
                const chordGlobalIdx = priorChords + rIdx;
                const isThisChordActive = playingState.id === 'chain' && playingState.activeChordIdx === chordGlobalIdx;
                const chordClass = isThisChordActive ? 'bg-violet-500 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
                html += `<span class="px-1.5 py-0.5 rounded ${chordClass}">${num}</span>`;
            });

            html += `</div></div>`;
        });
        html += '</div>';
        chainContainer.innerHTML = html;

    } else {
        chainControls.innerHTML = '';
        chainContainer.innerHTML = `
            <p class="text-sm text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                Add progressions from the list below to build and play a continuous song structure.
            </p>
        `;
    }
};

const renderProgressions = () => {
    const container = document.getElementById('progressions-container');
    const titleEl = document.getElementById('results-title');
    const countEl = document.getElementById('results-count');

    const currentNotes = getNoteArray();
    const rootNoteName = currentNotes[rootKeyIndex];

    const filteredProgressions = PROGRESSIONS_DB.filter(p => {
        if (p.scale !== keyType) return false;
        if (activeTags.length > 0) {
            const hasMatchingTag = activeTags.some(tag => p.tags.includes(tag));
            if (!hasMatchingTag) return false;
        }
        return true;
    });

    titleEl.innerHTML = `<span class="text-violet-500 dark:text-violet-400 font-bold">${rootNoteName} ${keyType}</span> Progressions`;
    countEl.innerText = `${filteredProgressions.length} results`;

    if (filteredProgressions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl bg-white dark:bg-slate-900/20 shadow-sm">
                <p class="text-slate-500 dark:text-slate-400 text-lg mb-4">No progressions found matching these tags.</p>
                <button onclick="clearTags()" class="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors font-medium shadow-sm">Clear filters</button>
            </div>
        `;
        return;
    }

    let html = '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">';

    filteredProgressions.forEach(prog => {
        const isPlaying = playingState.id === prog.id;
        const isRecommended = chain.length > 0 && isCompatible(chain[chain.length - 1], prog);

        let cardClass = 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md dark:shadow-none';
        if (isPlaying) cardClass = 'border-violet-500 bg-violet-50/50 dark:bg-slate-800/80 ring-1 ring-violet-500 shadow-lg dark:shadow-[0_0_30px_rgba(139,92,246,0.15)] z-10';
        else if (isRecommended) cardClass = 'border-emerald-400 dark:border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-900/10 shadow-sm hover:shadow-md';

        html += `
            <div class="group relative overflow-hidden rounded-2xl border transition-all flex flex-col justify-between ${cardClass}">
                <div class="p-5 flex-1 space-y-4">
                    <div class="flex justify-between items-start">
                        <div class="pr-2">
                            ${isRecommended ? `<div class="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1"><i data-lucide="sparkles" class="w-3 h-3"></i> Great Fit</div>` : ''}
                            <h3 class="font-semibold text-lg text-slate-900 dark:text-white mb-1.5 leading-tight">${prog.name}</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">${prog.desc}</p>
                        </div>
                        <div class="flex flex-col gap-2 flex-shrink-0">
                            <button onclick="${isPlaying ? 'stopPlayback()' : `handlePlay(${prog.id})`}" class="p-2.5 rounded-full transition-all ${isPlaying ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'bg-slate-100 text-slate-600 hover:bg-violet-500 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-violet-500 dark:hover:text-white group-hover:scale-105'}" title="Preview">
                                ${isPlaying ? '<i data-lucide="square" class="w-4 h-4 fill-current"></i>' : '<i data-lucide="play" class="w-4 h-4 fill-current ml-0.5"></i>'}
                            </button>
                            <button onclick="addToChain(${prog.id})" class="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-500 dark:hover:text-white transition-all group-hover:scale-105" title="Add to Chain">
                                <i data-lucide="plus" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide pt-2">
        `;

        prog.roman.forEach((numeral, idx) => {
            const isChordActive = isPlaying && playingState.activeChordIdx === idx;
            const chordDetails = getChordDetails(numeral);

            const chordBoxClass = isChordActive ? 'bg-violet-500 text-white border-violet-400 scale-105 shadow-lg shadow-violet-500/20' : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
            const chordNameClass = isChordActive ? 'text-white' : 'text-slate-800 dark:text-slate-100';
            const chordNumClass = isChordActive ? 'text-violet-200' : 'text-slate-500 dark:text-slate-500';

            html += `
                <div class="flex flex-col items-center justify-center min-w-[64px] p-2.5 rounded-xl border transition-all duration-300 flex-shrink-0 ${chordBoxClass}">
                    <span class="text-lg font-bold tracking-tight ${chordNameClass}">${chordDetails.name}</span>
                    <span class="text-[10px] mt-0.5 font-mono ${chordNumClass}">${numeral}</span>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                <div class="p-4 pt-0">
                    <div class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/50">
        `;

        prog.tags.forEach(tag => {
            html += `<span class="text-[9px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-slate-100 text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">${tag}</span>`;
        });

        html += `
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
};

const updateTheme = () => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').setAttribute('data-lucide', 'sun');
        document.getElementById('theme-toggle').title = "Switch to Light Mode";
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-icon').setAttribute('data-lucide', 'moon');
        document.getElementById('theme-toggle').title = "Switch to Dark Mode";
    }
};

const renderApp = () => {
    updateTheme();
    renderSidebar();
    renderChain();
    renderProgressions();
    lucide.createIcons();
};

const init = () => {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    renderApp();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
