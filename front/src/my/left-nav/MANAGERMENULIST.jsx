const MANAGERMENULIST = {
    "clientPhoto": "../static/userPhoto.png",
    "massageCount": 10,
    "sonTitle": [
        {
            "title": "个人信息修改",
            "hasElements": false,
            "link": "/my/user-info"
        },
        {
            "title": "理财产品管理",
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
                    "content": "我的管理的理财产品",
                    "link": "/my/finanicail-account"
                }
            ]
        },
        {
            "title": "保险产品管理",
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
                    "content": "我的管理的保险产品",
                    "link": "/my/insurance-account"
                }
            ]
        },
        {
            "title": "基金产品管理",
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
                    "content": "我的管理的基金产品",
                    "link": "/my/fund-account"
                }
            ]
        }
    ]
}

export default MANAGERMENULIST;