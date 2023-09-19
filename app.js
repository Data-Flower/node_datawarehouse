const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;

// multer 설정: 파일을 메모리에 저장
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload-data', upload.single('csvFile'), (req, res) => {

    if (!req.file) {
        return res.send("CSV 파일이 첨부되지 않았습니다.");
    }

    console.log("log: upload-data");
    console.log(req.file);
});

app.post('/process-csv', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.send("CSV 파일이 첨부되지 않았습니다.");
    }

    // CSV 파일을 처리한다.
    let processedcsv = processCsvFile(req.file);

    // 처리 결과를 저장한다.

    res.send("CSV 파일 내용을 콘솔에 출력하였습니다.");
});

function processCsvFile(csvFile) {
    let csvData = csvFile.buffer.toString();
    console.log(csvData);

    // TODO: CSV 파일을 처리할 Python 프로그램에 연결(파이프라인)
    // TODO: Python 프로그램의 실행 결과를 콘솔에 출력
    // 가능하면 Docker로 연결한다.

    return csvData;
};

function storeData(processedcsv) {

};

function train_ai(csvData) {

};

function storeMetadata(metadata) {

};

// // CSV 파일 읽기 및 전처리 후 데이터 웨어하우스 저장
// app.post('/process-csv', (req, res) => {
//     // TODO: CSV 파일 읽기 및 전처리 로직 구현
//     res.send("CSV 파일을 처리하고 데이터 웨어하우스에 저장하였습니다.");
// });

// 데이터 웨어하우스에서 데이터 읽기 및 AI 학습, 메타데이터 저장
app.post('/train-ai', (req, res) => {
    // TODO: 데이터 웨어하우스에서 데이터 읽기 및 AI 학습 로직 구현
    res.send("데이터 웨어하우스에서 데이터를 읽고 AI 학습을 수행한 후, 메타데이터를 저장하였습니다.");
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
