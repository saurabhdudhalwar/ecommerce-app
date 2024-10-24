import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import "./Cart.css";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const total = useSelector((state: any) => state.cart.total);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container className="cart-container">
      <Typography variant="h4">Shopping Cart</Typography>
      <Box>
        {cartItems.map((item: any) => (
          <Card key={item.id} className="cart-item">
            <img
              src={item.thumbnail}
              className="cart-item__image"
              alt={item.title}
            />
            <CardContent className="cart-item__content">
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">Price: {item.price} USD</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveFromCart(item.id)}
                className="cart-item__button"
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
        {cartItems.length > 0 ? (
          <Typography variant="h5" className="cart-total">
            Total: {total} USD
          </Typography>
        ) : (
          <Typography variant="h5" className="cart-total">
            Nothing in the Shoping Cart !!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
