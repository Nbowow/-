from sqlalchemy import Column, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class MonthPrice(Base):
    __tablename__ = "monthprice"

    month_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    month_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="month_price")
