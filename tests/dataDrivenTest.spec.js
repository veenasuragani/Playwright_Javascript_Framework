import { test, expect } from "@playwright/test";
import { readExcelFile } from "../utils/excelUtil";
import path from 'path';

test.describe('Data driven testing', () => {

    const dataFilePath = path.join(__dirname, "../testData/excelFiles/sample.xlsx");

    test('Read data from excel file from sheet1', async ({ page }) => {
        const sheetName = 'Sheet1'; 

        try {
            const sheetData = await readExcelFile(dataFilePath, sheetName);
            // console.log(`Data from ${sheetName}:`, sheetData);

            const data = sheetData[0];
            // console.log("Data sheet: ", data);

            const operation = data['Operation'];
            const id = data['ID'];
            const name = data['Name'];
            const description = data['Description'];
            console.log("Data sheet: ", operation, name, id, description);

            // Add assertions to validate the data
            expect(sheetData).toBeDefined();
            expect(sheetData.length).toBeGreaterThan(0);
        } catch (error) {
            console.error(`Failed to read data from ${sheetName}:`, error);
        }
    });
});
