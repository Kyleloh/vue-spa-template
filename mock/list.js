module.exports = {
    api: '/api/getListData',
    response: function (req, res) {
        res.send({
            data: [
                {
                    id: 001,
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    id: 002,
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    id: 003,
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    id: 004,
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    id: 005,
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ],
            page: {
                total: 8
            } 
        });
    }
}