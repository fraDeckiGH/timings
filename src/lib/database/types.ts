
export type {
  EpisodeT, 
  EpisodeT_common, 
  Item, 
  Part, 
  Timings, 
  TimingT, 
  TimingT_incomplete, 
}


/** named EpisodeT instead of Episode so it does not get confused 
  with the component */
interface EpisodeT {
  episode: EpisodeT_common & {
    status: "active" | string
    parts: Array<Part["id"]>
  }
  part: Record<Part["id"], Part>
  item: Record<Item["id"], Item>
}
/** common/recurring properties found within EpisodeT */
interface EpisodeT_common {
  id: string
  title: string
}

interface Item extends EpisodeT_common {}

interface Part extends EpisodeT_common {
  items: (Item["id"])[]
}


interface Timings<Timing = TimingT> {
  episode: {
    on_air_time: number
    off_air_time: number
  },
  part: Record<Part["id"], Timing>
  item: Record<Item["id"], Timing>
}

/** named TimingT instead of Timing so it does not get confused 
  with the component */
interface TimingT {
  estimated_duration: number
  front_time: number
  end_time: number
  back_time: number
}

interface TimingT_incomplete {
  estimated_duration: TimingT["estimated_duration"]
  // front_time: TimingT["front_time"] | null
  // end_time: TimingT["end_time"] | null
  // back_time: TimingT["back_time"] | null
  front_time: null
  end_time: null
  back_time: null
}



