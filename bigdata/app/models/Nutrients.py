from sqlalchemy import Column, BigInteger, String, Double, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Nutrients(Base):
    __tablename__ = "nutrients"

    nutrient_id = Column(BigInteger, primary_key=True, nullable=False, autoincrement=True, index=True)
    capacity = Column(String(100), nullable=False)
    kcal = Column(BigInteger, nullable=False)
    protein = Column(Double)
    carbohydrate = Column(Double)
    fat = Column(Double)
    salt = Column(Double)
    sugar = Column(Double)
    cholesterol = Column(Double)
    saturated = Column(Double)
    transfat = Column(Double)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="nutrient")
