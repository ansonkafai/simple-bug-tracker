# Simple Bug Tracker

## Prerequisites

Before running the app,
please check if your local machine meets the following requirements:

1. Python 3.8 or later is installed. [Download Python](https://www.python.org/downloads/release/python-3814/)
2. The below paths are added to the system path:
   ```shell script
   <Python installation root>/
   <Python installation root>/Scripts/
   ```
3. Node.js 18.12.1 LTS is installed. [Download Node.js](https://nodejs.org/en/download/)
4. Node.js installation root is added to the system path.
5. Ports 3000 and 5000 are available.

## Steps for Running on Windows

Assumption: Git repository is cloned to your local path `C:\tmp\simple-bug-tracker\`.

1. Open a command prompt dedicated for **backend server** and run the following commands:
   ```commandline
   > cd C:\tmp\simple-bug-tracker\backend
   > python -m venv venv
   > cd venv/Scripts
   > activate.bat
   > pip install -U pip
   > cd C:\tmp\simple-bug-tracker\backend
   > pip install -r requirements.txt
   > flask run
   ```
   To view OpenAPI Document, please access http://127.0.0.1:5000/swagger-ui

2. Open another command prompt dedicated for **frontend server** and run the following commands:
   ```commandline
   > cd C:\tmp\simple-bug-tracker\frontend
   > npm install
   > npm start
   ```
   
3. Open a browser tab if it does not open automatically. Enter URL http://127.0.0.1:3000

## Steps for Running on Linux

Assumption: Git repository is cloned to your local path `/c/tmp/simple-bug-tracker/`.

1. Open a terminal session dedicated for **backend server** and run the following commands:
   ```shell script
   $ cd /c/tmp/simple-bug-tracker/backend
   $ python -m venv venv
   $ source venv/Scripts/activate
   $ pip install -U pip
   $ pip install -r requirements.txt
   $ flask run
   ```
   To view OpenAPI Document, please access http://127.0.0.1:5000/swagger-ui

2. Open another terminal session dedicated for **frontend server** and run the following commands:
   ```shell script
   $ cd /c/tmp/simple-bug-tracker/frontend
   $ npm install
   $ npm start
   ```

3. Open a browser tab if it does not open automatically. Enter URL http://127.0.0.1:3000

## Technology Stack

**Frontend**:

| Framework       | Version     |
|-----------------|-------------|
| React           | 18.2.0      |
| React Bootstrap | 2.6.0       |
| Axios           | 1.2.0       |
| Node.js         | 18.12.1 LTS |

**Backend**:

| Framework     | Version |
|---------------|---------|
| Flask         | 2.2.2   |
| Flask-RESTful | 0.3.9   |
| flask-apispec | 0.11.4  |
| SQLAlchemy    | 1.4.44  |

## Quick Reference of Code Locations

| Component         | Code Locations |
|-------------------|----------------|
| Frontend page     | [BugPage.tsx](frontend/src/pages/BugPage.tsx)<br/>[UserPage.tsx](frontend/src/pages/UserPage.tsx) |
| Frontend packages | [package.json](frontend/package.json) |
| Backend env vars  | [.env](backend/.env) |
| Backend ORM modeling | [models.py](backend/simple_bug_tracker/models.py) |
| Backend endpoints | [bug_api.py](backend/simple_bug_tracker/bug_api.py)<br/>[bugs_api.py](backend/simple_bug_tracker/bugs_api.py)<br/>[user_api.py](backend/simple_bug_tracker/user_api.py)<br/>[users_api.py](backend/simple_bug_tracker/users_api.py)|

## Pending Tasks

1. Implement bug details update.
2. Implement bug closing.
3. Implement bugs assign to users.
4. Implement user details update.
5. Implement typeahead for user selection.
6. Validate entered values length.
7. Properly handle duplicated user email.
8. Externalize API endpoint root to environment variables instead of hardcoded inside React pages.
9. Implement pylint on Python code to minimize runtime error and standardize coding style.
10. Enable HTTPS on both frontend and backend servers.
