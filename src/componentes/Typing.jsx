import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, themesOptions } from "../style/theme";
import { GlobalStyles } from "../style/global";
import TypeBox from "./features/TypeBox/TypeBox";
import SentenceBox from "./features/SentenceBox/SentenceBox";
import FooterMenu from "./common/FooterMenu";
import { GAME_MODE, GAME_MODE_DEFAULT, GAME_MODE_SENTENCE } from "../constants/Constants";
import useLocalPersistState from "../hooks/useLocalPersistState";
import { SOUND_MODE, soundOptions, DEFAULT_SOUND_TYPE, DEFAULT_SOUND_TYPE_KEY } from "./features/sound/sound";

function Typing() {
    // localStorage persist theme setting
    const [theme, setTheme] = useState(() => {
        const stickyTheme = window.localStorage.getItem("theme");
        if (stickyTheme !== null) {
            const localTheme = typeof stickyTheme === 'string' ? stickyTheme : JSON.parse(stickyTheme);
            const themeOption = themesOptions.find((e) => e.label === localTheme.label);

            const upstreamTheme = themeOption ? themeOption.value : defaultTheme;
            // we will do a deep equal here. In case we want to support customized local theme.
            const isDeepEqual = localTheme === upstreamTheme;
            return isDeepEqual ? localTheme : upstreamTheme;
        }
        return defaultTheme;
    });

    // local persist game mode setting
    const [soundMode, setSoundMode] = useLocalPersistState(false, SOUND_MODE);

    const [soundType, setSoundType] = useLocalPersistState(
        DEFAULT_SOUND_TYPE,
        DEFAULT_SOUND_TYPE_KEY
    );

    // local persist game mode setting
    const [gameMode, setGameMode] = useLocalPersistState(
        GAME_MODE_DEFAULT,
        GAME_MODE
    );

    const handleGameModeChange = (currGameMode) => {
        setGameMode(currGameMode);
    };

    const isWordGameMode =
        gameMode === GAME_MODE_DEFAULT 
    const isSentenceGameMode =
        gameMode === GAME_MODE_SENTENCE 
    const handleThemeChange = (e) => {
        window.localStorage.setItem("theme", JSON.stringify(e.value));
        setTheme(e.value);
    };

    const handleSoundTypeChange = (e) => {
        setSoundType(e.label);
    };

    const toggleSoundMode = () => {
        setSoundMode(!soundMode);
    };

    const textInputRef = useRef(null);
    const focusTextInput = () => {
        textInputRef.current && textInputRef.current.focus();
    };

    const sentenceInputRef = useRef(null);
    const focusSentenceInput = () => {
        sentenceInputRef.current && sentenceInputRef.current.focus();
    };

    useEffect(() => {
        if (isSentenceGameMode) {
            focusSentenceInput();
            return;
        }
        return;
    }, [
        theme,
        isSentenceGameMode,
        soundMode,
        soundType,
    ]);

    return (
    <>
        <NavBar/>
        <ThemeProvider theme={theme}>
                <div className="canvas">
                    <GlobalStyles />
                    {isWordGameMode && (
                        <TypeBox
                            textInputRef={textInputRef}
                            soundMode={soundMode}
                            soundType={soundType}
                            key="type-box"
                            handleInputFocus={() => focusTextInput()}
                        ></TypeBox>
                    )}
                    {isSentenceGameMode && (
                        <SentenceBox
                            sentenceInputRef={sentenceInputRef}
                            soundMode={soundMode}
                            soundType={soundType}
                            key="sentence-box"
                            handleInputFocus={() => focusSentenceInput()}
                        ></SentenceBox>
                    )}
                    <FooterMenu
                        themesOptions={themesOptions}
                        theme={theme}
                        soundMode={soundMode}
                        toggleSoundMode={toggleSoundMode}
                        soundOptions={soundOptions}
                        soundType={soundType}
                        handleSoundTypeChange={handleSoundTypeChange}
                        handleThemeChange={handleThemeChange}
                        gameMode={gameMode}
                        handleGameModeChange={handleGameModeChange}
                    ></FooterMenu>
                </div>
        </ThemeProvider>
    </>
    );
}

export default Typing;
