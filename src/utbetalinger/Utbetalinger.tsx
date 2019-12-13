import React, {useEffect} from 'react';
import Periodevelger from "./Periodevelger";
import UtbetalingerPanel from "./UtbetalingerPanel";
import "./utbetalinger.less";
import useUtbetalingerService, {UtbetalingSakType} from "./service/useUtbetalingerService";
import {REST_STATUS} from "../utils/restUtils";
import {useBannerTittel, useBrodsmuleSti} from "../redux/navigasjon/navigasjonUtils";
import {InnsynsdataSti} from "../redux/innsynsdata/innsynsdataReducer";
import {useDispatch, useSelector} from "react-redux";
import {InnsynAppState} from "../redux/reduxTypes";
import {hentSaksdata} from "../redux/innsynsdata/innsynsDataActions";

const Utbetalinger: React.FC = () => {

    useBrodsmuleSti([
        {sti: "/sosialhjelp/innsyn", tittel: "Økonomisk sosialhjelp"},
        {sti: "/sosialhjelp/innsyn/utbetaling", tittel: "Utbetalingsoversikt"}
    ]);

    useBannerTittel("Utbetalingsoversikt for økonomisk sosialhjelp");

    const utbetalingerService = useUtbetalingerService();

    const oppdaterPeriodeOgMottaker = (antMndTilbake: number, tilDinKnt: boolean, tilAnnenMottaker: boolean): void => {
        console.log("TODO: Filtrer på periode: " + antMndTilbake +
            " tilDinKnt " + (tilDinKnt ? "true" : "false") +
            " tilAnnenMottaker " + (tilAnnenMottaker ? "true" : "false")
        );
    };

    const dispatch = useDispatch();
    const restStatus: any = useSelector((state: InnsynAppState) => state.innsynsdata.restStatus);
    useEffect(() => {
        if (restStatus.saker !== REST_STATUS.OK) {
            dispatch(hentSaksdata(InnsynsdataSti.SAKER))
        }
    }, [dispatch, restStatus.saker]);

    let utbetalinger: UtbetalingSakType[] = utbetalingerService.restStatus === REST_STATUS.OK ?
        utbetalingerService.payload : [];

    return (
        <div className="utbetalinger">
            <div className="utbetalinger_row">
                <div className="utbetalinger_column">
                    <div className="utbetalinger_column_1">
                        <Periodevelger
                            className="utbetalinger_periodevelger_panel"
                            onChange={
                                (antMndTilbake: number, tilDinKnt: boolean, tilAnnenMottaker: boolean) =>
                                    oppdaterPeriodeOgMottaker(antMndTilbake, tilDinKnt, tilAnnenMottaker)}
                        />
                    </div>
                </div>
                <UtbetalingerPanel utbetalinger={utbetalinger}/>
            </div>
        </div>
    );

};

export default Utbetalinger;
