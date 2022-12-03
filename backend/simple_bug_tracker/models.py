"""Module containing classes for RDB modeling."""
import enum
from datetime import datetime

from sqlalchemy import create_engine, Column, Enum, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.types import Text, DateTime, Integer
from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from .config import DB_PATH

# SQLAlchemy declaring models.
# See - https://docs.sqlalchemy.org/en/14/orm/quickstart.html
Base = declarative_base()


class BugStatusEnum(enum.Enum):
    """Enumerated class represents bug status.

    The string names of each element, i.e. "open", "closed", are persisted to the database;
    the values of the Python Enum, here indicated as integers, are not used.
    See - https://docs.sqlalchemy.org/en/20/core/type_basics.html#sqlalchemy.types.Enum
    """
    OPEN = 1
    CLOSED = 2


class Bug(Base):
    """SQLAlchemy model class represents record in table Bug."""
    # Define db table name.
    __tablename__ = "bug"

    # Define field names.
    # For SQLAlchemy data types, see - https://docs.sqlalchemy.org/en/14/core/type_basics.html
    id = Column(Integer, primary_key=True, comment="Auto increment bug id.")
    title = Column(Text, nullable=False, comment="Bug title.")
    description = Column(Text, nullable=False, comment="Bug description.")
    assignee = Column(Integer, ForeignKey("user.id"), nullable=True, comment="User id the bug assigned to.")
    status = Column(Enum(BugStatusEnum), nullable=False, comment="Bug status either OPEN or CLOSED.")
    create_time = Column(DateTime, nullable=False, default=datetime.now, comment="Record create time.")


class User(Base):
    """SQLAlchemy model class represents record in table User."""
    # Define db table name.
    __tablename__ = "user"

    # Define field names.
    # For SQLAlchemy data types, see - https://docs.sqlalchemy.org/en/14/core/type_basics.html
    id = Column(Integer, primary_key=True, comment="Auto increment user id.")
    email = Column(Text, unique=True, nullable=False, comment="User email address.")
    first_name = Column(Text, nullable=False, comment="User first name.")
    last_name = Column(Text, nullable=False, comment="User last name.")
    create_time = Column(DateTime, nullable=False, default=datetime.now, comment="Record create time.")


class UserSchema(Schema):
    """Define user schema for API request/response.

    For schema field types, see - https://marshmallow.readthedocs.io/en/stable/marshmallow.fields.html
    """
    id = fields.Integer(dump_only=True, metadata={"description": User.id.comment})
    email = fields.Email(required=not User.email.nullable, metadata={"description": User.email.comment})
    first_name = fields.String(required=not User.first_name.nullable, metadata={"description": User.first_name.comment})
    last_name = fields.String(required=not User.last_name.nullable, metadata={"description": User.last_name.comment})
    create_time = fields.DateTime(dump_only=True, metadata={"description": User.create_time.comment})


class BugSchema(Schema):
    """Define bug schema for API request/response.

    For schema field types, see - https://marshmallow.readthedocs.io/en/stable/marshmallow.fields.html
    For schema nested field, see - https://marshmallow.readthedocs.io/en/stable/nesting.html
    For schema enum field, see - https://pypi.org/project/marshmallow-enum/1.5.1/#description
    """
    id = fields.Integer(dump_only=True, metadata={"description": Bug.id.comment})
    title = fields.String(required=not Bug.title.nullable, metadata={"description": Bug.title.comment})
    description = fields.String(
        required=not Bug.description.nullable, metadata={"description": Bug.description.comment}
    )
    assignee = fields.String(required=not Bug.assignee.nullable, metadata={"description": "Assignee user id."})
    status = EnumField(BugStatusEnum, required=False, metadata={"description": Bug.status.comment})
    create_time = fields.DateTime(dump_only=True, metadata={"description": Bug.create_time.comment})


# Create db connectivity.
# Set "echo=True" indicates SQL emitted by connections will be logged to standard out.
# Set "future=True" is to ensure we are using the latest SQLAlchemy 2.0-style APIs.
# Example: engine = create_engine("sqlite:///simple_bug_tracker.db", echo=True, future=True)
# See - https://docs.sqlalchemy.org/en/14/orm/quickstart.html
engine = create_engine(DB_PATH)


# Emit CREATE TABLE DDL.
# Use table metadata and engine to generate schema at once in the target database.
# See - https://docs.sqlalchemy.org/en/14/orm/quickstart.html
Base.metadata.create_all(engine)
