import hashlib
import json
from django.http import JsonResponse, QueryDict
from django.utils.crypto import constant_time_compare
from django.views.decorators.csrf import csrf_exempt
from .forms import AccountForm, LoginForm, ClientForm, ManagerForm, DepartmentForm
from .models import AccountInfo, Client, Manager, Department
from bank import serializers


@csrf_exempt
def register(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        # 注册信息通过
        if form.is_valid():
            password = form.cleaned_data['password']
            invcode = form.cleaned_data['invcode']
            if invcode == '焦爷万岁':
                index = 0  # 超级账号
            elif invcode == '焦爷千岁':
                index = 1  # 经理账号
            elif invcode == '':
                index = 2  # 客户账号
            else:
                result = {'status': 'error', 'message': '你小子想篡位是吧'}
                return JsonResponse(result)
            password_hash = hashlib.md5(password.encode()).hexdigest()
            form.instance.password = password_hash
            form.instance.index = index
            form.save()
            result = {'status': 'success', 'message': '注册成功'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            uname = form.cleaned_data['username']
            pwd = form.cleaned_data['password']
            password_hash = hashlib.md5(pwd.encode()).hexdigest()
            try:
                user = AccountInfo.objects.get(username=uname)
                is_equal = constant_time_compare(user.password, password_hash)
                if is_equal:
                    if user.online:
                        result = {'status': 'error', 'message': '用户已登录。', 'now': user.account_id}
                    else:
                        user.online = True
                        user.save()
                        result = {'status': 'success', 'message': '登录成功。', 'now': user.account_id}
                else:
                    result = {'status': 'error', 'message': '密码错误。'}
            except AccountInfo.DoesNotExist:
                result = {'status': 'error', 'message': '用户不存在。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def logout(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
    else:
        nid = request.POST.get('account_id')
        try:
            user = AccountInfo.objects.get(account_id=nid)
            if user.online:
                user.online = False
                user.save()
                result = {'status': 'success', 'message': '登出成功。'}
            else:
                result = {'status': 'error', 'message': '用户未登录。'}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '用户不存在。'}
    return JsonResponse(result)


@csrf_exempt
def is_online(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
    else:
        nid = request.POST.get('account_id')
        try:
            user = AccountInfo.objects.get(account_id=nid)
            if user.online:
                result = {'status': 'success', 'message': 'online'}
            else:
                result = {'status': 'success', 'message': 'offline'}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '用户不存在。'}
    return JsonResponse(result)


@csrf_exempt
def submit_clientInfo(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        if form.is_valid():
            nid = request.POST.get('client_account')
            try:
                user = Client.objects.get(client_account=nid)
                user.client_name = form.instance.client_name
                user.client_idnum = form.instance.client_idnum
                user.client_phone_number = form.instance.client_phone_number
                user.client_email_address = form.instance.client_email_address
                user.save()
                result = {'status': 'success', 'message': '信息更改成功。'}
            except Client.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '信息创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def submit_managerInfo(request):
    if request.method == 'POST':
        form = ManagerForm(request.POST)
        if form.is_valid():
            nid = request.POST.get('manager_account')
            try:
                user = Client.objects.get(manager_account=nid)
                user.manager_name = form.instance.manager_name
                user.manager_phone_number = form.instance.manager_phone_number
                user.manager_email_address = form.instance.manager_email_address
                user.manager_department_id = form.instance.manager_department_id
                user.save()
                result = {'status': 'success', 'message': '信息更改成功。'}
            except Manager.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '信息创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def new_department(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = DepartmentForm(data)
        if form.is_valid():
            department_name = data.get('department_name')
            try:
                department = Department.objects.get(department_name=department_name)
                result = {'status': 'error', 'message': '已存在该部门。'}
            except Department.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '部门创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def delete_department(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        department_id = data.get('department_id')
        try:
            department = Department.objects.get(department_id=department_id)
            department.delete()
            result = {'status': 'success', 'message': '部门删除成功。'}
        except Department.DoesNotExist:
            result = {'status': 'error', 'message': '部门不存在。'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def show_department(request):
    if request.method == 'GET':
        department_data = Department.objects.all()
        serializer = serializers.DepartmentSerializer(department_data, many=True)
        serialized_data = serializer.data
        return JsonResponse(serialized_data, safe=False)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)
