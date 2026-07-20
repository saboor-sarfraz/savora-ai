from database_schema import Order, OrderItem
from datetime import datetime, timedelta

class OrderService:

    def __init__(self, db):
        self.db = db

    def place_order(self, customer_id, cart):

        total = sum(
            item["quantity"] * item["unit_price"]
            for item in cart
        )

        order = Order(
            customer_id=customer_id,
            total=total,
        )

        self.db.add(order)
        self.db.flush()   # generates order.id

        for item in cart:

            self.db.add(
                OrderItem(
                    order_id=order.id,
                    menu_item_id=item["item_id"],
                    name=item["name"],
                    quantity=item["quantity"],
                    unit_price=item["unit_price"],
                )
            )

        self.db.commit()

        return order.id
    
    def cancel_latest_order(self, customer_id: str):

        order = (
            self.db.query(Order)
            .filter(
                Order.customer_id == customer_id,
                Order.status == "PLACED"
            )
            .order_by(Order.created_at.desc())
            .first()
        )

        if order is None:
            return False, "You have no active orders."

        elapsed = datetime.utcnow() - order.created_at

        if elapsed > timedelta(minutes=0.5):
            return (
                False,
                "Orders can only be cancelled within 30 seconds."
            )

        order.status = "CANCELLED"

        self.db.commit()

        return (
            True,
            f"Order {order.id} has been cancelled."
        )
