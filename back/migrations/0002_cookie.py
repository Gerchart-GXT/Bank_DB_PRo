# Generated by Django 4.2.2 on 2023-06-23 16:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cookie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=64, null=True, verbose_name='cookie验证码')),
                ('init_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('period', models.DurationField()),
                ('account_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bank.accountinfo', verbose_name='账户编号')),
            ],
        ),
    ]
