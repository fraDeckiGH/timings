
<script lang="ts">
  import { slide } from "svelte/transition";
  
  interface Props {
    children: () => any
    class?: string
  }
  let { children, class: cls = "" }: Props = $props();
  
</script>


<!-- this cmp was not useless while building, but now is -->

<td class="p-0 {cls}" transition:slide|global>
  {@render children()}
</td>


<style></style>
