import ExcelJS from 'exceljs';

export async function readExcelFile(filePath, sheetName) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);

    if (!sheet) {
        throw new Error(`Sheet "${sheetName}" not found in the Excel file.`);
    }

    // Extract rows as an array of objects
    const sheetData = [];
    const headers = sheet.getRow(1).values.slice(1); // Get the headers from the first row

    sheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) return; // Skip the header row
        const rowData = {};
        row.values.slice(1).forEach((value, colIndex) => {
            rowData[headers[colIndex]] = value;
        });
        sheetData.push(rowData);
    });

    return sheetData;
}
