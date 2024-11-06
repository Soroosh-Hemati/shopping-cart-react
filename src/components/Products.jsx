import React, { useEffect, useState } from 'react'
import { Container, Box, Typography, Grid2, Grid, IconButton, Modal, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FaShoppingCart } from "react-icons/fa";
import Button from '@mui/material/Button';
import ShoppingCart from './ShoppingCart';
import SingleProduct from './SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { getAsyncProducts } from '../features/products/productsSlice';


//static array for products
// const products = [
//     { id: 1, name: 'Product 1', price: '20.00 T', description: 'Description of Product 1', image: 'https://via.placeholder.com/150' },
//     { id: 2, name: 'Product 2', price: '25.00 T', description: 'Description of Product 2', image: 'https://via.placeholder.com/150' },
//     { id: 3, name: 'Product 3', price: '30.00 T', description: 'Description of Product 3', image: 'https://via.placeholder.com/150' },
//     { id: 4, name: 'Product 4', price: '35.00 T', description: 'Description of Product 4', image: 'https://via.placeholder.com/150' },
// ];


function Products() {
    const [cartOpen, setCartOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setProductOpen(true);
    };
    const { products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAsyncProducts());
    }, []);


    return (
        //page container
        //grid layout for products
        <Container maxWidth={false} sx={{ backgroundColor: "#F1F1F1", width: "100%", textAlign: "center", height: '100vh' }}>
            <Box >
                <Box display="flex" alignItems="center" justifyContent="center" paddingTop="1rem">
                    <Typography variant='h4' sx={{ marginRight: 2 }}>Products List</Typography>
                    <IconButton color="primary" onClick={() => setCartOpen(true)}>
                        <FaShoppingCart />
                    </IconButton>
                </Box>
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "2rem" }}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card sx={{ maxWidth: 345, margin: 'auto', padding: "1rem" }}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant='outlined' size="small" color="primary" onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
                                    <Button variant='outlined' size="small" color="secondary" onClick={() => handleProductClick(product)}>View Product</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Modal open={cartOpen} onClose={() => setCartOpen(false)}>
                    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5, backgroundColor: 'white', padding: 3 }}>
                        <ShoppingCart />
                    </Box>
                </Modal>

                <Modal open={productOpen} onClose={() => setProductOpen(false)}>
                    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5, backgroundColor: 'white', padding: 3 }}>
                        {selectedProduct && <SingleProduct product={selectedProduct} />}
                    </Box>
                </Modal>
            </Box>
        </Container>

    )
}

export default Products