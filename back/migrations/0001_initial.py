# Generated by Django 4.2.2 on 2023-06-21 18:23

import bank.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccountInfo',
            fields=[
                ('account_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='账号编号')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='用户名')),
                ('password', models.CharField(max_length=100, verbose_name='密码')),
                ('invcode', models.CharField(max_length=100, null=True, verbose_name='邀请码')),
                ('index', models.IntegerField(choices=[(0, '管理员'), (1, '经理'), (2, '客户')], default=2, verbose_name='账户类型')),
                ('online', models.BooleanField(default=False, verbose_name='是否在线')),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('card_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='卡片id')),
                ('card_valid_thru', models.DateTimeField(verbose_name='卡片有效期')),
                ('card_check_code', models.CharField(max_length=20, verbose_name='卡片校验码')),
                ('card_password', models.CharField(max_length=20, verbose_name='卡片密码')),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('client_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='客户编号')),
                ('client_name', models.CharField(max_length=100, verbose_name='客户姓名')),
                ('client_idnum', models.CharField(max_length=18, validators=[bank.models.validate_id_number], verbose_name='客户身份证号')),
                ('client_phone_number', models.CharField(max_length=11, validators=[bank.models.validate_phone_number], verbose_name='客户电话号码')),
                ('client_email_address', models.CharField(max_length=100, validators=[bank.models.validate_email], verbose_name='客户邮箱')),
                ('client_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.accountinfo', verbose_name='客户账号')),
            ],
        ),
        migrations.CreateModel(
            name='Currency_project',
            fields=[
                ('project_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='项目编号')),
                ('project_state', models.IntegerField(choices=[(0, 'Active'), (1, 'Invalid'), (2, 'Frozen')], default=0, verbose_name='项目状态')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.client', verbose_name='项目所属客户编号')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='部门编号')),
                ('department_name', models.CharField(max_length=100, verbose_name='部门名称')),
            ],
        ),
        migrations.CreateModel(
            name='Fund_type',
            fields=[
                ('fund_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='基金编号')),
                ('fund_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('manager_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='经理编号')),
                ('manager_name', models.CharField(max_length=100, verbose_name='经理姓名')),
                ('manager_phone_number', models.CharField(max_length=20, validators=[bank.models.validate_phone_number], verbose_name='经理电话号码')),
                ('manager_email_address', models.CharField(max_length=100, validators=[bank.models.validate_email], verbose_name='经理邮箱')),
                ('manager_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.accountinfo', verbose_name='经理账号')),
                ('manager_department_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.department', verbose_name='经理所属部门id')),
            ],
        ),
        migrations.CreateModel(
            name='manager_with_currency_project',
            fields=[
                ('manage_relation_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='关系编号')),
                ('fund_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.fund_type', verbose_name='基金编号')),
                ('manager_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.manager', verbose_name='经理编号')),
            ],
        ),
        migrations.CreateModel(
            name='Insurance_project',
            fields=[
                ('insurance_project_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='保险项目编号')),
                ('insurance_project_name', models.CharField(max_length=100, verbose_name='保险名称')),
                ('insurance_policyholder', models.CharField(max_length=20, validators=[bank.models.validate_id_number], verbose_name='投保人身份证号')),
                ('insurance_insured', models.CharField(max_length=20, validators=[bank.models.validate_id_number], verbose_name='被保人身份证号')),
                ('insurance_amount', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='投保金额')),
                ('insurance_period', models.DateField(verbose_name='保险有效期')),
                ('insurance_detail_etc', models.TextField(default='', null=True, verbose_name='额外信息')),
                ('project_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.currency_project', verbose_name='项目编号')),
            ],
        ),
        migrations.CreateModel(
            name='Fund_project',
            fields=[
                ('fund_project_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='基金项目编号')),
                ('fund_amount', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='基金金额')),
                ('fund_income', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='基金收益')),
                ('fund_period', models.DateField(verbose_name='基金有效期')),
                ('fund_detail_etc', models.TextField(default='', null=True, verbose_name='额外信息')),
                ('fund_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.fund_type')),
                ('project_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.currency_project', verbose_name='项目编号')),
            ],
        ),
        migrations.CreateModel(
            name='Financial_project',
            fields=[
                ('financial_project_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='理财项目编号')),
                ('financial_project_name', models.CharField(max_length=100, verbose_name='理财项目名称')),
                ('financial_project_amount', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='理财项目金额')),
                ('financial_project_income', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='理财项目收益')),
                ('financial_project_period', models.DateField(verbose_name='理财项目有效期')),
                ('financial_project_detail_etc', models.TextField(default='', null=True, verbose_name='额外信息')),
                ('project_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.currency_project', verbose_name='项目编号')),
            ],
        ),
        migrations.CreateModel(
            name='Debit_card',
            fields=[
                ('debit_card_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='借记卡id')),
                ('card_balance', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='借记卡余额')),
                ('card_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.card', verbose_name='借记卡对应卡片id')),
            ],
        ),
        migrations.CreateModel(
            name='Credit_card',
            fields=[
                ('credit_card_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='信用卡id')),
                ('card_balance', models.DecimalField(decimal_places=2, default=0, max_digits=18, verbose_name='信用卡余额')),
                ('card_credit_limit', models.DecimalField(decimal_places=2, default=0, max_digits=18, validators=[bank.models.validate_positive_decimal], verbose_name='信用卡额度')),
                ('card_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.card', verbose_name='信用卡对应卡片id')),
            ],
        ),
        migrations.AddField(
            model_name='card',
            name='client_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.client', verbose_name='所属客户编号'),
        ),
    ]
