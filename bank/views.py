import hashlib
import json

from django.db.models import Sum
from django.http import JsonResponse
from django.utils.crypto import constant_time_compare
from django.views.decorators.csrf import csrf_exempt
from .forms import AccountForm, LoginForm, ClientForm, ManagerForm, DepartmentForm, FundForm, FinancialForm, \
    InsuranceForm
from .models import AccountInfo, Client, Manager, Department, Cookie, Card, Credit_card, Debit_card, Fund_type, \
    Financial_type, Insurance_type, Currency_project, Insurance_project, Financial_project, Fund_project, \
    manager_with_fund, manager_with_financial, manager_with_insurance
from bank import serializers
from typing import Iterable


def expand(lis):
    ll = []
    for each in lis:
        if isinstance(each, Iterable) and not isinstance(each, str):
            ll.extend(expand(each))
        else:
            ll.append(each)
    return ll


@csrf_exempt
def register(request):
    if request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        form = AccountForm(data)
        # form = AccountForm(request.POST)
        # 注册信息通过
        if form.is_valid():
            password = form.cleaned_data['password']
            invcode = form.cleaned_data['invcode']
            if invcode == '管理员账号':
                index = 0  # 超级账号
            elif invcode == '经理账号':
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
        print(request.body)
        data = json.loads(request.body)
        form = LoginForm(data)
        # form = LoginForm(request.POST)
        if form.is_valid():
            uname = form.cleaned_data['username']
            pwd = form.cleaned_data['password']
            password_hash = hashlib.md5(pwd.encode()).hexdigest()
            try:
                user = AccountInfo.objects.get(username=uname)
                is_equal = constant_time_compare(user.password, password_hash)
                if is_equal:
                    if user.online:
                        ck = Cookie.objects.get(account_id=user)
                        ck.delete()
                        cookie = Cookie.create()
                        cookie.account_id = user
                        cookie.save()
                        cookie_data = {
                            'value': cookie.cookie,
                            'expires': cookie.expiration,
                        }
                        result = {'status': 'success', 'message': '登录成功。', 'cookie': cookie_data,
                                  'usertype': user.get_index_display()}
                    else:
                        cookie = Cookie.create()
                        cookie.account_id = user
                        cookie.save()
                        cookie_data = {
                            'value': cookie.cookie,
                            'expires': cookie.expiration,
                        }
                        user.online = True
                        user.save()
                        result = {'status': 'success', 'message': '登录成功。', 'cookie': cookie_data}
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
        data = json.loads(request.body)
        # nid = data.get('account_id')
        cookie = data.get('cookieValue')
        try:
            cookie = Cookie.objects.get(cookie=cookie)
            user = AccountInfo.objects.get(account_id=cookie.account_id.account_id)
            user.online = False
            user.save()
            cookie.delete()
            result = {'status': 'success', 'message': '登出成功。'}
        except Cookie.DoesNotExist:
            result = {'status': 'error', 'message': '用户未登录。'}
    return JsonResponse(result)


