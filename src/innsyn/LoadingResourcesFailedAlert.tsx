import {Alert} from "@navikt/ds-react";
import React, {useEffect} from "react";
import {logServerfeil} from "../utils/amplitude";
import {
    useGetDokumentasjonkrav,
    useGetOppgaver,
    useGetVilkar,
} from "../generated/oppgave-controller/oppgave-controller";
import {useHentSoknadsStatus} from "../generated/soknads-status-controller/soknads-status-controller";
import {useHentHendelser} from "../generated/hendelse-controller/hendelse-controller";
import {useHentVedlegg} from "../generated/vedlegg-controller/vedlegg-controller";
import {FormattedMessage} from "react-intl";
import styled from "styled-components";

const StyledWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const LoadingResourcesFailedAlert = (props: {
    fiksDigisosId: string;
    loadingResourcesFailed: boolean;
    setLoadingResourcesFailed: (loadingResourcesFailed: boolean) => void;
}) => {
    const {isError: soknadsStatusHasError} = useHentSoknadsStatus(props.fiksDigisosId);
    const {isError: oppgaverHasError} = useGetOppgaver(props.fiksDigisosId);
    const {isError: vilkarHasError} = useGetVilkar(props.fiksDigisosId);
    const {isError: dokumentasjonkravHasError} = useGetDokumentasjonkrav(props.fiksDigisosId);
    const {isError: hendelserHasError} = useHentHendelser(props.fiksDigisosId);
    const {isError: vedleggHasError} = useHentVedlegg(props.fiksDigisosId);

    const {setLoadingResourcesFailed} = props;

    useEffect(() => {
        if (
            soknadsStatusHasError ||
            oppgaverHasError ||
            vilkarHasError ||
            dokumentasjonkravHasError ||
            hendelserHasError ||
            vedleggHasError
        ) {
            logServerfeil({
                soknadsStatusHasError,
                oppgaverHasError,
                vilkarHasError,
                dokumentasjonkravHasError,
                hendelserHasError,
                vedleggHasError,
            });
            setLoadingResourcesFailed(true);
        }
    }, [
        soknadsStatusHasError,
        oppgaverHasError,
        vilkarHasError,
        dokumentasjonkravHasError,
        hendelserHasError,
        vedleggHasError,
        setLoadingResourcesFailed,
    ]);

    return (
        <StyledWrapper>
            {props.loadingResourcesFailed && (
                <Alert variant="error" className="luft_over_16px">
                    <FormattedMessage id={"feilmelding.ressurs_innlasting"} values={{linebreak: <br />}} />
                </Alert>
            )}
        </StyledWrapper>
    );
};
