from django.contrib import admin
from django.utils.safestring import mark_safe
from kanbanboard.models import User, Board, Column, Card
# Register your models here.


class ColumnInline(admin.StackedInline):
    
    model = Column


#@admin.register(Dashboard)
#Description class. Changes what is seen on the admin site table.
class BoardAdmin(admin.ModelAdmin):
    """ This class changes what is displayed on the admin page for the board class. 
    """
    inlines = []
    #fields you want on the same line go in the same tuple
    fields = (('title', 'is_public'), 'created_at', 'updated_at', 'owner')
    readonly_fields = ('created_at', 'updated_at')
    list_display = ('id', 'title', 'created_at', 'updated_at', 'is_public')
    
    #used for displaying fields as link
    list_display_links = ('id', 'title')

    list_editable = ('is_public',)


class CardInline(admin.TabularInline):
    """
    This class changes the way the card list appears on the admin page. 


    Methods
    -------
   get_extra()
        Used to get extra cards. Either 1 or 5.
    """
    model = Card

    def get_extra(self, request, obj=None, **kwargs):
        """
        Used to display 1 or 5 extra cards on the admin page. 
        """
        #if we got to page by editing an existing entry
        if obj:
            return 1
        else: 
            return 5


    show_change_link = True
    fk_name = 'column'



class ColumnAdmin(admin.ModelAdmin):
    """ This class changes what is displayed on the admin page for the column class. 
    """
    list_display = ('title', 'dashboard', 'created_at', 'updated_at')
    
    #changes the order that fields appear on admin page
    fields = ('title', 'dashboard', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    inlines = [CardInline]




# class MemberAdmin(admin.ModelAdmin):
#     """ This class changes what is displayed on the admin page for the member class. 
#     """
#     list_display = ('user', 'created_at', 'updated_at')

#     empty_value_display = "UNSET"




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
            'fields':('title','description', 'comment', ('label', 'column'), 'position')
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


# admin.site.register(Member, MemberAdmin)
#passing description class
admin.site.register(Board, BoardAdmin)
admin.site.register(Column, ColumnAdmin)
admin.site.register(Card, CardAdmin)

#change aspects of the admin page
admin.site.site_header = 'AGILITY ADMIN PANEL'
admin.site.site_title = 'Agility Admin'
admin.site.index_title = 'Administration'