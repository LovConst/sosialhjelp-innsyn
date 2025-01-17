import * as React from "react";
import {useTranslation} from "react-i18next";
import {isFileUploadAllowed} from "./DriftsmeldingUtilities";
import {Alert} from "@navikt/ds-react";
import styled from "styled-components/macro";
import useKommune from "../../hooks/useKommune";

interface Props {
    leserData: undefined | boolean;
}

const Bold = styled.span`
    font-weight: bold;
`;

const DriftsmeldingVedlegg: React.FC<Props> = (props: Props) => {
    const {kommune, isLoading} = useKommune();
    const {t} = useTranslation();
    const kanLasteOppVedlegg: boolean = isFileUploadAllowed(kommune);

    if (!kanLasteOppVedlegg && !props.leserData && !isLoading) {
        return (
            <Alert variant="error" size="medium" inline>
                <Bold>{t("driftsmelding.kanIkkeSendeVedlegg")}</Bold>
            </Alert>
        );
    }
    return null;
};

export default DriftsmeldingVedlegg;
