import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { CheckoutItemContainer, ImageContainer, Arrow, Img, Price, Name, Quantity, Value, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ( {cartITem} ) => {
    const { name, imageUrl, price, quantity } = cartITem;

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartITem);
    const addItemHandler = () => addItemToCart(cartITem);
    const removeItemHandler = () => removeItemFromCart(cartITem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name> {name} </Name>
            <Quantity> 
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price> {price} </Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;