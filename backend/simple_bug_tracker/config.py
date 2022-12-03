"""Application config."""
import os

# File path of local sqlite db file, relative to the app instance folder.
DB_PATH = os.getenv("DB_PATH", "sqlite:///simple_bug_tracker.db")
