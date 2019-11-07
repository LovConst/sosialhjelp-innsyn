import {Fil, Oppgave} from "../redux/innsynsdata/innsynsdataReducer";
import {opprettFormDataMedVedleggFraFiler, opprettFormDataMedVedleggFraOppgaver} from "./vedleggUtils";

const pngFile = {filnavn: "test0.png", file: new Blob()} as Fil;
const jpgFile = {filnavn: "test1.jpg", file: new Blob()} as Fil;
const pdfFile = {filnavn: "test3.pdf", file: new Blob()} as Fil;

const oppgaver = [
    {
        dokumenttype: "dokumenttype1",
        tilleggsinformasjon: "tilleggsinformasjon1",
        erFraInnsyn: true,
        filer: [pngFile, jpgFile]
    } as Oppgave,
    {
        dokumenttype: "dokumenttype2",
        tilleggsinformasjon: "tilleggsinformasjon2",
        erFraInnsyn: true,
        filer: [pdfFile]
    } as Oppgave,
    {
        dokumenttype: "dokumenttype3",
        tilleggsinformasjon: "tilleggsinformasjon3",
        erFraInnsyn: true,
        filer: [jpgFile, jpgFile]
    } as Oppgave
];

const expectedOppgaverMetadata = JSON.stringify([
    {
        type: oppgaver[0].dokumenttype,
        tilleggsinfo: oppgaver[0].tilleggsinformasjon,
        filer: [
            {filnavn: pngFile.filnavn},
            {filnavn: jpgFile.filnavn}
        ]
    },
    {
        type: oppgaver[1].dokumenttype,
        tilleggsinfo: oppgaver[1].tilleggsinformasjon,
        filer: [
            {filnavn: pdfFile.filnavn}
        ]
    },
    {
        type: oppgaver[2].dokumenttype,
        tilleggsinfo: oppgaver[2].tilleggsinformasjon,
        filer: [
            {filnavn: jpgFile.filnavn},
            {filnavn: jpgFile.filnavn}
        ]
    }
], null, 8);

const expectedEttersendelseMetadata = JSON.stringify([
    {
        type: "annet",
        tilleggsinfo: "annet",
        filer: [
            {filnavn: pngFile.filnavn},
            {filnavn: jpgFile.filnavn},
            {filnavn: pdfFile.filnavn}
        ]
    }
], null, 8);

describe('VedleggUtilsTest', () => {

    it('should create correct form and meta data for oppgaver', () => {

        const formData: FormData = opprettFormDataMedVedleggFraOppgaver(oppgaver);
        expect(formData).toBeDefined();

        const formDataEntryValues: FormDataEntryValue[] = formData.getAll("files");
        expect(formDataEntryValues).toBeDefined();
        expect(formDataEntryValues.length).toBe(6);

        [
            {file: formDataEntryValues[0], filnavn: "metadata.json"},
            {file: formDataEntryValues[1], filnavn: pngFile.filnavn},
            {file: formDataEntryValues[2], filnavn: jpgFile.filnavn},
            {file: formDataEntryValues[3], filnavn: pdfFile.filnavn},
            {file: formDataEntryValues[4], filnavn: jpgFile.filnavn},
            {file: formDataEntryValues[5], filnavn: jpgFile.filnavn},
        ].forEach((value: {file: FormDataEntryValue, filnavn: string}) => {
            const file = (value.file as File);
            expect(file).toBeDefined();
            expect(file.name).toBe(value.filnavn);
        });

        const metadataFile = (formDataEntryValues[0] as File);
        const actualMetadata = metadataFile["_buffer"].toString();
        expect(actualMetadata).toBe(expectedOppgaverMetadata);
    });

    it('should create correct form and meta data for ettersendelse', () => {

        const formData: FormData = opprettFormDataMedVedleggFraFiler([pngFile, jpgFile, pdfFile]);
        expect(formData).toBeDefined();

        const formDataEntryValues: FormDataEntryValue[] = formData.getAll("files");
        expect(formDataEntryValues).toBeDefined();
        expect(formDataEntryValues.length).toBe(4);

        [
            {file: formDataEntryValues[0], filnavn: "metadata.json"},
            {file: formDataEntryValues[1], filnavn: pngFile.filnavn},
            {file: formDataEntryValues[2], filnavn: jpgFile.filnavn},
            {file: formDataEntryValues[3], filnavn: pdfFile.filnavn},
        ].forEach((value: {file: FormDataEntryValue, filnavn: string}) => {
            const file = (value.file as File);
            expect(file).toBeDefined();
            expect(file.name).toBe(value.filnavn);
        });

        const metadataFile = (formDataEntryValues[0] as File);
        const actualMetadata = metadataFile["_buffer"].toString();
        expect(actualMetadata).toBe(expectedEttersendelseMetadata);
    });
});