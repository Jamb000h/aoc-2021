export const parseInputForDay = (file: string) => {
  const ranges = file.matchAll(/-?\d+\.\.-?\d+/g);
  return [...ranges].map((range) => range[0].split("..").map(Number));
};

export const task1 = (input: any) => {
  const minX = input[0][0];
  const maxX = input[0][1];
  const minY = input[1][0];
  const maxY = input[1][1];

  /**
   * It takes as many steps to get down from peak height as it takes to get there
   * and you stay at the peak for two steps as for one step velocity drops to 0.
   *
   * As such it means that when you reach y=0 again, your velocity for the next step
   * will be exactly (starting y velocity - 1). We want to have maximum starting y velocity,
   * so we want to aim for the first step after reaching 0 to be as big as possible
   * while still being in the target area. So it has to be at most the top of the target
   * area. As we know the velocity for the step after getting back to y=0 is (starting y velocity - 1),
   * we can set starting y velocity to be (the absolute value of the target area top - 1). Now, if
   * target area has y=10..-5, we set y velocity to 4. This way when the trajectory has y=0 after
   * starting to fall down, the next step will bring y to -5, which is as good as it gets for the
   * target area.
   */

  const y = Math.abs(minY) - 1;
  return (y * (y + 1)) / 2;
};

// Brute force :(
export const task2 = (input: any) => {
  const minX = input[0][0];
  const maxX = input[0][1];
  const minY = input[1][0];
  const maxY = input[1][1];

  const validVelocities = [];

  for (let y = minY; y <= Math.abs(minY); y++) {
    for (let x = 0; x <= maxX; x++) {
      let xV = x;
      let yV = y;
      let curX = 0;
      let curY = 0;
      let step = 0;
      while (true) {
        step++;
        curX = curX + xV;
        curY = curY + yV;
        if (curX > maxX || curY < minY) break;
        xV = xV - 1 >= 0 ? xV - 1 : 0;
        yV = yV - 1;
        if (curX >= minX && curX <= maxX && curY <= maxY && curY >= minY) {
          validVelocities.push([x, y]);
          break;
        }
      }
    }
  }

  return validVelocities.length;
};
