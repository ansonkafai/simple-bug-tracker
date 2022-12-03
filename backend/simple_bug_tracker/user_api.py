from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from .models import User, UserSchema, engine
from .logger import log_exception


def create_user(user_schema: UserSchema) -> UserSchema:
    """Function to create user record to db.

    Args:
        user_schema: The user field values from request.

    Returns:
        The user record inserted into db. The returned UserSchema object will be filled with primary key id.
    """
    user_obj = User(email=user_schema.email, first_name=user_schema.first_name, last_name=user_schema.last_name)
    try:
        # Insert user record to db.
        # SQLAlchemy manipulate ORM data: https://docs.sqlalchemy.org/en/14/tutorial/orm_data_manipulation.html
        session = Session(engine)
        session.add(user_obj)
        session.commit()

        # Fill the inserted id and create_time values back into the schema object for response.
        user_schema.id = user_obj.id
        user_schema.create_time = user_obj.create_time
    except SQLAlchemyError:
        session.rollback()
        raise
    finally:
        if session:
            session.close()

    return user_schema


class UserAPI(MethodResource, Resource):
    """CLass to define User API endpoints."""

    # To add Swagger markup, use the doc decorator. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @doc(description="User API endpoint - create user.")
    # Use use_kwargs to declare request parsing behavior. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @use_kwargs(UserSchema, location="json",)
    # Use marshal_with to declare response marshalling. See https://flask-apispec.readthedocs.io/en/latest/usage.html
    @marshal_with(UserSchema, code=201)
    def post(self, **kwargs):
        """Post method of user API (i.e. create user)."""
        try:
            # Populate request values into UserSchema object.
            user_schema = UserSchema()
            for key, value in kwargs.items():
                setattr(user_schema, key, value)

            # Create user record via SQLAlchemy.
            user_schema = create_user(user_schema)
        except Exception as ex:
            log_exception(ex)
            return f"Unexpected error: {ex.args}", 500

        return user_schema, 201
