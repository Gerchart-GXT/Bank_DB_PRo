from django.db import models
from django.core import validators
import re
import string
import secrets
from datetime import datetime, timedelta


# 身份证号校验
def validate_id_number(value):
    if len(value) != 18:
        raise validators.ValidationError("身份证号必须为18位")
    # 检查身份证格式的其他逻辑
    # 你可以在这里编写你自己的身份证校验逻辑，比如使用正则表达式等
    # 示例：使用正则表达式校验身份证号格式
    pattern = re.compile(r'^\d{17}[\dXx]$')
    if not pattern.match(value):
        raise validators.ValidationError("身份证号格式不正确")


# 电话号码校验
def validate_phone_number(value):
    if len(value) != 11:
        raise validators.ValidationError("手机号必须为11位")


# 邮箱校验
def validate_email(value):
    email_validator = validators.EmailValidator("邮箱地址格式不正确")
    email_validator(value)


# 金额校验
def validate_positive_decimal(value):
    if value <= 0:
        raise validators.ValidationError("值必须大于0")


# 生成cookie
def generate_cookie():
    # 生成7位的随机英文字母和数字字符串
    characters = string.ascii_letters + string.digits
    cookie = ''.join(secrets.choice(characters) for _ in range(64))
    return cookie


def generate_card_check_code():
    # 生成64位的随机英文字母和数字字符串
    characters = string.ascii_letters + string.digits
    check_code = ''.join(secrets.choice(characters) for _ in range(7))
    return check_code


# 账号信息表
class AccountInfo(models.Model):
    INDEX_CHOICES = (
        (0, '管理员'),
        (1, '经理'),
        (2, '客户'),
    )
    account_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="账号编号")
    username = models.CharField(max_length=100, unique=True, verbose_name="用户名")
    password = models.CharField(max_length=100, null=False, verbose_name="密码")
    invcode = models.CharField(max_length=100, null=True, verbose_name="邀请码")
    index = models.IntegerField(choices=INDEX_CHOICES, default=2, null=False, verbose_name="账户类型")
    online = models.BooleanField(default=False, null=False, verbose_name="是否在线")


# cookie
class Cookie(models.Model):
    account_id = models.OneToOneField(AccountInfo, on_delete=models.CASCADE, null=False, verbose_name="账户编号")
    cookie = models.CharField(max_length=64, null=True, verbose_name="cookie验证码")
    expiration = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create(cls):
        # 创建一个新的Cookie对象
        cookie = cls(cookie=generate_cookie())

        # 设置Cookie的过期时间为当前时间加上300秒（300000毫秒）
        cookie.expiration = datetime.now() + timedelta(milliseconds=300000)

        return cookie


# 客户信息表
class Client(models.Model):
    client_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="客户编号")
    client_name = models.CharField(max_length=100, null=False, verbose_name="客户姓名")
    client_idnum = models.CharField(max_length=18, null=False, validators=[validate_id_number],
                                    verbose_name="客户身份证号")
    client_phone_number = models.CharField(max_length=11, null=False, validators=[validate_phone_number],
                                           verbose_name="客户电话号码")
    client_email_address = models.CharField(max_length=100, null=False, validators=[validate_email],
                                            verbose_name="客户邮箱")
    client_account = models.ForeignKey(AccountInfo, on_delete=models.CASCADE, null=False, verbose_name="客户账号")


# 卡片信息表
class Card(models.Model):
    card_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="卡片id")
    card_valid_thru = models.DateTimeField(null=False, verbose_name="卡片有效期")
    card_check_code = models.CharField(max_length=20, null=False, verbose_name="卡片校验码")
    card_password = models.CharField(max_length=20, null=False, verbose_name="卡片密码")
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, verbose_name="所属客户编号")

    @classmethod
    def create(cls):
        card = cls(card_check_code=generate_card_check_code())
        card.card_valid_thru = datetime.now() + timedelta(minutes=60 * 24 * 365)
        return card


# 借记卡表
class Debit_card(models.Model):
    debit_card_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="借记卡id")
    card_id = models.OneToOneField(Card, on_delete=models.CASCADE, null=False, verbose_name="借记卡对应卡片id")
    card_balance = models.DecimalField(max_digits=18, decimal_places=2, validators=[validate_positive_decimal],
                                       default=0, null=False,
                                       verbose_name="借记卡余额")


# 信用卡表
class Credit_card(models.Model):
    credit_card_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="信用卡id")
    card_id = models.OneToOneField(Card, on_delete=models.CASCADE, null=False, verbose_name="信用卡对应卡片id")
    card_balance = models.DecimalField(max_digits=18, decimal_places=2, default=0, null=False,
                                       verbose_name="信用卡余额")
    card_credit_limit = models.DecimalField(max_digits=18, decimal_places=2, validators=[validate_positive_decimal],
                                            default=0, null=False,
                                            verbose_name="信用卡额度")


class Financial_type(models.Model):
    financial_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='理财项目编号')
    financial_name = models.CharField(max_length=100, null=False, unique=True)


class Insurance_type(models.Model):
    insurance_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='保险编号')
    insurance_name = models.CharField(max_length=100, null=False, unique=True)


# 基金类型表
class Fund_type(models.Model):
    fund_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='基金编号')
    fund_name = models.CharField(max_length=100, null=False, unique=True)


# 部门表
class Department(models.Model):
    department_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="部门编号")
    department_name = models.CharField(max_length=100, null=False, verbose_name="部门名称")


