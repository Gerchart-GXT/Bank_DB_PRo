const SUPERMENULIST = {
    "clientPhoto": "../static/userPhoto.png",
    "massageCount": 10,
    "sonTitle": [
        {
            "title": "个人信息修改",
            "hasElements": false,
            "link": "/my/user-info"
        },
        {
            "title": "我的银行账户",
            "hasElements": true,
            "elements": [
                {
                    "type": "item",
                    "content": "总览",
                    "link": "/my/bank-account-info"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "item",
                    "content": "我的借记卡",
                    "link": "/my/debit-account"
                },
                {
                    "type": "item",
                    "content": "我的信用卡",
                    "link": "/my/credit-account"
                }
            ]
        },
        {
            "title": "我的理财账户",
            "hasElements": true,
            "elements": [
                {
                    "type": "item",
                    "content": "总览",
                    "link": "/my/finanicail-total"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "item",
                    "content": "我的理财产品",
                    "link": "/my/finanicail-account"
                }
            ]
        },
        {
            "title": "我的保险账户",
            "hasElements": true,
            "elements": [
                {
                    "type": "item",
                    "content": "总览",
                    "link": "/my/insurance-total"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "item",
                    "content": "我的保险产品",
                    "link": "/my/insurance-account"
                }
            ]
        },
        {
            "title": "我的基金账户",
            "hasElements": true,
            "elements": [
                {
                    "type": "item",
                    "content": "总览",
                    "link": "/my/fund-total"
                },
                {
                    "type": "divider"
                },
                {
                    "type": "item",
                    "content": "我的基金产品",
                    "link": "/my/fund-account"
                }
            ]
        }
    ]
}

export default CLIENTMENULIST;