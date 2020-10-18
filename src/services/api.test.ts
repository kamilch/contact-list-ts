import apiData from "./api";
import PersonInfoType from "../types/PersonInfoType";

describe("api", () => {
    test("is batch of data is 50", async () => {
        const TIMES = 3;
        const PARTITION = 50;

        let data: PersonInfoType[] = [];
        let packageWithErrors = 0;

        const loadPart = async () => {
            try {
                const part = await apiData();
                data = [ ...data, ...part ];
            } catch (err) {
                packageWithErrors += 1;
            }
        };

        for (let i = 0; i < TIMES; i += 1) {
            await loadPart();
        }

        const properLoadedDataLength = (PARTITION * TIMES) - (packageWithErrors * PARTITION);

        expect(data.length).toBe(properLoadedDataLength);
    });
});