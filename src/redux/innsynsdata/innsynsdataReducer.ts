import {Reducer} from "redux";
import {setPath} from "../../utils/setPath";
import {REST_STATUS} from "../../utils/restUtils";

export enum Utfall {
    INNVILGET = "INNVILGET",
    DELVIS_INNVILGET = "DELVIS_INNVILGET",
    AVSLATT = "AVSLATT",
    AVVIST = "AVVIST"
}

export interface Vedtaksfil {
    tidspunkt: string;
    beskrivelse: string;
    filUrl: null|string;
}

export interface Utbetaling {
    tidspunkt: string;
    beskrivelse: string;
    belop: number;
}

export interface SaksStatusState {
    tittel: string;
    status: Utfall;
    vedtaksfiler: Vedtaksfil[];
}

export interface Vedlegg {
    storrelse: number;
    url: string;
    beskrivelse: string;
    datoLagtTil: string;
    filnavn: string;
}

export interface Oppgave {
    innsendelsesfrist: string;
    dokumenttype: string;
    tilleggsinformasjon: string;
    vedlegg?: Vedlegg[];
}

export enum InnsynsdataActionTypeKeys {
    OPPDATER_INNSYNSSDATA = "innsynsdata/OPPDATER",
    OPPDATER_INNSYNSSDATA_STI = "innsynsdata/OPPDATER_STI",
    SETT_REST_STATUS = "innsynsdata/SETT_REST_STATUS"
}

export enum InnsynsdataSti {
    SAKSSTATUS = "saksStatus",
    OPPGAVER = "oppgaver",
    SOKNADS_STATUS = "soknadsStatus",
    HENDELSER = "hendelser",
    VEDLEGG = "vedlegg"
}

export interface InnsynssdataActionVerdi {
    saksStatus?: SaksStatusState;
}

export interface InnsynsdataActionType {
    type: InnsynsdataActionTypeKeys,
    verdi?: InnsynssdataActionVerdi,
    sti: InnsynsdataSti,
    restStatus?: string
}

export interface Status {
    status: string|null;
}

export interface Hendelse {
    tidspunkt: string;
    beskrivelse: string;
    filUrl: null|string;
}

export interface InnsynsdataType {
    saksStatus: SaksStatusState[];
    oppgaver: Oppgave[];
    restStatus: any;
    soknadsStatus: Status;
    hendelser: Hendelse[];
    vedlegg: Vedlegg[];
}

export const initialInnsynsdataRestStatus = {
    saksStatus: REST_STATUS.INITIALISERT,
    oppgaver: REST_STATUS.INITIALISERT,
    soknadsStatus: REST_STATUS.INITIALISERT,
    hendelser: REST_STATUS.INITIALISERT,
    vedlegg: REST_STATUS.INITIALISERT,
    utbetalinger: REST_STATUS.INITIALISERT
};

const initialState: InnsynsdataType = {
    saksStatus: [],
    oppgaver: [],
    soknadsStatus: {
        status: null
    },
    hendelser: [],
    vedlegg: [],
    restStatus: initialInnsynsdataRestStatus
};

const InnsynsdataReducer: Reducer<InnsynsdataType, InnsynsdataActionType> = (state = initialState, action) => {
    switch (action.type) {
        case InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI:
            return {
                ...setPath(state, action.sti, action.verdi)
            };
        case InnsynsdataActionTypeKeys.SETT_REST_STATUS:
            return {
                ...setPath(state, "restStatus/" + action.sti, action.restStatus)
            };
        default:
            return state;
    }
};

export const oppdaterInnsynsdataState = (sti: InnsynsdataSti, verdi: InnsynssdataActionVerdi): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.OPPDATER_INNSYNSSDATA_STI,
        sti,
        verdi
    }
};

export const settRestStatus = (sti: InnsynsdataSti, restStatus: REST_STATUS): InnsynsdataActionType => {
    return {
        type: InnsynsdataActionTypeKeys.SETT_REST_STATUS,
        sti,
        restStatus
    }
};


export default InnsynsdataReducer;
