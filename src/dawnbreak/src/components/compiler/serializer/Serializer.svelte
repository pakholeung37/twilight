<script>
  import ArticleList from '../../modules/article-list/ArticleList.svelte';
  import Swiper from '../../modules/swiper/Swiper.svelte';
  import Slide from '../../modules/swiper/Slide.svelte';

  /**
   * interface Node = {
   *  type: NodeType,
   *  props: {}
   *  children: Node[]
   * }
   * model = Node[] | Node
   */
  export let model;

  const componentMap = {
    Swiper: Swiper,
    Slide: Slide,
    ArticleList: ArticleList
  };

  function getComponent(node) {
    const token = node.token;
    const component = componentMap[token];
    if (!component)
      throw new Error(`[serializer] invaild node type: ${node.type}`);
    return component;
  }
</script>

{#if Array.isArray(model)}
  {#each model as node}
    <svelte:component this={getComponent(node)} {...node.props}>
      {#if node.children && node.children.length}
        {#each node.children as child}
          <svelte:self model={child} />
        {/each}
      {/if}
    </svelte:component>
  {/each}
{:else if model}
  <svelte:component this={getComponent(model)} {...model.props} />
{/if}
