import React from 'react';
import Historikk from "../../components/historikk/Historikk";
import SoknadsStatus, {SoknadsStatusEnum} from "../../components/soknadsStatus/SoknadsStatus";
import Oppgaver from "../../components/oppgaver/Oppgaver";
import VedleggUtbetalingerLenker from "../../components/vedleggUtbetalingerLenker/VedleggUtbetalingerLenker";
import {Utfall} from "../../redux/innsynsdata/innsynsdataReducer";
import EksternLenke from "../../components/eksternLenke/EksternLenke";
import SosialhjelpAlertStripe from "../../components/alertStripe/SosialhelpAlertStripe";

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
                leserData={false}
                status={SoknadsStatusEnum.UNDER_BEHANDLING}
                saksStatus={[
                    {
                        tittel: "Nødhjelp",
                        status: Utfall.INNVILGET, // "innvilget",
                        vedtaksfiler: []
                        // kommentarer: <Lenke href="todo">Vedtakstbrev (12.03.2019)</Lenke>
                    },
                    {
                        tittel: "Livsopphold og husleie",
                        status: Utfall.DELVIS_INNVILGET, // "under behandling"
                        vedtaksfiler: []
                    }
                ]}
            />

            <Oppgaver oppgaver={
                [
                    {
                        innsendelsesfrist: "2018-10-20T07:37:00.134",
                        dokumenttype: "Strømfaktura",
                        tilleggsinformasjon: "For periode 01.01.2019 til 01.02.2019",
                        erFraInnsyn: true,
                        vedlegg: []
                    },
                    {
                        innsendelsesfrist: "2018-10-20T07:37:30",
                        dokumenttype: "Kopi av depositumskonto",
                        tilleggsinformasjon: "Signert av både deg og utleier",
                        erFraInnsyn: true,
                        vedlegg: [{
                            filnavn: "IMG8232.JPG",
                            type: "beskrivelse",
                            tilleggsinfo: "tilleggsinfo",
                            storrelse: 234,
                            url: "http://todo/123",
                            datoLagtTil: "2018-10-20T07:37:30"
                        },
                        {
                            filnavn: "IMG8232.JPG",
                            type: "beskrivelse",
                            tilleggsinfo: "tilleggsinfo",
                            storrelse: 431,
                            url: "http://todo/1234",
                            datoLagtTil: "2018-10-20T07:37:30"
                        }]
                    }
                ]
            }/>

            <VedleggUtbetalingerLenker
                vedlegg={[]}
            />

            <Historikk
                leserData={false}
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
