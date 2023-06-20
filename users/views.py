import json
import hashlib
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import AccountForm
from .models import AccountInfo


@csrf_exempt
def register(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        # 注册信息通过
        if form.is_valid():
            username = form.cleaned_data['username']
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
            form.instance.index = index
            form.save()
            result = {'status': 'success', 'message': '注册成功'}
        else:
            result = {'status': 'error', 'message': json.dumps(form.errors, ensure_ascii=False)}

    return JsonResponse(result)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
