document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const submitButton = document.getElementById('submitButton');
    const nextButton = document.getElementById('nextButton');
    const restartButton = document.getElementById('restartButton');
    const quizContainer = document.getElementById('quiz-container');
    const setupContainer = document.getElementById('setup-container');
    const resultsContainer = document.getElementById('results-container');
    const questionContainer = document.getElementById('question-container');
    const feedback = document.getElementById('feedback');
    const number1El = document.getElementById('number1');
    const operationSymbolEl = document.getElementById('operation-symbol');
    const number2El = document.getElementById('number2');
    const answerInput = document.getElementById('answer');
    const totalQuestionsEl = document.getElementById('total-questions');
    const totalCorrectEl = document.getElementById('total-correct');
    const totalWrongEl = document.getElementById('total-wrong');
    const starContainer = document.getElementById('star-container');
    const maxTriesInput = document.getElementById('max-tries');
    const questionNumberEl = document.getElementById('question-number');

    let currentQuestion = 0;
    let questions = [];
    let currentTries = 0;
    let correctAnswers = 0;
    let maxTries = parseInt(maxTriesInput.value, 10);

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateQuestion = () => {
        const min = parseInt(document.getElementById('number-range-min').value, 10);
        const max = parseInt(document.getElementById('number-range-max').value, 10);
        const operation = document.getElementById('operation').value;
        let num1 = getRandomNumber(min, max);
        let num2 = getRandomNumber(min, max);
        let answer = 0;
        let symbol = '';

        switch (operation) {
            case 'addition':
                symbol = '+';
                answer = num1 + num2;
                break;
            case 'subtraction':
                symbol = '-';
                answer = num1 - num2;
                break;
            case 'both':
                if (Math.random() < 0.5) {
                    symbol = '+';
                    answer = num1 + num2;
                } else {
                    symbol = '-';
                    answer = num1 - num2;
                }
                break;
        }

        return { num1, num2, symbol, answer };
    };

    const displayQuestion = () => {
        if (currentQuestion < questions.length) {
            const { num1, num2, symbol, answer } = questions[currentQuestion];
            number1El.textContent = num1;
            number2El.textContent = num2;
            operationSymbolEl.textContent = symbol;
            answerInput.value = '';
            feedback.textContent = '';
            currentTries = 0;
            questionContainer.style.display = 'flex';
            submitButton.style.display = 'inline';
            nextButton.style.display = 'none';
            answerInput.focus();
            questionNumberEl.textContent = `Question ${currentQuestion + 1}`;
        } else {
            showResults();
        }
    };

    const checkAnswer = () => {
        const userAnswer = parseInt(answerInput.value, 10);
        const { answer } = questions[currentQuestion];

        if (userAnswer === answer) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
            correctAnswers++;
            nextButton.style.display = 'inline';
            submitButton.style.display = 'none';
        } else {
            currentTries++;
            if (currentTries < maxTries) {
                feedback.textContent = 'Try again!';
                feedback.style.color = 'yellow';
            } else {
                feedback.textContent = `The correct answer is ${answer}`;
                feedback.style.color = 'red';
                nextButton.style.display = 'inline';
                submitButton.style.display = 'none';
            }
        }
    };

    const nextQuestion = () => {
        currentQuestion++;
        displayQuestion();
    };

    const showResults = () => {
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'flex';
        totalQuestionsEl.textContent = questions.length;
        totalCorrectEl.textContent = correctAnswers;
        totalWrongEl.textContent = questions.length - correctAnswers;
        if (correctAnswers === questions.length) {
            starContainer.style.display = 'block';
        }
    };

    const restartQuiz = () => {
        resultsContainer.style.display = 'none';
        setupContainer.style.display = 'flex';
        correctAnswers = 0;
        currentQuestion = 0;
        questions = [];
    };

    startButton.addEventListener('click', () => {
        setupContainer.style.display = 'none';
        quizContainer.style.display = 'flex';

        // Generate questions based on setup
        const numQuestions = parseInt(document.getElementById('number-questions').value, 10);
        questions = Array.from({ length: numQuestions }, () => generateQuestion());
        displayQuestion();
    });

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
});