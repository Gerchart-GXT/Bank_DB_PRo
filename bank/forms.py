from django import forms
import re
from bank.models import AccountInfo, Client, Manager, Department, Fund_type, Financial_type, Insurance_type


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


# 客户信息表单
class ClientForm(forms.ModelForm):
    client_name = forms.CharField(error_messages={
        'required': '请输入姓名。',
    })
    client_idnum = forms.CharField(error_messages={
        'required': '请输入身份证号。',
    })
    client_phone_number = forms.CharField(error_messages={
        'required': '请输入手机号。',
    })
    client_email_address = forms.CharField(error_messages={
        'required': '请输入邮箱。',
    })
    username = forms.ModelChoiceField(queryset=AccountInfo.objects.all(), to_field_name='username', error_messages={
        'required': '未定位到账号'
    })

    class Meta:
        model = Client
        fields = ['client_name', 'client_idnum', 'client_phone_number', 'client_email_address', 'username']


# 经理信息表单
class ManagerForm(forms.ModelForm):
    manager_name = forms.CharField(error_messages={
        'required': '请输入姓名。',
    })
    manager_phone_number = forms.CharField(error_messages={
        'required': '请输入手机号。',
    })
    manager_email_address = forms.CharField(error_messages={
        'required': '请输入电子邮箱。',
    })
    manager_department_id = forms.ModelChoiceField(queryset=Department.objects.all(), error_messages={
        'required': '请选择部门。',
    })
    username = forms.ModelChoiceField(queryset=AccountInfo.objects.all(), to_field_name='username', error_messages={
        'required': '未定位到账号'
    })

    class Meta:
        model = Manager
        fields = ['manager_name', 'manager_phone_number', 'manager_email_address', 'manager_department_id',
                  'username']


# 部门表单
class DepartmentForm(forms.ModelForm):
    department_name = forms.CharField(error_messages={
        'required': '请输入部门名称'
    })

    class Meta:
        model = Department
        fields = ['department_name']


# 基金表单
class FundForm(forms.ModelForm):
    fund_name = forms.CharField(error_messages={
        'required': '请输入基金名称'
    })

    class Meta:
        model = Fund_type
        fields = ['fund_name']


# 保险表单
class InsuranceForm(forms.ModelForm):
    insurance_name = forms.CharField(error_messages={
        'required': '请输入保险名称'
    })

    class Meta:
        model = Insurance_type
        fields = ['insurance_name']


# 理财表单
class FinancialForm(forms.ModelForm):
    financial_name = forms.CharField(error_messages={
        'required': '请输入理财项目名称'
    })

    class Meta:
        model = Financial_type
        fields = ['financial_name']
