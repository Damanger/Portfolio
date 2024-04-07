const DEFAULT_WORDS_COUNT = 200;
const COUNT_DOWN_90 = 90;
const COUNT_DOWN_60 = 60;
const COUNT_DOWN_30 = 30;
const COUNT_DOWN_15 = 15;
const DEFAULT_COUNT_DOWN = COUNT_DOWN_60;

const DEFAULT_DIFFICULTY = "normal";
const HARD_DIFFICULTY = "hard";
const RESTART_BUTTON_TOOLTIP_TITLE = "[Tab] + [Enter] to quickly restart";
const REDO_BUTTON_TOOLTIP_TITLE = "[Tab] + [Space] to quickly redo";
const RESTART_BUTTON_TOOLTIP_TITLE_WORDSCARD = "[Tab] + [Enter] to quick restart the chapter";
const SELECT_ONE_OR_MORE_CHAPTERS = "Open to select one or more chapters. Pick the chapters in the typing area."
const DEFAULT_DIFFICULTY_TOOLTIP_TITLE =
  "normal mode generates random words from top 1000 most frequently used words in English dataset.";
const HARD_DIFFICULTY_TOOLTIP_TITLE =
  "hard mode generates random words from blog posts words data, so you may encounter longer and less frequently used word.";
const CHAR_TOOLTIP_TITLE =
  "correct/incorrect/missing/extra\n extras are recorded even if deleted.";
const SENTENCE_CHAR_TOOLTIP_TITLE = "correct/incorrect/extra\n";
const ENGLISH_MODE_TOOLTIP_TITLE = "English Mode";
const DEFAULT_DIFFICULTY_TOOLTIP_TITLE_CHINESE =
  "normal mode generates random words from top 5000 most frequently used words in Chinese dataset.";
const HARD_DIFFICULTY_TOOLTIP_TITLE_CHINESE =
  "hard mode generates random words from top 1500 most used Chinese idioms.";

const FOCUS_MODE = "Focus mode";

const ENGLISH_MODE = "ENGLISH_MODE";

const GAME_MODE = "GAME_MODE";
const GAME_MODE_DEFAULT = "WORD_MODE";
const GAME_MODE_SENTENCE = "SENTENCE_MODE";
const WORD_MODE_LABEL = "word";
const SENTENCE_MODE_LABEL = "sentence";
const TRAINER_MODE = "QWERTY keyboard practice mode";

const DEFAULT_SENTENCES_COUNT = 5;
const TEN_SENTENCES_COUNT = 10;
const FIFTEEN_SENTENCES_COUNT = 15;

const ENGLISH_SENTENCE_MODE_TOOLTIP_TITLE = "English Sentence Mode";

const PACING_CARET = "caret";
const PACING_PULSE = "pulse";

const PACING_CARET_TOOLTIP = "type the word with a caret \"|\" , character by character.";
const PACING_PULSE_TOOLTIP = "type the word with a pulse \"____\", this helps improving wpm and your speed typing pace habit.";

export {
  DEFAULT_WORDS_COUNT,
  DEFAULT_COUNT_DOWN,
  COUNT_DOWN_60,
  COUNT_DOWN_30,
  COUNT_DOWN_15,
  COUNT_DOWN_90,
  DEFAULT_DIFFICULTY,
  HARD_DIFFICULTY,
  DEFAULT_DIFFICULTY_TOOLTIP_TITLE,
  HARD_DIFFICULTY_TOOLTIP_TITLE,
  CHAR_TOOLTIP_TITLE,
  SENTENCE_CHAR_TOOLTIP_TITLE,
  FOCUS_MODE,
  ENGLISH_MODE,
  RESTART_BUTTON_TOOLTIP_TITLE,
  REDO_BUTTON_TOOLTIP_TITLE,
  ENGLISH_MODE_TOOLTIP_TITLE,
  DEFAULT_DIFFICULTY_TOOLTIP_TITLE_CHINESE,
  HARD_DIFFICULTY_TOOLTIP_TITLE_CHINESE,
  GAME_MODE,
  GAME_MODE_DEFAULT,
  GAME_MODE_SENTENCE,
  WORD_MODE_LABEL,
  SENTENCE_MODE_LABEL,
  DEFAULT_SENTENCES_COUNT,
  TEN_SENTENCES_COUNT,
  FIFTEEN_SENTENCES_COUNT,
  ENGLISH_SENTENCE_MODE_TOOLTIP_TITLE,
  TRAINER_MODE,
  RESTART_BUTTON_TOOLTIP_TITLE_WORDSCARD,
  SELECT_ONE_OR_MORE_CHAPTERS,
  PACING_CARET,
  PACING_PULSE,
  PACING_CARET_TOOLTIP,
  PACING_PULSE_TOOLTIP
};
