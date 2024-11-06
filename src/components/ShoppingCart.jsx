import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, deleteFromCart } from '../features/cart/cartSlice';
import { FaTrash,FaMinus ,FaPlus } from "react-icons/fa";


const ShoppingCart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, product) => {
        return total + product.quantity * parseFloat(product.price);
    }, 0);

    return (
        <Box padding={1}>
            <Typography variant="h5">Shopping Cart</Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
            ) : (
                cart.map((product) => (
                    <Box key={product.id} display="flex" alignItems="center" justifyContent="space-between" paddingY={1}>
                        <Typography>{product.name}</Typography>
                        <Typography>{product.price}</Typography>
                        <Box>
                            <Button onClick={() => dispatch(decreaseQuantity(product.id))}><FaMinus /></Button>
                            <Typography component="span" paddingX={1}>{product.quantity}</Typography>
                            <Button onClick={() => dispatch(increaseQuantity(product.id))}><FaPlus /></Button>
                        </Box>
                        <IconButton onClick={() => dispatch(deleteFromCart(product.id))} color="secondary">
                        <FaTrash />
                        </IconButton>
                    </Box>
                ))
            )}
            <Divider sx={{ marginY: 2 }} />
            <Box display="flex" justifyContent="space-between" paddingY={1}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{totalPrice.toFixed(2)} T</Typography>
            </Box>
        </Box>
    );
};

export default ShoppingCart;
