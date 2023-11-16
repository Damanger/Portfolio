import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Select from "../utils/Select";
import {
  WORD_MODE_LABEL,
  SENTENCE_MODE_LABEL,
  GAME_MODE_DEFAULT,
  GAME_MODE_SENTENCE
} from "../../constants/Constants";
import { SOUND_MODE_TOOLTIP } from "../features/sound/sound";

const FooterMenu = ({
  themesOptions,
  theme,
  soundMode,
  toggleSoundMode,
  soundOptions,
  soundType,
  handleSoundTypeChange,
  handleThemeChange,
  isCoffeeMode,
  gameMode,
  handleGameModeChange,
  isTrainerMode,
  isWordsCardMode
}) => {
  const isTypeTestEnabled = !isCoffeeMode && !isTrainerMode && !isWordsCardMode;

  const getModeButtonClassName = (mode) => {
    if (mode) {
      return "zen-button";
    }
    return "zen-button-deactive";
  };

  const getGameModeButtonClassName = (currMode, buttonMode) => {
    if (currMode === buttonMode) {
      return "active-game-mode-button";
    }
    return "inactive-game-mode-button";
  };

  return (
    <div className="footer" style={{backgroundColor: 'transparent', position: 'fixed', bottom: '0', width: '100%'}}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row">
          <Select
            classNamePrefix="Select"
            value={themesOptions.find((e) => e.value.label === theme.label)}
            options={themesOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleThemeChange}
            menuPlacement="top"
          ></Select>
          <IconButton onClick={toggleSoundMode}>
            <Tooltip title={SOUND_MODE_TOOLTIP}>
              <span className={getModeButtonClassName(soundMode)}>
                <VolumeUpIcon fontSize="medium"></VolumeUpIcon>
              </span>
            </Tooltip>
          </IconButton>
          {soundMode && (<Select
            classNamePrefix="Select"
            value={soundOptions.find((e) => e.label === soundType)}
            options={soundOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleSoundTypeChange}
            menuPlacement="top"
          ></Select>)}
          {isTypeTestEnabled && (
            <>
              <IconButton
                onClick={() => {
                  handleGameModeChange(GAME_MODE_DEFAULT);
                }}
              >
                <span
                  className={getGameModeButtonClassName(
                    gameMode,
                    GAME_MODE_DEFAULT
                  )}
                >
                  {WORD_MODE_LABEL}
                </span>
              </IconButton>
              <IconButton
                onClick={() => {
                  handleGameModeChange(GAME_MODE_SENTENCE);
                }}
              >
                <span
                  className={getGameModeButtonClassName(
                    gameMode,
                    GAME_MODE_SENTENCE
                  )}
                >
                  {SENTENCE_MODE_LABEL}
                </span>
              </IconButton>
            </>
          )}
        </Box>
      </Grid>
    </div>
  );
};

export default FooterMenu;
