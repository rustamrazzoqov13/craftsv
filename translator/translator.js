const startBtn = document.getElementById('start-btn');
const speechOutput = document.getElementById('speech-output');
const translatedOutput = document.getElementById('translated-output');
const inputLanguage = document.getElementById('input-language');
const audioOutput = document.getElementById('audio-output');

// Google Translate API key (you need to replace it with your own key)
const googleTranslateAPIKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

// Initialize Web Speech API for recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = false;
recognition.continuous = false;

// Start listening when the button is clicked
startBtn.addEventListener('click', () => {
    recognition.lang = inputLanguage.value;
    recognition.start();
});

// Process speech recognition result
recognition.addEventListener('result', (event) => {
    const recognizedText = event.results[0][0].transcript;
    speechOutput.textContent = recognizedText;

    // Detect target language to translate to
    const targetLanguage = inputLanguage.value === 'en-US' ? 'ru' : 'en';
    translateText(recognizedText, targetLanguage);
});

// Call Google Translate API to translate text
function translateText(text, targetLanguage) {
    fetch(`https://translation.googleapis.com/language/translate/v2?key=${googleTranslateAPIKey}`, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            target: targetLanguage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        translatedOutput.textContent = translatedText;
        speakText(translatedText, targetLanguage);
    })
    .catch(error => {
        console.error('Error with translation:', error);
        translatedOutput.textContent = 'Translation failed.';
    });
}

// Use Speech Synthesis API to speak the translated text
function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    speechSynthesis.speak(utterance);
}

// Restart recognition (optional)
recognition.addEventListener('end', recognition.start); // Optionally restart recognition if needed
