from collections import defaultdict, deque
from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Pipeline Studio API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://vectorshift-assignment-da7y.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []


class ParseResult(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def is_directed_acyclic_graph(node_ids: List[str], edges: List[Dict[str, Any]]) -> bool:
    """Kahn's algorithm: repeatedly remove nodes with in-degree 0.
    If every node can be removed this way, there's no cycle."""
    adjacency: Dict[str, List[str]] = defaultdict(list)
    in_degree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source is None or target is None:
            continue
        # Defend against edges that reference a node not present in `nodes`.
        if source not in in_degree or target not in in_degree:
            continue
        adjacency[source].append(target)
        in_degree[target] += 1

    queue = deque([node_id for node_id, deg in in_degree.items() if deg == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=ParseResult)
def parse_pipeline(pipeline: Pipeline):
    node_ids = [node.get("id") for node in pipeline.nodes if node.get("id") is not None]

    return ParseResult(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_directed_acyclic_graph(node_ids, pipeline.edges),
    )
