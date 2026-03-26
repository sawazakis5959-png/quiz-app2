// ====== 質問文と選択肢 ====== 
const questions = [
  {
    question: "Q1. 心電図上で心房の興奮を示す波形は？",
    choices: [
      { text: "P波", score: 1 },
      { text: "QRS波", score: 0 },
      { text: "T波", score: 0 }
    ]
  },
  {
    question: "Q2. 健常な成人の白血球の中で<br>最も数が多いのは？",
    choices: [
      { text: "好中球", score: 1 },
      { text: "好酸球", score: 0 },
      { text: "リンパ球", score: 0 }
    ]
  },
  {
    question: "Q3. 排便中枢があるのはどこ？",
    choices: [
      { text: "仙髄", score: 1 },
      { text: "腰髄", score: 0 },
      { text: "脳幹", score: 0 }
    ]
  },
  {
    question: "Q4. 健常な成人の安静時の1回換気量は？",
    choices: [
      { text: "約0.5L", score: 1 },
      { text: "約1L", score: 0 },
      { text: "約350ｍL", score: 0 }
    ]
  },
  {
    question: "Q5. 選択肢のうち、<br>下垂体から分泌されるホルモンはどれ？",
    choices: [
      { text: "オキシトシン", score: 1 },
      { text: "グルカゴン", score: 0 },
      { text: "メラトニン", score: 0 }
    ]
  },
  {
    question: "Q6. 1日の尿量が<br>100mL以下の場合を何という？",
    choices: [
      { text: "無尿", score: 1 },
      { text: "乏尿", score: 0 },
      { text: "尿閉", score: 0 }
    ]
  },
  {
    question: "Q7. 二次卵母細胞と精子は通常どこで受精する？",
    choices: [
      { text: "卵管膨大部", score: 1 },
      { text: "卵管采", score: 0 },
      { text: "子宮体部", score: 0 }
    ]
  },
  {
    question: "Q8. 咀嚼筋を支配する神経はどれ？",
    choices: [
      { text: "三叉神経", score: 1 },
      { text: "顔面神経", score: 0 },
      { text: "舌咽神経", score: 0 }
    ]
  },
  {
    question: "Q9. 近くのものを見るとき、水晶体はどうなる？",
    choices: [
      { text: "厚くなる", score: 1 },
      { text: "薄くなる", score: 0 },
      { text: "広がる", score: 0 }
    ]
  },
  {
    question: "Q10. 筋収縮時、フィラメントの長さはどうなる？",
    choices: [
      { text: "変わらない", score: 1 },
      { text: "長くなる", score: 0 },
      { text: "短くなる", score: 0 }
    ]
  }
];

// あなたのサイトURL
const siteUrl = "https://petitnurse-kaibouseiri.netlify.app/";

// ====== 状態変数 ======
let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const startImage = document.getElementById("startImage");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("banner-area").style.display = "none";

  startBtn.style.display = "none";
  if (startImage) startImage.style.display = "none";

  const logo = document.getElementById("logo");
  if (logo) logo.style.display = "block";

  showQuestion();
}

function showQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const shuffledChoices = [...q.choices].sort(() => Math.random() - 0.5);
    quizEl.innerHTML = `
      <h2>${q.question}</h2>
      ${shuffledChoices
        .map(
          (choice) =>
            `<button class="choice-btn" onclick="answer(event, ${choice.score}, this)">${choice.text}</button>`
        )
        .join("")}
    `;
  } else {
    showResult();
  }
}

function answer(event, scoreValue, btn) {
  if (event) event.preventDefault();

  const buttons = quizEl.querySelectorAll("button");
  buttons.forEach((b) => b.classList.remove("selected"));

  if (btn) {
    btn.classList.add("selected");
  }

  score += scoreValue;

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 300);
}

function showResult() {
  quizEl.innerHTML = "";

  const shareText = `解剖生理クイズで ${score} / 10 点でした！あなたは何点？ #プチナース #看護学生`;

resultEl.innerHTML = `
  <div class="result-card">

    <p class="score-label">あなたのスコアは</p>

  <div class="score-main">
    <span class="score-text">${score} / 10</span>
  </div>

  <p class="score-label">
  プチナースで<br>＼解剖生理を勉強しよう！／
  </p>
    <a href="https://www.shorinsha.co.jp/book/b10159560.html" target="_blank" rel="noopener noreferrer">
      <img src="nezumi_b.png" alt="解剖生理ワークブックの紹介画像" class="result-image" width="500" height="500">
    </a>
    <a href="https://www.shorinsha.co.jp/book/b10159560.html" 
       class="result-link" target="_blank" rel="noopener noreferrer">
      3ステップの<br>くりかえしですいすい覚える！<br>解剖生理ワークブックをチェック✅
    </a>

    <div id="result-share" style="margin-top: 20px; display:flex; justify-content:center; gap:20px;">
      <a id="share-x" target="_blank" aria-label="Xでシェア">
        <img src="images/logo-black.png" alt="Xでシェア" style="width:44px; height:44px; background:#fff; padding:6px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
      </a>
      <a id="share-line" target="_blank" aria-label="LINEでシェア">
        <img src="images/line-logo.png" alt="LINEでシェア" style="width:44px; height:44px; background:#fff; padding:6px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
      </a>
    </div>

    <p style="font-size:12px; color:#666; margin-top:20px;">
    ※本サイトは外部サイトへのリンクを含みます。詳細はリンク先をご確認ください。
    </p>

  </div>
`;

  const xLink = document.getElementById("share-x");
  if (xLink) {
    const xUrl =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(shareText) +
      "&url=" +
      encodeURIComponent(siteUrl);
    xLink.href = xUrl;
  }

  const lineLink = document.getElementById("share-line");
  if (lineLink) {
    const lineUrl =
      "https://social-plugins.line.me/lineit/share?url=" +
      encodeURIComponent(siteUrl + "?score=" + score);
    lineLink.href = lineUrl;
  }

  const logo = document.getElementById("logo");

  if (logo) {
    logo.style.display = "block";

    logo.onclick = () => {
      location.reload();
    };
  }
}
