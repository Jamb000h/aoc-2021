import { getDefaultLibFilePath } from "typescript";
import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((edge) => edge.split("-"));
};

enum VertexType {
  START = "START",
  END = "END",
  BIG_CAVE = "BIG_CAVE",
  SMALL_CAVE = "SMALL_CAVE",
}

type Vertex = {
  key: string;
  type: VertexType;
  visited: boolean;
};

type Graph = {
  V: {
    [key: string]: Vertex;
  };
  E: {
    [key: string]: Vertex[];
  };
};

const getType = (v: string): VertexType => {
  switch (v) {
    case "start":
      return VertexType.START;
    case "end":
      return VertexType.END;
    default:
      if (v === v.toUpperCase()) {
        return VertexType.BIG_CAVE;
      }
      return VertexType.SMALL_CAVE;
  }
};

const getVertex = (v: string): Vertex => {
  return {
    key: v,
    type: getType(v),
    visited: false,
  };
};

const getGraph = (edges: string[][]) => {
  const V = {};
  const E = {};
  edges.forEach((edge) => {
    const [from, to] = edge;
    V[from] = V[from] || getVertex(from);
    V[to] = V[to] || getVertex(to);
    E[from] = E[from] || [];
    E[to] = E[to] || [];
    E[from].push(V[to]);
    E[to].push(V[from]);
  });
  return {
    V,
    E,
  };
};

const someSmallCaveVisitedTwice = (path: Vertex[]): boolean => {
  const caveVisits = {};
  for (const v of path) {
    if (v.type === VertexType.SMALL_CAVE) {
      caveVisits[v.key] = caveVisits[v.key] || 0;
      caveVisits[v.key] += 1;

      if (caveVisits[v.key] > 1) {
        return true;
      }
    }
  }
  return false;
};

const butNotThisCave = (v: Vertex, path: Vertex[]): boolean =>
  path.every((p) => v.key !== p.key);

const search = (
  current: Vertex,
  graph: Graph,
  path: Vertex[],
  allowPassingASmallCaveTwice = false
): Vertex[][] => {
  // Score!
  if (current.type === VertexType.END) {
    return [[...path, current]];
  }

  if (current.type !== VertexType.BIG_CAVE) {
    current.visited = true;
  }

  const validPaths = [];
  const validConnections = graph.E[current.key].filter((v) => {
    if (allowPassingASmallCaveTwice) {
      // Task 2 constraint
      if (v.type === VertexType.SMALL_CAVE) {
        if (someSmallCaveVisitedTwice([...path, current])) {
          return butNotThisCave(v, path);
        }
        return true;
      }
    }
    // Normal case
    return !v.visited;
  });

  // Look daddy, recursion
  validConnections.forEach((connection) => {
    const paths = search(
      connection,
      graph,
      [...path, current],
      allowPassingASmallCaveTwice
    );
    validPaths.push(...paths);
  });

  current.visited = false;
  return validPaths;
};

export const task1 = (input: any) => {
  const graph = getGraph(input);
  const start = graph.V["start"];
  start.visited = true;
  return search(start, graph, []).filter((path) => path.length > 0).length;
};

export const task2 = (input: any) => {
  const graph = getGraph(input);
  const start = graph.V["start"];
  start.visited = true;
  return search(start, graph, [], true).filter((path) => path.length > 0)
    .length;
};
