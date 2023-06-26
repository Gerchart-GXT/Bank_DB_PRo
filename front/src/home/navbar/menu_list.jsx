const MENULIST = {
    "fatherTitle": "首页",
    "sonTitle": [
        {
            "title": "银行卡服务",
            "hasElements": true,
            "elements": [
                {
                    "type": "header",
                    "content": "余额服务"
                },
                {
                    "type": "item",
                    "content": "借记卡查询",
                    "link": "/my/debit-account"
                },
                {
                    "type": "item",
                    "content": "信用卡查询",
                    "link": "/my/credit-account"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "content": "开卡服务",
                },
                {
                    "type": "item",
                    "content": "借记卡办理",
                    "link": "/debit-apply"
                },
                {
                    "type": "item",
                    "content": "信用卡办理",
                    "link": "/credit-apply"
                }
            ]
        },
        {
            "title": "财富商城",
            "hasElements": true,
            "elements": [
                {
                    "type": "header",
                    "content": "购买"
                },
                {
                    "type": "item",
                    "content": "理财产品",
                    "link": "/buy-finanicial"
                },
                {
                    "type": "item",
                    "content": "保险",
                    "link": "/buy-insurance"
                },
                {
                    "type": "item",
                    "content": "基金",
                    "link": "/buy-fund"
                },
            ]
        },
        {
            "title": "理财产品",
            "hasElements": false,
            "link": "/buy-finanicial"
        },
        {
            "title": "保险产品",
            "hasElements": false,
            "link": "/buy-insurance"
        },
        {
            "title": "基金产品",
            "hasElements": false,
            "link": "/buy-fund"
        },
        {
            "title": "联系我们",
            "hasElements": false,
            "link": "https://blog.gerchart.cn"
        },
    ]
};

export default MENULIST;