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
                        "type": "z",
                        "content": "借记卡查询",
                        "link": "/card/debit-account"
                    },
                    {
                        "type": "item",
                        "content": "信用卡查询",
                        "link": "/card/credit-account"
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "header",
                        "content": "开卡服务"
                    },
                    {
                        "type": "item",
                        "content": "借记卡办理",
                        "link": "/card/debit-apply"
                    },
                    {
                        "type": "item",
                        "content": "信用卡办理",
                        "link": "/card/credit-apply"
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
                    "link": "/shop/"
                },
                {
                    "type": "item",
                    "content": "保险",
                    "link": "/shop/"
                },
                {
                    "type": "item",
                    "content": "基金",
                    "link": "/shop/"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "content": "个人"
                },
                {
                    "type": "item",
                    "content": "我的购物车",
                    "link": "/shop/"
                }
            ]
        },
        {
            "title": "理财产品",
            "hasElements": false,
            "link": ""
        },
        {
            "title": "保险产品",
            "hasElements": false,
            "link": ""
        },
        {
            "title": "基金产品",
            "hasElements": false,
            "link": ""
        },
        {
            "title": "联系我们",
            "hasElements": false,
            "link": ""
        },
    ]
};

export default MENULIST;