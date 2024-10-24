import { Link } from "react-router-dom";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "./Card.css";

const Card = ({ product, onAddToCart }: any) => {
  return (
    <MuiCard className="card">
      <Link to={`/product/${product.id}`} className="card__link">
        <img src={product.image} className="card__image" alt="productimagw" />

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
