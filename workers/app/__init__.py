from .config import CELERY_CONFIG

celery_app = Celery("python_worker_project")
celery_app.conf.update(CELERY_CONFIG)
