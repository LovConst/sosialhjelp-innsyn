import React, {useState} from "react";
import styles from "./utbetalinger.module.css";
import {BodyLong, Heading, Panel, Tabs} from "@navikt/ds-react";
import HandCoinsIcon from "../../components/ikoner/HandCoins";
import {useHentNyeUtbetalinger} from "../../generated/utbetalinger-controller/utbetalinger-controller";
import {logAmplitudeEvent} from "../../utils/amplitude";
import useFiltrerteUtbetalinger from "./filter/useFiltrerteUtbetalinger";
import NyeUtbetalinger from "./tabs/NyeUtbetalinger";
import TidligereUtbetalinger from "./tabs/TidligereUtbetalinger";
import useIsMobile from "../../utils/useIsMobile";
import FilterModal from "./filter/FilterModal";
enum TAB_VALUE {
    UTBETALINGER = "Utbetalinger",
    TIDLIGERE = "Tidligere utbetalinger",
}

const UtbetalingerPanelBeta = () => {
    const [nyeLogged, setNyeLogged] = useState(false);
    const {
        data: nye,
        isLoading: henterNye,
        isError: hentNyeFeilet,
    } = useHentNyeUtbetalinger({
        query: {
            onSuccess: (data) => {
                if (!nyeLogged && data.length > 0) {
                    const sisteManedgruppe = data[data.length - 1].utbetalingerForManed;
                    const sisteDatoVist = sisteManedgruppe[sisteManedgruppe.length - 1].utbetalingsdato;
                    logAmplitudeEvent("Hentet nye utbetalinger", {sisteDatoVist});
                    setNyeLogged(true);
                }
            },
        },
    });

    const filtrerteNye = useFiltrerteUtbetalinger(nye ?? []);

    const onSeTidligere = () => {
        logAmplitudeEvent("Klikket tidligere utbetalinger");
    };

    const isMobile = useIsMobile();
    return (
        <Panel className={styles.utbetalinger_panel}>
            <HandCoinsIcon className={styles.utbetalinger_decoration} bgcolor="#9BD0B0" />
            <Heading size="medium" level="2" spacing>
                Utbetalinger for sosialhjelp
            </Heading>
            {isMobile && <FilterModal />}
            <Tabs defaultValue={TAB_VALUE.UTBETALINGER}>
                <Tabs.List className={styles.tab_list}>
                    <Tabs.Tab value={TAB_VALUE.UTBETALINGER} label="Utbetalinger" />
                    <Tabs.Tab value={TAB_VALUE.TIDLIGERE} label="Tidligere utbetalinger" />
                </Tabs.List>
                <Tabs.Panel value={TAB_VALUE.UTBETALINGER} className={styles.tab_panel}>
                    <BodyLong spacing>
                        Her ser du dine utbetalinger for inneværende måned, og utbetalinger som kommer fremover. Vi kan
                        kun vise utbetalinger for økonomisk sosialhjelp. Har du spørsmål til utbetalingene dine kan du
                        ta kontakt med oss på 55 55 33 33.
                    </BodyLong>
                    <NyeUtbetalinger lasterData={henterNye} error={hentNyeFeilet} utbetalinger={filtrerteNye} />
                </Tabs.Panel>
                <Tabs.Panel value={TAB_VALUE.TIDLIGERE} className={styles.tab_panel} onClick={onSeTidligere}>
                    <TidligereUtbetalinger />
                </Tabs.Panel>
            </Tabs>
        </Panel>
    );
};

export default UtbetalingerPanelBeta;
