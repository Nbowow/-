from sqlalchemy import Column, BigInteger, ForeignKey
from sqlalchemy.orm import relationship

from app.database.config import Base


class RecipeCookingTools(Base):
    __tablename__ = "RecipeCookingTools"

    recipe_cooking_tool_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)

    cooking_tool_id = Column(BigInteger, ForeignKey("CookingTools.cooking_tool_id"), nullable=False)
    recipe_id = Column(BigInteger, ForeignKey("Recipes.recipe_id"), nullable=False)

    recipe = relationship("Recipes", back_populates="recipe_cooking_tool")
    cooking_tool = relationship("CookingTools", back_populates="recipe_cooking_tool")
