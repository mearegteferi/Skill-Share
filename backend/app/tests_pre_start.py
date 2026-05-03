"""
Test-suite startup probe: waits until the test database is reachable.
Run via: python -m app.tests_pre_start
"""
import logging

from sqlalchemy import Engine, select
from sqlalchemy.orm import Session
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.core.database import engine
from app.core.logging import configure_logging

configure_logging()
logger = logging.getLogger(__name__)

_MAX_TRIES = 60 * 5  # 5 minutes
_WAIT_SECONDS = 1


@retry(
    stop=stop_after_attempt(_MAX_TRIES),
    wait=wait_fixed(_WAIT_SECONDS),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init(db_engine: Engine) -> None:
    try:
        with Session(db_engine) as session:
            session.execute(select(1))
    except Exception as exc:
        logger.error(exc)
        raise


def main() -> None:
    logger.info("Initializing service")
    init(engine)
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
