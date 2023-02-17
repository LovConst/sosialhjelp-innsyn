import {Accordion} from "@navikt/ds-react";
import {logButtonOrLinkClick} from "../../../utils/amplitude";
import {OpplastingAvVedleggModal} from "../OpplastingAvVedleggModal";
import DriftsmeldingVedlegg from "../../driftsmelding/DriftsmeldingVedlegg";
import {REST_STATUS, skalViseLastestripe} from "../../../utils/restUtils";
import {DokumentasjonEtterspurt} from "../../../redux/innsynsdata/innsynsdataReducer";
import DokumentasjonEtterspurtView from "./DokumentasjonEtterspurtView";
import React from "react";
import {HendelseTypeEnum} from "../../../utils/vedleggUtils";
import {InfoOmOppgaver, MaaSendeDokTekst, NesteInnsendelsesFrist} from "./TekstBlokker";
import styles from "./dokumentasjonEtterspurt.module.css";

function foersteInnsendelsesfrist(dokumentasjonEtterspurt: DokumentasjonEtterspurt[]): Date | null {
    if (dokumentasjonEtterspurt.length > 0) {
        const innsendelsesfrister = dokumentasjonEtterspurt.map(
            (dokumentasjon: DokumentasjonEtterspurt) => new Date(dokumentasjon.innsendelsesfrist!!)
        );
        return innsendelsesfrister[0];
    }
    return null;
}

interface Props {
    restStatus_oppgaver: REST_STATUS;
    dokumentasjonEtterspurt: DokumentasjonEtterspurt[];
}

export const DokumentasjonEtterspurtAccordion = (props: Props) => {
    const brukerHarDokumentasjonEtterspurt = props.dokumentasjonEtterspurt?.length > 0;
    if (!brukerHarDokumentasjonEtterspurt) {
        return null;
    }
    const dokumentasjonEtterspurtErFraInnsyn =
        props.dokumentasjonEtterspurt[0].oppgaveElementer[0].hendelsetype === HendelseTypeEnum.DOKUMENTASJON_ETTERSPURT;

    return (
        <Accordion>
            <Accordion.Item defaultOpen>
                <Accordion.Header
                    onClick={() => logButtonOrLinkClick("Dine oppgaver: Åpnet etterspørsel av dokumentasjon")}
                >
                    <MaaSendeDokTekst dokumentasjonEtterspurtErFraInnsyn={dokumentasjonEtterspurtErFraInnsyn} />
                    {dokumentasjonEtterspurtErFraInnsyn && (
                        <NesteInnsendelsesFrist
                            innsendelsesfrist={foersteInnsendelsesfrist(props.dokumentasjonEtterspurt)}
                        />
                    )}
                </Accordion.Header>
                <Accordion.Content>
                    <InfoOmOppgaver dokumentasjonEtterspurtErFraInnsyn={dokumentasjonEtterspurtErFraInnsyn} />
                    <OpplastingAvVedleggModal />
                    <DriftsmeldingVedlegg leserData={skalViseLastestripe(props.restStatus_oppgaver)} />
                    <ul className={styles.unorderedList}>
                        {props.dokumentasjonEtterspurt.map((dokumentasjon: DokumentasjonEtterspurt, index: number) => (
                            <DokumentasjonEtterspurtView
                                key={dokumentasjon.oppgaveId}
                                dokumentasjonEtterspurt={dokumentasjon}
                                oppgaverErFraInnsyn={dokumentasjonEtterspurtErFraInnsyn}
                                oppgaveIndex={index}
                            />
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
