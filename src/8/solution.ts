import { getLines, sumOf } from "../utils";

export const parseInputForDay = (file: string) => {
  return {
    inputs: getLines(file).map((x) => x.split("|")[0].trim()),
    outputs: getLines(file).map((x) => x.split("|")[1].trim()),
  };
};

export const task1 = (input: any) => {
  const { outputs } = input;
  const ones = sumOf(
    outputs.reduce((prev, cur) => {
      return [
        ...prev,
        cur.split(" ").filter((x) => x.trim().length === 2).length,
      ];
    }, [])
  );
  const fours = sumOf(
    outputs.reduce((prev, cur) => {
      return [
        ...prev,
        cur.split(" ").filter((x) => x.trim().length === 4).length,
      ];
    }, [])
  );
  const sevens = sumOf(
    outputs.reduce((prev, cur) => {
      return [
        ...prev,
        cur.split(" ").filter((x) => x.trim().length === 3).length,
      ];
    }, [])
  );
  const eights = sumOf(
    outputs.reduce((prev, cur) => {
      return [
        ...prev,
        cur.split(" ").filter((x) => x.trim().length === 7).length,
      ];
    }, [])
  );
  return sumOf([ones, fours, sevens, eights]);
};

export const task2 = (input: any) => {
  const { inputs, outputs } = input;
  const values = (inputs as string[]).reduce((prev, cur, i) => {
    const oneLetters = cur
      .trim()
      .split(" ")
      .find((x) => x.length === 2)
      .trim()
      .split("");
    const fourLetters = cur
      .trim()
      .split(" ")
      .find((x) => x.length === 4)
      .trim()
      .split("");
    const sevenLetters = cur
      .trim()
      .split(" ")
      .find((x) => x.length === 3)
      .trim()
      .split("");
    const eightLetters = cur
      .trim()
      .split(" ")
      .find((x) => x.length === 7)
      .trim()
      .split("");
    const sixLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 6 &&
          oneLetters.some((y) => !x.trim().split("").includes(y))
      )[0]
      .trim()
      .split("");
    const threeLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 5 &&
          oneLetters.every((y) => x.trim().split("").includes(y))
      )[0]
      .trim()
      .split("");

    const fiveLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 5 &&
          x
            .trim()
            .split("")
            .every((y) => sixLetters.includes(y))
      )[0]
      .trim()
      .split("");
    const twoLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 5 &&
          fiveLetters.some((y) => !x.trim().split("").includes(y)) &&
          threeLetters.some((y) => !x.trim().split("").includes(y))
      )[0]
      .trim()
      .split("");
    const nineLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 6 &&
          oneLetters.every((y) => x.trim().split("").includes(y)) &&
          fiveLetters.every((y) => x.trim().split("").includes(y))
      )[0]
      .trim()
      .split("");
    const zeroLetters = cur
      .trim()
      .split(" ")
      .filter(
        (x) =>
          x.length === 6 &&
          sixLetters.some((y) => !x.trim().split("").includes(y)) &&
          nineLetters.some((y) => !x.trim().split("").includes(y))
      )[0]
      .trim()
      .split("");
    const letterValues = [
      zeroLetters,
      oneLetters,
      twoLetters,
      threeLetters,
      fourLetters,
      fiveLetters,
      sixLetters,
      sevenLetters,
      eightLetters,
      nineLetters,
    ];
    const outputS = outputs[i].split(" ");
    const outputValues = outputS.map((o) => {
      return letterValues.findIndex(
        (x) =>
          o
            .trim("")
            .split("")
            .every((op) => x.includes(op)) && x.length === o.length
      );
    });
    return [...prev, outputValues.reduce((prev, cur) => prev + cur, "")];
  }, []);
  return sumOf(values.map(Number));
};
