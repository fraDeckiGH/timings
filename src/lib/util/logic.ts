

export {
  millisecondsToSeconds, 
  transformTimestamp, 
}


function millisecondsToSeconds(millis: number) {
  return Math.floor(millis / 1000);
}

function transformTimestamp(seconds: number) {
  const date = new Date(seconds * 1000);
  
  function pad(val: number) {
    const ret = (val + "").length > 1 ? `${val}` : `0${val}`;
    return ret;
  }
  
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  
  const timeString = `${
    hh === "00" ? "" : hh + ":"
  }${
    mm + ":"
  }${
    ss
  }`;
  
  return timeString;
}



