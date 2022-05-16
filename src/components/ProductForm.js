import {
    Button,
    Card,
    Grid, IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import {useState} from "react";
import {ordered} from "./Tags";
import {Clear} from "@material-ui/icons";
import {postProductRequest, putProductRequest, useNetwork, useTags} from "../service/Network";
import {Navigate} from "react-router-dom";

const LabeledTextField = (props) => {
    return (
        <TextField variant="outlined" size="small" InputLabelProps={{shrink: true}} {...props}/>
    )
}

const TitleField = ({value, onChange}) => {
    return (
        <LabeledTextField
            label="Title" fullWidth
            value={value}
            onChange={e => {
                onChange(e.target.value)
            }}
        />
    )
}

const DescField = ({value, onChange}) => {
    return (
        <LabeledTextField
            label="Description" fullWidth multiline minRows={4}
            value={value}
            onChange={e => {
                onChange(e.target.value)
            }}
        />
    )
}

const TagSelect = ({value, onSelect}) => {
    const tags = useTags()
    if (!tags.success) {
        return (
            <div>
                {tags.loading && "..."}
                {tags.error && "error"}
            </div>
        )
    }
    return (
        <LabeledTextField label="Tag" select value={value}>
            {ordered(tags.data, null, 1).map(({depth, tag}) => (
                <MenuItem key={tag.key} style={{paddingLeft: depth * 10}}
                          value={tag.key} onClick={() => {onSelect(tag.key)}}>
                    {tag.title}
                </MenuItem>
            ))}
        </LabeledTextField>
    )
}

const ImageField = ({value, onDelete, onChange}) => {
    return (
        <LabeledTextField label="link" fullWidth InputProps={{
            endAdornment:
                <InputAdornment position="end">
                    <IconButton edge="end" size="small" onClick={onDelete}>
                        <Clear/>
                    </IconButton>
                </InputAdornment>,
            style: {paddingRight: 8}
        }} value={value} onChange={e => {
            onChange(e.target.value)
        }}/>
    )
}

const AttributeField = ({label, value, onChange}) => {
    return (
        <LabeledTextField
            label={label} fullWidth
            value={value}
            onChange={e => {
                onChange(e.target.value)
            }}
        />
    )
}

const SellTypeSelect = ({value, onSelect}) => {
    return (
        <LabeledTextField
            label="type" select
            value={value}
        >
            {["Audiobook", "Paperback"].map(type => (
                <MenuItem key={type} value={type}
                          onClick={() => {
                              onSelect(type)
                          }}>
                    {type}
                </MenuItem>
            ))}
        </LabeledTextField>
    )
}

const SellPriceField = ({value, onChange}) => {
    return (
        <LabeledTextField
            label="price" type="number"
            value={value}
            onChange={e => {
                onChange(parseFloat(e.target.value))
            }}
        />
    )
}

const SellCurrencySelect = ({value, onSelect}) => {
    return (
        <LabeledTextField
            label="CCY" select
            value={value}>
            {["EUR", "USD"].map(cur => (
                <MenuItem key={cur} value={cur} onClick={() => {
                    onSelect(cur)
                }}>
                    {cur}
                </MenuItem>
            ))}
        </LabeledTextField>
    )
}

export const ProductForm = ({initial, edit}) => {
    const [product, setProduct] = useState(initial)
    const [response, makeRequest] = useNetwork()

    const handleMainChange = (key, value) => {
        setProduct({...product, [key]: value})
    }

    const handleImageAdd = () => {
        const images = [...product.images, ""]
        setProduct({...product, images})
    }
    const handleImageDelete = index => {
        const images = product.images.filter((_, i) => i !== index)
        setProduct({...product, images})
    }
    const handleImageLinkChange = (index, link) => {
        const images = [...product.images]
        images[index] = link
        setProduct({...product, images})
    }

    const handleSellOptionAdd = () => {
        const sellOptions = [...product.sellOptions, {price: 0, currency: "", type: ""}]
        setProduct({...product, sellOptions})
    }
    const handleSellOptionDelete = index => {
        const sellOptions = product.sellOptions.filter((_, i) => i !== index)
        setProduct({...product, sellOptions})
    }
    const handleSellOptionChange = (index, key, value) => {
        const sellOptions = [...product.sellOptions]
        sellOptions[index][key] = value
        setProduct({...product, sellOptions})
    }

    const handleAttributeChange = (key, value) => {
        const attributes = {...product.attributes, [key]: value}
        setProduct({...product, attributes})
    }

    if (!response.loading && response.success) {
        return <Navigate to={"/products/" + response.data.usin}/>
    }
    return (
        <Card variant="outlined" style={{padding: 20}}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Main
                    </Typography>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TitleField
                                value={product.title}
                                onChange={title => {
                                    handleMainChange("title", title)
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <DescField
                                value={product.description}
                                onChange={desc => {
                                    handleMainChange("description", desc)
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TagSelect
                                value={product.tag}
                                onSelect={tag => {
                                    handleMainChange("tag", tag)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Images
                    </Typography>
                    <Grid container direction="column" spacing={1}>
                        {product.images.map((image, i) => (
                            <Grid item key={i}>
                                <ImageField
                                    value={image}
                                    onDelete={() => handleImageDelete(i)}
                                    onChange={link => {
                                        handleImageLinkChange(i, link)
                                    }}
                                />
                            </Grid>
                        ))}
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={handleImageAdd}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Attributes
                    </Typography>
                    <Grid container direction="row" spacing={1}>
                        {Object.entries(product.attributes).map(([key, value]) => (
                            <Grid item xs={4} key={key}>
                                <AttributeField
                                    label={key}
                                    value={value}
                                    onChange={value => {
                                        handleAttributeChange(key, value)
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Sell Options
                    </Typography>
                    <Grid container direction="column" spacing={1}>
                        {product.sellOptions.map((option, i) => (
                            <Grid item key={i} container direction="row" spacing={1} alignItems="center">
                                <Grid item>
                                    <SellTypeSelect
                                        value={product.sellOptions[i].type}
                                        onSelect={type => {
                                            handleSellOptionChange(i, "type", type)
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <SellPriceField
                                        value={product.sellOptions[i].price.toString()}
                                        onChange={price => {
                                            handleSellOptionChange(i, "price", price)
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <SellCurrencySelect
                                        value={product.sellOptions[i].currency}
                                        onSelect={cur => {
                                            handleSellOptionChange(i, "currency", cur)
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton size="small" onClick={() => {
                                        handleSellOptionDelete(i)
                                    }}>
                                        <Clear/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={handleSellOptionAdd}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" size="large" disableElevation fullWidth
                            disabled={response.loading}
                            onClick={() => {
                                makeRequest(edit ? putProductRequest(product) : postProductRequest(product))
                            }}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}