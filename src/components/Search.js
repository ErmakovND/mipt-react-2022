import {
    Button,
    FormControl,
    Grid, InputAdornment,
    OutlinedInput
} from "@material-ui/core";
import {useState} from "react";

export const Search = ({onSearch}) => {
    const [query, setQuery] = useState("")
    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={query}
                        placeholder="Key words"
                        endAdornment={
                            <InputAdornment position="end">
                                <Button variant="outlined" color="primary" size="small" onClick={() => {
                                    onSearch(query)
                                    setQuery("")
                                }}>
                                    Search
                                </Button>
                            </InputAdornment>
                        }
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}