/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {VilkarResponseStatus} from "./vilkarResponseStatus";

export interface VilkarResponse {
    hendelsetidspunkt: string;
    vilkarReferanse: string;
    tittel?: string;
    beskrivelse?: string;
    status: VilkarResponseStatus;
    utbetalingsReferanse?: string[];
}
