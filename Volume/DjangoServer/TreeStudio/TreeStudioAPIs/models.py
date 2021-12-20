from django.db import models
from django.db.models.fields.related import ManyToManyField

# Create your models here.
# python3 manage.py makemigrations
# python3 manage.py migrate

class AnnouncementList(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    who = models.TextField()
    title = models.TextField()
    content = models.TextField()
    last_modify_date = models.DateTimeField(auto_now=True)

    def to_dict(self):
        opts = self._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if self.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(self).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(self)
        return data

    class Meta:
        db_table = "AnnouncementList"

class OrderSys_ShopsInfo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    shop_id = models.TextField()
    shop_type = models.TextField()
    shop_name = models.TextField()
    shop_score = models.FloatField()
    shop_phoneNum = models.TextField()
    shop_address = models.TextField()
    shop_description = models.TextField()
    shop_menu = models.TextField()
    shop_picture = models.TextField()
    is_delete = models.BooleanField(default=False)
    last_modify_date = models.DateTimeField(auto_now=True)

    def to_dict(self):
        opts = self._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if self.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(self).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(self)
        return data

    class Meta:
        db_table = "OrderSys_ShopsInfo"

class OrderSys_OrderInfo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    order_id = models.TextField()
    owner_name = models.TextField()
    close_time = models.TextField(default="")
    bank_info = models.TextField()
    bank_info_qr_code = models.TextField()
    shop_id = models.TextField()
    order_description = models.TextField()
    alive = models.BooleanField(default=True)
    is_delete = models.BooleanField(default=False)
    last_modify_date = models.DateTimeField(auto_now=True)

    def to_dict(self):
        opts = self._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if self.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(self).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(self)
        return data

    class Meta:
        db_table = "OrderSys_OrderInfo"

class OrderSys_ShopCartInfo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    shop_cart_id = models.TextField()
    shopper_name = models.TextField()
    order_id = models.TextField()
    item_name = models.TextField()
    item_number = models.IntegerField()
    item_price = models.IntegerField()
    item_content = models.TextField()
    item_index = models.IntegerField()
    pay = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    last_modify_date = models.DateTimeField(auto_now=True)

    def to_dict(self):
        opts = self._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if self.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(self).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(self)
        return data

    class Meta:
        db_table = "OrderSys_ShopCartInfo"

class OrderSys_Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    message_id = models.TextField()
    shop_id = models.TextField()
    who = models.TextField()
    title = models.TextField()
    content = models.TextField()
    score = models.IntegerField()
    is_delete = models.BooleanField(default=False)
    last_modify_date = models.DateTimeField(auto_now=True)

    def to_dict(self):
        opts = self._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if self.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(self).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(self)
        return data

    class Meta:
        db_table = "OrderSys_Message"