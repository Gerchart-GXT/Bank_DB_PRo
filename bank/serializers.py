from rest_framework import serializers
from bank import models


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    index = serializers.SerializerMethodField()

    def get_index(self, obj):
        return obj.get_index_display()

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


class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fund_type
        fields = '__all__'


class FinancialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Financial_type
        fields = '__all__'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Insurance_type
        fields = '__all__'


class CreditCardSerializer(serializers.ModelSerializer):
    # card_id = CardSerializer()
    card_id = serializers.PrimaryKeyRelatedField(source='card_id.card_id', read_only=True)
    card_check_code = serializers.CharField(source='card_id.card_check_code', read_only=True)
    card_valid_thru = serializers.DateTimeField(source='card_id.card_valid_thru', read_only=True)

    class Meta:
        model = models.Credit_card
        fields = ['card_id', 'card_check_code', 'card_valid_thru', 'card_balance', 'card_credit_limit']


class DebitCardSerializer(serializers.ModelSerializer):
    # card_id = CardSerializer()
    card_id = serializers.PrimaryKeyRelatedField(source='card_id.card_id', read_only=True)
    card_check_code = serializers.CharField(source='card_id.card_check_code', read_only=True)
    card_valid_thru = serializers.DateTimeField(source='card_id.card_valid_thru', read_only=True)

    class Meta:
        model = models.Debit_card
        fields = ['card_id', 'card_check_code', 'card_valid_thru', 'card_id', 'card_balance']


class FundPrjSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(source='project_id.project_id', read_only=True)
    project_state = serializers.ChoiceField(source='project_id.project_state',
                                            choices=models.Currency_project.INDEX_CHOICES, read_only=True)
    fund_type = serializers.PrimaryKeyRelatedField(source='fund_type.fund_name', read_only=True)

    class Meta:
        model = models.Fund_project
        fields = ['project_id', 'project_state', 'fund_amount', 'fund_income', 'fund_period', 'fund_detail_etc',
                  'fund_type']


class FinancialPrjSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(source='project_id.project_id', read_only=True)
    project_state = serializers.ChoiceField(source='project_id.project_state',
                                            choices=models.Currency_project.INDEX_CHOICES, read_only=True)
    financial_type = serializers.PrimaryKeyRelatedField(source='financial_type.financial_name', read_only=True)

    class Meta:
        model = models.Financial_project
        fields = ['project_id', 'project_state', 'financial_project_amount', 'financial_project_income',
                  'financial_project_period', 'financial_project_detail_etc',
                  'financial_type']


class InsurancePrjSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(source='project_id.project_id', read_only=True)
    project_state = serializers.ChoiceField(source='project_id.project_state',
                                            choices=models.Currency_project.INDEX_CHOICES, read_only=True)
    insurance_type = serializers.PrimaryKeyRelatedField(source='insurance_type.insurance_name', read_only=True)

    class Meta:
        model = models.Insurance_project
        fields = ['project_id', 'project_state', 'insurance_policyholder', 'insurance_insured', 'insurance_amount',
                  'insurance_period', 'insurance_detail_etc',
                  'insurance_type']
