const path = require("path"); // 파일까지의 경로
// console.log(path.resolve(__dirname, "assets", "js")); // 파일까지의 경로 + 나머지 경로
// console.log(__dirname);
module.exports = {
  entry: "./src/client/js/main.js", // 작업할 파일
  mode: "development", // 개발중인지 완성 단계인지
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js") // 저장할 곳 (절대 경로)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]]
          }
        }
      }
    ]
  }
};
// rules는 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정하는 것이다.
// 즉 babel-loder를 통해 test 파일들을 변경하는 것이다.
