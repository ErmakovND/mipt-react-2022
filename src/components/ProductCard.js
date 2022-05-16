import {Card, CardMedia, Divider, Grid} from "@material-ui/core";
import {Attributes, Description, RatingDetailed, RatingShort, SellOptions, Title} from "./ProductInfo";

const VerticalDivider = ({margin}) => (
    <Divider style={{marginBottom: margin, marginTop: margin}}/>
)

export const ProductCard = ({product}) => {
    return (
        <Card variant="outlined" style={{padding: 20}}>
            <Grid container direction="row" spacing={4}>
                <Grid item xs={3} container direction="column" spacing={2}>
                    {product.images.map((image) => (
                        <Grid item key={image}>
                            <CardMedia
                                component="img"
                                src={image}
                                alt="No image"
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={9} container direction="column">
                    <Title title={product.title}/>
                    <VerticalDivider margin={20}/>
                    <RatingShort ratings={product.ratings}/>
                    <RatingDetailed ratings={product.ratings}/>
                    <VerticalDivider margin={20}/>
                    <Description desc={product.description}/>
                    <VerticalDivider margin={20}/>
                    <Attributes attributes={product.attributes}/>
                    <VerticalDivider margin={20}/>
                    <SellOptions options={product.sellOptions}/>
                </Grid>
            </Grid>
        </Card>
    )
}