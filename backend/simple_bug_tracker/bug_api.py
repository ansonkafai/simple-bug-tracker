from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from .models import BugStatusEnum, Bug, BugSchema, engine
from .logger import log_exception


def create_bug(bug_schema: BugSchema) -> BugSchema:
    """Function to create bug record to db.

    Args:
        bug_schema: The bug field values from request.

    Returns:
        The bug record inserted into db.
    """
    # Populate request schema to ORM object.
    bug_obj = Bug(
        title=bug_schema.title,
        description=bug_schema.description,
        assignee=bug_schema.assignee,
        status=BugStatusEnum.OPEN
    )
    try:
        # Insert user record to db.
        # SQLAlchemy manipulate ORM data: https://docs.sqlalchemy.org/en/14/tutorial/orm_data_manipulation.html
        session = Session(engine)
        session.add(bug_obj)
        session.commit()

        # Fill the inserted id and create_time values back into the schema object for response.
        bug_schema.id = bug_obj.id
        bug_schema.create_time = bug_obj.create_time
    except SQLAlchemyError:
        session.rollback()
        raise
    finally:
        if session:
            session.close()

    return bug_schema


class BugAPI(MethodResource, Resource):
    """CLass to define Bug API endpoints."""

    # To add Swagger markup, use the doc decorator. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @doc(description="Bug API endpoint - create bug.")
    # Use use_kwargs to declare request parsing behavior. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @use_kwargs(BugSchema, location="json",)
    # Use marshal_with to declare response marshalling. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @marshal_with(BugSchema, 201)
    def post(self, **kwargs):
        """Post method of bug API (i.e. create bug)."""
        try:
            # Populate request values into BugSchema object.
            bug_schema = BugSchema()
            for key, value in kwargs.items():
                setattr(bug_schema, key, value)

            # Create bug record via SQLAlchemy.
            bug_schema = create_bug(bug_schema)
        except Exception as ex:
            log_exception(ex)
            return f"Unexpected error: {ex.args}", 500

        return bug_schema, 201
