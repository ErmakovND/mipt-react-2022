import {Grid, Typography} from "@material-ui/core";

export const SmallInfo = ({desc, text}) => {
    return (
        <div>
            <Typography variant="subtitle2">
                {desc}
            </Typography>
            <Typography>
                {text}
            </Typography>
        </div>
    )
}

export const Title = ({title, ...props}) => (
    <Typography variant="h6" {...props}>
        {title}
    </Typography>
)

export const Description = ({desc}) => (
    <Typography variant="body1">
        {desc}
    </Typography>
)

export const Author = ({author}) => (
    <Typography variant="subtitle1" color="textSecondary">
        {author}
    </Typography>
)

export const Attributes = ({attributes}) => (
    <Grid container direction="column" spacing={2}>
        {Object.keys(attributes).map((key) => (
            <Grid item key={key}>
                <SmallInfo
                    desc={key}
                    text={attributes[key]}
                />
            </Grid>
        ))}
    </Grid>
)

export const SellOptions = ({options}) => (
    <Grid container direction="row" spacing={2}>
        {options.map((option) => (
            <Grid item key={option.type}>
                <SmallInfo
                    desc={option.type}
                    text={option.price + " " + option.currency}
                />
            </Grid>
        ))}
    </Grid>
)

const countRating = (ratings) => {
    let sum = 0
    let cnt = 0
    ratings.forEach((r) => {
        sum += r.rate * r.amount
        cnt += r.amount
    })
    return {
            rating: cnt === 0 ? null : (sum / cnt).toFixed(2),
            amount: cnt
        }
}

export const RatingShort = ({ratings}) => {
    const r = countRating(ratings)
    return (
        <div>
            <Typography variant="h6" component="span" style={{marginRight: 10}}>
                {r.rating ? r.rating + " out of 5" : "no rating yet"}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="span">
                {r.rating ? r.amount + " ratings" : ""}
            </Typography>
        </div>
    )
}

export const RatingDetailed = ({ratings}) => (
    <Grid container direction="row" spacing={2}>
        {ratings.map((rating) => (
            <Grid item key={rating.rate}>
                <Typography variant="subtitle2" component="span">
                    {rating.rate + ": "}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="span">
                    {rating.amount}
                </Typography>
            </Grid>
        ))}
    </Grid>
)