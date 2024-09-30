from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.config import Base


class RecipeMaterials(Base):
    __tablename__ = "RecipeMaterials"

    recipe_material_id = Column(BigInteger, primary_key=True, nullable=False, index=True)
    recipe_material_amount = Column(String(100))
    recipe_material_unit = Column(String(100))

    recipe_id = Column(BigInteger, ForeignKey("Recipes.recipe_id"), nullable=False)
    recipe = relationship("Recipes", back_populates="recipe_materials")
