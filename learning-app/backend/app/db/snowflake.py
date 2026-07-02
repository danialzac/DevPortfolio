import snowflake.connector

from app.config import settings


def snowflake_is_configured():
    required_values = [
        settings.snowflake_account,
        settings.snowflake_user,
        settings.snowflake_password,
        settings.snowflake_warehouse,
        settings.snowflake_database,
        settings.snowflake_schema,
    ]
    return all(required_values)


def get_snowflake_connection():
    return snowflake.connector.connect(
        account=settings.snowflake_account,
        user=settings.snowflake_user,
        password=settings.snowflake_password,
        warehouse=settings.snowflake_warehouse,
        database=settings.snowflake_database,
        schema=settings.snowflake_schema,
    )

