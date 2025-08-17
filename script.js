  <script>
    // Exemplo fixo de perguntas (ou pode carregar do localStorage se quiser)
    const questions = [
      { question: "Quem é o autor de O Livro dos Espíritos?", 
        answers: [ 
          { text: "Chico Xavier", correct: false }, 
          { text: "Allan Kardec", correct: true }, 
          { text: "Bezerra de Menezes", correct: false }, 
          { text: "Divaldo Franco", correct: false } 
        ] 
      },
      { question: "Em que ano foi publicado O Livro dos Espíritos?", 
        answers: [ 
          { text: "1857", correct: true }, 
          { text: "1900", correct: false }, 
          { text: "1800", correct: false }, 
          { text: "1888", correct: false } 
        ] 
      }
    ];

    let username = localStorage.getItem("username") || "";
    if (username) {
      document.getElementById("player").innerText = "Jogador: " + username;
    }

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextBtn = document.getElementById("next-btn");
    const podioElement = document.getElementById("podio");

    let currentQuestionIndex = 0;
    let score = 0;

    function startGame() {
      const input = document.getElementById("username-input");
      username = input.value.trim();
      if (!username) {
        alert("Por favor, digite seu nome para começar o quiz.");
        input.focus();
        return;
      }
      localStorage.setItem("username", username);
      document.getElementById("player").innerText = "Jogador: " + username;
      document.getElementById("start-screen").style.display = "none";
      document.getElementById("quiz-screen").style.display = "block";
      document.getElementById("player").style.display = "block";
      showQuestion();
    }

    function showQuestion() {
      resetState();
      let q = questions[currentQuestionIndex];
      questionElement.innerText = q.question;

      q.answers.forEach(a => {
        const btn = document.createElement("button");
        btn.innerText = a.text;
        btn.classList.add("btn");
        btn.addEventListener("click", () => selectAnswer(a, btn));
        answersElement.appendChild(btn);
      });
    }

    function resetState() {
      nextBtn.style.display = "none";
      answersElement.innerHTML = "";
    }

    function selectAnswer(answer, btn) {
      const allBtns = answersElement.querySelectorAll("button");
      if (answer.correct) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
      }
      allBtns.forEach(b => b.disabled = true);
      nextBtn.style.display = "block";
    }

    nextBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    });

    function endGame() {
      document.getElementById("quiz-screen").style.display = "none";
      document.getElementById("result-screen").style.display = "block";

      // Recupera ranking do localStorage
      let ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
      ranking.push({ name: username, score: score });
      ranking.sort((a, b) => b.score - a.score);

      localStorage.setItem("ranking", JSON.stringify(ranking));

      podioElement.innerHTML = "<h3>🏆 Pódio</h3>";
      ranking.slice(0, 3).forEach((p, i) => {
        podioElement.innerHTML += `<div class=\"rank\">${i+1}º - ${p.name} (${p.score} pts)</div>`;
      });
    }
  </script>
