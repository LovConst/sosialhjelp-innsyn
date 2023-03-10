/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getGetVilkarMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        hendelsetidspunkt: faker.date.past().toISOString().split("T")[0],
        vilkarReferanse: faker.random.word(),
        tittel: faker.helpers.arrayElement([faker.random.word(), undefined]),
        beskrivelse: faker.helpers.arrayElement([faker.random.word(), undefined]),
        status: faker.helpers.arrayElement(["RELEVANT", "ANNULLERT", "OPPFYLT", "IKKE_OPPFYLT", "LEVERT_TIDLIGERE"]),
        utbetalingsReferanse: faker.helpers.arrayElement([
            Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() =>
                faker.random.word()
            ),
            undefined,
        ]),
    }));

export const getGetOppgaverMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        oppgaveId: faker.random.word(),
        innsendelsesfrist: faker.helpers.arrayElement([faker.date.past().toISOString().split("T")[0], undefined]),
        oppgaveElementer: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            dokumenttype: faker.random.word(),
            tilleggsinformasjon: faker.helpers.arrayElement([faker.random.word(), undefined]),
            hendelsetype: faker.helpers.arrayElement([
                faker.helpers.arrayElement(["dokumentasjonEtterspurt", "dokumentasjonkrav", "soknad", "bruker"]),
                undefined,
            ]),
            hendelsereferanse: faker.helpers.arrayElement([faker.random.word(), undefined]),
            erFraInnsyn: faker.datatype.boolean(),
        })),
    }));

export const getGetOppgaveMedIdMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        oppgaveId: faker.random.word(),
        innsendelsesfrist: faker.helpers.arrayElement([faker.date.past().toISOString().split("T")[0], undefined]),
        oppgaveElementer: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            dokumenttype: faker.random.word(),
            tilleggsinformasjon: faker.helpers.arrayElement([faker.random.word(), undefined]),
            hendelsetype: faker.helpers.arrayElement([
                faker.helpers.arrayElement(["dokumentasjonEtterspurt", "dokumentasjonkrav", "soknad", "bruker"]),
                undefined,
            ]),
            hendelsereferanse: faker.helpers.arrayElement([faker.random.word(), undefined]),
            erFraInnsyn: faker.datatype.boolean(),
        })),
    }));

export const getGetHarLevertDokumentasjonkravMock = () => faker.datatype.boolean();

export const getGetfagsystemHarDokumentasjonkravMock = () => faker.datatype.boolean();

export const getGetDokumentasjonkravMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        dokumentasjonkravElementer: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(
            () => ({
                hendelsetidspunkt: faker.date.past().toISOString().split("T")[0],
                hendelsetype: faker.helpers.arrayElement([
                    faker.helpers.arrayElement(["dokumentasjonEtterspurt", "dokumentasjonkrav", "soknad", "bruker"]),
                    undefined,
                ]),
                dokumentasjonkravReferanse: faker.random.word(),
                tittel: faker.helpers.arrayElement([faker.random.word(), undefined]),
                beskrivelse: faker.helpers.arrayElement([faker.random.word(), undefined]),
                status: faker.helpers.arrayElement([
                    "RELEVANT",
                    "ANNULLERT",
                    "OPPFYLT",
                    "IKKE_OPPFYLT",
                    "LEVERT_TIDLIGERE",
                ]),
                utbetalingsReferanse: faker.helpers.arrayElement([
                    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() =>
                        faker.random.word()
                    ),
                    undefined,
                ]),
            })
        ),
        frist: faker.helpers.arrayElement([faker.date.past().toISOString().split("T")[0], undefined]),
        dokumentasjonkravId: faker.random.word(),
    }));

export const getGetDokumentasjonkravMedIdMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        dokumentasjonkravElementer: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(
            () => ({
                hendelsetidspunkt: faker.date.past().toISOString().split("T")[0],
                hendelsetype: faker.helpers.arrayElement([
                    faker.helpers.arrayElement(["dokumentasjonEtterspurt", "dokumentasjonkrav", "soknad", "bruker"]),
                    undefined,
                ]),
                dokumentasjonkravReferanse: faker.random.word(),
                tittel: faker.helpers.arrayElement([faker.random.word(), undefined]),
                beskrivelse: faker.helpers.arrayElement([faker.random.word(), undefined]),
                status: faker.helpers.arrayElement([
                    "RELEVANT",
                    "ANNULLERT",
                    "OPPFYLT",
                    "IKKE_OPPFYLT",
                    "LEVERT_TIDLIGERE",
                ]),
                utbetalingsReferanse: faker.helpers.arrayElement([
                    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() =>
                        faker.random.word()
                    ),
                    undefined,
                ]),
            })
        ),
        frist: faker.helpers.arrayElement([faker.date.past().toISOString().split("T")[0], undefined]),
        dokumentasjonkravId: faker.random.word(),
    }));

export const getOppgaveControllerMSW = () => [
    rest.get("*/api/v1/innsyn/:fiksDigisosId/vilkar", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetVilkarMock()));
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/oppgaver", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetOppgaverMock()));
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/oppgaver/:oppgaveId", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetOppgaveMedIdMock()));
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/harLeverteDokumentasjonkrav", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetHarLevertDokumentasjonkravMock()));
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/fagsystemHarDokumentasjonkrav", (_req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(getGetfagsystemHarDokumentasjonkravMock())
        );
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/dokumentasjonkrav", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetDokumentasjonkravMock()));
    }),
    rest.get("*/api/v1/innsyn/:fiksDigisosId/dokumentasjonkrav/:dokumentasjonkravId", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetDokumentasjonkravMedIdMock()));
    }),
];
