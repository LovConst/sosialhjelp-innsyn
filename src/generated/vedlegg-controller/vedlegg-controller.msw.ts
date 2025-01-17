/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentVedleggMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        filnavn: faker.random.word(),
        storrelse: faker.datatype.number({min: undefined, max: undefined}),
        url: faker.random.word(),
        type: faker.random.word(),
        tilleggsinfo: faker.helpers.arrayElement([faker.random.word(), undefined]),
        datoLagtTil: `${faker.date.past().toISOString().split(".")[0]}Z`,
    }));

export const getSendVedleggMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        type: faker.random.word(),
        tilleggsinfo: faker.helpers.arrayElement([faker.random.word(), undefined]),
        innsendelsesfrist: faker.helpers.arrayElement([faker.date.past().toISOString().split("T")[0], undefined]),
        hendelsetype: faker.helpers.arrayElement([
            faker.helpers.arrayElement(["dokumentasjonEtterspurt", "dokumentasjonkrav", "soknad", "bruker"]),
            undefined,
        ]),
        hendelsereferanse: faker.helpers.arrayElement([faker.random.word(), undefined]),
        filer: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            filnavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
            status: faker.helpers.arrayElement([
                "OK",
                "COULD_NOT_LOAD_DOCUMENT",
                "PDF_IS_ENCRYPTED",
                "ILLEGAL_FILE_TYPE",
                "ILLEGAL_FILENAME",
                "FILE_TOO_LARGE",
            ]),
        })),
    }));

export const getVedleggControllerMSW = () => [
    rest.get("*/api/v1/innsyn/:fiksDigisosId/vedlegg", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentVedleggMock()));
    }),
    rest.post("*/api/v1/innsyn/:fiksDigisosId/vedlegg", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getSendVedleggMock()));
    }),
];
