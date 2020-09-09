<script>
  import Article from "./Article.svelte";
  /**
   * articles = Article[]
   */
  export let articles = [];
</script>

<ul class="article-list">
  {#each articles as article}
    <Article {...article} />
  {/each}
</ul>

<style lang="scss">
  .article-list {
    background: orange;
    padding: 10px;
  }
</style>
