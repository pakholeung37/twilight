module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  // babel: {
  //   presets: [
  //     [
  //       "@babel/preset-react",
  //       { runtime: "automatic", importSource: "@emotion/react" },
  //     ],
  //   ],
  //   env: {
  //     production: {
  //       plugins: ["@emotion/babel-plugin"],
  //     },
  //     development: {
  //       plugins: [["@emotion/babel-plugin", { sourceMap: true }]],
  //     },
  //   },
  // },
}
