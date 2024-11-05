
<script lang="ts">
  import Self from "./timing.svelte";
  import type { EpisodeT_common, Item, TimingT } from "$lib/database/types";
  import Cell from "$lib/episode/cell.svelte";
  import { transformTimestamp } from "$lib/util/logic";
  import Icon from "@iconify/svelte";
  import { slide } from "svelte/transition";
  
  interface Props extends EpisodeT_common {
    index?: number
    items?: Array<(Item & TimingT)>
    timing: TimingT
  }
  let { id, title, index, items, timing }: Props = $props();
  
  let collapsed = $state(items ? false : true);
  let type = $derived(getFirstWord(title).toLowerCase());
  
  
  function getFirstWord(input: string) {
    return input.split(' ')[0];
  }
  
</script>


<!-- I was undecided between using grid, flex or table, 
  after not much time I realized that I should have used flex. 
-->
<tr 
  class="
    row row-AAiBuBWTSoQyHK2vmkIS6 {type}
    {type === "item" ? "border-solid border-b-[.3em] border-transparent" : null}
  "
  
>
  <Cell>
    <div 
      class="
        {type === "part" ? "border-solid border-y border-[#dee1e0]" : null}
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        text-center text-[#909094]
      "
    >
      {#if index}
        {index}
      {:else}
        &nbsp;
      {/if}
    </div>
  </Cell>
  <Cell 
      class={`
        w-40
      `}
    >
    <div class="
        border-solid border-[#dee1e0] 
        {type === "item" ? "border border-r-0 rounded-l" : "border-y"}
        py-[.2rem] px-[.4rem] pl-0
        {type === "part" ? "bg-[#eaebf1]" : null}
        flex items-center
      "
    >
      
      <button 
        onclick={() => collapsed = !collapsed}
      >
        <Icon 
          icon={collapsed ? "material-symbols:arrow-right" : "material-symbols:arrow-drop-down"}
          class="text-[#7a85a7] text-[125%]"
        />
      </button>
      
      {#if type === "item"}
        <span 
          class="
            bg-[#7a85a7] text-white 
            ml-2 px-[.3rem] py-[.05rem] rounded
            font-medium uppercase text-[85%]
          "
        >
          {getFirstWord(title)} {index}
        </span>
      {:else}
        <span 
          class="
            ml-2 px-[.3rem] py-[.05rem]
            font-medium uppercase leading-none
          "
        >
          {getFirstWord(title)}
        </span>
      {/if}
      
      <div class="">&nbsp;</div>
    </div>
  </Cell>
  <Cell>
    <div class="
        border-solid border border-[#dee1e0] border-l-0
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        font-[700] {type === "part" ? "text-[#3a3c40]" : null}
      "
    >
      {title}
    </div>
  </Cell>
  <Cell>
    <div class="
        border-solid border border-[#dee1e0] border-l-0
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        {type === "part" ? "font-[700]" : null}
        text-right
      "
    >
      {transformTimestamp(timing.estimated_duration)}
    </div>
  </Cell>
  <Cell>
    <div class="
        border-solid border border-[#dee1e0] border-l-0
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        {type === "part" ? "font-[700] text-[#898989]" : null}
        text-right
      "
    >
      {transformTimestamp(timing.front_time)}
    </div>
  </Cell>
  <Cell>
    <div class="
        border-solid border border-[#dee1e0] border-l-0
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        {type === "part" ? "font-[700]" : null} text-[#898989]
        text-right
      "
    >
      {transformTimestamp(timing.end_time)}
    </div>
  </Cell>
  <Cell>
    <div class="
        border-solid border border-[#dee1e0] border-l-0 {type === "item" ? "rounded-r" : null}
        py-[.2rem] px-[.4rem]
        {type === "part" ? "bg-[#eaebf1]" : null}
        {type === "part" ? "font-[700] text-[#898989]" : null}
        text-right
      "
    >
      {transformTimestamp(timing.back_time)}
    </div>
  </Cell>
</tr>

{#if !collapsed}
  {#if items}
    
    {#each items as item}
      <Self 
        {...item} 
        timing={{...item}}
      />
    {/each}
    
  {:else}
    
    <tr>
      <td colspan="7" class="text-center">
        No additional nested content to show for this {getFirstWord(title)}
      </td>
    </tr>
    
  {/if}
{/if}


<style>
  :global {
    /* Tailwind's solution is not intuitive */
    .row-AAiBuBWTSoQyHK2vmkIS6.part + .row-AAiBuBWTSoQyHK2vmkIS6.item {
      /* border-top: .5em solid transparent; */
      border-top-width: .5em;
    }
  }
  
</style>
