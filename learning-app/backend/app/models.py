from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    category: str = Field(min_length=1, max_length=50)


class Task(BaseModel):
    id: int
    title: str
    category: str
    completed: bool


class PostgresSummary(BaseModel):
    total_tasks: int
    completed_tasks: int
    open_tasks: int


class SnowflakeRow(BaseModel):
    category: str
    tasks_logged: int


class SnowflakeReport(BaseModel):
    source: str
    note: str
    rows: list[SnowflakeRow]


class AnalyticsResponse(BaseModel):
    postgres_summary: PostgresSummary
    snowflake_report: SnowflakeReport

