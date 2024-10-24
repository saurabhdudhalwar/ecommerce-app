import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<any>();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} className="product-detail">
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.title}
            className="product-detail_image"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="card_content">
            <CardContent className="card_content_inner">
              <Typography
                variant="h4"
                gutterBottom
                className="product-detail_title"
              >
                {product.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {product.price} USD
              </Typography>
            </CardContent>
            <CardActions className="card_actions">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
