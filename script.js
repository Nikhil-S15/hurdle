document.addEventListener("DOMContentLoaded", function() {
    const words = {
        english: ["APPLE", "BANANA", "CHERRY", "LEMON", "GRAPE", "ORANGE"],
        spanish: ["MANZANA", "PLATANO", "CEREZA", "LIMON", "UVA", "NARANJA"]
    };
    const language = 'english'; // Change to 'spanish' for Spanish words
    const secretWord = words[language][Math.floor(Math.random() * words[language].length)];
    const maxAttempts = 6;
    let attemptsLeft = maxAttempts;

    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const feedbackDiv = document.getElementById('feedback');
    const attemptsLeftDiv = document.getElementById('attempts-left');

    guessBtn.addEventListener('click', handleGuess);

    function handleGuess() {
        const guess = guessInput.value.trim().toUpperCase();

        if (!isValidWord(guess)) {
            alert(`Please enter a valid ${language === 'english' ? 'English' : 'Spanish'} word.`);
            guessInput.value = '';
            return;
        }

        if (guess === secretWord) {
            endGame(true);
        } else {
            displayFeedback(getFeedback(guess));
            attemptsLeft--;
            updateAttemptsLeft();
            guessInput.value = '';
            if (attemptsLeft === 0) {
                endGame(false);
            }
        }
    }

    function isValidWord(word) {
        return /^[A-Z]+$/.test(word) && words[language].includes(word);
    }

    function getFeedback(guess) {
        let feedback = '';
        for (let i = 0; i < 5; i++) {
            if (guess[i] === secretWord[i]) {
                feedback += '<span class="feedback-letter G">G</span>';
            } else if (secretWord.includes(guess[i])) {
                feedback += '<span class="feedback-letter Y">Y</span>';
            } else {
                feedback += '<span class="feedback-letter X">X</span>';
            }
        }
        return feedback;
    }

    function displayFeedback(feedback) {
        feedbackDiv.innerHTML += `<p>${feedback}</p>`;
    }

    function updateAttemptsLeft() {
        attemptsLeftDiv.textContent = `Attempts left: ${attemptsLeft}`;
    }

    function endGame(isWinner) {
        if (isWinner) {
            alert(`Congratulations! You guessed the word "${secretWord}" correctly!`);
        } else {
            alert(`Sorry, you've run out of attempts. The correct word was "${secretWord}".`);
        }
        guessInput.disabled = true;
        guessBtn.disabled = true;
    }
});
