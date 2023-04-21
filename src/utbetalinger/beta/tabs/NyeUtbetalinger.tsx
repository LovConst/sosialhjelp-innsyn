import React from "react";
import {NyeOgTidligereUtbetalingerResponse} from "../../../generated/model";
import Lastestriper from "../../../components/lastestriper/Lasterstriper";
import {Alert} from "@navikt/ds-react";
import ManedGruppe from "./ManedGruppe";
import {useFilter} from "../filter/FilterContext";
import {useTranslation} from "react-i18next";

interface Props {
    lasterData: boolean;
    error: boolean;
    utbetalinger: NyeOgTidligereUtbetalingerResponse[];
}

const NyeUtbetalinger = (props: Props) => {
    const {isUsingFilter} = useFilter();
    const {t} = useTranslation("utbetalinger");

    if (props.lasterData) {
        return <Lastestriper />;
    }
    if (props.error) {
        return (
            <Alert variant="error" inline>
                {t("feil.fetch")}
            </Alert>
        );
    }
    if (props.utbetalinger.length === 0) {
        return (
            <Alert variant="info" inline>
                {`${t("feil.ingen")} ${isUsingFilter ? t("feil.ingen.filter") : t("feil.ingen.default.nye")}`}
            </Alert>
        );
    }

    return (
        <>
            {props.utbetalinger.map((utbetalingSak: NyeOgTidligereUtbetalingerResponse) => (
                <ManedGruppe utbetalingSak={utbetalingSak} key={`${utbetalingSak.maned}-${utbetalingSak.ar}`} />
            ))}
        </>
    );
};
export default NyeUtbetalinger;
