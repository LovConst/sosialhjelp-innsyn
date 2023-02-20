/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {HendelseResponse} from ".././model";
import {axiosInstance} from "../../axios-instance";
import type {ErrorType} from "../../axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentHendelser = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<HendelseResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/hendelser`, method: "get", signal},
        options
    );
};

export const getHentHendelserQueryKey = (fiksDigisosId: string) => [`/api/v1/innsyn/${fiksDigisosId}/hendelser`];

export type HentHendelserQueryResult = NonNullable<Awaited<ReturnType<typeof hentHendelser>>>;
export type HentHendelserQueryError = ErrorType<unknown>;

export const useHentHendelser = <TData = Awaited<ReturnType<typeof hentHendelser>>, TError = ErrorType<unknown>>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentHendelser>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentHendelserQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentHendelser>>> = ({signal}) =>
        hentHendelser(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentHendelser>>, TError, TData>(queryKey, queryFn, {
        enabled: !!fiksDigisosId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};
