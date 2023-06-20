from django.db import models


# 账号信息表
class AccountInfo(models.Model):
    INDEX_CHOICES = (
        (0, '管理员'),
        (1, '经理'),
        (2, '客户'),
    )
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    invcode = models.CharField(max_length=100, null=True)
    index = models.IntegerField(choices=INDEX_CHOICES, default=2)
    online = models.BooleanField(default=False)
# 客户信息表
