import React, { useState, useEffect } from 'react';
import '../assets/css/assistant.css';

const Assistant = () => {
    const [textInputValue, setTextInputValue] = useState('');

    useEffect(() => {
        // Establecer el foco en la entrada de texto para poder ingresar una palabra de inmediato
        document.getElementById('terminalTextInput').focus();
    }, []);

    const clearInput = () => {
        setTextInputValue('');
    };

    const scrollToBottomOfResults = () => {
        const terminalResultsDiv = document.getElementById('terminalReslutsCont');
        terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
    };

    useEffect(() => {
        // Desplazarse hacia abajo en los resultados
        scrollToBottomOfResults();
    }, [textInputValue]);

    const addTextToResults = (textToAdd) => {
        document.getElementById('terminalReslutsCont').innerHTML += `<p>${textToAdd}</p>`;
        scrollToBottomOfResults();
    };

    const postHelpList = () => {
        const helpKeyWords = [
            "- open + URL to open a Website (for example, open omar-cruz-rmz.com)",
            "- Google + something you wanna search on Google (for example, google Front-End Development)",
            "- YouTube + something you wanna search on YouTube (for example, youtube Lo-Fi music to study)",
            "- Wiki + something you wanna search on Wikipedia (for example, wiki Albert Einstein)",
            "- 'Time' will show you the current time.",
            "- 'Date' will show you the current date."
        ].join('<br>');
        addTextToResults(helpKeyWords);
    };

    const getTimeAndDate = (postTimeDay) => {
        const timeAndDate = new Date();
        const timeHours = timeAndDate.getHours();
        const timeMinutes = timeAndDate.getMinutes();
        const dateDay = timeAndDate.getDate();
        const dateMonth = timeAndDate.getMonth() + 1;
        const dateYear = timeAndDate.getFullYear();

        const formattedTimeHours = (timeHours < 10) ? `0${timeHours}` : timeHours;
        const formattedTimeMinutes = (timeMinutes < 10) ? `0${timeMinutes}` : timeMinutes;

        const currentTime = `${formattedTimeHours}:${formattedTimeMinutes} hrs`;
        const currentDate = `${dateDay}/${dateMonth}/${dateYear}`;

        if (postTimeDay === "time") {
        addTextToResults(currentTime);
        }

        if (postTimeDay === "date") {
        addTextToResults(currentDate);
        }
    };

    const openLinkInNewWindow = (linkToOpen) => {
        window.open(linkToOpen, '_blank');
        clearInput();
    };

    const textReplies = () => {
        switch (textInputValue.toLowerCase()) {
        // Respuestas
        case "hello":
        case "hi":
        case "hola":
        case "halo":
            clearInput();
            addTextToResults("Hello, how can I help you? Try typing 'help' for more options!");
            break;

        case "clear":
        case "cls":
            clearInput();
            for (let i = 1; i <= 14; i++) {
                addTextToResults("‎");
            }
            break;

        // Respuestas
        case "youtube":
            clearInput();
            addTextToResults("Type youtube + something you wanna search.");
            break;

        case "google":
            clearInput();
            addTextToResults("Type google + something you wanna search.");
            break;

        case "wiki":
        case "wikipedia":
            clearInput();
            addTextToResults("Type wiki + something you wanna search.");
            break;

        case "time":
        case "hora":
            clearInput();
            getTimeAndDate("time");
            break;

        case "date":
        case "fecha":
            clearInput();
            getTimeAndDate("date");
            break;

        case "help":
        case "?":
        case "ayuda":
            clearInput();
            postHelpList();
            break;

        default:
            clearInput();
            addTextToResults(`<p><i>The command <b>${textInputValue}</b> wasn't found. Type '<b>help</b>' to list all available commands.</i></p>`);
            break;
        }
    };

    const checkWord = () => {
        if (textInputValue.trim() !== "") {
            addTextToResults(`<p class='userEnteredText'>> ${textInputValue}</p>`);
            switch (true) {
                case textInputValue.toLowerCase().startsWith("open "):
                    openLinkInNewWindow(`http://${textInputValue.substr(5).toLowerCase()}`);
                    addTextToResults(`<i>Opening URL: '<b>${textInputValue.substr(5)}</b>'</i>`);
                    break;

                case textInputValue.toLowerCase().startsWith("youtube "):
                    openLinkInNewWindow(`https://www.youtube.com/results?search_query=${textInputValue.substr(8)}`);
                    addTextToResults(`<i>Searching on YouTube: '<b>${textInputValue.substr(8)}</b>'.</i>`);
                    break;

                case textInputValue.toLowerCase().startsWith("google "):
                    openLinkInNewWindow(`https://www.google.com/search?q=${textInputValue.substr(7)}`);
                    addTextToResults(`<i>Searching on Google: '<b>${textInputValue.substr(7)}</b>'.</i>`);
                    break;

                case textInputValue.toLowerCase().startsWith("wiki "):
                    openLinkInNewWindow(`https://wikipedia.org/w/index.php?search=${textInputValue.substr(5)}`);
                    addTextToResults(`<i>Searching on Wikipedia: '<b>${textInputValue.substr(5)}</b>'.</i>`);
                    break;

                default:
                    textReplies();
                    break;
            }
        }
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        checkWord();
    };

    return (
        <>
            <div className="mainCont">
                <h1>Squirrel Web Terminal</h1>
                <h3>Welcome to the Squirrel Web Terminal!</h3>
                <p>
                    Explore the power of a terminal-style interface right in your browser.
                    Type commands, search the web, and get information at your fingertips.
                    For a list of available commands, type <code>help</code>.
                </p>
                <div className="terminalCont">
                    <div id="terminalReslutsCont"></div>
                    <form onSubmit={handleFormSubmit}>
                    <input
                        id="terminalTextInput"
                        type="text"
                        placeholder="For a list of available commands type 'help'."
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                    />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Assistant;
