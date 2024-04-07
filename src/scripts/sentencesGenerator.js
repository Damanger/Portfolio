import { ENGLISH_MODE } from "../constants/Constants";
import {
  ENGLISH_SENTENCES
} from "../constants/SentencesCollection";
import { randomIntFromRange } from "./randomUtils";

const sentencesGenerator = (sentencesCount, language) => {
  if (language === ENGLISH_MODE) {
    const EnglishSentencesList = [];
    for (let i = 0; i < sentencesCount; i++) {
      const rand = randomIntFromRange(0, 50);
      EnglishSentencesList.push(ENGLISH_SENTENCES[rand]);
    }
    return EnglishSentencesList;
  }
};

export { sentencesGenerator };
