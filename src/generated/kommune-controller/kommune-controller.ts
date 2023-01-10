/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {KommuneResponse} from ".././model";
import {axiosInstance} from "../../axios-instance";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentKommuneInfo = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<KommuneResponse>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/kommune`, method: "get", signal},
        options
    );
};

export const getHentKommuneInfoQueryKey = (fiksDigisosId: string) => [`/api/v1/innsyn/${fiksDigisosId}/kommune`];

export type HentKommuneInfoQueryResult = NonNullable<Awaited<ReturnType<typeof hentKommuneInfo>>>;
export type HentKommuneInfoQueryError = unknown;

export const useHentKommuneInfo = <TData = Awaited<ReturnType<typeof hentKommuneInfo>>, TError = unknown>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentKommuneInfo>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentKommuneInfoQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentKommuneInfo>>> = ({signal}) =>
        hentKommuneInfo(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentKommuneInfo>>, TError, TData>(queryKey, queryFn, {
        enabled: !!fiksDigisosId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};
