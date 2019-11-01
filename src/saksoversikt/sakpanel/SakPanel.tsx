import React from "react";
import {Element, EtikettLiten} from "nav-frontend-typografi";
import {LenkepanelBase} from "nav-frontend-lenkepanel/lib";
import { EtikettFokus } from 'nav-frontend-etiketter';
import DatoOgKlokkeslett from "../../components/tidspunkt/DatoOgKlokkeslett";
import DocumentIcon from "../../components/ikoner/DocumentIcon";
import "./sakpanel.less";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import Lastestriper from "../../components/lastestriper/Lasterstriper";
import useSakdDetaljerService from "../saksDetaljer/useSakdDetaljerService";
import {REST_STATUS} from "../../utils/restUtils";

interface Props {
    fiksDigisosId: string;
    tittel: string;
    status: string;
    oppdatert: string;
    key: string;
    url: string;
    antallNyeOppgaver?: number;
}

const SakPanel: React.FC<Props> = ({fiksDigisosId, tittel, status, oppdatert, url, antallNyeOppgaver}) => {

    const onClick = (event: any) => {
        if(fiksDigisosId === null) {
            window.location.href = url;
        } else {
            dispatch(push("/innsyn/" + fiksDigisosId + "/status"));
            event.preventDefault();
        }
    };

    let underLasting = true;
    let requestId = fiksDigisosId;
    if(fiksDigisosId === null) {
        underLasting = false;
        requestId = "";
    }

    const saksDetaljerResponse = useSakdDetaljerService(requestId);

    if(fiksDigisosId !== null) {
        if (saksDetaljerResponse.restStatus === REST_STATUS.OK) {
            let saksDetaljer = saksDetaljerResponse.payload.results;
            if (saksDetaljer && saksDetaljer.fiksDigisosId === fiksDigisosId) {
                underLasting = false;
                status = saksDetaljer.status;
                antallNyeOppgaver = saksDetaljer.antallNyeOppgaver;
                if (saksDetaljer.soknadTittel && saksDetaljer.soknadTittel !== "")
                    tittel = saksDetaljer.soknadTittel;
            }
        }
    }

    const dispatch = useDispatch();
    return (
        <LenkepanelBase onClick={onClick} className="panel-glippe-over" href="#">
            <div className="sakpanel">
                <div className="sakpanel_text">
                    <DocumentIcon className="document_icon"/>
                    <div className="sakpanel_innhold">
                        <div className="sakpanel_status">

                            <EtikettLiten>
                                {fiksDigisosId !== null && !underLasting && (
                                    <>
                                        {status} ● oppdatert <DatoOgKlokkeslett tidspunkt={oppdatert} bareDato={true}/>
                                    </>
                                )}
                                {fiksDigisosId !== null && underLasting && (
                                    <div className="sakspanel_status_laster">
                                        <Lastestriper linjer={1}/> ● oppdatert
                                        <DatoOgKlokkeslett tidspunkt={oppdatert} bareDato={true}/>
                                    </div>
                                )}
                                {fiksDigisosId === null && (
                                    <>
                                        SENDT <DatoOgKlokkeslett tidspunkt={oppdatert} bareDato={true}/>
                                    </>
                                )}
                            </EtikettLiten>
                        </div>
                        {underLasting && <Lastestriper linjer={1}/>}
                        {!underLasting && <Element >{tittel}</Element>}
                    </div>
                </div>
                <div className="sakpanel_innhold_etikett">
                    {underLasting && <Lastestriper linjer={1}/>}
                    {!underLasting && antallNyeOppgaver !== undefined && antallNyeOppgaver >= 1 && (
                        <EtikettFokus>
                            <FormattedMessage id="saker.oppgave" values={{antall: antallNyeOppgaver}} />
                        </EtikettFokus>
                    )}
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default SakPanel;