@csrf_exempt
def is_online(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
    else:
        data = json.loads(request.body)
        # cookie = data.get('cookieValue')
        cookie = data.get('cookieValue')
        try:
            cookie = Cookie.objects.get(cookie=cookie)
            nid = cookie.account_id.account_id
            user = AccountInfo.objects.get(account_id=nid)
            result = {'status': 'success', 'username': user.username, 'usertype': user.get_index_display()}
        except Cookie.DoesNotExist:
            result = {'status': 'error', 'message': '用户未登录。'}
    return JsonResponse(result)


@csrf_exempt
def delete_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            account = AccountInfo.objects.get(username=username)
            account.delete()
            result = {'status': 'success', 'message': '账号注销成功。'}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号不存在。'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def get_account_info(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
        return JsonResponse(result)
    else:
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            serializer = serializers.AccountSerializer(acc)
            serialized_data = serializer.data
            head = [
                {'account_id': '账户编号'},
                {'username': '用户名'},
                {'invcode': '授权码'},
                {'index': '账号类型'}
            ]
            result = {'status': 'success', 'title': '账户信息', 'head': head, 'account_info': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号不存在。'}
            return JsonResponse(result)


@csrf_exempt
def show_account_list(request):
    if request.method == 'GET':
        account_data = AccountInfo.objects.all()
        serializer = serializers.AccountSerializer(account_data, many=True)
        serialized_data = serializer.data
        head = [
            {'account_id': '账户编号'},
            {'username': '用户名'},
            {'invcode': '邀请码'},
            {'index': '账号类型'}
        ]
        result = {'status': 'success', 'title': '账户信息', 'head': head, 'list': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def submit_clientInfo(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = ClientForm(data)
        if form.is_valid():
            try:
                username = data.get('username')
                acc = AccountInfo.objects.get(username=username)
                user = Client.objects.get(client_account=acc)
                user.client_account = acc
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
def show_client_list(request):
    if request.method == 'GET':
        client_data = Client.objects.all()
        serializer = serializers.ClientSerializer(client_data, many=True)
        serialized_data = serializer.data
        head = [
            {'client_id': '客户编号'},
            {'client_name': '姓名'},
            {'client_idnum': '身份证号'},
            {'client_phone_number': '手机号'},
            {'client_email_address': '邮箱地址'},
            {'client_account_id': '账号id'}
        ]
        result = {'status': 'success', 'title': '客户信息', 'head': head, 'client_info': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_manager_list(request):
    if request.method == 'GET':
        manager_data = Manager.objects.all()
        serializer = serializers.ManagerSerializer(manager_data, many=True)
        serialized_data = serializer.data
        title = [
            {"manager_id": "经理编号"},
            {"manager_name": "经理姓名"},
            {"manager_phone_number": "经理电话"},
            {"manager_email_address": "经理邮箱"},
            {"manager_department_id": "部门编号"}
        ]
        result = {'status': 'success', 'title': title, 'list': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def submit_managerInfo(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = ManagerForm(data)
        if form.is_valid():
            try:
                username = data.get('username')
                acc = AccountInfo.objects.get(username=username)
                user = Manager.objects.get(manager_account=acc)
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
def get_client_info(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
        return JsonResponse(result)
    else:
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            head = [
                {'client_name': '姓名'},
                {'client_idnum': '身份证号'},
                {'client_phone_number': '手机号'},
                {'client_email_address': '邮箱地址'},
            ]
            try:
                client = Client.objects.get(client_account=acc)
                serializer = serializers.ClientSerializer(client)
                serialized_data = serializer.data
                result = {'status': 'success', 'title': '客户信息', 'head': head, 'client_info': serialized_data}
                return JsonResponse(result)
            except Client.DoesNotExist:
                client = Client.objects.create(client_account=acc)
                serializer = serializers.ClientSerializer(client)
                serialized_data = serializer.data
                result = {'status': 'error', 'title': '客户信息', 'head': head, 'client_info': serialized_data}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账户不存在。'}
        return JsonResponse(result)


@csrf_exempt
def get_manager_info(request):
    if request.method != 'POST':
        result = {'status': 'error', 'message': '非法请求。'}
        return JsonResponse(result)
    else:
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            try:
                manager = Manager.objects.get(manager_account=acc)
                serializer = serializers.ManagerSerializer(manager)
                serialized_data = serializer.data
                head = [
                    {'manager_name': '姓名'},
                    {'manager_phone_number': '手机号'},
                    {'manager_email_address': '邮箱地址'},
                ]
                result = {'status': 'success', 'title': '经理信息', 'head': head, 'manager_info': serialized_data}
                return JsonResponse(result)
            except Manager.DoesNotExist:
                Manager.objects.create(manager_account=acc)
                serializer = serializers.ManagerSerializer(manager)
                serialized_data = serializer.data
                head = [
                    {'manager_name': '姓名'},
                    {'manager_phone_number': '手机号'},
                    {'manager_email_address': '邮箱地址'},
                ]
                result = {'status': 'success', 'title': '经理信息', 'head': head, 'manager_info': serialized_data}
                return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '经理不存在。'}
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
    if request.method == 'POST':
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
def show_department_list(request):
    if request.method == 'GET':
        department_data = Department.objects.all()
        serializer = serializers.DepartmentSerializer(department_data, many=True)
        serialized_data = serializer.data
        title = [
            {"department_id": "部门编号"},
            {"department_name": "部门名称"}
        ]
        result = {'status': 'success', 'title': title, 'list': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def create_debit_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            usr = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=usr)
            card = Card.create()
            card.card_password = password
            card.client_id = client
            card.save()
            debit_card = Debit_card.objects.create(card_id=card)
            debit_card.save()
            card_data = [
                {'card_id': card.card_id},
                {'debit_card_id': debit_card.debit_card_id},
                {'card_check_code': card.card_check_code},
                {'client_id': client.client_id},
                {'account_id': usr.account_id},
            ]
            result = {'status': 'success', 'message': '创建成功', 'card_data': card_data}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def create_credit_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            usr = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=usr)
            card = Card.create()
            card.card_password = password
            card.client_id = client
            card.save()
            credit_card = Credit_card.objects.create(card_id=card)
            credit_card.card_credit_limit = 5000.00
            credit_card.save()
            card_data = {
                'card_id': card.card_id,
                'credit_card_id': credit_card.credit_card_id,
                'card_check_code': card.card_check_code,
                'client_id': client.client_id,
                'account_id': usr.account_id,
            }
            result = {'status': 'success', 'message': '创建成功', 'card_data': card_data}
        except Cookie.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def client_credit_card_list(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            card_data = Credit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id)
            serializer = serializers.CreditCardSerializer(card_data, many=True)
            serialized_data = serializer.data
            title = [
                {"card_id": "卡片编号"},
                {"card_check_code": "校验码"},
                {"card_valid_thru": "有效期"},
                {"card_balance": "余额"},
                {"card_credit_limit": "限额"}
            ]
            result = {'status': 'success', 'title': '信用卡列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except Cookie.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def client_debit_card_list(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            card_data = Debit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id)
            serializer = serializers.DebitCardSerializer(card_data, many=True)
            serialized_data = serializer.data
            title = [
                {"card_id": "卡片编号"},
                {"card_check_code": "校验码"},
                {"card_valid_thru": "有效期"},
                {"card_balance": "余额"},
            ]
            result = {'status': 'success', 'title': '借记卡列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except Cookie.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def new_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = FundForm(data)
        if form.is_valid():
            fund_name = data.get('fund_name')
            try:
                fund = Fund_type.objects.get(fund_name=fund_name)
                result = {'status': 'error', 'message': '已存在该基金。'}
            except Fund_type.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '基金创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def show_fund_list(request):
    if request.method == 'GET':
        fund_data = Fund_type.objects.all()
        serializer = serializers.FundSerializer(fund_data, many=True)
        serialized_data = serializer.data
        title = [
            {"fund_id": "基金编号"},
            {"fund_name": "基金名称"}
        ]
        result = {'status': 'success', 'title': '基金列表', 'head': title, 'item': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def new_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = FinancialForm(data)
        if form.is_valid():
            financial_name = data.get('financial_name')
            try:
                financial = Financial_type.objects.get(financial_name=financial_name)
                result = {'status': 'error', 'message': '已存在该理财。'}
            except Financial_type.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '理财创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def show_financial_list(request):
    if request.method == 'GET':
        financial_data = Financial_type.objects.all()
        serializer = serializers.FinancialSerializer(financial_data, many=True)
        serialized_data = serializer.data
        title = [
            {"financial_id": "理财产品编号"},
            {"financial_name": "理财产品名称"}
        ]
        result = {'status': 'success', 'title': '理财产品列表', 'head': title, 'item': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def new_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        form = InsuranceForm(data)
        if form.is_valid():
            insurance_name = data.get('insurance_name')
            try:
                insurance = Insurance_type.objects.get(insurance_name=insurance_name)
                result = {'status': 'error', 'message': '已存在该保险。'}
            except Insurance_type.DoesNotExist:
                form.save()
                result = {'status': 'success', 'message': '保险创建成功。'}
        else:
            first_error = list(form.errors.values())[0][0]
            result = {'status': 'error', 'message': first_error}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def show_insurance_list(request):
    if request.method == 'GET':
        insurance_data = Insurance_type.objects.all()
        serializer = serializers.InsuranceSerializer(insurance_data, many=True)
        serialized_data = serializer.data
        title = [
            {"insurance_id": "保险产品编号"},
            {"insurance_name": "保险产品名称"}
        ]
        result = {'status': 'success', 'title': '保险列表', 'head': title, 'item': serialized_data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_client_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj_data = Fund_project.objects.select_related('project_id').filter(project_id__client_id=client.client_id)
            serializer = serializers.FundPrjSerializer(prj_data, many=True)
            serialized_data = serializer.data
            title = [
                {"project_id": "交易编号"},
                {"project_state": "交易状态"},
                {"fund_amount": "基金金额"},
                {"fund_type": "基金名称"},
                {"fund_income": "基金收入"},
                {"fund_period": "到期时间"},
                {"fund_detail_etc": "明细"},
            ]
            result = {'status': 'success', 'title': '保险列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_client_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj_data = Financial_project.objects.select_related('project_id').filter(
                project_id__client_id=client.client_id)
            serializer = serializers.FinancialPrjSerializer(prj_data, many=True)
            serialized_data = serializer.data
            title = [
                {"project_id": "交易编号"},
                {"project_state": "交易状态"},
                {"financial_project_amount": "理财金额"},
                {"financial_project_type": "理财产品名称"},
                {"financial_project_income": "理财收入"},
                {"financial_project_period": "到期时间"},
                {"financial_project_detail_etc": "明细"},
            ]
            result = {'status': 'success', 'title': '理财产品列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_client_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj_data = Insurance_project.objects.select_related('project_id').filter(
                project_id__client_id=client.client_id)
            serializer = serializers.InsurancePrjSerializer(prj_data, many=True)
            serialized_data = serializer.data
            title = [
                {"project_id": "交易编号"},
                {"project_state": "交易状态"},
                {"insurance_policyholder": "持保人"},
                {"insurance_insured": "受保人"},
                {"insurance_type": "保险名称"},
                {"insurance_amount": "保险金额"},
                {"insurance_period": "到期时间"},
                {"insurance_detail_etc": "明细"},
            ]
            result = {'status': 'success', 'title': '保险列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def buy_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj = Currency_project.objects.create(client_id=client)
            prj.state = 0
            prj.save()
            fund_type = data.get('fund_type')
            fund = Fund_type.objects.get(fund_id=fund_type)
            fund_prj = Fund_project.objects.create(project_id=prj, fund_type=fund, fund_period=data.get('fund_period'))
            fund_prj.fund_amount = data.get('fund_amount')
            fund_prj.fund_detail_etc = data.get('fund_detail_etc')
            fund_prj.save()
            result = {'status': 'success', 'message': '购买成功'}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def buy_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj = Currency_project.objects.create(client_id=client)
            prj.state = 0
            prj.save()
            financial_type = data.get('financial_type')
            financial = Financial_type.objects.get(financial_id=financial_type)
            financial_prj = Financial_project.objects.create(project_id=prj, financial_type=financial,
                                                             financial_project_period=data.get('financial_period'))
            financial_prj.financial_project_amount = data.get('financial_amount')
            financial_prj.financial_project_detail_etc = data.get('financial_detail_etc')
            financial_prj.save()
            result = {'status': 'success', 'message': '购买成功'}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def buy_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            prj = Currency_project.objects.create(client_id=client)
            prj.state = 0
            prj.save()
            insurance_type = data.get('insurance_type')
            insurance = Insurance_type.objects.get(insurance_id=insurance_type)
            insurance_prj = Insurance_project.objects.create(project_id=prj, insurance_type=insurance,
                                                             insurance_period=data.get('insurance_period'),
                                                             insurance_insured=data.get('insurance_insured'))
            insurance_prj.insurance_amount = data.get('insurance_amount')
            insurance_prj.insurance_policyholder = data.get('insurance_policyholder')
            insurance_prj.insurance_detail_etc = data.get('insurance_detail_etc')
            insurance_prj.save()
            result = {'status': 'success', 'message': '购买成功'}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def fund_shop(request):
    if request.method == 'POST':
        title = [
            {"fund_type": "基金类型"},
            {"fund_amount": "基金金额"},
            {"fund_period": "到期时间"},
            {"fund_detail_etc": "明细"},
        ]
        result = {'status': 'success', 'head': title}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def financial_shop(request):
    if request.method == 'POST':
        title = [
            {"financial_type": "理财类型"},
            {"financial_amount": "理财金额"},
            {"financial_period": "到期时间"},
            {"financial_detail_etc": "明细"},
        ]
        result = {'status': 'success', 'head': title}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def insurance_shop(request):
    if request.method == 'POST':
        title = [
            {"insurance_type": "保险类型"},
            {"insurance_amount": "保险金额"},
            {"insurance_policyholder": "持保人"},
            {"insurance_insured": "受保人"},
            {"insurance_period": "到期时间"},
            {"insurance_detail_etc": "明细"},
        ]
        result = {'status': 'success', 'head': title}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def card_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = [
            {"card_count": "银行卡数量"},
            {"credit_count": "信用卡数量"},
            {"debit_count": "借记卡数量"},
            {"amount": "总余额"},
            {"limit": "总限额"}
        ]
        acc = AccountInfo.objects.get(username=username)
        client = Client.objects.get(client_account=acc)
        card_count = Card.objects.filter(client_id=client).count()
        debit_count = Debit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id).count()
        credit_count = Credit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id).count()
        balance1 = Credit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id).aggregate(
            Sum('card_balance')).get('card_balance__sum', 0)
        balance2 = Debit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id).aggregate(
            Sum('card_balance')).get('card_balance__sum', 0)
        limit = Credit_card.objects.select_related('card_id').filter(card_id__client_id=client.client_id).aggregate(
            Sum('card_credit_limit')).get('card_credit_limit__sum', 0)
        balance = balance2 if balance2 is not None else 0 + balance1 if balance1 is not None else 0
        data = {
            'card_count': card_count,
            'debit_count': debit_count,
            'credit_count': credit_count,
            'amount': balance,
            'limit': limit
        }
        result = {'status': 'success', 'title': '银行卡总览', 'head': title, 'item': data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def fund_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = [
            {"fund_count": "基金数量"},
            {"fund_amount": "总金额"},
            {"fund_income": "总盈亏"},
        ]
        acc = AccountInfo.objects.get(username=username)
        client = Client.objects.get(client_account=acc)
        fund_count = Fund_project.objects.select_related('project_id').filter(
            project_id__client_id=client.client_id).count()
        fund_amount = Fund_project.objects.select_related('project_id').filter(
            project_id__client_id=client.client_id).aggregate(
            Sum('fund_amount')).get('fund_amount__sum', 0)
        fund_amount = fund_amount if fund_amount is not None else 0
        fund_income = Fund_project.objects.select_related('project_id').filter(
            project_id__client_id=client.client_id).aggregate(
            Sum('fund_income')).get('fund_income__sum', 0)
        fund_income = fund_income if fund_income is not None else 0
        data = {
            'fund_count': fund_count,
            'fund_amount': fund_amount,
            'fund_income': fund_income
        }
        result = {'status': 'success', 'title': '基金总览', 'head': title, 'item': data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def financial_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = [
            {"financial_count": "理财产品数量"},
            {"financial_amount": "总金额"},
            {"financial_income": "总盈亏"},
        ]
        try:
            acc = AccountInfo.objects.get(username=username)
            client = Client.objects.get(client_account=acc)
            financial_count = Financial_project.objects.select_related('project_id').filter(
                project_id__client_id=client.client_id).count()
            financial_amount = Financial_project.objects.select_related('project_id').filter(
                project_id__client_id=client.client_id).aggregate(
                Sum('financial_project_amount')).get('financial_project_amount__sum', 0)
            financial_amount = financial_amount if financial_amount is not None else 0
            financial_income = Financial_project.objects.select_related('project_id').filter(
                project_id__client_id=client.client_id).aggregate(
                Sum('financial_project_income')).get('financial_project_income__sum', 0)
            financial_income = financial_income if financial_income is not None else 0
            data = {
                'financial_count': financial_count,
                'financial_amount': financial_amount,
                'financial_income': financial_income
            }
            result = {'status': 'success', 'title': '理财产品总览', 'head': title, 'item': data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '账号异常'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def insurance_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = [
            {"insurance_count": "保险数量"},
            {"insurance_amount": "总金额"},
        ]
        acc = AccountInfo.objects.get(username=username)
        client = Client.objects.get(client_account=acc)
        insurance_count = Insurance_project.objects.select_related('project_id').filter(
            project_id__client_id=client.client_id).count()
        insurance_amount = Insurance_project.objects.select_related('project_id').filter(
            project_id__client_id=client.client_id).aggregate(
            Sum('insurance_amount'))['insurance_amount__sum']
        insurance_amount = insurance_amount if insurance_amount is not None else 0
        data = {
            'insurance_count': insurance_count,
            'insurance_amount': insurance_amount
        }
        result = {'status': 'success', 'title': '保险总览', 'head': title, 'item': data}
        return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def manager_bind_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            fund_id = data.get('fund_id')
            fund = Fund_type.objects.get(fund_id=fund_id)
            try:
                t = manager_with_fund.objects.get(fund_id=fund, manager_id=manager)
                result = {'status': 'error', 'message': '已有绑定'}
                return JsonResponse(result)
            except manager_with_fund.DoesNotExist:
                relation = manager_with_fund.objects.create(fund_id=fund, manager_id=manager)
                relation.save()
                result = {'status': 'success', 'message': '绑定成功'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def manager_unbind_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            fund_id = data.get('fund_id')
            fund = Fund_type.objects.get(fund_id=fund_id)
            try:
                relation = manager_with_fund.objects.get(fund_id=fund, manager_id=manager)
                relation.delete()
                result = {'status': 'success', 'message': '解绑成功'}
                return JsonResponse(result)
            except manager_with_fund.DoesNotExist:
                result = {'status': 'error', 'message': '不存在的关系'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def delete_card(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        card_id = data.get('card_id')
        try:
            card = Card.objects.get(card_id=card_id)
            card.delete()
            result = {'status': 'success', 'message': '银行卡删除成功。'}
        except Card.DoesNotExist:
            result = {'status': 'error', 'message': '银行卡不存在。'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def delete_prj(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        prj_id = data.get('project_id')
        try:
            prj = Currency_project.objects.get(project_id=prj_id)
            prj.delete()
            result = {'status': 'success', 'message': '信息删除成功。'}
        except Currency_project.DoesNotExist:
            result = {'status': 'error', 'message': '信息不存在。'}
    else:
        result = {'status': 'error', 'message': '非法请求'}
    return JsonResponse(result)


@csrf_exempt
def manager_bind_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            insurance_id = data.get('insurance_id')
            insurance = Insurance_type.objects.get(insurance_id=insurance_id)
            try:
                t = manager_with_insurance.objects.get(insurance_id=insurance, manager_id=manager)
                result = {'status': 'error', 'message': '已有绑定'}
                return JsonResponse(result)
            except manager_with_insurance.DoesNotExist:
                relation = manager_with_insurance.objects.create(insurance_id=insurance, manager_id=manager)
                relation.save()
                result = {'status': 'success', 'message': '绑定成功'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def manager_unbind_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            insurance_id = data.get('insurance_id')
            insurance = Insurance_type.objects.get(insurance_id=insurance_id)
            try:
                relation = manager_with_insurance.objects.get(insurance_id=insurance, manager_id=manager)
                relation.delete()
                result = {'status': 'success', 'message': '解绑成功'}
                return JsonResponse(result)
            except manager_with_insurance.DoesNotExist:
                result = {'status': 'error', 'message': '不存在的关系'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def manager_bind_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            financial_id = data.get('financial_id')
            financial = Financial_type.objects.get(financial_id=financial_id)
            try:
                t = manager_with_financial.objects.get(financial_id=financial, manager_id=manager)
                result = {'status': 'error', 'message': '已有绑定'}
                return JsonResponse(result)
            except manager_with_financial.DoesNotExist:
                relation = manager_with_financial.objects.create(financial_id=financial, manager_id=manager)
                relation.save()
                result = {'status': 'success', 'message': '绑定成功'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def manager_unbind_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        acc = AccountInfo.objects.get(username=username)
        if acc.index != 1:
            result = {'status': 'error', 'message': '权限不足'}
            return JsonResponse(result)
        else:
            manager = Manager.objects.get(manager_account=acc)
            financial_id = data.get('financial_id')
            financial = Financial_type.objects.get(financial_id=financial_id)
            try:
                relation = manager_with_financial.objects.get(financial_id=financial, manager_id=manager)
                relation.delete()
                result = {'status': 'success', 'message': '解绑成功'}
                return JsonResponse(result)
            except manager_with_financial.DoesNotExist:
                result = {'status': 'error', 'message': '不存在的关系'}
                return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_manager_insurance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            manager = Manager.objects.get(manager_account=acc)
            insurance = []
            for relation in manager_with_insurance.objects.all():
                if relation.manager_id == manager:
                    insurance.append(relation.insurance_id)
            serializer = serializers.InsuranceSerializer(insurance, many=True)
            serialized_data = serializer.data
            title = [
                {"insurance_id": "保险编号"},
                {"insurance_name": "保险名称"},
            ]
            result = {'status': 'success', 'title': '保险列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_manager_fund(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            manager = Manager.objects.get(manager_account=acc)
            fund = []
            for relation in manager_with_fund.objects.all():
                if relation.manager_id == manager:
                    fund.append(relation.fund_id)
            serializer = serializers.FundSerializer(fund, many=True)
            serialized_data = serializer.data
            title = [
                {"fund_id": "基金编号"},
                {"fund_name": "基金名称"},
            ]
            result = {'status': 'success', 'title': '基金列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)


@csrf_exempt
def show_manager_financial(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            acc = AccountInfo.objects.get(username=username)
            manager = Manager.objects.get(manager_account=acc)
            financial = []
            for relation in manager_with_financial.objects.all():
                if relation.manager_id == manager:
                    financial.append(relation.financial_id)
            serializer = serializers.FinancialSerializer(financial, many=True)
            serialized_data = serializer.data
            title = [
                {"financial_id": "理财产品编号"},
                {"financial_name": "理财产品名称"},
            ]
            result = {'status': 'success', 'title': '理财产品列表', 'head': title, 'item': serialized_data}
            return JsonResponse(result)
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '无效的账号'}
            return JsonResponse(result)
    else:
        result = {'status': 'error', 'message': '非法请求'}
        return JsonResponse(result)
