
<script lang="ts">
  import type { EpisodeT, Item, Timings, TimingT_incomplete } from '$lib/database/types';
  import Toolbar from '$lib/episode/toolbar.svelte';
  import Timing from '$lib/timing/timing.svelte';
  import { millisecondsToSeconds, transformTimestamp } from '$lib/util/logic';
  import Icon from '@iconify/svelte';
  
  interface Data {
    episode: EpisodeT
    timings: Timings<TimingT_incomplete>
  }
  let { data }: { data: Data } = $props();
  
  let timings = $derived(calculateTimings(data.episode, data.timings));
  
  
  function calculateTimings(episodeData: Data["episode"], timingsData: Data["timings"]) {
    /* TODO: remove coercion, 
      try constructing timingsEdited little by little */
    const timingsEdited = structuredClone(timingsData) as unknown as Timings; // coercion
    let ret: Timings | null = null; 
    
    const part_ids = episodeData.episode.parts;
    
    if (part_ids.length === 0) {
      console.log(`could not find parts for the episode`, );
      return ret; 
    }
    
    // part 1
    const part1 = timingsEdited.part[part_ids[0]]; 
    
    part1.front_time = timingsEdited.episode.on_air_time;
    part1.back_time = part1.front_time;
    
    // * parts iteration
    part_ids.forEach((part_id, part_ids_index) => {
      const item_ids = episodeData.part[part_id].items ?? [];
      const part = timingsEdited.part[part_id];
      part.estimated_duration = millisecondsToSeconds(part.estimated_duration);
      
      if (part_ids_index > 0) {
        const prevPart = timingsEdited.part[part_ids[part_ids_index - 1]];
        
        // part[n].back_time
        if (prevPart.back_time == null) {
          throw new Error("prevPart.back_time is nullish");
        }
        part.back_time = prevPart.back_time + prevPart.estimated_duration;
        
        // part[n].front_time
        if (prevPart.front_time == null) {
          throw new Error("prevPart.front_time is nullish");
        }
        part.front_time = prevPart.front_time + prevPart.estimated_duration;
        // part.front_time = prevPart.end_time; // simpler alternative
      }
      
      // part[n].end_time
      if (part.front_time == null) {
        throw new Error("part.front_time is nullish");
      }
      part.end_time = part.front_time + part.estimated_duration;
      
      // item 1
      const item1 = timingsEdited.item[item_ids[0]]; 
      item1.front_time = part.front_time;
      item1.back_time = item1.front_time;
      
      // * items iteration
      item_ids.forEach((item_id, item_ids_index) => {
        const item = timingsEdited.item[item_id];
        item.estimated_duration = millisecondsToSeconds(item.estimated_duration); 
        
        if (item_ids_index > 0) {
          const prevItem = timingsEdited.item[item_ids[item_ids_index - 1]];
          
          // item[n].back_time
          if (prevItem.back_time == null) {
            throw new Error("prevItem.back_time is nullish");
          }
          item.back_time = prevItem.back_time + prevItem.estimated_duration;
          
          // item[n].front_time
          if (prevItem.front_time == null) {
            throw new Error("prevItem.front_time is nullish");
          }
          item.front_time = prevItem.front_time + prevItem.estimated_duration; 
          // item.front_time = prevItem.end_time; // simpler alternative
        }
        
        // item[n].end_time
        if (item.front_time == null) {
          throw new Error("item.front_time is nullish");
        }
        item.end_time = item.front_time + item.estimated_duration;
      });
    });
    
    ret = timingsEdited/*  as Timings */; // coercion
    return ret;
  }
  
  function getTiming_items({ 
    item_ids, 
    timingsArg, 
  }: {
    item_ids: Array<Item["id"]>
    timingsArg: NonNullable<typeof timings>
    // timingsArg: Timings // more readable, less dynamic
  }) {
    const items = item_ids.map((id) => data.episode.item[id]);
    
    const item_idsFullList = Object.keys(data.episode.item);
    
    const ret = items.map(
      (item) => ({
        ...item, 
        ...timingsArg.item[item.id], 
        index: item_idsFullList.indexOf(item.id) + 1, 
      })
    );
    
    return ret;
  }
  
</script>


{#if timings}

  <Toolbar {...timings.episode} />
  
  <div class="flex justify-end">
    <div class="
      border-[#dee1e0] border-y
      basis-20
    "></div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem] pl-0
        text-[80%] text-left font-[500] text-[#343638]
        flex-auto
        flex items-center gap-2
      ">
      <button class="border-[#343638] border rounded-[50%]">
        <Icon 
          icon="material-symbols:arrow-right"
          class="text-[#7a85a7] text-[125%]"
        />
      </button>
      <span>
        Rundown
      </span>
    </div>
    
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-24
        text-[80%] text-left font-[500] text-[#343638]
        flex items-center
      ">
      Est. duration
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-28
        text-[80%] text-left font-[500] text-[#343638]
        flex items-center
      ">
      Front time
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-28
        text-[80%] text-left font-[500] text-[#343638]
        flex items-center
      ">
      End time
    </div>
    <div class="
        border-[#dee1e0] border border-l-0
        py-[.2rem] px-[.4rem]
        basis-28
        text-[80%] text-left font-[500] text-[#343638]
        flex items-center
      ">
      Back time
    </div>
    <div class="
        border-[#dee1e0] border-y
        py-[.2rem]
        basis-7
        text-[80%] text-left font-[500] text-[#343638]
        flex items-center
      ">
      <button>
        <Icon 
          icon="material-symbols:add"
          class="text-[#898989] text-[175%]"
        />
      </button>
    </div>
  </div>
  
  {#each Object.values(data.episode.part) as part}
    <Timing 
      {...part}
      items={
        getTiming_items({
          item_ids: part.items,
          timingsArg: timings,
        })
      }
      timing={timings.part[part.id]}
    />
  {/each}
  
  <footer class="mt-3 flex justify-end">
    <div class="
        py-[.2rem] px-[.4rem]
        basis-28 
        flex items-center justify-end
      "
    >
      <Icon 
        icon="material-symbols:flag-rounded"
        class="text-[#fa2705]"
      />
    </div>
    <div class="
        border-[#dee1e0] border rounded
        py-[.2rem] px-[.4rem]
        basis-28 text-right
      "
    >
      {transformTimestamp(timings.episode.off_air_time)}
    </div>
    
    <div class="basis-7"></div>
  </footer>
  
{:else}
  <!-- untested: not part of the challenge -->
	<p class="">
    Episode with id: {data.episode.episode.id} ; has no parts in it
  </p>
{/if}


