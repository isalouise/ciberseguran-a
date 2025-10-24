// ======== MENU RESPONSIVO ========
const menuIcon = document.querySelector('.menu-icon');
const menuLinks = document.querySelector('.menu-links');
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
  });
}

// ======== FINALIZAR QUIZ ========
function finalizarQuiz() {
  const respostas = document.querySelectorAll('input[type="radio"]:checked');
  const totalPerguntas = document.querySelectorAll('.question').length;
  const resultado = document.getElementById("resultado");
  const extraButtons = document.getElementById("extraButtons");

  if (respostas.length < totalPerguntas) {
    alert("Responda todas as perguntas antes de finalizar!");
    return;
  }

  let acertos = 0;
  respostas.forEach(r => {
    if (r.value === "1") acertos++;
  });

  // Exibe pontuação
  resultado.textContent = `Você acertou ${acertos} de ${totalPerguntas}!`;
  extraButtons.innerHTML = "";

  // Detecta página atual
  const paginaAtual = window.location.pathname.split("/").pop();
  const proximaPagina = {
    "quizm.html": "quizp.html",
    "quizp.html": "quizr.html",
    "quizr.html": "quize.html",
    "quize.html": "quiza.html",
    "quiza.html": "resultado-final.html"
  }[paginaAtual];

  // Condições de acerto
  if (acertos === totalPerguntas) {
    resultado.textContent += " 🎉 Excelente!";
    const btnProx = criarBotao("Próximo", () => {
      if (proximaPagina) window.location.href = proximaPagina;
    });
    extraButtons.appendChild(btnProx);

  } else if (acertos >= totalPerguntas / 2) {
    resultado.textContent += " 😄 Quase lá!";
    const btnCont = criarBotao("Continuar mesmo assim", () => {
      if (proximaPagina) window.location.href = proximaPagina;
    });
    const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
    extraButtons.appendChild(btnCont);
    extraButtons.appendChild(btnRetry);

  } else {
    resultado.textContent += " 😕 Você pode melhorar!";
    const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
    extraButtons.appendChild(btnRetry);
  }

  // Última página (resultado final)
  if (paginaAtual === "quiza.html") {
    extraButtons.innerHTML = "";
    if (acertos === totalPerguntas) {
      resultado.textContent += " 🏆 Parabéns! Você concluiu com sucesso!";
      const btnFim = criarBotao("Finalizar", () => {
        window.location.href = "resultado-final.html";
      });
      extraButtons.appendChild(btnFim);
    } else if (acertos >= totalPerguntas / 2) {
      const btnFim = criarBotao("Finalizar mesmo assim", () => {
        window.location.href = "resultado-final.html";
      });
      const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
      extraButtons.appendChild(btnFim);
      extraButtons.appendChild(btnRetry);
    } else {
      const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
      extraButtons.appendChild(btnRetry);
    }
  }
}

// ======== BOTÕES AUXILIARES ========
function criarBotao(texto, acao) {
  const btn = document.createElement("button");
  btn.textContent = texto;
  btn.type = "button";
  btn.className = "btn";
  btn.addEventListener("click", acao);
  return btn;
}

function reiniciarQuiz() {
  document.getElementById("quizForm").reset();
  document.getElementById("resultado").textContent = "";
  document.getElementById("extraButtons").innerHTML = "";
}
