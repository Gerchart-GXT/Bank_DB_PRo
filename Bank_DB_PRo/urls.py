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
    path('isOnline/', views.is_online),

    # account_delete
    path('account/delete/', views.delete_account),

    # get_account_info
    path('info/account/get/', views.get_account_info),
    path('account/list/', views.show_account_list),
    path('client/list/', views.show_client_list),
    path('manager/list/', views.show_manager_list),

    # change_information
    path('info/client/write/', views.submit_clientInfo),
    path('info/manager/write/', views.submit_managerInfo),

    # edit_department
    path('department/new/', views.new_department),
    path('department/delete/', views.delete_department),
    path('department/list/', views.show_department_list),
]
