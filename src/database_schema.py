from sqlalchemy import Column, String, Float, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship, DeclarativeBase
from datetime import datetime
import uuid


class Base(DeclarativeBase):
    pass


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, nullable=True)

    status = Column(String, default="PLACED")

    total = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    order_id = Column(
        String,
        ForeignKey("orders.id")
    )

    menu_item_id = Column(String)

    name = Column(String)

    quantity = Column(Integer)

    unit_price = Column(Float)

    order = relationship(
        "Order",
        back_populates="items"
    )