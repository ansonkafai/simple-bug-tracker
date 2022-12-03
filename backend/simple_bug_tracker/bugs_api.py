from typing import List

from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc

from .models import Bug, BugSchema, engine
from .logger import log_debug, log_exception


def get_bugs() -> List:
    """Function to get all bug records from db.

    Returns:
        List of bugs.
    """
    try:
        # SQLAlchemy query: https://www.tutorialspoint.com/sqlalchemy/sqlalchemy_orm_using_query.htm
        session = Session(engine)
        bugs_list = session.query(Bug).order_by(desc(Bug.id)).all()
    except SQLAlchemyError:
        raise
    finally:
        if session:
            session.close()
            log_debug("SQLAlchemy session closed.")

    return bugs_list


class BugsAPI(MethodResource, Resource):
    """CLass to define Bugs API endpoints."""

    # To add Swagger markup, use the doc decorator. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @doc(description="Bugs API endpoint - get bugs list.")
    # Use use_kwargs to declare request parsing behavior. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @use_kwargs({})
    # Use marshal_with to declare response marshalling. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @marshal_with(BugSchema(many=True), code=200)
    def get(self, **kwargs):
        """Get method of bugs APIs (i.e. get bugs list)."""
        try:
            bugs_list = get_bugs()
        except Exception as ex:
            log_exception(ex)
            return f"Unexpected error: {ex.args}", 500

        return bugs_list, 200
