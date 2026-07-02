from fastapi import APIRouter

from app.config import settings
from app.db.snowflake import get_snowflake_connection, snowflake_is_configured
from app.db.task_store import get_postgres_style_summary
from app.models import AnalyticsResponse

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/summary", response_model=AnalyticsResponse)
def get_summary():
    postgres_summary = get_postgres_style_summary()

    snowflake_report = {
        "source": "demo fallback",
        "note": "Snowflake is not configured yet, so the API returns sample reporting rows.",
        "rows": [
            {"category": "Technical", "tasks_logged": 4},
            {"category": "Behavioral", "tasks_logged": 2},
            {"category": "System Design", "tasks_logged": 1},
        ],
    }

    if settings.use_demo_data:
        snowflake_report["note"] = (
            "The app is in demo-data mode, so PostgreSQL is skipped and Snowflake uses sample rows."
        )

    if snowflake_is_configured():
        with get_snowflake_connection() as connection:
            with connection.cursor() as cursor:
                # This query is intentionally tiny so the user can compare it with the PostgreSQL query above.
                cursor.execute(
                    """
                    SELECT category, tasks_logged
                    FROM interview_task_category_summary
                    ORDER BY tasks_logged DESC
                    LIMIT 5
                    """
                )
                rows = cursor.fetchall()

        snowflake_report = {
            "source": "snowflake",
            "note": "These rows came from a simple reporting table in Snowflake.",
            "rows": [
                {"category": row[0], "tasks_logged": row[1]}
                for row in rows
            ],
        }

    return {
        "postgres_summary": postgres_summary,
        "snowflake_report": snowflake_report,
    }
