import React, {useState} from 'react';
import {Panel} from "nav-frontend-paneler";
import {Normaltekst, Systemtittel, Element} from "nav-frontend-typografi";
import "./historikk.less";
import {Hendelse} from "../../redux/innsynsdata/innsynsdataReducer";
import EksternLenke from "../eksternLenke/EksternLenke";
import {FormattedMessage} from "react-intl";
import DatoOgKlokkeslett from "../tidspunkt/DatoOgKlokkeslett";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import Lastestriper from "../lastestriper/Lasterstriper";

const MAX_ANTALL_KORT_LISTE = 3;

interface Props {
    hendelser: null | Hendelse[];
    leserData: boolean;
}

function sorterHendelserKronologisk(hendelser: Hendelse[]): Hendelse[] {
    return hendelser.sort((a: Hendelse, b: Hendelse) => {
        let c = new Date(a.tidspunkt);
        let d = new Date(b.tidspunkt);
        return c > d ? -1 : c < d ? 1 : 0;
    });
}

interface HistorikkListeProps {
    hendelser: Hendelse[];
    className: string;
    leserData: boolean;
}

const HistorikkListe: React.FC<HistorikkListeProps> = ({hendelser, className, leserData}) => {
    if (leserData) {
        return (<Lastestriper linjer={3}/>);
    }
    return (
        <ul className={className}>
            {hendelser.map((hendelse: Hendelse, index: number) => {
                return (
                    <li key={index}>
                        <Element>
                            <DatoOgKlokkeslett tidspunkt={hendelse.tidspunkt}/>
                        </Element>
                        <Normaltekst>{hendelse.beskrivelse}</Normaltekst>
                        {hendelse.filUrl && (
                            <EksternLenke href={"url_todo_" + hendelse.filUrl}>Se vedtaksbrev</EksternLenke>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const KortHistorikk: React.FC<{hendelser: Hendelse[], leserData: boolean}> = ({hendelser, leserData}) => {
    return (
        <Panel className="panel-glippe-over">
            <HistorikkListe hendelser={hendelser} className="historikk" leserData={leserData}/>
        </Panel>
    );
};

const LangHistorikk: React.FC<{hendelser: Hendelse[]}> = ({hendelser}) => {
    const [apen, setApen] = useState(false);
    const antallSkjulteElementer = hendelser.slice(MAX_ANTALL_KORT_LISTE).length;
    const historikkListeClassname = apen ? "historikk_start" : "historikk_start_lukket";
    return (
        <Panel className="panel-glippe-over">
            <Lesmerpanel
                className="lesMerPanel__historikk"
                apneTekst={"Vis alle (" + antallSkjulteElementer + ") "}
                defaultApen={apen}
                onClose={() => setApen(false)}
                onOpen={() => setApen(true)}
                intro={(
                    <HistorikkListe
                        hendelser={hendelser.slice(0,MAX_ANTALL_KORT_LISTE)}
                        className={"historikk "  + historikkListeClassname}
                        leserData={false}
                    />
                )}
            >
                <HistorikkListe
                    hendelser={hendelser.slice(MAX_ANTALL_KORT_LISTE)}
                    className="historikk"
                    leserData={false}
                />
            </Lesmerpanel>
        </Panel>
    );
};

const Historikk: React.FC<Props> = ({hendelser, leserData}) => {
    if (hendelser === null) {
        return null;
    }
    const sorterteHendelser = sorterHendelserKronologisk(hendelser);
    return (
        <>
            <Panel className="panel-luft-over">
                {leserData && (
                    <Lastestriper linjer={1}/>
                )}
                {!leserData && (
                    <Systemtittel><FormattedMessage id="historikk.tittel"/></Systemtittel>
                )}
            </Panel>
            {sorterteHendelser.length < (MAX_ANTALL_KORT_LISTE +1) && (
                <KortHistorikk hendelser={sorterteHendelser} leserData={leserData}/>
            )}
            {sorterteHendelser.length > MAX_ANTALL_KORT_LISTE && (
                <LangHistorikk hendelser={sorterteHendelser}/>
            )}
        </>
    );
};

export default Historikk;
