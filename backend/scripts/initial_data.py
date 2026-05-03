"""Seed the database with initial data (superuser)."""
import logging

from app.core.database import SessionLocal, init_db
from app.core.logging import configure_logging

configure_logging()
logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Creating initial data")
    with SessionLocal() as session:
        init_db(session)
    logger.info("Initial data created")


if __name__ == "__main__":
    main()
