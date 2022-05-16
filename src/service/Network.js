import {useEffect, useState} from "react";

export const getTagsRequest = () => {
    return {
        input: `https://ultimate-ecommerce.v-query.com/api/service-product/tag`
    }
}

export const getProductsRequest = (query, tag) => {
    return {
        input: `https://ultimate-ecommerce.v-query.com/api/service-product/search?text=${query}$tag=${tag}`
    }
}

export const getProductRequest = (usin) => {
    return {
        input: `https://ultimate-ecommerce.v-query.com/api/service-product/search/${usin}`
    }
}

export const putProductRequest = (product) => {
    return {
        input: `https://ultimate-ecommerce.v-query.com/api/service-boarding/boarding`,
        init: {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

export const postProductRequest = (product) => {
    return {
        input: `https://ultimate-ecommerce.v-query.com/api/service-boarding/boarding`,
        init: {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

export const useTags = () => {
    const [response, makeRequest] = useNetwork()
    useEffect(() => {
        makeRequest(getTagsRequest())
    }, [])
    return response
}

export const useProduct = (usin) => {
    const [response, makeRequest] = useNetwork()
    useEffect(() => {
        makeRequest(getProductRequest(usin))
    }, [usin])
    return response
}

export const useNetwork = () => {
    const [response, setResponse] = useState({loading: false, error: false, success: false, data: null})
    return [
        response,
        ({input, init}) => {
            setResponse({
                loading: true,
                success: false,
                error: false,
                data: null
            })
            fetch(input, init)
                .then(r => r.json())
                .then(data => setResponse(response => ({...response, data, success: true})))
                .catch(error => setResponse(response => ({...response, error})))
                .finally(() => setResponse(response => ({...response, loading: false})))
        }
    ]
}
