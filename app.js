const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;

// multer 설정: 파일을 메모리에 저장
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//#region 1 데이터 수집 및 저장

// 데이터 수집기에서 CSV 파일을 전송하면, CSV 파일을 처리한다.
// 외부 소스로부터 데이터를 수집하고 웨어하우스에 저장합니다.
app.post('/upload-data', upload.single('csvFile'), (req, res) => {

    if (!req.file) {
        return res.send("CSV 파일이 첨부되지 않았습니다.");
    }

    console.log("외부 소스로부터 데이터를 수집하고 웨어하우스에 저장합니다.");
    console.log(req.file);
});

// 데이터 수집기에서 CSV 파일을 전송하면, CSV 파일을 처리한다.
// 여러 데이터 파일 또는 레코드를 한 번에 웨어하우스에 업로드합니다.
app.post('/batch-upload', upload.array('csvFile'), (req, res) => {

    if (!req.files) {
        return res.send("CSV 파일이 첨부되지 않았습니다.");
    }

    console.log("여러 데이터 파일 또는 레코드를 한 번에 웨어하우스에 업로드합니다.");
    console.log(req.files);

    res.send("CSV 파일이 정상적으로 업로드 되었습니다.");
});
//#endregion 1 데이터 수집 및 저장

//#region 2 데이터 조회

// 웨어하우스의 특정 데이터셋을 조회합니다. 이는 필터, 정렬, 페이징 등의 쿼리 파라미터를 사용하여 조절될 수 있습니다.
app.get('/data', (req, res) => {
    res.send("웨어하우스의 특정 데이터셋을 조회합니다. 이는 필터, 정렬, 페이징 등의 쿼리 파라미터를 사용하여 조절될 수 있습니다.");
});

// 웨어하우스의 특정 레코드나 항목을 ID를 기반으로 조회합니다.
app.get('/data/:id', (req, res) => {
    res.send("웨어하우스의 특정 레코드나 항목을 ID를 기반으로 조회합니다.");
});

//#endregion 2 데이터 조회

//#region 3 데이터 처리 및 전처리

// 웨어하우스의 데이터를 전처리하거나 변환합니다.
// 데이터를 처리합니다. 이는 데이터를 전처리하거나, 데이터를 합치거나, 데이터를 변환하는 등의 작업을 수행합니다.
app.post('/process-data', (req, res) => {
    res.send("웨어하우스의 데이터를 전처리하거나 변환합니다.");
});

// 전처리된 데이터를 조회합니다.
app.get('/process-data', (req, res) => {
    res.send("전처리된 데이터를 조회합니다.");
});

//#endregion 3 데이터 처리 및 전처리

//#region 4 데이터 웨어하우스 관리

app.post('/create-table', (req, res) => {
    res.send("새로운 테이블이나 데이터셋을 웨어하우스에 생성합니다.");
});

app.delete('/delete-table/:tableName', (req, res) => {

    let tableName = req.params.tableName;
    res.send(`웨어하우스의 특정 테이블을 삭제합니다. 테이블 이름: ${tableName}`);
});

//#endregion 4 데이터 웨어하우스 관리

//#region 5 메타데이터 및 스키마 관리

app.get('/metadata', (req, res) => {
    res.send("웨어하우스의 메타데이터나 스키마 정보를 조회합니다.");
});

app.post('/update-metadata', (req, res) => {
    res.send("메타데이터나 스키마 정보를 업데이트합니다.");
});

//#endregion 5 메타데이터 및 스키마 관리

//#region 6 보고서 및 대시보드

app.get('/reports', (req, res) => {
    res.send("웨어하우스의 데이터를 기반으로 생성된 보고서나 대시보드를 조회합니다.");
});

app.post('/generate-report', (req, res) => {
    res.send("새로운 보고서나 대시보드를 생성합니다.");
});

//#endregion 6 보고서 및 대시보드

//#region 7 AI 머신 러닝 연동

app.post('/train-model', (req, res) => {
    res.send("웨어하우스의 데이터를 사용하여 머신 러닝 모델을 학습시킵니다.");
});

app.get('/model-metadata', (req, res) => {
    res.send("학습된 모델의 메타데이터를 조회합니다.");
});

app.post('/predict', (req, res) => {
    res.send("학습된 모델을 사용하여 새로운 데이터에 대한 예측을 수행합니다");
});
    
//#endregion 7 AI 머신 러닝 연동

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
