<script>
  export let color = '';
</script>

<div class="slide-container">
  {#if color == 'red'}
    <div class="slide slide-1">red</div>
  {:else if color == 'blue'}
    <div class="slide slide-2">blue</div>
  {:else if color == 'green'}
    <div class="slide slide-3">green</div>
  {/if}
  <div></div>
</div>

<style lang="scss">
  .slide-container {
    height: 100%;
    background: cyan;
  }
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
