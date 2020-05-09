<script>
  import Article from "./Article.svelte";
  /**
   * articles = Article[]
   */
  export let articles = [];
</script>

<style lang="scss">
  .article-list {
    background: orange;
    padding: 10px;
  }
</style>

<ul class="article-list">
  {#each articles as article}
    <Article {...article} />
  {/each}
</ul>
