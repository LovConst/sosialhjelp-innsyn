import React from 'react';
import Historikk from "../components/historikk/Historikk";
import SoknadsStatus, {SoknadsStatusEnum} from "../components/soknadsStatus/SoknadsStatus";
import Oppgaver from "../components/oppgaver/Oppgaver";
import VedleggUtbetalingerLenker from "../components/vedleggUtbetalingerLenker/VedleggUtbetalingerLenker";
import {Utfall} from "../redux/innsynsdata/innsynsdataReducer";
import EksternLenke from "../components/eksternLenke/EksternLenke";
import SosialhjelpAlertStripe from "../components/alertStripe/SosialhelpAlertStripe";

const DineOppgaver: React.FC = () => {

    return (
        <>

            <SosialhjelpAlertStripe
                type="advarsel"
                tittel="Du har fått et brev om saksbehandlingstiden for søknaden din."
            >
                <EksternLenke href={"123123"}>Vis brevet</EksternLenke>
            </SosialhjelpAlertStripe>

            <SoknadsStatus
                status={SoknadsStatusEnum.UNDER_BEHANDLING}
                saksStatus={[
                    {
                        tittel: "Nødhjelp",
                        status: Utfall.INNVILGET, // "innvilget",
                        vedtaksfilUrlList: []
                        // kommentarer: <Lenke href="todo">Vedtakstbrev (12.03.2019)</Lenke>
                    },
                    {
                        tittel: "Livsopphold og husleie",
                        status: Utfall.DELVIS_INNVILGET, // "under behandling"
                        vedtaksfilUrlList: []
                    }
                ]}
            />

            <Oppgaver oppgaver={
                [
                    {
                        innsendelsesfrist: "2018-10-20T07:37:00.134",
                        dokumenttype: "Strømfaktura",
                        tilleggsinformasjon: "For periode 01.01.2019 til 01.02.2019",
                        vedlegg: []
                    },
                    {
                        innsendelsesfrist: "2018-10-20T07:37:30",
                        dokumenttype: "Kopi av depositumskonto",
                        tilleggsinformasjon: "Signert av både deg og utleier",
                        vedlegg: [{
                            id: "12345",
                            filnavn: "IMG8232.JPG",
                            filstorrelse: "231 kb"
                        },
                        {
                            id: "1234567",
                            filnavn: "IMG8782.JPG",
                            filstorrelse: "431 kb"
                        }]
                    }
                ]
            }/>

            <VedleggUtbetalingerLenker />

            <Historikk
                hendelser={[
                    {
                        tidspunkt: "2018-10-04T13:42:00.134",
                        beskrivelse: "Søknaden med vedlegg er sendt til NAV Sagene, Oslo kommune",
                        filUrl: "filnavn_123"
                    },
                    {
                        tidspunkt: "2018-10-11T13:42:00.134",
                        beskrivelse: "Søknaden med vedlegg er sendt til videre NAV Vestre Aker, Oslo kommune",
                        filUrl: null
                    },
                    {
                        tidspunkt: "2018-10-12T13:37:00.134",
                        beskrivelse: "Søknaden er mottatt av NAV Vestre Aker, Oslo kommune",
                        filUrl: "filnavn_123"
                    },
                    {
                        tidspunkt: "2018-10-04T13:42:00.134",
                        beskrivelse: "Søknaden med vedlegg er sendt til NAV Sagene, Oslo kommune",
                        filUrl: "filnavn_123"
                    }
                ]}
            />
        </>
    );
};

export default DineOppgaver;
