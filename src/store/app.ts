import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  pages: [
    {
      id: 0,
      name: "index",
      content: {
        root: true,
        type: "container",
        props: [],
        children: [
          // {
          //   type: "swiper",
          //   props: {
          //     height: 300,
          //     adaptive: false,
          //   },
          //   children: [
          //     {
          //       type: "slide",
          //       props: {
          //         color: "red",
          //       },
          //     },
          //     {
          //       type: "slide",
          //       props: {
          //         color: "green",
          //       },
          //     },
          //     {
          //       type: "slide",
          //       props: {
          //         color: "blue",
          //       },
          //     },
          //   ],
          // },
          {
            type: "article-list",
            props: {
              articles: [
                {
                  title: "JavaScript Import Export Tutorial with Examples",
                  summary:
                    "So far, we have learned how to import a single module now we are going to look at how to export multiple modules and then import multiple modules in JavaScript.",
                  cover: {
                    src: `https://picsum.photos/${~~(
                      600 * Math.random() +
                      200
                    )}/${~~(600 * Math.random() + 200)}`,
                    alt: "people",
                  },
                },
                {
                  title: "How can I alias a default import in Javascript?",
                  summary:
                    "The alias on its own is esoteric! Importing the named export and the default is handy when testing redux components.",
                  cover: {
                    src: `https://picsum.photos/${~~(
                      600 * Math.random() +
                      200
                    )}/${~~(600 * Math.random() + 200)}`,
                    alt: "dog",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  activePageIndex: -1,
};

export default createSlice({
  name: "app",
  initialState,
  reducers: {},
}).reducer;
