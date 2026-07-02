from fastapi import APIRouter

from app.db.task_store import complete_task, create_task, list_tasks
from app.models import Task, TaskCreate

router = APIRouter(tags=["tasks"])


@router.get("/tasks", response_model=list[Task])
def read_tasks():
    return list_tasks()


@router.post("/tasks", response_model=Task, status_code=201)
def add_task(task: TaskCreate):
    return create_task(task.title, task.category)


@router.patch("/tasks/{task_id}/complete", response_model=Task)
def mark_task_complete(task_id: int):
    return complete_task(task_id)
