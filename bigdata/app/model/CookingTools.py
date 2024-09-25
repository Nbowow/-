from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship

from app.database.config import Base


class CookingTools(Base):
    __tablename__ = "CookingTools"

    cooking_tool_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    cooking_tool_name = Column(String(255), nullable=False)

    recipe_cooking_tool = relationship("RecipeCookingTools", back_populates="cooking_tool")
