import React from "react";
import "./soknadsStatus.less";
import {UrlResponse} from "../../redux/innsynsdata/innsynsdataReducer";
import EksternLenke from "../eksternLenke/EksternLenke";
import Lastestriper from "../lastestriper/Lasterstriper";

import {REST_STATUS, skalViseLastestripe} from "../../utils/restUtils";
import DokumentSendt from "../ikoner/DokumentSendt";
import DatoOgKlokkeslett from "../tidspunkt/DatoOgKlokkeslett";
import {BodyShort, Heading} from "@navikt/ds-react";
import {UthevetPanelEkstraPadding} from "../paneler/UthevetPanel";
import {TittelOgIkon} from "./TittelOgIkon";

const SoknadsStatusUtenInnsyn = (props: {
    restStatus: REST_STATUS;
    tidspunktSendt: string | null;
    navKontor: string | null;
    filUrl: UrlResponse | null;
}) => {
    return (
        <UthevetPanelEkstraPadding>
            <TittelOgIkon>
                {skalViseLastestripe(props.restStatus) && <Lastestriper linjer={1} />}
                {props.restStatus !== REST_STATUS.FEILET && (
                    <>
                        <Heading level="1" size="large">
                            Søknaden er sendt
                        </Heading>
                        <DokumentSendt />
                    </>
                )}
            </TittelOgIkon>

            {props.tidspunktSendt && props.navKontor && props.filUrl && (
                <div className="status_detalj_panel_info_alert_luft_over">
                    <BodyShort>
                        Sendt den{" "}
                        <DatoOgKlokkeslett bareDato={true} tidspunkt={props.tidspunktSendt} brukKortMaanedNavn={true} />
                        til {props.navKontor}{" "}
                        <EksternLenke href={props.filUrl.link} target="_blank">
                            {props.filUrl.linkTekst}
                        </EksternLenke>
                    </BodyShort>
                </div>
            )}
        </UthevetPanelEkstraPadding>
    );
};

export default SoknadsStatusUtenInnsyn;
