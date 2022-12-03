from typing import List

from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc

from .models import User, UserSchema, engine
from .logger import log_debug, log_exception


def get_users() -> List:
    """Function to get all user records from db.

    Returns:
        List of users.
    """
    try:
        # SQLAlchemy query: https://www.tutorialspoint.com/sqlalchemy/sqlalchemy_orm_using_query.htm
        session = Session(engine)
        users_list = session.query(User).order_by(desc(User.id)).all()
    except SQLAlchemyError:
        raise
    finally:
        if session:
            session.close()
            log_debug("SQLAlchemy session closed.")

    return users_list


class UsersAPI(MethodResource, Resource):
    """CLass to define Users API endpoints."""

    # To add Swagger markup, use the doc decorator. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @doc(description="Users API endpoint - get users list.")
    # Use use_kwargs to declare request parsing behavior. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @use_kwargs({})
    # Use marshal_with to declare response marshalling. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @marshal_with(UserSchema(many=True), code=200)
    def get(self, **kwargs):
        """Get method of users APIs (i.e. get users list)."""
        try:
            users_list = get_users()
        except Exception as ex:
            log_exception(ex)
            return f"Unexpected error: {ex.args}", 500

        return users_list, 200
