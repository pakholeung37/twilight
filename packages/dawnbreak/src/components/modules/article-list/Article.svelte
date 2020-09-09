<script>
  /*{
   *  title: string
   *  cover: {
   *    src: string
   *    alt: string
   *  },
   *  summary: string
   * }
   */

  export let title = "";
  export let summary = "";
  export let cover = { src: "", alt: "" };
</script>

<div class="article">
  <div class="block">
    <div class="title">{title}</div>
    <div class="summary">{summary}</div>
  </div>
  <div class="cover">
    <img src={cover.src} alt={cover.alt} />
  </div>
</div>

<style lang="scss">
  .article {
    display: flex;
    overflow: hidden;
    border: 1px aqua solid;
    box-sizing: border-box;

    & + .article {
      margin-top: 10px;
    }
    .block {
      flex-grow: 1;
      .title {
        max-height: 36px;
        overflow: hidden;
      }
      .summary {
        max-height: 64px;
        overflow: hidden;
      }
    }
    .cover {
      flex-shrink: 0;
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>
