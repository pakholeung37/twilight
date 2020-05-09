<script>
  import Swiper, {
    next,
    prev
  } from '../components/modules/swiper/Swiper.svelte';
  import Slide from '../components/modules/swiper/Slide.svelte';
  import ArticleList from '../components/modules/article-list/ArticleList.svelte';
  import Serializer from '../components/compiler/serializer/Serializer.svelte';

  let swiperHeight = 300;
  let adaptive = false;

  let model = [
    {
      token: 'Swiper',
      props: {
        height: swiperHeight,
        adaptive: false
      },
      children: [
        {
          token: 'Slide',
          props: {
            color: 'red'
          }
        },
        {
          token: 'Slide',
          props: {
            color: 'green'
          }
        },
        {
          token: 'Slide',
          props: {
            color: 'blue'
          }
        }
      ]
    },
    {
      token: 'ArticleList',
      props: {
        articles: [
          {
            title: 'JavaScript Import Export Tutorial with Examples',
            summary:
              'So far, we have learned how to import a single module now we are going to look at how to export multiple modules and then import multiple modules in JavaScript.',
            cover: {
              src: `https://picsum.photos/${~~(600 * Math.random() + 200)}/${~~(
                600 * Math.random() +
                200
              )}`,
              alt: 'people'
            }
          },
          {
            title: 'How can I alias a default import in Javascript?',
            summary:
              'The alias on its own is esoteric! Importing the named export and the default is handy when testing redux components.',
            cover: {
              src: `https://picsum.photos/${~~(600 * Math.random() + 200)}/${~~(
                600 * Math.random() +
                200
              )}`,
              alt: 'dog'
            }
          }
        ]
      }
    }
  ];
</script>

<Serializer {model}/>
<style lang="scss">
  .slide {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-content: center;
    &-1 {
      background: red;
    }
    &-2 {
      background: blue;
    }
    &-3 {
      background: green;
    }
  }
</style>
