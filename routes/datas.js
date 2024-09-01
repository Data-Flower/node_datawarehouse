const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); // 파일 경로 처리를 위한 모듈

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // 파일이 일시적으로 저장될 폴더
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('Data route');
});

// 외부에서 데이터를 서버로 보내는 코드
router.post('/upload', upload.single('csvfile'), (req, res) => {
    // res.send(req.file);
    const filePaths = [req.file.path];
    res.json({ filePaths: filePaths });
    // res.json({ filePath: req.file.path });
});

// 외부에서 여러 개의 데이터를 서버로 보내는 코드
router.post('/batch-upload', upload.array('csvfiles'), (req, res) => {
    // 배치 데이터 업로드 로직
    // res.send(req.files);
    const filePaths = req.files.map(file => file.path);
    res.json({ filePaths });
});

// 데이터를 데이터 웨어하우스에 저장하는 코드
router.post('/store', (req, res) => {
    // 데이터 저장 로직
    // console.log(req.body);
    const { filePaths } = req.body;

    filePaths.forEach(filePath => {
        // 파일을 읽고 데이터 웨어하우스에 저장하는 로직
        // 예: fs.readFileSync(filePath) 등...

        console.log(filePath);
        const newFilePath = path.join('processed', path.basename(filePath));
        fs.copyFileSync(filePath, newFilePath);
        
        
        // // 저장 후 일시적인 위치에서 파일 삭제
        // fs.unlinkSync(filePath);
    });

    res.send('Data stored in data warehouse');
});

// 데이터를 데이터 웨어하우스에서 조회하는 코드
router.get('/data', (req, res) => {
    // 데이터 조회 로직
    res.send('Data fetched from data warehouse');
});

// 데이터 웨어하우스에서 데이터를 삭제하는 코드
router.delete('/delete', (req, res) => {
    const { filePaths } = req.body;

    filePaths.forEach(filePath => {
        fs.unlinkSync(filePath);
    });

    // 데이터 삭제 로직
    res.send('Data deleted from data warehouse');
});

module.exports = router;