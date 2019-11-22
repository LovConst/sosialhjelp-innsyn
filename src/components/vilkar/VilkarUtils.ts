import {SaksStatusState, Utfall} from "../../redux/innsynsdata/innsynsdataReducer";

export const getSkalViseVilkarView = (innsynSaksStatusStateListe: SaksStatusState[]): boolean => {
    if (innsynSaksStatusStateListe && Array.isArray(innsynSaksStatusStateListe)) {
        let innvilgedeSaker: SaksStatusState[] = innsynSaksStatusStateListe.filter((s: SaksStatusState) => s.status === Utfall.FERDIGBEHANDLET);
        if (innvilgedeSaker.length > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
