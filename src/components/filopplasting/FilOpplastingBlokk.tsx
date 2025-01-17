import React, {ReactElement} from "react";
import ErrorMessagePlaceholder, {ErrorMessage} from "../errors/ErrorMessage";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {css} from "styled-components/macro";
import FileItemView from "./FileItemView";
import ErrorMessagesSummary, {dedupeErrorsByProp} from "./ErrorMessagesSummary";
import {Error, errorStatusToMessage} from "./useFilOpplasting";
import styles from "./filopplasting.module.css";
import {BodyShort, Label} from "@navikt/ds-react";

const StyledFrame = styled.div<{hasError?: boolean}>`
    padding: 1rem;
    background-color: var(--a-gray-50);
    border-radius: 4px;

    ${({hasError}) =>
        hasError &&
        css`
            background-color: var(--a-red-50);
            border: 1px solid var(--a-red-500);
        `};
`;

interface Props {
    tittel?: string | null;
    beskrivelse?: string | null;
    addFileButton?: React.ReactElement;
    filer: File[];
    onDelete: (event: React.MouseEvent<HTMLButtonElement>, fil: File) => void;
    errors: Error[];
}

const FilOpplastingBlokk = (props: Props): ReactElement => {
    const {addFileButton} = props;
    const uniqueErrors = dedupeErrorsByProp(props.errors, "feil");
    const {t} = useTranslation();

    return (
        <StyledFrame hasError={props.errors.length > 0}>
            <div className="tekst-wrapping">
                {props.tittel ? <Label as="p">{props.tittel}</Label> : <></>}
                {props.beskrivelse ? <BodyShort spacing>{props.beskrivelse}</BodyShort> : <></>}
            </div>
            {addFileButton}
            <ErrorMessagePlaceholder>
                {props.errors.length > 0 ? (
                    <>
                        <ErrorMessagesSummary errors={props.errors} />
                        <ul className={styles.feilListe}>
                            {uniqueErrors.map((key, i) => (
                                <li key={i}>
                                    <ErrorMessage>{t(errorStatusToMessage[key.feil])}</ErrorMessage>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <></>
                )}
            </ErrorMessagePlaceholder>
            <FileItemView errors={props.errors} filer={props.filer} onDelete={props.onDelete} />
        </StyledFrame>
    );
};

export default FilOpplastingBlokk;
