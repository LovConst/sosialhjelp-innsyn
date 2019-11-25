import {
    SaksStatusState,
    SaksStatus,
    VedtakFattet,
    Vedtak,
    UtfallVedtak
} from "../../redux/innsynsdata/innsynsdataReducer";
import {getSkalViseVilkarView} from "./VilkarUtils";

const saksStatus1: SaksStatusState = {
    tittel: "Saksstatus 1",
    status: SaksStatus.UNDER_BEHANDLING,
    vedtaksListe: [],
    vedtaksfilUrlList: []
};
const saksStatus2: SaksStatusState = {
    tittel: "Saksstatus 1",
    status: SaksStatus.UNDER_BEHANDLING,
    vedtaksListe: [],
    vedtaksfilUrlList: []
};
const saksStatus3: SaksStatusState = {
    tittel: "Saksstatus 1",
    status: SaksStatus.FERDIGBEHANDLET,
    vedtaksListe: [],
    vedtaksfilUrlList: []
};
const saksStatus4: SaksStatusState = {
    tittel: "Saksstatus 1",
    status: SaksStatus.FERDIGBEHANDLET,
    vedtaksListe: [
        {
            utfall: UtfallVedtak.INNVILGET,
            vedtaksFilUrl: "link til noe",
        } as Vedtak
    ],
    vedtaksfilUrlList: []
};

const saksStatus5: SaksStatusState = {
    tittel: "Saksstatus 1",
    status: SaksStatus.FERDIGBEHANDLET,
    vedtaksListe: [
        {
            utfall: UtfallVedtak.INNVILGET,
            vedtaksFilUrl: "link til noe",
        } as Vedtak,
        {
            utfall: UtfallVedtak.AVVIST,
            vedtaksFilUrl: "link til noe",
        } as Vedtak,
        {
            vedtaksFilUrl: "link til noe",
        } as Vedtak
    ],
    vedtaksfilUrlList: []
};

const listSaksStatusState_skal_gi_false: SaksStatusState[] = [
    saksStatus1,
    saksStatus2,
    saksStatus3
];

const listSaksStatusState_skal_gi_true: SaksStatusState[] = [
    saksStatus1,
    saksStatus2,
    saksStatus3,
    saksStatus4
];

it('viser driftsmelding for riktig kommune state', () => {
    expect(getSkalViseVilkarView(listSaksStatusState_skal_gi_false)).toEqual(false);
    expect(getSkalViseVilkarView(listSaksStatusState_skal_gi_true)).toEqual(true);
    expect(getSkalViseVilkarView([...listSaksStatusState_skal_gi_false, saksStatus5])).toEqual(false);
});
