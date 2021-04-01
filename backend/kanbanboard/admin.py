from django.contrib import admin
from django.utils.safestring import mark_safe
from kanbanboard.models import Member, Board, Column, Card
# Register your models here.


class ColumnInline(admin.StackedInline):
    model = Column


#@admin.register(Dashboard)
#Description class. Changes what is seen on the admin site table.
class BoardAdmin(admin.ModelAdmin):

    inlines = []
    #fields you want on the same line go in the same tuple
    fields = (('title', 'is_public'), 'created_at', 'updated_at', 'owner')
    readonly_fields = ('created_at', 'updated_at')
    list_display = ('id', 'title', 'created_at', 'updated_at', 'is_public')
    
    #used for displaying fields as link
    list_display_links = ('id', 'title')

    list_editable = ('is_public',)


    # def get_list_display(self, record):
    #     """
    #     This method is used for displaying certain fields dynamically.
    #     If the user is a supr user it will show extra fields.
    #     """
    #     #fields to display
    #     ld = ['id', 'title', 'owner', 'is_public']

    #     if record.user.is_superuser:
    #         ld += ['created_at', 'updated_at']
        
    #     return ld


    # def get_owner(self, rec):
    #     return rec.owner.user.username

    # #changes what is displayed in the columns of table
    # get_owner.short_decription = "Owner"





class CardInline(admin.TabularInline):
    model = Card

    def get_extra(self, request, obj=None, **kwargs):
        #if we got to page by editing an existing entry
        if obj:
            return 1
        else: 
            return 5


    show_change_link = True
    fk_name = 'column'



class ColumnAdmin(admin.ModelAdmin):
    list_display = ('title', 'dashboard', 'created_at', 'updated_at')
    
    #changes the order that fields appear on admin page
    fields = ('title', 'dashboard', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    inlines = [CardInline]




class MemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at', 'get_avatar')


    def get_avatar(self, obj):
        if obj.avatar:
            return mark_safe(f'<img src="{obj.avatar.url}" width="75">')
        else:
            return '-'


    empty_value_display = "UNSET"

    get_avatar.short_description = "Avatar"



class ToDoItemFilter(admin.SimpleListFilter):
    fields = ('description', 'comment', 'label', ('due_date', 'time_estimate_hours'))
    title = 'Difficulty'
    parameter_name = 'time_estimate_hours'


    def lookups(self, request, model_admin):
        return (('easy','Easy'),
                ('average','Average'),
                ('Hard','Hard'),
        )

    
    def queryset(self, request, queryset):
        #this method does filtering and adds categories on the right side

        if self.value() == 'easy':
            return queryset.filter(time_estimate_hours__lt=2)
        elif self.value() == 'average':
            return queryset.filter(time_estimate_hours__gte=2, time_estimate_hours__lte=8)
        elif self.value() == 'hard':
            return queryset.filter(time_estimate_hours__gt=8)


class CardAdmin(admin.ModelAdmin):

    save_on_top = True
    #a way of segmenting the different fields
    fieldsets = (
        ('Main', {
            'fields':('description', 'comment', ('label', 'column'))
        }),
        ('Estimations', {
            'fields': (('start_date', 'due_date'), 'time_estimate_hours'),
            'description': 'Dates and Times',
            'classes': ('collapse',)
        })
    )


    list_display = ('description', 'label', 'comment', 'due_date',
    'time_estimate_hours')
    list_editable = ('label', 'time_estimate_hours')

    search_fields = ('description', 'comment')
    list_filter = ('label', ToDoItemFilter)

    actions_on_bottom = True


admin.site.register(Member, MemberAdmin)
#passing description class
admin.site.register(Board, BoardAdmin)
admin.site.register(Column, ColumnAdmin)
admin.site.register(Card, CardAdmin)

#change aspects of the admin page
admin.site.site_header = 'AGILITY ADMIN PANEL'
admin.site.site_title = 'Agility Admin'
admin.site.index_title = 'Administration'