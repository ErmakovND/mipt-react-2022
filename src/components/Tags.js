import {Card, MenuItem} from "@material-ui/core";
import {useTags} from "../service/Network";

export const ordered = (tags, parent, depth) => {
    let arr = []
    tags.filter(t => t.parent === parent).forEach(tag => {
        arr.push({depth, tag})
        arr.push(...ordered(tags, tag.key, depth + 1))
    })
    return arr
}

export const TagList = ({selected, onSelect}) => {
    const tags = useTags()
    return (
        <Card variant="outlined" style={{padding: 10}}>
            {tags.loading && "..."}
            {tags.error && "error"}
            {tags.success && ordered(tags.data, null, 1).map(({depth, tag}) => (
                <MenuItem dense key={tag.key} style={{paddingLeft: depth * 10, cursor: "pointer"}} selected={tag.key === selected}
                          value={tag.key} onClick={() => {onSelect(tag.key)}}>
                    {tag.title}
                </MenuItem>
            ))}
        </Card>
    )
}