# 经理信息表
class Manager(models.Model):
    manager_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="经理编号")
    manager_name = models.CharField(max_length=100, null=False, verbose_name="经理姓名")
    manager_phone_number = models.CharField(max_length=20, null=False, validators=[validate_phone_number],
                                            verbose_name="经理电话号码")
    manager_email_address = models.CharField(max_length=100, validators=[validate_email], null=False,
                                             verbose_name="经理邮箱")
    manager_account = models.ForeignKey(AccountInfo, on_delete=models.CASCADE, null=False, verbose_name="经理账号")
    manager_department_id = models.ForeignKey(Department, on_delete=models.CASCADE, null=False,
                                              verbose_name="经理所属部门id")
    insurance = models.ManyToManyField(Insurance_type, through='manager_with_insurance')
    financial = models.ManyToManyField(Financial_type, through='manager_with_financial')
    fund = models.ManyToManyField(Fund_type, through="manager_with_fund")


# 项目表
class Currency_project(models.Model):
    INDEX_CHOICES = (
        (0, 'Active'),
        (1, 'Invalid'),
        (2, 'Frozen'),
    )
    project_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="项目编号")
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, verbose_name="项目所属客户编号")
    #    department_id = models.ForeignKey(Department, on_delete=models.CASCADE, null=False, verbose_name="项目所属部门编号")
    project_state = models.IntegerField(choices=INDEX_CHOICES, null=False, default=0, verbose_name="项目状态")


# 基金项目表
class Fund_project(models.Model):
    fund_project_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='基金项目编号')
    project_id = models.OneToOneField(Currency_project, on_delete=models.CASCADE, null=False, verbose_name="项目编号")
    fund_type = models.ForeignKey(Fund_type, on_delete=models.CASCADE, null=False)
    fund_amount = models.DecimalField(max_digits=18, decimal_places=2, null=False,
                                      validators=[validate_positive_decimal], default=0, verbose_name="基金金额")
    fund_income = models.DecimalField(max_digits=18, decimal_places=2, null=False,
                                      validators=[validate_positive_decimal], default=0, verbose_name="基金收益")
    fund_period = models.DateField(null=False, verbose_name="基金有效期")
    fund_detail_etc = models.TextField(null=True, default="", verbose_name="额外信息")


# 基金——经理关系表
class manager_with_fund(models.Model):
    manage_relation_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="关系编号")
    fund_id = models.ForeignKey(Fund_type, on_delete=models.CASCADE, null=False, verbose_name="基金编号")
    manager_id = models.ForeignKey(Manager, on_delete=models.CASCADE, null=False, verbose_name="经理编号")


# 项目——客户关系表
# class client_with_currency_project(models.Model):
#    client_relation_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='关系编号')
#    project_id = models.ForeignKey(Currency_project, on_delete=models.CASCADE, null=False, verbose_name="项目编号")
#   client_id = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, verbose_name="客户编号")


# 保险信息表
class Insurance_project(models.Model):
    insurance_project_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='保险项目编号')
    project_id = models.OneToOneField(Currency_project, on_delete=models.CASCADE, null=False, verbose_name="项目编号")
    insurance_type = models.ForeignKey(Insurance_type, on_delete=models.CASCADE, null=False)
    insurance_policyholder = models.CharField(max_length=20, null=False, validators=[validate_id_number],
                                              verbose_name="投保人身份证号")
    insurance_insured = models.CharField(max_length=20, validators=[validate_id_number],
                                         verbose_name="被保人身份证号")
    insurance_amount = models.DecimalField(max_digits=18, decimal_places=2, validators=[validate_positive_decimal],
                                           null=False, default=0,
                                           verbose_name="投保金额")
    insurance_period = models.DateField(null=False, verbose_name="保险有效期")
    insurance_detail_etc = models.TextField(null=True, default="", verbose_name="额外信息")


class manager_with_insurance(models.Model):
    manage_relation_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="关系编号")
    insurance_id = models.ForeignKey(Insurance_type, on_delete=models.CASCADE, null=False, verbose_name="保险编号")
    manager_id = models.ForeignKey(Manager, on_delete=models.CASCADE, null=False, verbose_name="经理编号")


class manager_with_financial(models.Model):
    manage_relation_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name="关系编号")
    financial_id = models.ForeignKey(Financial_type, on_delete=models.CASCADE, null=False, verbose_name="理财产品编号")
    manager_id = models.ForeignKey(Manager, on_delete=models.CASCADE, null=False, verbose_name="经理编号")


# 理财信息表
class Financial_project(models.Model):
    financial_project_id = models.AutoField(unique=True, primary_key=True, null=False, verbose_name='理财项目编号')
    project_id = models.OneToOneField(Currency_project, on_delete=models.CASCADE, null=False, verbose_name="项目编号")
    financial_type = models.ForeignKey(Financial_type, on_delete=models.CASCADE, null=False)
    financial_project_amount = models.DecimalField(max_digits=18, decimal_places=2, null=False,
                                                   validators=[validate_positive_decimal], default=0,
                                                   verbose_name="理财项目金额")
    financial_project_income = models.DecimalField(max_digits=18, decimal_places=2, null=False,
                                                   validators=[validate_positive_decimal], default=0,
                                                   verbose_name="理财项目收益")
    financial_project_period = models.DateField(null=False, verbose_name="理财项目有效期")
    financial_project_detail_etc = models.TextField(null=True, default="", verbose_name="额外信息")
