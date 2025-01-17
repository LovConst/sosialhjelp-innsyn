/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentKommuneInfoMock = () => ({
    erInnsynDeaktivert: faker.datatype.boolean(),
    erInnsynMidlertidigDeaktivert: faker.datatype.boolean(),
    erInnsendingEttersendelseDeaktivert: faker.datatype.boolean(),
    erInnsendingEttersendelseMidlertidigDeaktivert: faker.datatype.boolean(),
    tidspunkt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    kommunenummer: faker.helpers.arrayElement([faker.random.word(), undefined]),
});

export const getKommuneControllerMSW = () => [
    rest.get("*/api/v1/innsyn/:fiksDigisosId/kommune", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentKommuneInfoMock()));
    }),
];
