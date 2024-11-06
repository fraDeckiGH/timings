
<script lang="ts">
  import Self from "./timing.svelte";
  import type { EpisodeT_common, Item, TimingT } from "$lib/database/types";
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


<!-- I was undecided between using grid, flex or table -->
<article class="
    row-AAiBuBWTSoQyHK2vmkIS6 {type}
    {type === "item" ? "mt-1" : null}
    {type === "part" ? "bg-[#eaebf1]" : null}
    flex justify-end
  ">
    <div class="
        {type === "part" ? "border-[#dee1e0] border-y" : null}
        py-[.2rem] px-[.4rem]
        basis-20
        text-center text-[#909094] text-[85%]
      ">
      {index}
    </div>
    <div class="
        border-[#dee1e0] {type === "item" ? "border border-r-0 rounded-l" : "border-y"}
        py-[.2rem] px-[.4rem] pl-0
        basis-40
        flex items-center
      ">
      
      <button onclick={() => collapsed = !collapsed}>
        <Icon 
          icon={collapsed ? "material-symbols:arrow-right" : "material-symbols:arrow-drop-down"}
          class="text-[#7a85a7] text-[125%]"
        />
      </button>
      
      {#if type === "item"}
        <span class="
            bg-[#7a85a7] text-white 
            ml-2 px-[.3rem] py-[.05rem] rounded
            font-[500] uppercase text-[85%]
          ">
          {getFirstWord(title)} {index}
        </span>
      {:else}
        <span class="
            ml-2 px-[.3rem] py-[.05rem]
            font-[500] uppercase leading-none
          ">
          {getFirstWord(title)}
        </span>
      {/if}
      
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        flex-auto
        font-[700] {type === "part" ? "text-[#3a3c40]" : null}
      ">
      {title}
    </div>
    
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-24
        {type === "part" ? "font-[700]" : null}
        text-right
      ">
      {transformTimestamp(timing.estimated_duration)}
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-28
        {type === "part" ? "font-[700] text-[#898989]" : null}
        text-right
      ">
      {transformTimestamp(timing.front_time)}
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-28
        {type === "part" ? "font-[700]" : null} text-[#898989]
        text-right
      ">
      {transformTimestamp(timing.end_time)}
    </div>
    <div class="
        border-[#dee1e0] border border-l-0 {type === "item" ? "rounded-r" : null}
        py-[.2rem] px-[.4rem]
        basis-28
        {type === "part" ? "font-[700] text-[#898989]" : null}
        text-right
      ">
      {transformTimestamp(timing.back_time)}
    </div>
    
    <div class="
      {type === "part" ? "border-[#dee1e0] border-y" : null}
      basis-7
    "></div>
</article>

{#if !collapsed}
  <div class="
      border-[#dee1e0] {items ? "border-y last-of-type:border-b-0" : "border-b-0"}
      {items ? "py-1 last-of-type:pb-0" : null}
      flex flex-col justify-center
    "
    transition:slide
  >
    {#if items}
      
      {#each items as item}
        <Self 
          {...item} 
          timing={{...item}}
        />
      {/each}
      
    {:else}
      <p class="self-center text-orange-400">
        No additional nested content to show for this {getFirstWord(title)}
      </p>
    {/if}
  </div>
{/if}


