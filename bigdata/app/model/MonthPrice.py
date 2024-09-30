from sqlalchemy import Column, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.config import Base


class MonthPrice(Base):
    __tablename__ = "MonthPrice"

    month_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    month_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("Materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="month_price")
