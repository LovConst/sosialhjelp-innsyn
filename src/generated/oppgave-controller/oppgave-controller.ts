/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {VilkarResponse, OppgaveResponse, DokumentasjonkravResponse} from ".././model";
import {axiosInstance} from "../../axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const getVilkar = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<VilkarResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/vilkar`, method: "get", signal},
        options
    );
};

export const getGetVilkarQueryKey = (fiksDigisosId: string) => [`/api/v1/innsyn/${fiksDigisosId}/vilkar`];

export type GetVilkarQueryResult = NonNullable<Awaited<ReturnType<typeof getVilkar>>>;
export type GetVilkarQueryError = unknown;

export const useGetVilkar = <TData = Awaited<ReturnType<typeof getVilkar>>, TError = unknown>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getVilkar>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetVilkarQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getVilkar>>> = ({signal}) =>
        getVilkar(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getVilkar>>, TError, TData>(queryKey, queryFn, {
        enabled: !!fiksDigisosId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getOppgaver = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<OppgaveResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/oppgaver`, method: "get", signal},
        options
    );
};

export const getGetOppgaverQueryKey = (fiksDigisosId: string) => [`/api/v1/innsyn/${fiksDigisosId}/oppgaver`];

export type GetOppgaverQueryResult = NonNullable<Awaited<ReturnType<typeof getOppgaver>>>;
export type GetOppgaverQueryError = unknown;

export const useGetOppgaver = <TData = Awaited<ReturnType<typeof getOppgaver>>, TError = unknown>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getOppgaver>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetOppgaverQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getOppgaver>>> = ({signal}) =>
        getOppgaver(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getOppgaver>>, TError, TData>(queryKey, queryFn, {
        enabled: !!fiksDigisosId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getOppgaveMedId = (
    fiksDigisosId: string,
    oppgaveId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<OppgaveResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/oppgaver/${oppgaveId}`, method: "get", signal},
        options
    );
};

export const getGetOppgaveMedIdQueryKey = (fiksDigisosId: string, oppgaveId: string) => [
    `/api/v1/innsyn/${fiksDigisosId}/oppgaver/${oppgaveId}`,
];

export type GetOppgaveMedIdQueryResult = NonNullable<Awaited<ReturnType<typeof getOppgaveMedId>>>;
export type GetOppgaveMedIdQueryError = unknown;

