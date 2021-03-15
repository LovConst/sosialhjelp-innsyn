import React, {ChangeEvent, useEffect, useState} from "react";
import {Element, Normaltekst} from "nav-frontend-typografi";
import {
    Fil,
    InnsynsdataActionTypeKeys,
    InnsynsdataSti,
    settRestStatus,
    KommuneResponse,
} from "../../redux/innsynsdata/innsynsdataReducer";
import FilView from "../oppgaver/FilView";
import UploadFileIcon from "../ikoner/UploadFile";
import {FormattedMessage} from "react-intl";
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import {useDispatch, useSelector} from "react-redux";
import {InnsynAppState} from "../../redux/reduxTypes";
import {
    hentInnsynsdata,
    innsynsdataUrl,
    setFileUploadFailedInBackend,
    setFileUploadFailedVirusCheckInBackend,
} from "../../redux/innsynsdata/innsynsDataActions";
import {fetchPost, fetchPostGetErrors, REST_STATUS, skalViseLastestripe} from "../../utils/restUtils";
import {
    opprettFormDataMedVedleggFraFiler,
    FileErrors,
    validerFilArrayForFeil,
    maxCombinedFileSize,
    writeErrorMessage,
    findFilesWithError,
    hasFilesWithError,
} from "../../utils/vedleggUtils";
import {isFileUploadAllowed} from "../driftsmelding/DriftsmeldingUtilities";
import DriftsmeldingVedlegg from "../driftsmelding/DriftsmeldingVedlegg";
import {logWarningMessage, logInfoMessage} from "../../redux/innsynsdata/loggActions";
import Lastestriper from "../lastestriper/Lasterstriper";
import {SkjemaelementFeilmelding} from "nav-frontend-skjema";

/*
 * Siden det er ikke noe form for oppgaveId så blir BACKEND_FEIL_ID
 * brukt sånnn at man slipper å lage egne actions
 * og reducere for denne ene komponenten.
 */
const BACKEND_FEIL_ID = "backendFeilId";

interface Props {
    restStatus: REST_STATUS;
}

