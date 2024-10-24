import { Link } from "react-router-dom";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "./Card.css";

const Card = ({ product, onAddToCart, currentPage }: any) => {
  return (
    <MuiCard className="card">
      <Link
        to={`/product/${product.id}`}
        state={{ currentPage }} // Pass the current page
        className="card__link"
      >
        <img
          src={product.thumbnail}
          className="card__image"
          alt={product.title}
        />

        <CardContent className="card__content">
          <Typography variant="h6" component="div" className="card__title">
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="card__price"
          >
            {product.price} USD
          </Typography>
        </CardContent>
      </Link>
      <Button
        size="small"
        color="primary"
        className="card__button"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
    </MuiCard>
  );
};

export default Card;
