import { log } from "console";
import React, { createContext, useState } from "react";

type CartItemType = {
    productID: string,
    requestedQty: number
}
type CartDataType = {
    items : CartItemType[],
    length: number
}

export const CartContext = createContext({
    cartData: {} as CartDataType,
    addToCart: (id: string, currentQty: number)=>{},
    removeFromCart: (productID:  string, requestedQty: number) => {},
    // getItemRequestedQty: (productID:  string) : number => 0
})


const CartContextProvider : React.FC<{
    children: React.ReactNode
}> = ({children}) =>{

    const [cartState, setCartState] = useState<CartDataType>({
        items:[],
        length: 0
    });

    const addToCartItems = (id: string, currentQty: number) => {
        
        if(currentQty <= 0) return;

        let exist = cartState.items.find(x=>x.productID == id)
        if(exist){
            if(exist.requestedQty >= currentQty) return;
            
            let index = cartState.items.indexOf(exist);
            cartState.items[index].requestedQty += 1;

        }else{
            cartState.items.push({
                productID: id,
                requestedQty: 1
            })
        }

        setCartState({
            ...cartState,
            length: cartState.items.length
        })

    }

    const removeFromCartItems = (productID: string, requestedQty: number) => {
        
        if (requestedQty < 0) return;

        let exist = cartState.items.find(x => x.productID == productID)
        
        if(exist) {
            let index = cartState.items.indexOf(exist);

            const product = cartState.items.find(items => exist?.productID === items.productID)
            console.log(product);
            
            if(requestedQty === 1) {
                setCartState({
                    items : cartState.items.splice(index, 1),
                    length: cartState.items.length - 1
                })
                console.log(cartState.items);
                
            }else {
                cartState.items[index].requestedQty -= 1;
            }
            
        }
        setCartState({
            ...cartState,
            length: cartState.items.length
        })

    }

    return <CartContext.Provider value={{
        cartData: cartState,
        addToCart:  addToCartItems,
        removeFromCart: removeFromCartItems
    }}>
        {children}
    </CartContext.Provider>
}

export default CartContextProvider;