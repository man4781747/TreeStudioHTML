from django.db import models
from django.db.models.fields.related import ManyToManyField

# Create your models here.

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

    