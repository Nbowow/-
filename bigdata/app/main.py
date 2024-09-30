import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import uvicorn
from fastapi import FastAPI

from app.controller import RecipeController, PriceController, CrawlingController

app = FastAPI()

app.include_router(RecipeController.router)
app.include_router(PriceController.router)
app.include_router(CrawlingController.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
