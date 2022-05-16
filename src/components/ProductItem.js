import {
    Button,
    Card,
    CardMedia,
    Grid
} from "@material-ui/core";
import {Author, RatingShort, SellOptions, Title} from "./ProductInfo";
import {useNavigate} from "react-router-dom";

export const ProductItem = ({product}) => {
    const navigate = useNavigate()
    return (
        <Card variant="outlined" style={{padding: 20}}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={3}>
                    <CardMedia
                        component="img"
                        src={product.images[0]}
                        alt="No image"
                    />
                </Grid>
                <Grid item xs={9} container direction="column" justifyContent="space-between" style={{minHeight: 200}}>
                    <Grid item container direction="column">
                        <Grid item>
                            <Title title={product.title} color="primary" style={{cursor: "pointer"}}
                                   onClick={() => {navigate(product.usin)}}
                            />
                        </Grid>
                        <Grid item>
                            <Author author={product.attributes.author}/>
                        </Grid>
                        <Grid item>
                            <RatingShort ratings={product.ratings}/>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" justifyContent="space-between" alignItems="flex-end">
                        <Grid item>
                            <SellOptions options={product.sellOptions}/>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary"
                                    onClick={() => {navigate(product.usin + "/edit")}}>
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}
