import {Container, Grid, IconButton, Typography} from "@material-ui/core";
import {ProductCard} from "../components/ProductCard";
import {useNavigate, useParams} from "react-router-dom";
import {useProduct} from "../service/Network";
import {ArrowBackIos} from "@material-ui/icons";

export const ProductCardPage = () => {
    const params = useParams()
    const product = useProduct(params.usin)
    const navigate = useNavigate()
    return (
        <Container maxWidth="md" style={{paddingBottom: 20}}>
            <Grid container direction="row" spacing={4}>
                <Grid item xs={1}>
                    <IconButton style={{marginTop: 80}} onClick={() => navigate(-1)}>
                        <ArrowBackIos/>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Typography variant="h4" style={{margin: 20}}>
                        Product
                    </Typography>
                    {product.loading && <div>Loading...</div>}
                    {product.error && <div>Error...</div>}
                    {product.success && <ProductCard product={product.data}/>}
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </Container>
    )
}