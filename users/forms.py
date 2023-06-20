from django import forms
import re
from users.models import AccountInfo


# 密码验证器
class PasswordValidator:
    @staticmethod
    def validate(password):
        if len(password) < 6 or len(password) > 15:
            raise forms.ValidationError('密码长度必须介于6到15个字符之间。')
        if not re.search(r'\d', password):
            raise forms.ValidationError('密码必须包含至少一个数字。')
        if not re.search(r'[a-zA-Z]', password):
            raise forms.ValidationError('密码必须包含至少一个英文字母。')
        if re.search(r'\s', password):
            raise forms.ValidationError('密码不能包含空格。')


# 账户信息表单
class AccountForm(forms.ModelForm):
    username = forms.CharField(max_length=100, error_messages={
        'required': '请输入用户名。',
        'unique': '用户名已存在。',
    })
    password = forms.CharField(error_messages={
        'required': '请输入密码。'
    })
    invcode = forms.CharField(required=False)

    def clean_password(self):
        password = self.cleaned_data.get('password')
        PasswordValidator.validate(password)
        return password

    class Meta:
        model = AccountInfo
        fields = ['username', 'password', 'invcode']


# 登录表单
class LoginForm(forms.Form):
    username = forms.CharField(max_length=100, error_messages={
        'required': '请输入用户名。',
    })
    password = forms.CharField(error_messages={
        'required': '请输入密码。'
    })
