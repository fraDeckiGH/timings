
<!-- internal component -->
<script lang="ts">
  import img_dude from '$lib/assets/dude.png';
  import type { Timings } from '$lib/database/types';
  import { transformTimestamp } from '$lib/util/logic';
  import Icon from '@iconify/svelte';
  
  let { off_air_time, on_air_time }: Timings["episode"] = $props();
  
  function get_episodeRuntime(seconds: number) {
    let timestamp = transformTimestamp(seconds);
    
    if (timestamp.length === 5) {
      timestamp = `00:${timestamp}`;
    }
    
    return timestamp;
  }
  
</script>


<header class="
      py-3 pl-3
      text-[#898989] text-[90%]
      flex
    ">
    <button>
      <Icon
        icon="material-symbols:arrow-left-alt"
        class="text-[175%]"
      />
    </button>
    
    <div class="
        border-x border-[#dee1e0]
        flex-auto flex
      ">
      <!-- fake select/dropdown menu -->
      <div class="
          ml-4
          flex items-center gap-1
        ">
        <span class="font-[500]">
          Live
        </span>
        <button>
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            class="text-[125%]"
          />
        </button>
      </div>
      
      <div class="
          ml-5
          flex items-center gap-1
        ">
        <Icon
          icon="material-symbols:flag-rounded"
          class="text-[#50ac4f]"
        />
        {transformTimestamp(on_air_time)}
      </div>
      
      <div class="
          ml-5
          flex items-center gap-1
        ">
        <Icon
          icon="material-symbols:flag-rounded"
          class="text-[#fa2705]"
        />
        {transformTimestamp(off_air_time)}
      </div>
      
      <div class="
          ml-5
          flex items-center gap-1
        ">
        <Icon
          icon="material-symbols:timer-outline"
          class=""
        />
        {get_episodeRuntime(off_air_time - on_air_time)}
      </div>
      
    </div>
    <div class="flex items-center gap-1  pl-5">
      
      <img class="h-8" src={img_dude} alt="dude.png">
      <button>
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          class="text-[175%]"
        />
      </button>
      
    </div>
  </header>

  
