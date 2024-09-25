import uvicorn
from fastapi import FastAPI

from app.controller import recipe_controller

app = FastAPI()

app.include_router(recipe_controller.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
