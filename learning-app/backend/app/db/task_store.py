from fastapi import HTTPException

from app.config import settings
from app.db.demo_data import read_demo_tasks, write_demo_tasks
from app.db.postgres import get_postgres_connection


def list_tasks():
    if settings.use_demo_data:
        return sorted(read_demo_tasks(), key=lambda task: task["id"], reverse=True)

    with get_postgres_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, title, category, completed
                FROM prep_tasks
                ORDER BY id DESC
                """
            )
            return cursor.fetchall()


def create_task(title: str, category: str):
    if settings.use_demo_data:
        tasks = read_demo_tasks()
        next_id = max((task["id"] for task in tasks), default=0) + 1
        created_task = {
            "id": next_id,
            "title": title,
            "category": category,
            "completed": False,
        }
        tasks.append(created_task)
        write_demo_tasks(tasks)
        return created_task

    with get_postgres_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO prep_tasks (title, category)
                VALUES (%s, %s)
                RETURNING id, title, category, completed
                """,
                (title, category),
            )
            created_task = cursor.fetchone()
        connection.commit()
        return created_task


def complete_task(task_id: int):
    if settings.use_demo_data:
        tasks = read_demo_tasks()
        updated_task = None

        for task in tasks:
            if task["id"] == task_id:
                task["completed"] = True
                updated_task = task
                break

        if not updated_task:
            raise HTTPException(status_code=404, detail="Task not found")

        write_demo_tasks(tasks)
        return updated_task

    with get_postgres_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE prep_tasks
                SET completed = TRUE
                WHERE id = %s
                RETURNING id, title, category, completed
                """,
                (task_id,),
            )
            updated_task = cursor.fetchone()
        connection.commit()

    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated_task


def get_postgres_style_summary():
    if settings.use_demo_data:
        tasks = read_demo_tasks()
        total_tasks = len(tasks)
        completed_tasks = sum(1 for task in tasks if task["completed"])
        open_tasks = total_tasks - completed_tasks
        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "open_tasks": open_tasks,
        }

    with get_postgres_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    COUNT(*) AS total_tasks,
                    COUNT(*) FILTER (WHERE completed = TRUE) AS completed_tasks,
                    COUNT(*) FILTER (WHERE completed = FALSE) AS open_tasks
                FROM prep_tasks
                """
            )
            return cursor.fetchone()

