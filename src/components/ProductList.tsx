import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Card from "./Card";
import { Grid, Button, Typography } from "@mui/material";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const limit = 10;

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(Number(storedPage)); 
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`
        );
        const data = await res.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
      setLoading(false);
    };

    fetchProducts();

    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); 
    }
  };

  return (
    <div className="product-list">
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>

          <div className="pagination-controls">
            <Button
              variant="contained"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography variant="body1" className="page-info">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