const EttersendelseView: React.FC<Props> = ({restStatus}) => {
    const dispatch = useDispatch();
    const fiksDigisosId: string | undefined = useSelector((state: InnsynAppState) => state.innsynsdata.fiksDigisosId);

    const [listeMedFilerSomFeiler, setListeMedFilerSomFeiler] = useState<Array<FileErrors>>([]);
    const filer: Fil[] = useSelector((state: InnsynAppState) => state.innsynsdata.ettersendelse.filer);
    const vedleggKlarForOpplasting = filer.length > 0;
    const [sendVedleggTrykket, setSendVedleggTrykket] = useState<boolean>(false);
    const vedleggLastesOpp = restStatus === REST_STATUS.INITIALISERT || restStatus === REST_STATUS.PENDING;
    const otherRestStatus = useSelector((state: InnsynAppState) => state.innsynsdata.restStatus.oppgaver);
    const otherVedleggLastesOpp =
        otherRestStatus === REST_STATUS.INITIALISERT || otherRestStatus === REST_STATUS.PENDING;

    const [overMaksStorrelse, setOverMaksStorrelse] = useState(false);

    const listeOverVedleggIderSomFeiletPaBackend: string[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.listeOverOppgaveIderSomFeiletPaBackend
    );
    const listeOverOppgaveIderSomFeiletIVirussjekkPaBackend: string[] = useSelector(
        (state: InnsynAppState) => state.innsynsdata.listeOverOppgaveIderSomFeiletIVirussjekkPaBackend
    );

    useEffect(() => {
        if (filer.length > 0) {
            window.addEventListener("beforeunload", alertUser);
        }
        return function unload() {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, [filer]);

    const alertUser = (event: any) => {
        event.preventDefault();
        event.returnValue = "";
    };

    const opplastingFeilet = hasFilesWithError(filer);

    const onLinkClicked = (event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        setSendVedleggTrykket(false);
        const uploadElement: any = document.getElementById("file_andre");
        uploadElement.click();
        if (event) {
            event.preventDefault();
        }
    };

    const onChange = (event: any) => {
        setListeMedFilerSomFeiler([]);
        const files: FileList | null = event.currentTarget.files;

        if (files) {
            const filerMedFeil: Array<FileErrors> = findFilesWithError(files, 0);

            if (filerMedFeil.length === 0) {
                for (let index = 0; index < files.length; index++) {
                    const file: File = files[index];
                    if (!file) {
                        logInfoMessage("Tom fil ble forsøkt lagt til i EttersendelseView.onChange()");
                    } else {
                        dispatch({
                            type: InnsynsdataActionTypeKeys.LEGG_TIL_FIL_FOR_ETTERSENDELSE,
                            fil: {
                                filename: file.name,
                                status: "INITIALISERT",
                                file: file,
                            },
                        });
                    }
                }
            } else {
                setListeMedFilerSomFeiler(filerMedFeil);
            }
        }
        if (event.target.value === "") {
            return;
        }
        event.target.value = null;
        event.preventDefault();
    };

    const sendVedlegg = (event: any) => {
        if (!fiksDigisosId) {
            event.preventDefault();
            return;
        }

        window.removeEventListener("beforeunload", alertUser);

        let formData = opprettFormDataMedVedleggFraFiler(filer);
        const sti: InnsynsdataSti = InnsynsdataSti.VEDLEGG;
        const path = innsynsdataUrl(fiksDigisosId, sti);
        dispatch(setFileUploadFailedInBackend(BACKEND_FEIL_ID, false));
        dispatch(setFileUploadFailedVirusCheckInBackend(BACKEND_FEIL_ID, false));

        setOverMaksStorrelse(false);

        const totaltSammensattFilStorrelse = filer?.reduce(
            (accumulator, currentValue: Fil) => accumulator + (currentValue.file ? currentValue.file.size : 0),
            0
        );

        setOverMaksStorrelse(totaltSammensattFilStorrelse > maxCombinedFileSize);

        if (totaltSammensattFilStorrelse < maxCombinedFileSize && totaltSammensattFilStorrelse !== 0) {
            dispatch(settRestStatus(InnsynsdataSti.VEDLEGG, REST_STATUS.PENDING));

            fetchPost(path, formData, "multipart/form-data")
                .then((filRespons: any) => {
                    let harFeil: boolean = false;
                    let vedlegg = filRespons[0].filer;
                    if (Array.isArray(vedlegg)) {
                        for (let vedleggIndex = 0; vedleggIndex < vedlegg.length; vedleggIndex++) {
                            const fileItem = vedlegg[vedleggIndex];
                            if (fileItem.status !== "OK") {
                                harFeil = true;
                            }
                            dispatch({
                                type: InnsynsdataActionTypeKeys.SETT_STATUS_FOR_ETTERSENDELSESFIL,
                                fil: {filename: fileItem.filnavn} as Fil,
                                status: fileItem.status,
                                vedleggIndex: vedleggIndex,
                            });
                        }
                    }
                    if (harFeil) {
                        dispatch(settRestStatus(InnsynsdataSti.VEDLEGG, REST_STATUS.FEILET));
                    } else {
                        dispatch(hentInnsynsdata(fiksDigisosId, InnsynsdataSti.VEDLEGG, false));
                        dispatch(hentInnsynsdata(fiksDigisosId, InnsynsdataSti.HENDELSER, false));
                    }
                })
                .catch((e) => {
                    // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
                    fetchPostGetErrors(path, formData, "multipart/form-data").then((errorResponse: any) => {
                        if (errorResponse.message === "Mulig virus funnet") {
                            dispatch(setFileUploadFailedInBackend(BACKEND_FEIL_ID, false));
                            dispatch(setFileUploadFailedVirusCheckInBackend(BACKEND_FEIL_ID, true));
                        }
                    });
                    dispatch(settRestStatus(InnsynsdataSti.VEDLEGG, REST_STATUS.FEILET));
                    dispatch(setFileUploadFailedInBackend(BACKEND_FEIL_ID, true));
                    logWarningMessage("Feil med opplasting av vedlegg: " + e.message, e.navCallId);
                });
        }
        event.preventDefault();
    };

    let kommuneResponse: KommuneResponse | undefined = useSelector(
        (state: InnsynAppState) => state.innsynsdata.kommune
    );
    const kanLasteOppVedlegg: boolean = isFileUploadAllowed(kommuneResponse);

    const visDetaljeFeiler: boolean =
        opplastingFeilet !== undefined ||
        listeMedFilerSomFeiler.length > 0 ||
        (!vedleggKlarForOpplasting && sendVedleggTrykket) ||
        overMaksStorrelse ||
        listeOverVedleggIderSomFeiletPaBackend.includes(BACKEND_FEIL_ID) ||
        listeOverOppgaveIderSomFeiletIVirussjekkPaBackend.includes(BACKEND_FEIL_ID);

    return (
        <>
            <DriftsmeldingVedlegg
                leserData={restStatus === REST_STATUS.INITIALISERT || restStatus === REST_STATUS.PENDING}
            />

            {skalViseLastestripe(restStatus, true) ? (
                <Lastestriper linjer={1} />
            ) : (
                <div className={"oppgaver_detaljer " + (visDetaljeFeiler ? " oppgaver_detalj_feil_ramme" : "")}>
                    <div
                        className={
                            "oppgaver_detalj " +
                            (opplastingFeilet ||
                            listeMedFilerSomFeiler.length > 0 ||
                            (!vedleggKlarForOpplasting && sendVedleggTrykket)
                                ? " oppgaver_detalj_feil"
                                : "")
                        }
                        style={{marginTop: "0px"}}
                    >
                        <Element>
                            <FormattedMessage id="andre_vedlegg.type" />
                        </Element>
                        <Normaltekst className="luft_over_4px">
                            <FormattedMessage id="andre_vedlegg.tilleggsinfo" />
                        </Normaltekst>

                        {kanLasteOppVedlegg && (
                            <div className="oppgaver_last_opp_fil">
                                <Flatknapp
                                    mini
                                    onClick={(event: any) => {
                                        onLinkClicked(event);
                                    }}
                                >
                                    <UploadFileIcon className="last_opp_fil_ikon" />
                                    <Element>
                                        <FormattedMessage id="vedlegg.velg_fil" />
                                    </Element>
                                </Flatknapp>
                                <input
                                    type="file"
                                    id={"file_andre"}
                                    multiple={true}
                                    onChange={(event: ChangeEvent) => {
                                        onChange(event);
                                    }}
                                    style={{display: "none"}}
                                />
                            </div>
                        )}

                        {filer &&
                            filer.length > 0 &&
                            filer.map((fil: Fil, vedleggIndex: number) => (
                                <FilView
                                    key={vedleggIndex}
                                    fil={fil}
                                    vedleggIndex={vedleggIndex}
                                    oppgaveElementIndex={0}
                                    oppgaveIndex={0}
                                    setOverMaksStorrelse={setOverMaksStorrelse}
                                    oppgaveId={BACKEND_FEIL_ID}
                                />
                            ))}

                        {validerFilArrayForFeil(listeMedFilerSomFeiler) && writeErrorMessage(listeMedFilerSomFeiler, 0)}
                    </div>

                    <Hovedknapp
                        disabled={!kanLasteOppVedlegg || vedleggLastesOpp || otherVedleggLastesOpp}
                        spinner={vedleggLastesOpp}
                        type="hoved"
                        className="luft_over_1rem"
                        onClick={(event: any) => {
                            if (!vedleggKlarForOpplasting) {
                                setSendVedleggTrykket(true);
                                return;
                            }
                            sendVedlegg(event);
                        }}
                    >
                        <FormattedMessage id="andre_vedlegg.send_knapp_tittel" />
                    </Hovedknapp>
                </div>
            )}

            {listeOverVedleggIderSomFeiletPaBackend.includes(BACKEND_FEIL_ID) && (
                <SkjemaelementFeilmelding className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage id={"vedlegg.opplasting_backend_feilmelding"} />
                </SkjemaelementFeilmelding>
            )}

            {listeOverOppgaveIderSomFeiletIVirussjekkPaBackend.includes(BACKEND_FEIL_ID) && (
                <SkjemaelementFeilmelding className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage id={"vedlegg.opplasting_backend_virus_feilmelding"} />
                </SkjemaelementFeilmelding>
            )}

            {overMaksStorrelse && (
                <SkjemaelementFeilmelding className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage id={"vedlegg.ulovlig_storrelse_av_alle_valgte_filer"} />
                </SkjemaelementFeilmelding>
            )}

            {(opplastingFeilet || (!vedleggKlarForOpplasting && sendVedleggTrykket)) && (
                <SkjemaelementFeilmelding className="oppgaver_vedlegg_feilmelding" style={{marginBottom: "1rem"}}>
                    <FormattedMessage
                        id={opplastingFeilet ? "vedlegg.opplasting_feilmelding" : "vedlegg.minst_ett_vedlegg"}
                    />
                </SkjemaelementFeilmelding>
            )}
        </>
    );
};

export default EttersendelseView;
