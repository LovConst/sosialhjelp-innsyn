/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {OppgaveElementHendelsetype} from "./oppgaveElementHendelsetype";

export interface OppgaveElement {
    dokumenttype: string;
    tilleggsinformasjon?: string;
    hendelsetype?: OppgaveElementHendelsetype;
    hendelsereferanse?: string;
    erFraInnsyn: boolean;
}
