from sqlalchemy import Column, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class WeekPrice(Base):
    __tablename__ = "WeekPrice"

    week_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    week_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("Materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="week_price")
