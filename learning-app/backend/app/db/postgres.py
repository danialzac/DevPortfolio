import psycopg
from psycopg.rows import dict_row

from app.config import settings


def get_postgres_connection():
    # Keeping the connection code in one file lowers the chance of copy-paste mistakes.
    return psycopg.connect(
        host=settings.postgres_host,
        port=settings.postgres_port,
        dbname=settings.postgres_db,
        user=settings.postgres_user,
        password=settings.postgres_password,
        row_factory=dict_row,
    )

