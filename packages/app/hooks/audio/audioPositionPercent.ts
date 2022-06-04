const audioPositionPercent = (duration?: number, position?: number) => {
  if (duration && position) {
    return position / duration;
  }
  return 0;
};

export default audioPositionPercent;
