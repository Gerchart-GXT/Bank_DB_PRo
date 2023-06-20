import json
import hashlib
from django.http import JsonResponse
from django.utils.crypto import constant_time_compare
from django.views.decorators.csrf import csrf_exempt
from .forms import AccountForm, LoginForm
from .models import AccountInfo


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
            result = {'status': 'error', 'message': json.dumps(form.errors, ensure_ascii=False)}
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
                        result = {'status': 'error', 'message': '用户已登录。', 'now': user.id}
                    else:
                        user.online = True
                        user.save()
                        result = {'status': 'success', 'message': '登录成功。', 'now': user.id}
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
        nid = request.POST.get('nid')
        try:
            user = AccountInfo.objects.get(id=nid)
            if user.online:
                user.online = False
                user.save()
                result = {'status': 'success', 'message': '登出成功。'}
            else:
                result = {'status': 'error', 'message': '用户未登录。'}
        except AccountInfo.DoesNotExist:
            result = {'status': 'error', 'message': '用户不存在。'}
    return JsonResponse(result)
