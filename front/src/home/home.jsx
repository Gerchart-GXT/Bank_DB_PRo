import React, { Component } from 'react';
import Navbar from './navbar/navbar';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar></Navbar>
                <section class="p-5 bg-dark text-light text-center text-sm-start">
                    <div class="container">
                        <div class="d-flex">
                            <div>
                                <h1>
                                    生活离不开<span class="text-warning">理财</span>
                                </h1>
                                <p class="my-4">
                                    理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。
                                </p>
                                <button class="btn btn-primary btn-lg">
                                    开始财富之路
                                </button>
                            </div>
                            <img
                                src={require("./static/4.png")}
                                alt="showcase"
                                class="w-50 d-none d-md-block"
                            />
                        </div>
                    </div>
                </section>

                <section class="p-5">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-md">
                                <div class="card bg-dark text-light">
                                    <div class="card-body text-center">
                                        <div class="card-title">金融热点</div>
                                        <div class="card-text">
                                        理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                        </div>
                                        <a href="#" class="btn btn-primary mt-2"
                                            >学习理财</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="col-md">
                                <div class="card bg-secondary text-light">
                                    <div class="card-body text-center">
                                        <div class="card-title">收益获得</div>
                                        <div class="card-text">
                                        理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                        </div>
                                        <a href="#" class="btn btn-dark mt-2"
                                            >定投避险</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="col-md">
                                <div class="card bg-dark text-light">
                                    <div class="card-body text-center">
                                        <div class="card-title">学习理财</div>
                                        <div class="card-text">
                                        理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                        </div>
                                        <a href="#" class="btn btn-primary mt-2"
                                            >财富自由</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="p-5">
                    <div class="container">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-md">
                                <img src={require("./static/3.png")} class="card-img-top"/>
                            </div>
                            <div class="col-md p-5">
                                <h2>保险项目</h2>
                                <p class="lead">
                                理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                </p>
                                <p>
                                理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                </p>
                                <a href="" class="btn btn-light">查看更多</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="p-5 bg-dark text-light">
                    <div class="container">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-md p-5">
                                <h2>基金项目</h2>
                                <p class="lead">
                                理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                </p>
                                <p>
                                理财的核心是合理分配资产和收入,不仅要考虑到财富的积累,更需要考虑到财富的保障,从这个意义上来讲,理财的内涵比仅仅关注钱生钱的家庭投资范围更宽广。 理财包括投资理财和两类型。 每个人都应该根据自己的收入、资产负债等实际情况,在充分考虑到风险承受能力的前提下,设计出适合自己的理财方案,显得非常重要。

                                </p>
                                <a href="" class="btn btn-light">查看更多</a>
                            </div>

                            <div class="col-md">
                                <img src={require("./static/2.png")} class="card-img-top"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="p-5 bg-primary">
                    <div class="container">
                        <h2 class="text-center text-light">讲师介绍</h2>
                        <p class="lead text-center text-white mb-5">
                            ——其实是项目成员
                        </p>
                        <div class="row g-4">
                            <div class="col-md-6 col-lg-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <img src={require("./static/1.png")} class="card-img-top"/>
                                        <h3 class="card-title">郭校廷</h3>
                                        <p class="card-text">
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <img src={require("./static/1.png")} class="card-img-top"/>
                                        <h3 class="card-title">顾期新</h3>
                                        <p class="card-text">
                                            向字符串编程！！！！！！！！！！
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <img src={require("./static/1.png")} class="card-img-top"/>
                                        <h3 class="card-title">陈伟杰</h3>
                                        <p class="card-text">
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <img src={require("./static/1.png")} class="card-img-top"/>
                                        <h3 class="card-title">焦治缙</h3>
                                        <p class="card-text">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </React.Fragment>
        );
    }
}
 
export default Home;