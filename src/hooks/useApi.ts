import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {api} from "../utils/axios";

export function useApi<T>(config: AxiosRequestConfig, deps: any = []): [T | null, boolean, string] {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await api.request(config);
                setResponse(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.message)
                } else {
                    throw new Error('Błąd niezwiązany z pobieraniem');
                }
            } finally {
                setLoading(false)
            }
        })();
    }, [...deps]);

    return [response, loading, error];
}
