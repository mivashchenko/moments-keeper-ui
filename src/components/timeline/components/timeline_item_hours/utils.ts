export const getSunriseSunsetColor = (hour) => {
  // Define colors for different times of the day
  const colors = {
    0: "#99c1c6", // Midnight (black)
    6: "#8bbcc2", // Sunrise (orange)
    12: "#81b8be", // Noon (yellow)
    18: "#8bbcc2", // Sunset (orange)
    24: "#99c1c6", // Midnight (black)
  };

  // Find the two closest times
  let lowerHour = 0;
  let upperHour = 24;
  for (const time in colors) {
    if (time <= hour) {
      lowerHour = Math.max(lowerHour, time);
    } else {
      upperHour = Math.min(upperHour, time);
      break;
    }
  }

  // Perform linear interpolation
  const lowerColor = colors[lowerHour];
  const upperColor = colors[upperHour];
  const interpolationFactor = (hour - lowerHour) / (upperHour - lowerHour);

  // Calculate the color based on interpolation
  const r1 = parseInt(lowerColor.slice(1, 3), 16);
  const g1 = parseInt(lowerColor.slice(3, 5), 16);
  const b1 = parseInt(lowerColor.slice(5, 7), 16);

  const r2 = parseInt(upperColor.slice(1, 3), 16);
  const g2 = parseInt(upperColor.slice(3, 5), 16);
  const b2 = parseInt(upperColor.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * interpolationFactor);
  const g = Math.round(g1 + (g2 - g1) * interpolationFactor);
  const b = Math.round(b1 + (b2 - b1) * interpolationFactor);

  return `rgb(${r}, ${g}, ${b})`;
};
