const MENULIST = [
    {
        title: "银行卡服务",
        elements: [
                {
                    type: "header",
                    content: "余额服务"
                },
                {
                    type: "item",
                    content: "借记卡查询",
                    link: "/card/debit-account"
                },
                {
                    type: "item",
                    content: "信用卡查询",
                    link: "/card/credit-account"
                },
                {
                    type: "divider"
                },
                {
                    type: "header",
                    content: "开卡服务"
                },
                {
                    type: "item",
                    content: "借记卡办理",
                    link: "/card/debit-apply"
                },
                {
                    type: "item",
                    content: "信用卡办理",
                    link: "/card/credit-apply"
                }
        ]
    },
    {
        title: "财富商城",
        elements: [
            {
                type: "header",
                content: "购买"
            },
            {
                type: "item",
                content: "理财产品",
                link: "/shop/"
            },
            {
                type: "item",
                content: "保险",
                link: "/shop/"
            },
            {
                type: "item",
                content: "基金",
                link: "/shop/"
            },
            {
                type: "divider"
            },
            {
                type: "header",
                content: "个人"
            },
            {
                type: "item",
                content: "我的购物车",
                link: "/shop/"
            }
        ]
    }
];

export default MENULIST;