import {Avatar, Button, Chip, Container, Grid, Typography} from "@material-ui/core";
import {ProductList} from "../components/ProductList";
import {Search} from "../components/Search";
import {TagList} from "../components/Tags";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getProductsRequest, useNetwork} from "../service/Network";

export const ProductListPage = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get('query')
    const tag = params.get('tag')

    const navigateMain = () => navigate("")
    const navigateByQuery = q => navigate(`?query=${q}`)
    const navigateByTag = t => navigate(`?tag=${t}`)

    const [response, makeRequest] = useNetwork()
    useEffect(() => {
        makeRequest(getProductsRequest(query, tag))
    }, [query, tag])

    return (
        <Container maxWidth="lg">
            <Grid container direction="column">
                <Grid item container direction="row" alignItems="center">
                    <Grid item style={{padding: 20}}>
                        <Typography variant="h4">
                            Products
                        </Typography>
                    </Grid>
                    <Grid item xs container direction="column" spacing={1}>
                        {query && <Grid item>
                            <Chip avatar={<Avatar>S</Avatar>} size="small" label={query} onDelete={navigateMain}/>
                        </Grid>}
                        {tag && <Grid item>
                            <Chip avatar={<Avatar>T</Avatar>} size="small" label={tag} onDelete={navigateMain}/>
                        </Grid>}
                    </Grid>
                </Grid>
                <Grid item container direction="row" spacing={4}>
                    <Grid item xs={8}>
                        {response.loading && <div>Loading...</div>}
                        {response.error && <div>Error</div>}
                        {response.success && <ProductList products={response.data}/>}
                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>
                        <Grid item>
                            <Search onSearch={navigateByQuery}/>
                        </Grid>
                        <Grid item>
                            <TagList selected={tag} onSelect={navigateByTag}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" disableElevation size="large"
                                    onClick={() => navigate("add")}>
                                Add new product
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}