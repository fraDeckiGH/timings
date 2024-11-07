
<script lang="ts">
  import episode from '$lib/database/episode.json';
  import timings from '$lib/database/timings.json';
  import Episode from '$lib/episode/episode.svelte';
  
</script>


<!-- <div class="page-container"> -->
  <main class="">
    <Episode data={{ episode, timings }} />
  </main>
<!-- </div> -->


<!-- svelte-ignore css-unused-selector -->
<style>
  /* I'ld avoid doing this kind of setup in Tailwind */
  .page-container {
    flex: 1;
    
    /* y-axis */
    padding-top: max(2.5em, env(safe-area-inset-top));
    padding-bottom: max(5em, env(safe-area-inset-bottom));
    
    /* x-axis */
    --mx: auto;
    margin-right: var(--mx);
    margin-left: var(--mx);
    
    --px: 20px;
    width: max(1280px + (var(--px) * 2), 85%);
    max-width: 100%;
    
    padding-right: max(var(--px), env(safe-area-inset-right));
    padding-left: max(var(--px), env(safe-area-inset-left));
  }
  
</style>


