import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Translator = () => {
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [supportedLanguages, setSupportedLanguages] = useState([]);

    const fetchSupportedLanguages = async () => {
        try {
            const response = await axios.get(
                'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation'
            );

            const languages = response.data.translation;
            const languageList = Object.keys(languages).map(code => ({
                code,
                name: languages[code].name
            }));

            setSupportedLanguages(languageList);
        } catch (error) {
            console.error('Error fetching supported languages:', error);
        }
    };
    useEffect(() => {
        fetchSupportedLanguages();
    }, []);

    const translateText = async () => {
        if (!sourceLanguage || !targetLanguage) {
            alert('Please select languages.');
            return;
        }

        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', sourceLanguage);
        encodedParams.set('target_language', targetLanguage);
        encodedParams.set('text', inputText);

        const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '82bdd611a9mshdf00ae03b558d75p153becjsn343ba8de47c7',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
        };

        try {
            const response = await axios.request(options);
          setTranslatedText(response.data.data.translatedText);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="translator">
            <h1>Language Translator</h1>
            <div className="selectors">
                <select
                    className="dropdown"
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                >
                    <option value="">Select Language</option>
                    {supportedLanguages.map(language => (
                        <option key={language.code} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>

               <div> <i class="fa-solid fa-right-left"></i></div>

                <select
                    className="dropdown"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                >
                    <option value="">select Language</option>
                    {supportedLanguages.map((language) => (
                        <option key={language.code} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
            <textarea
                className="textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            <button className="button" onClick={translateText}>
                Translate
            </button>
            <h2 className="heading">Translated Text:</h2>
            <p className="text">{translatedText}</p>
        </div>
    );
};

export default Translator;