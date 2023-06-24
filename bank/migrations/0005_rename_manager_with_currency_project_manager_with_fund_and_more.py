# Generated by Django 4.2.2 on 2023-06-24 19:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0004_financial_type_insurance_type_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='manager_with_currency_project',
            new_name='manager_with_fund',
        ),
        migrations.CreateModel(
            name='manager_with_insurance',
            fields=[
                ('manage_relation_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='关系编号')),
                ('insurance_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.insurance_type', verbose_name='保险编号')),
                ('manager_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.manager', verbose_name='经理编号')),
            ],
        ),
        migrations.CreateModel(
            name='manager_with_financial',
            fields=[
                ('manage_relation_id', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='关系编号')),
                ('financial_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.financial_type', verbose_name='理财产品编号')),
                ('manager_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank.manager', verbose_name='经理编号')),
            ],
        ),
    ]
