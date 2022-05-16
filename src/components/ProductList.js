import {ProductItem} from "./ProductItem";
import {Grid} from "@material-ui/core";

export const ProductList = ({products}) => {
    return (
        <Grid container direction="column" style={{flexWrap: "nowrap"}} spacing={2}>
            {products.map((product) => (
                <Grid item key={product.usin}>
                    <ProductItem product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}