let index = 0;
let answers = []
const jsonX = JSON.parse('{"0":{"0":"Mars","1":"Earth","2":"Venus","3": "Jupiter", "question":"What is the 3rd rock from the sun?","correct":"1"},"1":{"0":"A smudge on the Hubble telescope","1":"A storm on Jupiter","2":"A storm on Saturn","3":"Extremely hot spot on the Suns surface","question":"What is the Great Red Spot?","correct":"1"},"2":{"0":"Mars","1":"Mercury","2":"Venus","3":"Neptun","question":"Which planet has rings?","correct":"3"},"title":"Astronomy"}');

function nextQuestion(json) {
	let nrOfQuestions = Object.keys(json).length - 1;
	if(index === 0 || isSelected()) {
		saveAnswer(nrOfQuestions);
		if (nrOfQuestions > index) {
			const elem2 = <p className="main"> {json.title} </p>
			const element = buildQuestion(Object.keys(json[index]).length - 2, json);

			ReactDOM.render(elem2, document.getElementById("quiz-name"));
			ReactDOM.render(element, document.getElementById("root"));

			document.getElementById("notify").style.display = "none";
			index++;
		} else {
			document.getElementById("submit-button").style.display = "none";
			document.getElementById("home-button").style.display = "block";
			const element = summary();
			ReactDOM.render(element, document.getElementById("root"));
		}
	} else {
		document.getElementById("notify").style.display = "block";
	}
}

function isSelected() {
	let int = 0; 
	while (true) {
		if (!document.getElementById("input-" + int)) break;
		if (document.getElementById("input-" + int).checked) {
			return true;
		}
		int++;
	}
	return false;
}

function buildQuestion(questionCount, json) {
	
	let elements = [];
	for (let i = 0; i < questionCount; i++) {
		elements.push(<div key={String(index) + i}><input id={"input-" + i} name="option" className="answer" type="radio" value={json[index][{i}]} /> {json[index][i]} <br /></div>);
	}
	const notification = <p id="notify">Choose an answer!</p>
	return (
	<div>
		<div className="quiz-field">
			<div className="question-nr">{index + 1}/3</div>
			<div className="question">{json[index].question}</div>
			{elements}
		</div>
		{notification}
	</div>	
	);
}
function getScore() {
	let score = 0;
	for (let i = 0; i < Object.keys(jsonX).length - 1; i++) {
		if (jsonX[i]["correct"] === answers[i]) score++;
	}
	return score;
}
function summary() {
	return (
		<div className="score-field">
			Your final score: {getScore()}/{Object.keys(jsonX).length - 1}
		</div>
	);
}

function saveAnswer(questionCount) {
	if (index > 0 && questionCount !== answers.length) {
		let int = 0;
		while (true) {
			let input = document.getElementById("input-" + int);
			if (input) {
				if (input.checked) {
					answers.push(input.id.slice(-1))
				}
			} else {
				break;
			}
			int++; 
		}
	}
	console.log(answers);
}

nextQuestion(jsonX);