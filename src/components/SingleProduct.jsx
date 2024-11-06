import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const SingleProduct = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <Box padding={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>{product.name}</Typography>
            <img src={product.image} />
            <Typography variant="body1" sx={{ marginTop: '1rem' }}>{product.description}</Typography>
            <Typography variant="body2" sx={{ marginTop: '.5rem' }}>Price: {product.price}</Typography>
            <Button variant="outlined" color="primary" sx={{ marginTop: '1rem' }} onClick={() => dispatch(addToCart(product))}>
                Add to Cart
            </Button>
        </Box>
    );
};

export default SingleProduct;
