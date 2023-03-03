/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentHendelserMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        tidspunkt: faker.random.word(),
        beskrivelse: faker.random.word(),
        filUrl: faker.helpers.arrayElement([{linkTekst: faker.random.word(), link: faker.random.word()}, undefined]),
    }));

export const getHendelseControllerMSW = () => [
    rest.get("*/api/v1/innsyn/:fiksDigisosId/hendelser", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentHendelserMock()));
    }),
];
