# sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import uvicorn
from fastapi import FastAPI
from sqlalchemy import inspect

from app.controller import RecipeController, PriceController, CrawlingController
from app.database.config import engine, Base


async def lifespan(app: FastAPI):
    inspector = inspect(engine)
    tables = inspector.get_table_names()

    Base.metadata.create_all(bind=engine)

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(RecipeController.router)
app.include_router(PriceController.router)
app.include_router(CrawlingController.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
