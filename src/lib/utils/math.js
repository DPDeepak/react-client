
export function getRandomNumber(total) {
  return Math.floor(Math.random() * (total));
}

export function getNextRoundRobin(total, current) {
  const temp = total - 1;
  if (current < temp) {
    return current + 1;
  }
  return 0;
}
