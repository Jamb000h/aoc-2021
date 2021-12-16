import { productOf, sumOf } from "../utils";

type Packet = {
  version: number;
  type: number;
  value?: number;
  subpackets?: Packet[];
  mode?: number;
  length?: number;
};

const hexToByte = (hex: string) => {
  switch (hex) {
    case "0":
      return "0000";
    case "1":
      return "0001";
    case "2":
      return "0010";
    case "3":
      return "0011";
    case "4":
      return "0100";
    case "5":
      return "0101";
    case "6":
      return "0110";
    case "7":
      return "0111";
    case "8":
      return "1000";
    case "9":
      return "1001";
    case "A":
      return "1010";
    case "B":
      return "1011";
    case "C":
      return "1100";
    case "D":
      return "1101";
    case "E":
      return "1110";
    case "F":
      return "1111";
    default:
      return "";
  }
};

export const parseInputForDay = (file: string) => {
  return file.split("").map(hexToByte).join("");
};

const parseLiteralValue = (binary: string) => {
  let literalValue = "";
  let i = 0;
  while (true) {
    const part = binary.slice(i + 1, i + 5);
    literalValue += part;
    if (binary.charAt(i) === "0") break;
    i += 5;
  }
  i += 5;
  return { literalValue, i };
};

const parsePacket = (input: string): Packet => {
  const packet: Packet = {
    version: parseInt(input.slice(0, 3), 2),
    type: parseInt(input.slice(3, 6), 2),
  };
  input = input.slice(6);
  if (packet.type === 4) {
    let literalValue = "";
    let i = 0;
    while (true) {
      const part = input.slice(i + 1, i + 5);
      literalValue += part;
      if (input.charAt(i) === "0") break;
      i += 5;
    }
    i += 5;
    packet.value = parseInt(literalValue, 2);
    packet.length = 6 + i;
    input = input.slice(i);
    return packet;
  } else {
    packet.mode = parseInt(input.slice(0, 1), 2);
    input = input.slice(1);

    if (packet.mode === 0) {
      const subpacketsLength = parseInt(input.slice(0, 15), 2);
      input = input.slice(15);
      packet.subpackets = [];
      while (true) {
        packet.subpackets.push(parsePacket(input));
        input = input.slice(
          packet.subpackets[packet.subpackets.length - 1].length
        );
        if (
          sumOf(packet.subpackets.map((p) => p.length)) === subpacketsLength
        ) {
          break;
        }
      }
      packet.length =
        6 + 1 + 15 + sumOf(packet.subpackets.map((p) => p.length));
    } else {
      const numberOfSubpackets = parseInt(input.slice(0, 11), 2);
      input = input.slice(11);
      packet.subpackets = [];
      for (let i = 0; i < numberOfSubpackets; i++) {
        packet.subpackets.push(parsePacket(input));
        input = input.slice(
          packet.subpackets[packet.subpackets.length - 1].length
        );
      }
      packet.length =
        6 + 1 + 11 + sumOf(packet.subpackets.map((p) => p.length));
    }

    if (packet.type === 0) {
      packet.value = sumOf(packet.subpackets.map((s) => s.value));
    }

    if (packet.type === 1) {
      packet.value = productOf(packet.subpackets.map((s) => s.value));
    }

    if (packet.type === 2) {
      packet.value = packet.subpackets.map((s) => s.value).sortAscending()[0];
    }

    if (packet.type === 3) {
      packet.value = packet.subpackets.map((s) => s.value).sortDescending()[0];
    }

    if (packet.type === 5) {
      packet.value =
        packet.subpackets[0].value > packet.subpackets[1].value ? 1 : 0;
    }

    if (packet.type === 6) {
      packet.value =
        packet.subpackets[0].value < packet.subpackets[1].value ? 1 : 0;
    }

    if (packet.type === 7) {
      packet.value =
        packet.subpackets[0].value === packet.subpackets[1].value ? 1 : 0;
    }
  }

  return packet;
};

const versionSum = (packet: Packet): number => {
  if (packet.subpackets) {
    return packet.version + sumOf(packet.subpackets.map(versionSum));
  }
  return packet.version;
};

export const task1 = (input: string) => {
  const packet = parsePacket(input);
  return versionSum(packet);
};

export const task2 = (input: string) => {
  const packet = parsePacket(input);
  return packet.value.toString();
};