export const useGetOppgaveMedId = <TData = Awaited<ReturnType<typeof getOppgaveMedId>>, TError = unknown>(
    fiksDigisosId: string,
    oppgaveId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getOppgaveMedId>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetOppgaveMedIdQueryKey(fiksDigisosId, oppgaveId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getOppgaveMedId>>> = ({signal}) =>
        getOppgaveMedId(fiksDigisosId, oppgaveId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getOppgaveMedId>>, TError, TData>(queryKey, queryFn, {
        enabled: !!(fiksDigisosId && oppgaveId),
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getHarLevertDokumentasjonkrav = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<boolean>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/harLeverteDokumentasjonkrav`, method: "get", signal},
        options
    );
};

export const getGetHarLevertDokumentasjonkravQueryKey = (fiksDigisosId: string) => [
    `/api/v1/innsyn/${fiksDigisosId}/harLeverteDokumentasjonkrav`,
];

export type GetHarLevertDokumentasjonkravQueryResult = NonNullable<
    Awaited<ReturnType<typeof getHarLevertDokumentasjonkrav>>
>;
export type GetHarLevertDokumentasjonkravQueryError = unknown;

export const useGetHarLevertDokumentasjonkrav = <
    TData = Awaited<ReturnType<typeof getHarLevertDokumentasjonkrav>>,
    TError = unknown
>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getHarLevertDokumentasjonkrav>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetHarLevertDokumentasjonkravQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getHarLevertDokumentasjonkrav>>> = ({signal}) =>
        getHarLevertDokumentasjonkrav(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getHarLevertDokumentasjonkrav>>, TError, TData>(
        queryKey,
        queryFn,
        {enabled: !!fiksDigisosId, ...queryOptions}
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getfagsystemHarDokumentasjonkrav = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<boolean>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/fagsystemHarDokumentasjonkrav`, method: "get", signal},
        options
    );
};

export const getGetfagsystemHarDokumentasjonkravQueryKey = (fiksDigisosId: string) => [
    `/api/v1/innsyn/${fiksDigisosId}/fagsystemHarDokumentasjonkrav`,
];

export type GetfagsystemHarDokumentasjonkravQueryResult = NonNullable<
    Awaited<ReturnType<typeof getfagsystemHarDokumentasjonkrav>>
>;
export type GetfagsystemHarDokumentasjonkravQueryError = unknown;

export const useGetfagsystemHarDokumentasjonkrav = <
    TData = Awaited<ReturnType<typeof getfagsystemHarDokumentasjonkrav>>,
    TError = unknown
>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getfagsystemHarDokumentasjonkrav>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetfagsystemHarDokumentasjonkravQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getfagsystemHarDokumentasjonkrav>>> = ({signal}) =>
        getfagsystemHarDokumentasjonkrav(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getfagsystemHarDokumentasjonkrav>>, TError, TData>(
        queryKey,
        queryFn,
        {enabled: !!fiksDigisosId, ...queryOptions}
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getDokumentasjonkrav = (
    fiksDigisosId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<DokumentasjonkravResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/dokumentasjonkrav`, method: "get", signal},
        options
    );
};

export const getGetDokumentasjonkravQueryKey = (fiksDigisosId: string) => [
    `/api/v1/innsyn/${fiksDigisosId}/dokumentasjonkrav`,
];

export type GetDokumentasjonkravQueryResult = NonNullable<Awaited<ReturnType<typeof getDokumentasjonkrav>>>;
export type GetDokumentasjonkravQueryError = unknown;

export const useGetDokumentasjonkrav = <TData = Awaited<ReturnType<typeof getDokumentasjonkrav>>, TError = unknown>(
    fiksDigisosId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getDokumentasjonkrav>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetDokumentasjonkravQueryKey(fiksDigisosId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDokumentasjonkrav>>> = ({signal}) =>
        getDokumentasjonkrav(fiksDigisosId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getDokumentasjonkrav>>, TError, TData>(queryKey, queryFn, {
        enabled: !!fiksDigisosId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const getDokumentasjonkravMedId = (
    fiksDigisosId: string,
    dokumentasjonkravId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<DokumentasjonkravResponse[]>(
        {url: `/api/v1/innsyn/${fiksDigisosId}/dokumentasjonkrav/${dokumentasjonkravId}`, method: "get", signal},
        options
    );
};

export const getGetDokumentasjonkravMedIdQueryKey = (fiksDigisosId: string, dokumentasjonkravId: string) => [
    `/api/v1/innsyn/${fiksDigisosId}/dokumentasjonkrav/${dokumentasjonkravId}`,
];

export type GetDokumentasjonkravMedIdQueryResult = NonNullable<Awaited<ReturnType<typeof getDokumentasjonkravMedId>>>;
export type GetDokumentasjonkravMedIdQueryError = unknown;

export const useGetDokumentasjonkravMedId = <
    TData = Awaited<ReturnType<typeof getDokumentasjonkravMedId>>,
    TError = unknown
>(
    fiksDigisosId: string,
    dokumentasjonkravId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof getDokumentasjonkravMedId>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetDokumentasjonkravMedIdQueryKey(fiksDigisosId, dokumentasjonkravId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDokumentasjonkravMedId>>> = ({signal}) =>
        getDokumentasjonkravMedId(fiksDigisosId, dokumentasjonkravId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getDokumentasjonkravMedId>>, TError, TData>(queryKey, queryFn, {
        enabled: !!(fiksDigisosId && dokumentasjonkravId),
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};