import React, {useEffect} from "react";
import {logButtonOrLinkClick} from "../../utils/amplitude";
import {Tabs, Panel} from "@navikt/ds-react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

enum ARKFANER {
    HISTORIKK = "Historikk",
    VEDLEGG = "Vedlegg",
}

const StyledPanel = styled(Panel)`
    margin-top: 2rem;
    padding: 1rem 0 0 0;

    @media screen and (min-width: 641px) {
        padding-left: 60px;
        padding-right: 80px;
        margin-top: 4rem;
    }
`;

interface Props {
    historikkChildren: React.ReactNode;
    vedleggChildren: React.ReactNode;
}

const ArkfanePanel: React.FC<Props> = (props) => {
    const {t} = useTranslation();
    const [valgtFane, setValgtFane] = React.useState<string>(ARKFANER.HISTORIKK);

    useEffect(() => {
        // Logg til amplitude når "dine vedlegg" blir trykket
        if (valgtFane === ARKFANER.VEDLEGG) {
            logButtonOrLinkClick("Dine vedlegg");
        }
    }, [valgtFane]);

    return (
        <StyledPanel>
            <Tabs onChange={setValgtFane} value={valgtFane}>
                <Tabs.List>
                    <Tabs.Tab value={ARKFANER.HISTORIKK} label={t("historikk.tittel")} />
                    <Tabs.Tab value={ARKFANER.VEDLEGG} label={t("vedlegg.tittel")} />
                </Tabs.List>
                <Tabs.Panel value={ARKFANER.HISTORIKK} className="navds-panel">
                    {props.historikkChildren}
                </Tabs.Panel>
                <Tabs.Panel value={ARKFANER.VEDLEGG} className="navds-panel">
                    {props.vedleggChildren}
                </Tabs.Panel>
            </Tabs>
        </StyledPanel>
    );
};

export default ArkfanePanel;
