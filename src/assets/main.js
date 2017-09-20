let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here
    if (!answer.value || !attempt) {
        setHiddenFields();
    }


    if (!validateInput(input.value))
        return false;

    attempt.value = parseInt(attempt.value) + 1;

    if (getResults(input.value)) {

        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();

    } else {

        if (attempt.value >= 10) {

            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        }
        else
            setMessage('Incorrect, try again.');
    }

}

//implement new functions here

function setHiddenFields() {
    answer.value = ('0000' + Math.floor((Math.random() * 10000)).toString()).slice(-4);
    attempt.value = 0;
}

function setMessage(msg) {
    document.getElementById('message').innerHTML = msg;
}

function validateInput(input) {
    if (input.length == 4)
        return true;

    setMessage('Guesses must be exactly 4 characters long.');
    return false;

}

function getResults(input) {
    var correct = 0;
    var output = "";

    for (i = 0; i < input.length; i++) {

        if (input.charAt(i) == answer.value.charAt(i)) {

            output += '<span class="glyphicon glyphicon-ok"></span>';
            correct = correct + 1;
        }
        else if (answer.value.includes(input.charAt(i))) {
            output += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else {
            output += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }

    document.getElementById('results').innerHTML += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">' + output + '</div></div>';

    return (correct == 4);
}

function showAnswer(result) {

    var code = document.getElementById('code');

    code.innerHTML = answer.value;

    if (result == true) {
        code.className += ' success';
    } else {
        code.className += ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

