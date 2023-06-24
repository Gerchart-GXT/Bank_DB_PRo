"""
URL configuration for Bank_DB_PRo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from bank import views

urlpatterns = [
    # ('admin/', admin.site.urls),

    # register
    path('register/', views.register),

    # login
    path('login/', views.login),

    # logout
    path('logout/', views.logout),

    # is_online
    path('login-status-check/', views.is_online),

    # account_delete
    path('account/delete/', views.delete_account),

    # get_account_info
    path('info/account/get/', views.get_account_info),
    path('account/list/', views.show_account_list),
    path('client/list/', views.show_client_list),
    path('manager/list/', views.show_manager_list),

    # change_information
    path('info/client/write/', views.submit_clientInfo),
    path('info/client/get/', views.get_client_info),
    path('info/manager/write/', views.submit_managerInfo),
    path('info/manager/', views.get_manager_info),

    # edit_department
    path('department/new/', views.new_department),
    path('department/delete/', views.delete_department),
    path('department/list/', views.show_department_list),

    # card
    path('debit_card/create/', views.create_debit_card),
    path('credit_card/create/', views.create_credit_card),

    path('credit_card/list/client/', views.client_credit_card_list),
    path('debit_card/list/client/', views.client_debit_card_list),

    # views
    path('client/cards/', views.card_view),
    path('client/funds/', views.fund_view),
    path('client/financials/', views.financial_view),
    path('client/insurances/', views.insurance_view),

    # fund
    path('fund/new/', views.new_fund),
    path('fund/list/', views.show_fund_list),
    path('client/fund/list/', views.show_client_fund),
    path('fund/buy/', views.buy_fund),

    # financial
    path('financial/new/', views.new_financial),
    path('financial/list/', views.show_financial_list),
    path('client/financial/list/', views.show_client_financial),
    path('financial/buy/', views.buy_financial),

    # insurance
    path('insurance/new/', views.new_insurance),
    path('insurance/list/', views.show_insurance_list),
    path('client/insurance/list/', views.show_client_insurance),
    path('insurance/buy/', views.buy_insurance),

    # shop
    path('shop/fund/', views.fund_shop),
    path('shop/financial/', views.financial_shop),
    path('shop/insurance/', views.insurance_shop),

    # manager
    path('manager/bind/fund/', views.manager_bind_fund),
    path('manager/unbind/fund/', views.manager_unbind_fund),
    path('manager/bind/financial/', views.manager_bind_financial),
    path('manager/unbind/financial/', views.manager_unbind_financial),
    path('manager/bind/insurance/', views.manager_bind_insurance),
    path('manager/unbind/insurance/', views.manager_unbind_insurance),
    path('manager/insurance/list/', views.show_manager_insurance),
    path('manager/fund/list/', views.show_manager_fund),
    path('manager/financial/list/', views.show_manager_financial),

    # delete
    path('card/delete/', views.delete_card),
    path('project/delete/', views.delete_prj),
]
