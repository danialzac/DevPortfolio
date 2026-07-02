import json
from pathlib import Path


DATA_DIR = Path(__file__).resolve().parents[2] / "data"
DATA_FILE = DATA_DIR / "demo_tasks.json"

DEFAULT_TASKS = [
    {
        "id": 1,
        "title": "Review core PostgreSQL queries",
        "category": "Technical",
        "completed": True,
    },
    {
        "id": 2,
        "title": "Write 3 STAR interview stories",
        "category": "Behavioral",
        "completed": False,
    },
    {
        "id": 3,
        "title": "Sketch a simple system design answer",
        "category": "System Design",
        "completed": False,
    },
]


def _ensure_demo_file():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps(DEFAULT_TASKS, indent=2))


def read_demo_tasks():
    _ensure_demo_file()
    return json.loads(DATA_FILE.read_text())


def write_demo_tasks(tasks):
    DATA_FILE.write_text(json.dumps(tasks, indent=2))

