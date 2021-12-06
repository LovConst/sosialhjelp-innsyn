import * as React from "react";
import {useEffect} from "react";
import "./Feilside.less";
import {useSelector} from "react-redux";
import {InnsynAppState} from "../../redux/reduxTypes";
import AppBanner from "../appBanner/AppBanner";
import {BodyShort, Heading} from "@navikt/ds-react";
import {UthevetPanel} from "../paneler/UthevetPanel";
import {setBreadcrumbs} from "../../utils/breadcrumbs";

export interface FeilsideProps {
    children: React.ReactNode;
}

const Feilside: React.FC<FeilsideProps> = ({children}) => {
    let skalViseFeilside = useSelector((state: InnsynAppState) => state.innsynsdata.skalViseFeilside);

    useEffect(() => {
        if (skalViseFeilside) {
            setBreadcrumbs();
        }
    }, [skalViseFeilside]);

    if (skalViseFeilside) {
        return (
            <div className="informasjon-side">
                <AppBanner />
                <div className="feilside blokk-center">
                    <UthevetPanel className="panel-uthevet-luft-under">
                        <Heading level="1" size="xlarge" spacing>
                            Beklager. Tekniske problemer
                        </Heading>
                        <BodyShort spacing>Vennligst prøv igjen senere.</BodyShort>
                    </UthevetPanel>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default Feilside;
