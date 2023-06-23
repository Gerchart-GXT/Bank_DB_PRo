from rest_framework import serializers
from bank import models


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccountInfo
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = '__all__'


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Manager
        fields = '__all__'


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Manager
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Card
        fields = ['card_id', 'card_check_code', 'card_valid_thru']


class CreditCardSerializer(serializers.ModelSerializer):
    card_id = CardSerializer()

    class Meta:
        model = models.Credit_card
        fields = ['card_id', 'card_balance', 'card_credit_limit']


class DebitCardSerializer(serializers.ModelSerializer):
    card_id = CardSerializer()

    class Meta:
        model = models.Debit_card
        fields = ['card_id', 'card_balance']
