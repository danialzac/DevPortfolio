# Azure Notes

These notes are intentionally simple and safe.

They are here to show where Azure fits, not to push production complexity into a beginner project.

## Small Azure Mapping

- Next.js frontend:
  Azure Static Web Apps or Azure App Service
- Python backend:
  Azure App Service or Azure Container Apps
- PostgreSQL:
  Azure Database for PostgreSQL
- Secrets:
  Azure Key Vault

## Beginner-Friendly Deployment Idea

If you wanted to deploy this demo later, a simple path would be:

1. Put the Next.js frontend on Azure Static Web Apps.
2. Put the FastAPI backend on Azure App Service.
3. Use Azure Database for PostgreSQL for the app data.
4. Keep Snowflake as an external analytics system.
5. Move secrets out of `.env` files and into Azure configuration or Key Vault.

## Risk Reduction Habits

- Never commit real passwords or connection strings.
- Keep local `.env` files out of version control.
- Start with the smallest deployable architecture.
- Separate app data from analytics data so each part has a clear job.

