const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js", // 바꾸고자 하는 파일
    commentSection: BASE_JS + "commentSection.js"
  },
  mode: "development", // 개발 중인지, 완료(production) 되었는지 (default: production)
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    })
  ],
  output: {
    // 결과물 지정
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true
  },
  module: {
    rules: [
      {
        // 모든 js 파일에 대해서 babel-loader로 브라우저가 이해할 수 있는 옛 코드로 전환시킨다
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
          }
        }
      },
      // scss
      // scss -> normal css (sass-loader) 1
      // css-loader (import, url...) 2
      // css into website (style-loader) 3 // X
      // MiniCssExtractPlugin -> css 코드 분리하여 별도 파일로 저장
      {
        test: /\.scss$/,
        // webpack은 역순으로 실행됨
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
};
