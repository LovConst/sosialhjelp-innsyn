import React from "react";
import {Sakstype} from "../redux/innsynsdata/innsynsdataReducer";
import {useSelector} from "react-redux";
import {InnsynAppState} from "../redux/reduxTypes";
import SakPanel from "../saksoversikt/sakpanel/SakPanel";

const Saksdetaljer: React.FC<{fiksDigisosId: string}> = ({fiksDigisosId}) => {

    const saker: Sakstype[] = useSelector((state: InnsynAppState) => state.innsynsdata.saker);
    const sak: Sakstype|undefined = saker.find((sak: Sakstype) => {
        if (sak.fiksDigisosId === fiksDigisosId) {
            return sak;
        } else {
            return null;
        }
    });


    return (
        <div className="utbetalinger__sakpanel">
        {sak && (
            <SakPanel
                fiksDigisosId={sak.fiksDigisosId}
                tittel={sak.soknadTittel}
                status={sak.status}
                oppdatert={sak.sistOppdatert}
                key={"sakpanel_ " + sak.fiksDigisosId}
                url={sak.url}
                antallNyeOppgaver={sak.antallNyeOppgaver}
            />
        )}


        </div>
    );
};

export default Saksdetaljer;