const quote_list = [
  {
    quote:
      "신은 그저 질문하는 자일 뿐 운명은 내가 던지는 질문이다. 답은 그대들이 찾아라.",
    author: "드라마 <도깨비>",
  },
  {
    quote:
      "달릴 때는 자기 페이스가 정말 중요해요. 힘들면 천천히 뛰어도 되니까 포기하지만 말아요.",
    author: "드라마 <런 온>",
  },
  {
    quote: "그대의 하루하루를 그대의 마지막 날이라고 생각하라.",
    author: "호라티우스",
  },
  {
    quote: "우리의 나태에 대한 벌로서 타인의 성공이 있다.",
    author: "쥘 르나르",
  },
  {
    quote:
      "가치 있는 목표를 향한 움직임을 개시하는 순간 당신의 성공은 시작된다.",
    author: "찰스 칼슨",
  },
];
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

const choose_quote = quote_list[Math.floor(Math.random() * quote_list.length)];
console.log(Math.round(Math.random() * quote_list.length));
quote.innerText = choose_quote.quote;
author.innerText = choose_quote.author;
