const quotes = [
  {
    quote:
      "끊임없이 노력하라. 체력이나 지능이 아니라 노력이야말로 잠재력의 자물쇠를 푸는 열쇠다.",
    author: "처칠"
  },
  {
    quote: "위대한 것으로 향하기 위해 좋은 것을 포기하는 걸 두려워하지 마라.",
    author: "존 록펠러"
  },
  { quote: "혁신이 지도자와 추종자를 가른다.", author: "스티브 잡스" },
  {
    quote:
      "당신이 세상을 바꿀 수 없다고 말하는 사람에는 두 종류가 있다. 시도하기를 두려워하는 사람들, 당신이 성공할까 봐 두려워하는 사람들.",
    author: "레이 고포스"
  },
  { quote: "모든 성취의 시작점은 갈망이다.", author: "나폴레온 힐" },
  {
    quote: "미치지 않고 죽어도 되는 일만 내일로 미뤄라.",
    author: "파블로 피카소"
  },
  {
    quote: "패배의 공포가 승리의 짜릿함보다 커지게 하지 마라.",
    author: "로버트 키요사키"
  },
  {
    quote: "과정에서 재미를 느끼지 못하는데 성공하는 일은 거의 없다.",
    author: "데일 카네기"
  },
  {
    quote: "모방해서 성공하는 것보다 독창적으로 실패하는 게 더 낫다.",
    author: "허먼 멜빌"
  },
  {
    quote:
      "성취의 크기는 목표를 이루기 위해 당신이 극복해야 했던 장애물의 크기로 잰다.",
    author: "부커T.워싱턴"
  }
];

const quote = document.querySelector("#quote p:first-child");
const author = document.querySelector("#quote p:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
