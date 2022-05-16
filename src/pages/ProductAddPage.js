import {Container, Grid, IconButton, Typography} from "@material-ui/core";
import {ProductForm} from "../components/ProductForm";
import {ArrowBackIos} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";

const emptyProduct = {
    usin: "",
    title: "",
    description: "",
    images: [],
    attributes: {
        "isbn-10": "",
        "isbn-13": "",
        publisher: "",
        language: "",
        paperback: "",
        dimensions: "",
        author: ""
    },
    ratings: [],
    sellOptions: [],
    tag: ""
}

export const ProductAddPage = () => {
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
                        New product
                    </Typography>
                    <ProductForm initial={emptyProduct}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </Container>
    )
}